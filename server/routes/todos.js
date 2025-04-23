const express = require("express");
const router = express.Router();
const { Todo } = require("../models");
const authenticate = require("../middleware/auth");

// ✅ UPDATE todo milik user login
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


// CREATE todo baru
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      userId: req.user.id,
    });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// UPDATE todo milik user login
router.put("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    await todo.update(req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE todo milik user login
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

router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      deadline, // 🆕
      userId: req.user.id,
    });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    const { title, description, is_done, deadline } = req.body;
    await todo.update({ title, description, is_done, deadline }); // 🆕
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

module.exports = router;
