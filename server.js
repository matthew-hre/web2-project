const express = require("express");

const app = express();
const PORT = 3000;

const blogPosts = [];
let currentId = 0;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/posts", (req, res) => {
  res.json(blogPosts);
});

app.post("/api/posts", (req, res) => {
  const post = {
    id: currentId++,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString(),
  };
  blogPosts.push(post);
  res.json(post);
});

app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
  } else {
    res.status(404).send();
  }
});

app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogPosts.findIndex((post) => post.id === id);
  if (index !== -1) {
    blogPosts.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
