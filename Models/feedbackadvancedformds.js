const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: { type: String, enum: ["5 Point Scale", "Short Answer Type"], default: "5 Point Scale" },
    images: { type: [String], default: [] },
    links: { type: [linkSchema], default: [] },
    required: { type: String, enum: ["Yes", "No"], default: "Yes" }
  },
  { timestamps: true }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, default: "" },
    images: { type: [String], default: [] },
    links: { type: [linkSchema], default: [] },
    questions: { type: [questionSchema], default: [] }
  },
  { timestamps: true }
);

const feedbackAdvancedFormSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    instructions: { type: String, default: "" },
    images: { type: [String], default: [] },
    links: { type: [linkSchema], default: [] },
    startdate: { type: String, default: "" },
    enddate: { type: String, default: "" },
    status: { type: String, default: "Active", index: true },
    publicslug: { type: String, index: true },
    sections: { type: [sectionSchema], default: [] },
    user: { type: String, default: "" }
  },
  { timestamps: true }
);

feedbackAdvancedFormSchema.index({ colid: 1, publicslug: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("feedbackadvancedformds", feedbackAdvancedFormSchema);
