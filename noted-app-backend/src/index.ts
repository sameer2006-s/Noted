import express from "express";
import cors from "cors";
import sql from "mssql";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Configuration with Environment Variables
const dbConfig: sql.config = {
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || "1433"),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

// Function to connect to the database
async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

connectDB(); // Connect to database on server start

// API Routes
app.get("/api/notes", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM notes");
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

// Get a single note by ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`SELECT * FROM notes WHERE id = ${id}`;
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching note", error: err });
  }
});

// Create a new note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    await sql.query`INSERT INTO notes (title, content) VALUES (${title}, ${content})`;
    res.status(201).json({ message: "Note created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err });
  }
});

// Update an existing note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const result = await sql.query`UPDATE notes SET title = ${title}, content = ${content} WHERE id = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err });
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`DELETE FROM notes WHERE id = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
