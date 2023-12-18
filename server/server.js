import express from "express";
import mariadb from "mariadb";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const app = express();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
});

app.use(express.json());

app.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
    res.send(data);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});

app.get("/ideas/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const prepare = await connection.prepare(
      "SELECT * FROM ideas WHERE id = ?"
    );
    const data = prepare.execute([req.params.id]);
  } catch (error) {}
});

app.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}/`)
);
