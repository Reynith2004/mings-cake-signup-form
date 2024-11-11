import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_db',  // Database name changed to 'my_db'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please fill out all fields correctly' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if the email already exists in the users table
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if ((existingUser as any[]).length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Insert new user into the 'users' table (with name, email, and password)
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',  // Removed confirmPassword from insert query
      [name, email, password]  // Storing name, email, and password only
    );

    connection.end();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection error' });
  }
}
