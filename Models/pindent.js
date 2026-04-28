const mongoose = require('mongoose');

const IndentSchema = new mongoose.Schema({
  colid: Number,

  storeid: { type: mongoose.Schema.Types.ObjectId, ref: 'pstore' },
  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'pcategory' },

  itemname: String,

  quantity: Number,

  budgetid: { type: mongoose.Schema.Types.ObjectId, ref: 'pbudget' },

   department: String,
  institution: String,
  name: String,
  user: String,

   department: String,
  institution: String,
  name: String,
  user: String,
  description: String,
  institution: String,

  status: {
    type: String,
    default: 'HOD_PENDING'
  },

  remarks: String

}, { timestamps: true });

module.exports = mongoose.model('pindent', IndentSchema);