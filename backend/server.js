import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { connectDatabase } from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import rateLimiter from './middleware/rateLimiter.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

connectDatabase().then(async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await User.create({ name: 'Administrator', email: adminEmail, password: passwordHash, role: 'admin' });
    console.log(`Default admin created: ${adminEmail}`);
  }

  const server = app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the process using it or set a different PORT in your environment.`);
      process.exit(1);
    }
    console.error('Server error:', error);
    process.exit(1);
  });
});
