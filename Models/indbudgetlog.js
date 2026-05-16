const mongoose = require('mongoose');

const IndBudgetLogSchema = new mongoose.Schema({
  colid: Number,
  budgetid: { type: mongoose.Schema.Types.ObjectId, ref: 'pbudget' },
  academicyear: String,
  username: String,
  useremail: String,
  department: String,
  category: String,
  categoryid: String,
  store: String,
  storeid: String,
  item: String,
  quantity: Number,
  amount: Number,
  action: String,
  oldstatus: String,
  newstatus: String,
  remarks: String,
  timeofactivity: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('indbudgetlog', IndBudgetLogSchema);
