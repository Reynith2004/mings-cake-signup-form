// pages/api/login.ts
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

  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Check if the user exists in the database
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    // If no user found with that email
    if ((users as any[]).length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Extract the user data from the database
    const user = (users as any[])[0];

    // Compare the plain text password with the one in the database
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Successfully authenticated
    res.status(200).json({ message: 'Login successful', user: { firstname: user.firstname, lastname: user.lastname, email: user.email } });

    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection error' });
  }
}
