const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  colid: Number,
  academicyear: String,

  storeid: { type: mongoose.Schema.Types.ObjectId, ref: 'pstore' },
  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'pcategory' },

  // 🔥 NEW FIELD
  itemname: String,

  quantity: Number,
  price: Number,

  quantityremaining: Number,
  priceremaining: Number,

  department: String,
  institution: String,

  status: {
    type: String,
    default: 'HOD_PENDING'
  },

  remarks: String

}, { timestamps: true });

module.exports = mongoose.model('pbudget', BudgetSchema);
