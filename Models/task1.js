const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String },
    status: { type: String, enum: ["Pending", "Approved", "Completed"], default: "Pending" },
    creatoremail: { type: String },
    creatorname: { type: String },
    followeremail: { type: String },
    followername: { type: String },
    assigneeemail: { type: String },
    assigneename: { type: String },
    completedat: { type: Date },
    approvedat: { type: Date },
    colid: { type: Number },
  },
  { timestamps: true }
);

/* ---------- text index ---------- */
taskSchema.index(
  {
    title: "text",
    description: "text",
    creatorname: "text",
    assigneename: "text",
  },
  { name: "TaskTextIndex" }
);

const Task1=mongoose.model('Task1',taskSchema);

module.exports=Task1;