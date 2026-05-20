import mongoose from 'mongoose';
import dns from 'dns';

// Fix: Node.js v24 on Windows fails SRV DNS lookups via the local resolver.
// Override to use Google DNS + force IPv4 before any network call.
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

export async function connectDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Missing MONGO_URI in environment variables');
  }
  try {
    await mongoose.connect(uri, {
      dbName: 'ai_sql_security_dashboard',
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
