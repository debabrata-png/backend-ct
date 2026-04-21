const mongoose = require('mongoose');

const grievancecategorydsschema = new mongoose.Schema({
  categoryname: {
    type: String,
  },
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
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('grievancecategoryds1', grievancecategorydsschema);
