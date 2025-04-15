import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: Boolean, default: false },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", TaskSchema);
