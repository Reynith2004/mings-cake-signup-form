import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Event ID is required.' });
    }

    try {
      // Connect to the MySQL database
      const connection = await mysql.createConnection({
        host: 'localhost', // Replace with your database host
        user: 'root', // Replace with your database username
        password: '', // Replace with your database password
        database: 'my_db', // Replace with your database name
      });

      // Update the isDone status to 1 (true)
      const [result] = await connection.execute<mysql.ResultSetHeader>(
        'UPDATE event SET isDone = ? WHERE id = ?',
        [1, id] // Set isDone to 1
      );

      await connection.end();

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Event marked as done!' });
      } else {
        res.status(404).json({ message: 'Event not found.' });
      }
    } catch (error) {
      console.error('Error marking event as done:', error);
      res.status(500).json({ message: 'Failed to mark event as done.' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
