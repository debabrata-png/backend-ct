const mongoose = require('mongoose');

const salarySettingSchema = new mongoose.Schema({
  // Employee Information
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  colid: {
    type: Number,
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
  designation: {
    type: String,
    required: true
  },

  // Fixed Salary Components
  fixedComponents: {
    basicSalary: {
      type: String,
      required: true,
      default: '0'
    },
    hra: {
      type: String,
      default: '0'
    },
    conveyanceAllowance: {
      type: String,
      default: '0'
    },
    telephoneAllowance: {
      type: String,
      default: '0'
    },
    carAllowance: {
      type: String,
      default: '0'
    },
    fuelAllowance: {
      type: String,
      default: '0'
    },
    medicalAllowance: {
      type: String,
      default: '0'
    }
  },

  // Deduction Components
  deductionComponents: {
    pf: {
      type: String,
      default: '0'
    },
    esi: {
      type: String,
      default: '0'
    },
    incomeTax: {
      type: String,
      default: '0'
    }
  },

  // Variable Components - Dynamic array for admin-created components
  variableComponents: [{
    componentName: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true,
      default: '0'
    }
  }],

  // Calculated Fields
  grossSalary: {
    type: String,
    default: '0'
  },
  totalDeductions: {
    type: String,
    default: '0'
  },
  netSalary: {
    type: String,
    default: '0'
  },
  ctc: {
    type: String,
    default: '0'
  }

}, { timestamps: true });

// Pre-save hook to calculate totals
salarySettingSchema.pre('save', function(next) {
  const fixed = this.fixedComponents;
  const deductions = this.deductionComponents;
  const variable = this.variableComponents;

  // Calculate total fixed components
  const totalFixed = Object.values(fixed).reduce((sum, value) => {
    return sum + (parseFloat(value) || 0);
  }, 0);

  // Calculate total variable components
  const totalVariable = variable.reduce((sum, component) => {
    return sum + (parseFloat(component.amount) || 0);
  }, 0);

  // Calculate total deductions
  const totalDeductions = Object.values(deductions).reduce((sum, value) => {
    return sum + (parseFloat(value) || 0);
  }, 0);

  // Calculate gross salary (fixed + variable)
  const grossSalary = totalFixed + totalVariable;

  // Calculate net salary (gross - deductions)
  const netSalary = grossSalary - totalDeductions;

  // Calculate CTC (gross + employer contributions)
  // Assuming employer PF contribution equals employee PF
  const employerPF = parseFloat(deductions.pf) || 0;
  const employerESI = parseFloat(deductions.esi) || 0;
  const ctc = grossSalary + employerPF + employerESI;

  // Update calculated fields
  this.grossSalary = grossSalary.toFixed(2);
  this.totalDeductions = totalDeductions.toFixed(2);
  this.netSalary = netSalary.toFixed(2);
  this.ctc = ctc.toFixed(2);

  next();
});

const SalarySettingds = mongoose.model('salarysettingds', salarySettingSchema);

module.exports = SalarySettingds;
