import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "my_db", 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Assuming the body contains an 'id' field to identify the events to delete
  const { id } = req.body;

  if (!id || typeof id !== "number") {
    return res.status(400).json({ message: "Valid id is required to delete events." });
  }

  console.log("Received id to delete:", id); // Log the id being passed

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "DELETE FROM event WHERE id = ?",
      [id]
    );
    connection.release();

    console.log("Query result:", result); // Log the result of the query

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "No events found with the given id." });
    }

    return res.status(200).json({ message: "Event(s) deleted successfully." });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
