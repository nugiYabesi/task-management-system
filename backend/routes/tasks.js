// routes/tasks.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

const VALID_STATUSES = ["Pending", "Completed"];
const VALID_PRIORITIES = ["Low", "Medium", "High"];

// GET /tasks           -> all tasks, optional ?status=Pending|Completed filter
router.get("/", async (req, res, next) => {
  try {
    const { status } = req.query;

    let result;
    if (status && VALID_STATUSES.includes(status)) {
      result = await pool.query(
        'SELECT * FROM tasks WHERE status = $1 ORDER BY "createdAt" DESC',
        [status]
      );
    } else {
      result = await pool.query('SELECT * FROM tasks ORDER BY "createdAt" DESC');
    }

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id       -> single task
router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /tasks          -> create task
router.post("/", async (req, res, next) => {
  try {
    const { title, description = "", status = "Pending", priority = "Medium" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Status must be 'Pending' or 'Completed'" });
    }
    if (!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({ error: "Priority must be 'Low', 'Medium' or 'High'" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, priority)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title.trim(), description, status, priority]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id       -> update task (full or partial)
router.put("/:id", async (req, res, next) => {
  try {
    const existing = await pool.query("SELECT * FROM tasks WHERE id = $1", [req.params.id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: "Task not found" });

    const current = existing.rows[0];
    const {
      title = current.title,
      description = current.description,
      status = current.status,
      priority = current.priority,
    } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Status must be 'Pending' or 'Completed'" });
    }
    if (!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({ error: "Priority must be 'Low', 'Medium' or 'High'" });
    }

    const result = await pool.query(
      `UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4
       WHERE id = $5 RETURNING *`,
      [title, description, status, priority, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id    -> delete task
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING id", [
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
