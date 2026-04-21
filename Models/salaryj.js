const mongoose = require('mongoose');

const salaryschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  colid: {
    type: Number,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['deduction', 'bonus', 'salary_payment', 'adjustment'],
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  basicPay: {
    type: Number,
    required: true
  },
  allowances: {
    type: Number,
    required: true
  },
  deductions: {
    type: Number,
    required: true
  },
  grossSalary: {
    type: Number,
    required: true
  },
  netSalary: {
    type: Number,
    required: true
  },
  month: {
    type: Number, // 1-12
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    default: null // from bank/payment gateway
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'completed'
  }
}, { timestamps: true });

const Salary = mongoose.model('Salary', salaryschema);
module.exports = Salary;
