const mongoose = require("mongoose");

const conductExamGeneratorMasterSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    generatorcode: { type: String, required: true, trim: true },
    makemodel: { type: String, required: true, trim: true },
    suppliername: { type: String, required: true, trim: true },
    type: { type: String, enum: ["rent", "own"], required: true },
    generatorcapacity: { type: Number, required: true, default: 0 },
    status: { type: String, trim: true, default: "Active" },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

conductExamGeneratorMasterSchema.index({ colid: 1, generatorcode: 1 }, { unique: true });

module.exports = mongoose.model("conductexamgeneratormasterds", conductExamGeneratorMasterSchema);
