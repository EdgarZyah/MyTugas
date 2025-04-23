import express from "express";
import { Todo } from "../models";
const router = express.Router();

// GET All Tugas
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({ order: [["createdAt", "DESC"]] });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST Tugas baru
router.post("/", async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      deadline,
      is_done: false,
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PUT update Tugas
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });

    const { title, description, deadline, is_done } = req.body;

    await todo.update({
      title: title ?? todo.title,
      description: description ?? todo.description,
      deadline: deadline ?? todo.deadline,
      is_done: is_done ?? todo.is_done
    });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE Tugas
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });

    await todo.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
