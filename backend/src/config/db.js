import {neon} from '@neondatabase/serverless';
import { config } from 'dotenv';

config();

// Creates a sql client using the Neon database connection string from environment variables
export const sql = neon(process.env.DATABASE_URL);

export async function connectToDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    console.log('Database connected and table created successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); //status code 1 indicates an error and 0 means success
  }
}
