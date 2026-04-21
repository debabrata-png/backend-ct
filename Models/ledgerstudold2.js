const mongoose=require('mongoose');

const ledgerstudschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    feegroup: {
        type: String,
        required: [true,'Please enter feegroup'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    student: {
        type: String,
        required: [true,'Please enter student'],
        unique: false
    },
    feeitem: {
        type: String,
        required: [true,'Please enter feeitem'],
        unique: false
    },
    amount: {
        type: Number
    },
    feebook: {
        type: String
    },
    feecounter: {
        type: String
    },
    paymode: {
        type: String
    },
    paydetails: {
        type: String
    },
    feecategory: {
        type: String
    },
    semester: {
        type: String
    },
     cashbook: {
        type: String
    },
     institution: {
        type: String
    },
    type: {
        type: String
    },
    installment: {
        type: String
    },
    comments: {
        type: String
    },
    academicyear: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    classdate: {
        type: Date,
        required: [true,'Please enter paymentdate'],
        unique: false
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    },
      programcode: {
        type: String,
    },
    admissionyear: {
       type: String,
    }
})
//

// Compound indexes for reporting performance
ledgerstudschema.index({ colid: 1, academicyear: 1 });
ledgerstudschema.index({ colid: 1, programcode: 1 });
ledgerstudschema.index({ colid: 1, classdate: 1 });
ledgerstudschema.index({ colid: 1, regno: 1 });


const Ledgerstud=mongoose.model('Ledgerstud',ledgerstudschema);

module.exports=Ledgerstud;

