import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import path from 'path';

import notesRoutes from './routes/noteRoutes.js';
import rateLimiter from '../middleware/rateLimiter.js';
import connectDB from './config/db.js';

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log(`Req method:${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use('/api/notes', notesRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('server running on port:5001...');
  });
});
