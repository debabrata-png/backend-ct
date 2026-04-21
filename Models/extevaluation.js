const mongoose=require('mongoose');

const extevaluationschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
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
    year: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    coursename: {
        type: String,
        required: [true,'Please enter course name '],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter course code'],
        unique: false
    },
    evaluator: {
        type: String,
        required: [true,'Please enter evaluator name'],
        unique: false
    },
    activity: {
        type: String,
        required: [true,'Please enter activity'],
        unique: false
    },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const ExtEvaluation=mongoose.model('ExtEvaluation',extevaluationschema);

module.exports=ExtEvaluation;

