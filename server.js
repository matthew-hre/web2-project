const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());
app.use(express.static("public"));

app.get("/api/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts");
  res.json(result.rows);
});

app.get("/api/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).send();
  }
});

app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    "INSERT INTO posts (title, content, date) VALUES ($1, $2, $3) RETURNING *",
    [title, content, new Date().toISOString()],
  );
  res.json(result.rows[0]);
});

app.put("/api/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const result = await pool.query(
    "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id],
  );
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).send();
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id],
  );
  if (result.rows.length > 0) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
