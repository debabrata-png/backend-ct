const mongoose=require('mongoose');

const projectbalanceschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    role: {
        type: String
    },
    department: {
        type: String
    },
    type: {
        type: String
    },
    datereceived: {
        type: Date
    },
    amount: {
        type: Number
    },
    receivedin: {
        type: String
    },
    comments: {
        type: String
    },
    hod: {
        type: String
    },
    principal: {
        type: String
    },
    status: {
        type: String
    },
    projectid: {
        type: String
    },
    project: {
        type: String
    },
    year: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Projectbalance=mongoose.model('Projectbalance',projectbalanceschema);

module.exports=Projectbalance;

