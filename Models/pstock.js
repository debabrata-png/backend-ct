const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  colid: Number,
  storeid: mongoose.Schema.Types.ObjectId,
  categoryid: mongoose.Schema.Types.ObjectId,
  itemname: String,
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('pstock', StockSchema);