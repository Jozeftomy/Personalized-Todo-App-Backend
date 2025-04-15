import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { 
        type: String, 
        enum: ["pending", "completed"], 
        default: "pending" 
    },
    priority: { 
        type: String, 
        enum: ["high", "medium", "low"], 
        required: true 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", TaskSchema);
