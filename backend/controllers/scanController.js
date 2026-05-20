import AttackLog from '../models/AttackLog.js';
import ScanHistory from '../models/ScanHistory.js';
import { detectSQLInjection } from '../utils/detectSQLInjection.js';

export async function scanQuery(req, res, next) {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query text is required' });
    }

    const rawResult = detectSQLInjection(query);

    const result = {
      malicious: !!rawResult.malicious,
      severity: rawResult.severity || 'Low',
      confidence: rawResult.confidence || '0%',
      patterns: rawResult.detectedPatterns || rawResult.patterns || [],
    };

    await ScanHistory.create({ userId: req.user.id, query, result });

    if (result.malicious) {
      await AttackLog.create({ query, severity: result.severity, confidence: result.confidence, malicious: true, ipAddress: req.ip });
    }

    res.json({ query, result });
  } catch (error) {
    next(error);
  }
}

export async function getHistory(req, res, next) {
  try {
    const history = await ScanHistory.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json({ history });
  } catch (error) {
    next(error);
  }
}

// ─── AI SCAN (Groq proxy) ─────────────────────────────────────────────────────
export async function aiScan(req, res, next) {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query text is required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'GROQ_API_KEY not configured in backend .env' });
    }

    const systemPrompt = `You are an expert SQL injection detection AI. Analyze SQL queries for injection attacks.

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "is_malicious": boolean,
  "confidence": number between 0 and 100,
  "severity": "safe" or "low" or "medium" or "high" or "critical",
  "attack_types": array of strings,
  "detection_methods": array of strings,
  "risk_analysis": string,
  "suggested_fix": string,
  "patterns_found": array of strings
}

Severity guide: safe = clean query, low = suspicious but benign, medium = possible injection, high = clear injection, critical = dangerous (data exfiltration, schema changes, auth bypass).`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        temperature: 0.1,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this SQL query:\n\n${query}` },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('Groq API error:', data);
      return res.status(groqRes.status).json({ message: data?.error?.message || 'Groq API error' });
    }

    const text = data.choices?.[0]?.message?.content || '{}';
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    res.json(result);
  } catch (error) {
    next(error);
  }
}
