const express = require("express");
const router = express.Router();
const { Todo } = require("../models");
const authenticate = require("../middleware/auth");

// GET all Tugas current user
router.get("/", authenticate, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// CREATE New Tugas
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      deadline,
      userId: req.user.id,
    });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// UPDATE Tugas current user
router.put("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    const { title, description, is_done, deadline } = req.body;
    await todo.update({ title, description, is_done, deadline });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE Tugas
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    await todo.destroy();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;
