const mongoose = require('mongoose');

const facregistrationdsschema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String },
  confirmemail: { type: String },
  mobilenumber: { type: String },
  confirmmobilenumber: { type: String },
  alternatemobilenumber: { type: String },
  gender: { type: String },
  photograph: { type: String },
  signature: { type: String },
  facultytype: { type: String },
  valuatortype: { type: String },
  teachingexperienceyears: { type: Number },
  teachingexperiencemonths: { type: Number },
  designation: { type: String },
  institution: { type: String },
  dateofjoining: { type: Date },
  dateofexit: { type: Date },
  medicaldentalcouncilid: { type: String },
  specialization: { type: String },
  subjectstaughtarr: { type: [String] },
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
    required: [true, 'Please provide college id']
  },
  password: { 
    type: String,
    required: [true, 'Please enter password']
  },
  
  // Meta fields
  status: { type: String },
  createdby: { type: String },
  createddate: { 
    type: Date,
    default: Date.now
  },
  updatedby: { type: String },
  updateddate: { type: Date },
  comments: { type: String }
});

const FacRegistrationDs = mongoose.model('FacRegistrationDs', facregistrationdsschema);
module.exports = FacRegistrationDs;
