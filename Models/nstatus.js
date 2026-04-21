const mongoose=require('mongoose');

const nstatusschema = new mongoose.Schema({
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
    criteria: {
type: String
},
metric: {
type: String
},
department: {
type: String
},
lastchecked: {
type: Date
},
status: {
type: String
},
issues: {
type: String
},
nextct: {
type: String
},
nextins: {
type: String
},
targetct: {
type: Date
},
targetins: {
type: Date
},
plandate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nstatus=mongoose.model('nstatus',nstatusschema);

module.exports=nstatus;

