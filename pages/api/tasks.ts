import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

// Create a database connection
const dbConfig = {
  host: "localhost", // Update as needed
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "my_db", // Your database name
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      const connection = await mysql.createConnection(dbConfig);

      // Query the `event` table
      const [rows] = await connection.execute("SELECT * FROM event");

      // Close the connection
      await connection.end();

      // Respond with the data
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
