const mongoose=require('mongoose');

const kpischema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    criteria: {
        type: String
    },
    metric: {
        type: String
    },
    category: {
        type: String
    },
    target: {
        type: String
    },
    currentvalue: {
        type: Number
    },
    firstkpi: {
        type: Number
    },
    threekpi: {
        type: Number
    },
    fivekpi: {
        type: Number
    },
    submitted: {
        type: Number
    },
    accepted: {
        type: Number
    },
    flagged: {
        type: Number
    },
    faculties: {
        type: Number
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    comments: {
        type: String
    },
    type: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    intervention: {
        type: String
    },
    intowner: {
        type: String
    },
    narrative: {
        type: String
    },
    group: {
        type: String
    },
    weightage: {
        type: Number
    },
    score: {
        type: Number
    },
    gp: {
        type: Number
    },
    followupdate: {
        type: Date
    },
    status: {
        type: String
    },
    impact: {
        type: Number
    }

})
//
const Kpi=mongoose.model('Kpi',kpischema);

module.exports=Kpi;

