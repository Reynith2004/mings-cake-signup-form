import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, date, time, location, category } = req.body;

    if (!title || !description || !date || !time || !location || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Function to format time to 12-hour format with AM/PM
    function formatTime(time: string): string {
      const [hour, minute] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute, 0, 0);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    }

    // Format the time to 12-hour format with AM/PM
    const formattedTime = formatTime(time);

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "my_db",
      });

      const [result] = await connection.execute(
        "INSERT INTO event (title, description, date, time, location, category) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, date, formattedTime, location, category]
      );

      await connection.end();

      res.status(200).json({ message: "Event created successfully!", result });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Failed to create event." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
