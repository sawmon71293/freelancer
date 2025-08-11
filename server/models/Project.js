import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  deadline: Date,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],
  status: {
    type: String,
    enum: ["open", "in_progress", "completed"],
    default: "open",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
