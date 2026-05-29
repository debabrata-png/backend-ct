const mongoose = require('mongoose');

const universalpaymentgatewaydsschema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please enter name'] 
  },
  user: { 
    type: String, 
    required: [true, 'Please enter user'] 
  },
  colid: { 
    type: Number, 
    required: [true, 'Please enter colid'] 
  },
  studentname: { 
    type: String, 
    required: [true, 'Please enter student name'] 
  },
  regno: { 
    type: String, 
    required: [true, 'Please enter regno'] 
  },
  studentemail: { 
    type: String 
  },
  studentphone: { 
    type: String 
  },
  orderid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  txnid: { 
    type: String 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['INITIATED', 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'], 
    default: 'INITIATED' 
  },
  gatewayname: { 
    type: String, 
    required: true 
  },
  accountno: { 
    type: String 
  },
  paymenttype: { 
    type: String 
  },
  paymentpurpose: { 
    type: String 
  },
  type: {
    type: String
  },
  ledgerid: {
    type: String
  },
  ledgerbalance: {
    type: Number
  },
  feegroup: {
    type: String
  },
  feeitem: {
    type: String
  },
  feecategory: {
    type: String
  },
  semester: {
    type: String
  },
  installment: {
    type: String
  },
  academicyear: {
    type: String
  },
  classdate: {
    type: Date
  },
  ledgerdetails: {
    type: mongoose.Schema.Types.Mixed
  },
  gatewayresponse: { 
    type: mongoose.Schema.Types.Mixed 
  },
  initiatedat: { 
    type: Date, 
    default: Date.now 
  },
  completedat: { 
    type: Date 
  },
  frontendcallbackurl: {
    type: String
  }
}, { timestamps: true });


universalpaymentgatewaydsschema.index({ colid: 1, regno: 1 });
universalpaymentgatewaydsschema.index({ gatewayname: 1 });
universalpaymentgatewaydsschema.index({ ledgerid: 1 });

const universalpaymentgatewayds = mongoose.models.universalpaymentgatewayds || mongoose.model('universalpaymentgatewayds', universalpaymentgatewaydsschema);
module.exports = universalpaymentgatewayds;
