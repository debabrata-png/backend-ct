const mongoose = require("mongoose");

const conductExamGeneratorRequirementSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    campus: { type: String, required: true, trim: true },
    building: { type: String, required: true, trim: true },
    generatorcapacity: { type: Number, required: true, default: 0 },
    fuel: { type: Number, required: true, default: 0 },
    noofgenerators: { type: Number, required: true, default: 1 },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

conductExamGeneratorRequirementSchema.index({ colid: 1, campus: 1, building: 1 }, { unique: true });

module.exports = mongoose.model("conductexamgeneratorrequirementds", conductExamGeneratorRequirementSchema);
