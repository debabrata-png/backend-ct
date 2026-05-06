const mongoose = require("mongoose");

const employeeDatabaseSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    employeeid: { type: String, required: true, trim: true },
    login: { type: String, trim: true },
    institution: { type: String, trim: true },
    department: { type: String, trim: true },
    customFields: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, default: "Active", trim: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

employeeDatabaseSchema.index({ colid: 1, employeeid: 1 }, { unique: true });
employeeDatabaseSchema.index({ colid: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("employeedatabaseds", employeeDatabaseSchema);
