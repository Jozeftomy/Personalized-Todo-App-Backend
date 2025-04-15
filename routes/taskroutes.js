import express from "express";
import { createTask, getTasks, updateTask, deleteTask, toggleTaskStatus } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);
router.patch("/tasks/:id/status", authMiddleware, toggleTaskStatus);

export default router;
