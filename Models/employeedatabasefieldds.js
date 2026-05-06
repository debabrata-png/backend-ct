const mongoose = require("mongoose");

const employeeDatabaseFieldSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    fieldname: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    type: { type: String, default: "text", trim: true },
    options: [String],
    iseditable: { type: String, default: "Yes", trim: true },
    isrequired: { type: String, default: "No", trim: true },
    isactive: { type: String, default: "Yes", trim: true },
    order: { type: Number, default: 0 },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

employeeDatabaseFieldSchema.index({ colid: 1, fieldname: 1 }, { unique: true });

module.exports = mongoose.model("employeedatabasefieldds", employeeDatabaseFieldSchema);
