const mongoose=require('mongoose');

const leaveapplyschema = new mongoose.Schema({
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
    level: {
        type: Number
    },
    approveremail: {
        type: String
    },
    type: {
        type: String
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
    noofdays: {
        type: Number
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
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Leaveapply=mongoose.model('Leaveapply',leaveapplyschema);

module.exports=Leaveapply;

