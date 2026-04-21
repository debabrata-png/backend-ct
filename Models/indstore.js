const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  colid: Number,
  storename: String,
}, { timestamps: true });

module.exports = mongoose.model('indstore', StoreSchema);