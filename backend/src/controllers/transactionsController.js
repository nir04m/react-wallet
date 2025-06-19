import { sql } from '../config/db.js';


export async function getTransactionsByUserID(req, res) {

    const { userId } = req.params;
    try {
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

export async function createTransaction(req, res) {
    try{
            const { user_id, title, amount, category } = req.body;
            if (!user_id || !title || amount===undefined || !category) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const transaction = await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;
            res.status(201).json(transaction[0]);
    
        } catch (error) {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
}

export async function deleteTransaction(req, res) {
    const { id } = req.params;
    try {
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid transaction ID' });
        }
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
        if (result.count === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(204).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getTransactionSummary(req, res) {
    const { userId } = req.params;
    try {
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as total_balance
            FROM transactions
            WHERE user_id = ${userId}
        `;
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as total_income
            FROM transactions
            WHERE user_id = ${userId} AND amount > 0
        `;
        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as total_expenses
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `;
        res.status(200).json({
            balance: balanceResult[0].total_balance,
            income: incomeResult[0].total_income,
            expenses: expensesResult[0].total_expenses
        });
    } catch (error) {
        console.error('Error fetching transaction summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}