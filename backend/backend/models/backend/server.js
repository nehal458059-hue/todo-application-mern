const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
