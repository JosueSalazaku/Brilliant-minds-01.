import express from "express";
import mariadb from "mariadb";
import { config } from "dotenv";
import cors from "cors";

config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const app = express();

console.log(process.env.DB_USER);

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5,
});

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the root page");
});

// Read all ideas
app.get("/ideas", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM ideas`);
    res.json(data);
  } catch (err) {
    console.error("Error in /ideas GET:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) connection.end();
  }
});

app.get("/ideas/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query("SELECT * FROM ideas WHERE id = ?", [
      req.params.id,
    ]);

    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).send("Idea not found");
    }
  } catch (err) {
    console.error("Error in /ideas/:id GET:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) connection.end();
  }
});

app.post("/ideas/", async (req, res) => {
  const { title, description } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(
      "INSERT INTO ideas (title, description) VALUES (?, ?)",
      [title, description]
    );

    res.status(201).json({
      message: "Idea was added successfully",
      result: {
        ...data,
        // Convert BigInt values to strings
        insertId: String(data.insertId),
      },
    });
  } catch (err) {
    console.error("Error in /ideas POST:", err);
    res.status(500).send("Server Error");
  } finally {
    if (connection) connection.end();
  }
});

// Delete an idea by ID
app.delete("/ideas/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query("DELETE FROM ideas WHERE id = ?", [
      req.params.id,
    ]);

    if (data.affectedRows > 0) {
      res.json({ message: "Idea deleted successfully", result: data });
    } else {
      res.status(404).send("Idea not found");
    }
  } catch (err) {
    console.error("Error in /ideas/:id DELETE:", err);
    res.status(500).send("Server Error");
  } finally {
    if (connection) connection.end();
  }
});

app.listen(PORT, () => console.log(`Server started: http://${HOST}:${PORT}/`));
