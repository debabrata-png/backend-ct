const mongoose=require('mongoose');

const deptasksschema = new mongoose.Schema({
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
type: String
},
task: {
type: String
},
eventdate: {
type: Date
},
isactive: {
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
const deptasks=mongoose.model('deptasks',deptasksschema);

module.exports=deptasks;

