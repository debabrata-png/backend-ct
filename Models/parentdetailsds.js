const mongoose = require('mongoose');

const parentdetailsdsschema = new mongoose.Schema({
  parentname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  studentname: { type: String, required: true },
  regno: { type: String, required: true },
  user: { type: String, required: true }, // email of warden who added
  username: { type: String, required: true }, // name of warden who added
  colid: { type: Number, required: true }
}, { timestamps: true });

const parentdetailsds = mongoose.model('parentdetailsds', parentdetailsdsschema);

module.exports = parentdetailsds;
