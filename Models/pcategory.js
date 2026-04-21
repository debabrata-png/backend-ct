const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  colid: Number,
  categoryname: String,
}, { timestamps: true });

module.exports = mongoose.model('pcategory', CategorySchema);