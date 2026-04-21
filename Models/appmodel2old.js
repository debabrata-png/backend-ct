const mongoose = require('mongoose');

const applicationFormSchema = new mongoose.Schema({
  colId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  maritalStatus: { type: String },
  bloodGroup: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },

  parentName: { type: String },
  parentPhoneNumber: { type: String },
  parentAnnualIncome: { type: String },
  parentOccupation: { type: String },

  guardianName: { type: String },
  guardianPhoneNumber: { type: String },

  category: { type: String },
  caste: { type: String },
  reservedCategory: { type: String },
  religion: { type: String },

  previousQualifyingExamRegNo: { type: String },
  programOptingFor: { type: String },
  hostelRequired: { type: String },
  transportationRequired: { type: String },
  capID: { type: String },
  referenceNumber: { type: String },
  appstatus: { type: String },
  assignedto: { type: String },
  year: { type: String },

  language1: { type: String },
  language2: { type: String },
  aadhaarNumber: { type: String },

  // 10th Details
  tenthExamName: { type: String },
  tenthBoardName: { type: String },
  tenthMarks: { type: Number },
  tenthSchoolName: { type: String },
  tenthYearOfPassing: { type: String },
  tenthNoOfAttempts: { type: String },
  tenthSubjects: [{
    subjectName: { type: String },
    marksObtained: { type: String }
  }],

  // 12th Details
  twelfthExamName: { type: String },
  twelfthBoardName: { type: String },
  twelfthMarks: { type: Number },
  twelfthSchoolName: { type: String },
  twelfthYearOfPassing: { type: String },
  twelfthNoOfAttempts: { type: String },
  twelfthSubjects: [{
    subjectName: { type: String },
    marksObtained: { type: String }
  }],

  // UG Details
  institutionName: { type: String },
  universityName: { type: String },
  ugCGPA: { type: String },
  ugYearOfPassing: { type: String },
  ugNoOfChances: { type: String },
  semesters: [{
    semNo: { type: String },
    marksObtained: { type: String },
    cgpa: { type: String },
  }]
});

const applicationFormModel = mongoose.model("appmodel2", applicationFormSchema);

// export default applicationFormModel;

module.exports = applicationFormModel;
