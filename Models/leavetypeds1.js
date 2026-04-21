const mongoose = require('mongoose');

const leavetypeschema = new mongoose.Schema({
  name: { type: String }, 
  code: { type: String },
  description: { type: String },
  isactive: { type: Boolean, default: true },
  colid: {type: Number}
}, { timestamps: true });

const leavetypeds1 = mongoose.model('leavetypeds1', leavetypeschema);

module.exports = leavetypeds1;