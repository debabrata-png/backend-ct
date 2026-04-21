const mongoose = require('mongoose');

const facbankdsschema = new mongoose.Schema({
  accountnumber: { type: String },
  confirmbankaccountnumber: { type: String },
  accountholdername: { type: String },
  bankname: { type: String },
  ifsccode: { type: String },
  confirmifsccode: { type: String },
  branchname: { type: String },
  pannumber: { type: String },
  pancard: { type: String },
  
  // Required fields
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
    required: [true, 'Please enter college id']
  },
  
  createddate: { 
    type: Date,
    default: Date.now
  },
  updateddate: { type: Date }
});

const FacBankDs = mongoose.model('FacBankDs', facbankdsschema);
module.exports = FacBankDs;
