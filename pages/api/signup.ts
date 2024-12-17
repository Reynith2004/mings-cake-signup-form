// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_db',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstname, lastname, email, password } = req.body;

  // Validate input fields
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'Please fill out all fields correctly' });
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Check if the email already exists in the database
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if ((existingUser as any[]).length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Insert the new user into the database (password is stored as plain text)
    await connection.query(
      'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
      [firstname, lastname, email, password]
    );

    connection.end();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error); // Add more detailed error logging
    res.status(500).json({ error: 'Database connection error or query failure' });
  }
}
