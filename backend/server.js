import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import binanceRoutes from './routes/binanceRoutes.js';
import geckoRoutes from './routes/geckoRoutes.js'
import fs from 'fs';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/binance', binanceRoutes);
app.use('/api/gecko', geckoRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
