const mongoose = require('mongoose');

const salarySlipSchema = new mongoose.Schema({
  // Employee Information
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  empname: {
    type: String,
    required: true
  },
  empemail: {
    type: String,
    required: true
  },
  colid: {
    type: Number,
    required: true
  },
  designation: {
    type: String,
    required: true
  },

  // Pay Period
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },

  // Attendance Data
  workingDays: {
    type: Number,
    required: true
  },
  presentDays: {
    type: Number,
    required: true
  },
  absentDays: {
    type: Number,
    default: 0
  },
  lateDays: {
    type: Number,
    default: 0
  },

  // Fixed Components (from salary settings)
  fixedComponents: {
    basicSalary: { type: String, default: '0' },
    hra: { type: String, default: '0' },
    conveyanceAllowance: { type: String, default: '0' },
    telephoneAllowance: { type: String, default: '0' },
    carAllowance: { type: String, default: '0' },
    fuelAllowance: { type: String, default: '0' },
    medicalAllowance: { type: String, default: '0' }
  },

  // Variable Components (from salary settings)
  variableComponents: [{
    componentName: { type: String, required: true },
    amount: { type: String, required: true, default: '0' }
  }],

  // Deductions
  deductionComponents: {
    pf: { type: String, default: '0' },
    esi: { type: String, default: '0' },
    incomeTax: { type: String, default: '0' }
  },

  // Additional deductions due to attendance
  attendanceDeductions: {
    leaveDeduction: { type: String, default: '0' },
    lateDeduction: { type: String, default: '0' },
    absentDeduction: { type: String, default: '0' }
  },

  // Calculated Amounts
  grossSalary: {
    type: String,
    required: true
  },
  totalDeductions: {
    type: String,
    required: true
  },
  netSalary: {
    type: String,
    required: true
  },
  ctc: {
    type: String,
    required: true
  },

  // Status
  status: {
    type: String,
    enum: ['draft', 'processed', 'sent'],
    default: 'draft'
  }

}, { timestamps: true });

const SalarySlipds = mongoose.model('salaryslipds', salarySlipSchema);

module.exports = SalarySlipds;
