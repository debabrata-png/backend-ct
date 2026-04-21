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
    gender: { type: String },
    nationality: { type: String, default: "Indian" },
    religion: { type: String },
    category: { type: String },
    caste: { type: String },
    subCaste: { type: String },
    reservedCategory: { type: String },
    isDivyangan: { type: String, default: "No" },
    aadhaarNumber: { type: String },
    motherTongue: { type: String },

    // --- FAMILY DETAILS ---
    fatherName: { type: String },
    fatherEducation: { type: String },
    fatherOccupation: { type: String },
    fatherIncome: { type: String },
    fatherPhone: { type: String },
    fatherEmail: { type: String },
    fatherAddress: { type: String },
    fatherOfficialAddress: { type: String },

    motherName: { type: String },
    motherEducation: { type: String },
    motherOccupation: { type: String },
    motherIncome: { type: String },
    motherPhone: { type: String },
    motherEmail: { type: String },
    motherAddress: { type: String },
    motherOfficialAddress: { type: String },

    guardianName: { type: String },
    guardianPhoneNumber: { type: String },
    singleChild: { type: String },
    siblingName: { type: String },

    // --- ACADEMIC CHOICES ---
    programOptingFor: { type: String },
    programAppliedFor: {
        type: String,
    },
    disciplineSpecificCore: { type: String },
    languagesChosen: { type: [String] },
    language1: { type: String },
    language2: { type: String },
    hostelRequired: { type: String },
    transportationRequired: { type: String },

    // --- 10th DETAILS ---
    tenthExamName: { type: String },
    tenthBoardName: { type: String },
    tenthMarks: { type: Number },
    tenthSchoolName: { type: String },
    tenthYearOfPassing: { type: String },
    tenthNoOfAttempts: { type: String },
    tenthSubjects: [
        {
            subjectName: { type: String },
            marksObtained: { type: String },
        },
    ],

    // --- 12th DETAILS ---
    twelfthExamName: { type: String },
    twelfthBoardName: { type: String },
    twelfthRegNo: { type: String },
    twelfthMarks: { type: Number },
    twelfthSchoolName: { type: String },
    twelfthYearOfPassing: { type: String },
    twelfthNoOfAttempts: { type: String },
    twelfthSubjects: [
        {
            subjectName: { type: String },
            marksObtained: { type: String },
        },
    ],

    // --- UG DETAILS ---
    institutionName: { type: String },
    universityName: { type: String },
    ugCGPA: { type: String },
    ugYearOfPassing: { type: String },
    ugNoOfChances: { type: String },
    semesters: [
        {
            semNo: { type: String },
            marksObtained: { type: String },
            cgpa: { type: String },
        },
    ],

    // --- REGISTRATION & STATUS ---
    capID: { type: String },
    referenceNumber: { type: String },
    appstatus: { type: String, default: "Pending" },
    status: { type: String, enum: ["Approved", "Pending", "Rejected"], default: "Pending" },
    assignedto: { type: String },
    year: { type: String },
    bankAcno: { type: String },
    diseCode: { type: String },
    transfercertificateNum: { type: String },
    dateOfissue: { type: String },

    // --- NESTED LOCATIONS ---
    placeOfBirth: {
        villageTown: { type: String },
        taluk: { type: String },
        district: { type: String },
        state: { type: String },
    },
});

const applicationFormModel = mongoose.model("appmodel2", applicationFormSchema);

// export default applicationFormModel;

module.exports = applicationFormModel;
