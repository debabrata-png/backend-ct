const mongoose = require("mongoose");

const profileEditLogSchema = new mongoose.Schema({
  colid: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true
  },

  regno: {
    type: String,

  },

  // What was changed
  changes: [{
    fieldName: {
      type: String,
      required: true
    },
    fieldLabel: {
      type: String  // Human-readable field name
    },
    oldValue: {
      type: String
    },
    newValue: {
      type: String
    },
    category: {
      type: String,
      enum: ["Personal", "Family", "Academic", "Merit"],
      required: true
    }
  }],

  // Metadata
  changeType: {
    type: String,
    enum: ["Create", "Update", "Delete"],
    default: "Update"
  },

  // Summary
  totalFieldsChanged: {
    type: Number,
    default: 0
  },

  notes: {
    type: String
  }

}, {
  timestamps: true
});

// Compound indexes for efficient queries
profileEditLogSchema.index({ colid: 1, createdAt: -1 });
profileEditLogSchema.index({ regno: 1, createdAt: -1 });

const Profileeditlogds = mongoose.model("Profileeditlogds", profileEditLogSchema);

module.exports = Profileeditlogds;
