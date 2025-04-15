import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        console.log("Incoming task data:", req.body); 

        const { title, description, priority } = req.body;
        if (!title || !priority) {
            return res.status(400).json({ error: "Title and priority are required." });
        }

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: "Unauthorized: User ID missing." });
        }

        const task = new Task({ title, description, priority, userId: req.user.userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: error.message });
    }
};

export const toggleTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        task.status = task.status === "pending" ? "completed" : "pending"; // Fix toggle
        await task.save();
        res.json(task);
    } catch (error) {
        console.error("Error toggling task status:", error);
        res.status(500).json({ error: error.message });
    }
};
