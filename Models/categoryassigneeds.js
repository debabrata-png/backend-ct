const mongoose = require('mongoose');

const categoryassigneedsschema = new mongoose.Schema({
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
  categoryname: {
    type: String,
  },
  assignees: {
    type: [String], // Array of user emails/names
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('categoryassigneeds', categoryassigneedsschema);
