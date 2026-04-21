const mongoose=require('mongoose');

const alumnifeedbackschema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    name: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department']
    },
    batch: {
        type: String,
        required: [true,'Please enter batch']
    },
    feedbackdate: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    question: {
        type: String,
        required: [true,'Please enter question'],
        unique: false
    },
    option: {
        type: String,
        unique: false
    },
    
    score: {
        type: Number,
        required: [true,'Please enter score'],
        unique: false
    }
})
//
const AlumniFeedback=mongoose.model('AlumniFeedback',alumnifeedbackschema);

module.exports=AlumniFeedback;

