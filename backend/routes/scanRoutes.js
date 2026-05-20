import express from 'express';
import { scanQuery, getHistory, aiScan } from '../controllers/scanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/query', protect, scanQuery);
router.get('/history', protect, getHistory);
router.post('/ai', aiScan); // AI scan — no auth required for demo

export default router;
