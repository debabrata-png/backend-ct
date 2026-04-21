const mongoose = require("mongoose");

const pucAdmissionSchema = new mongoose.Schema({

colid:{
type:String,
required:true,
index:true
},

// basic admission
applicationNo:String,
admissionNo:String,
satsNo:String,
languageCombination:String,
medium:String,
section:String,
reservationCategory:String,

// student
studentName:String,
dob:Date,
gender:String,
placeOfBirth:String,

state:String,
district:String,
taluk:String,
nationality:String,
religion:String,
caste:String,
subCaste:String,

// address
permanentAddress:String,
correspondenceAddress:String,

mobile:String,
aadhaar:String,
email:String,

// parents
fatherName:String,
motherName:String,

guardianName:String,
guardianAddress:String,

parentAnnualIncome:Number,
incomeCertificate:Boolean,

// previous school
lastSchoolName:String,
lastSchoolAddress:String,

sslcRegisterNo:String,
sslcYear:String,
sslcMonth:String,

// board details
boardType:String, // ICSE/CBSE/IGCSE
boardRegisterNo:String,

// disability
physicallyChallenged:Boolean,
blind:Boolean,
mentallyChallenged:Boolean,
documentsEnclosed:Boolean,

// language exemption
languageExemption:Boolean,
exemptedSubject1:String,
exemptedSubject2:String,
exemptionReason:String,

// sslc marks
subjects:[
{
subject:String,
marks:Number
}
],

totalMarks:Number,
percentage:Number,
result:String,

// activities
sportsActivities:String,

// PU combination
part1Lang1:String,
part1Lang2:String,

optSubject1:String,
optSubject2:String,
optSubject3:String,
optSubject4:String,

// PU medium
puMedium:String,

// undertaking
studentSignature:String,
parentSignature:String,
place:String,
date:Date,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("pucadmission",pucAdmissionSchema);