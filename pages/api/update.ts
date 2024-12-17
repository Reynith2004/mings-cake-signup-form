import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    const { id, title, description, date, time, location, category } = req.body;

    if (!id || !title || !description || !date || !time || !location || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "my_db",
      });

      const [result] = await connection.execute(
        "UPDATE event SET title = ?, description = ?, date = ?, time = ?, location = ?, category = ? WHERE id = ?",
        [title, description, date, time, location, category, id]
      );

      connection.end();

      const { affectedRows } = result as mysql.ResultSetHeader;

      if (affectedRows > 0) {
        res.status(200).json({ message: "Event updated successfully." });
      } else {
        res.status(404).json({ error: "Event not found." });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Failed to update event." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
