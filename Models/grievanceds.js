const mongoose = require('mongoose');

const grievancedsschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  colid: {
    type: Number,
    required: true,
  },
  regno: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  priority: {
    type: String,
  },
  status: {
    type: Number,
  },
  assignedTo: {
    type: [String], 
  },
  progress: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  resolvedDate: {
    type: Date,
  },
});

module.exports = mongoose.model('grievanceds', grievancedsschema);
