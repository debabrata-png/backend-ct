const mongoose=require('mongoose');

const scholarshipsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter programcode'],
        unique: false
    },
    feegroup: {
        type: String,
        required: [true,'Please enter feegroup'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    feeeitem: {
        type: String,
        required: [true,'Please enter feeitem'],
        unique: false
    },
    academicyear: {
        type: String,
        required: [true,'Please enter academicyear'],
        unique: false
    },
    feecategory: {
        type: String,
        required: [true,'Please enter feecategory'],
        unique: false
    },
    classdate: {
        type: Date,
        required: [true,'Please enter duedate'],
        unique: false
    },
    amount: {
        type: Number,
        required: [true,'Please enter amount'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Scholarships=mongoose.model('Scholarships',scholarshipsschema);

module.exports=Scholarships;

