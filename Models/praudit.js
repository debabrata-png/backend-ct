const mongoose=require('mongoose');

const prauditschema = new mongoose.Schema({
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
    pr: {
type: String
},
prid: {
type: String
},
faculty: {
type: String
},
facultyid: {
type: String
},
activitydate: {
type: Date
},
activity: {
type: String
},
type: {
type: String
},
level: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const praudit=mongoose.model('praudit',prauditschema);

module.exports=praudit;

