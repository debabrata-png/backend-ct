const mongoose=require('mongoose');

const nmeetingtasksschema = new mongoose.Schema({
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
    department: {
type: String
},
meetingid: {
type: String
},
year: {
type: String
},
host: {
type: String
},
hostemail: {
type: String
},
hostphone: {
type: String
},
duedate: {
type: Date
},
task: {
type: String
},
comments: {
type: String
},
status: {
type: String
},
issues: {
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
const nmeetingtasks=mongoose.model('nmeetingtasks',nmeetingtasksschema);

module.exports=nmeetingtasks;

