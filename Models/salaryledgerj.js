const mongoose = require('mongoose');

const salaryledgerschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    colid: { type: Number },
    basicPay: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    grossSalary: { type: Number, default: 0 },

    attendanceDeductions: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },

    netSalary: { type: Number, default: 0 },
    transactionType: { type: String },
    description: { type: String },
    amount: { type: Number },

    month: { type: Number, required: true },
    year: { type: Number, required: true },
    deductionReasons: [{ type: String }],

    salary: { type: mongoose.Schema.Types.ObjectId, ref: 'Salary' },

    // 👇 New fields to store slip PDF
    slip: { type: Buffer },
    slipContentType: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SalaryLedger', salaryledgerschema);
