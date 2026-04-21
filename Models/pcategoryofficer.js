const mongoose = require('mongoose');

const CategoryOfficerSchema = new mongoose.Schema({
  colid: Number,

  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pcategory'
  },

  officername: String,
  email: String,

  // optional future use
  designation: String

}, { timestamps: true });

module.exports = mongoose.model('pcategoryofficer', CategoryOfficerSchema);