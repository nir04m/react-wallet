import express from 'express';
import { sql } from '../config/db.js'; // Adjust the path as necessary
import { getTransactionsByUserID, createTransaction, deleteTransaction, getTransactionSummary } from '../controllers/transactionsController.js'; // Adjust the path as necessary

const router = express.Router();

router.get('/:userId', getTransactionsByUserID);

router.post('/', createTransaction);

router.delete('/:id', deleteTransaction);

router.get('/summary/:userId', getTransactionSummary);

export default router;