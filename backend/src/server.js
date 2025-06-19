import express from 'express';
import cors from 'cors';
import dotenv, { parse } from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
import { connectToDatabase } from './config/db.js';
import job from './config/cron.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


if (process.env.NODE_ENV === 'production') job.start();

// Middleware
app.use(rateLimiter);
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({status:'ok'});
})

app.use('/api/transactions', transactionsRoutes);

connectToDatabase().then(() => {
    app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
    });
});