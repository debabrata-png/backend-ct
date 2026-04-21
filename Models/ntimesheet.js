const mongoose=require('mongoose');

const ntimesheetschema = new mongoose.Schema({
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
    client: {
type: String
},
clientcolid: {
type: Number
},
metric: {
type: String
},
workdate: {
type: Date
},
task: {
type: String
},
timetaken: {
type: Number
},
workstatus: {
type: String
},
workcomments: {
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
const ntimesheet=mongoose.model('ntimesheet',ntimesheetschema);

module.exports=ntimesheet;

