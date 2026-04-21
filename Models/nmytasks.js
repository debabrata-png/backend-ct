const mongoose=require('mongoose');

const nmytasksschema = new mongoose.Schema({
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
    clientid: {
type: String
},
client: {
type: String
},
task: {
type: String
},
instructions: {
type: String
},
duedate: {
type: Date
},
staff: {
type: String
},
staffemail: {
type: String
},
manager: {
type: String
},
manageremail: {
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
const nmytasks=mongoose.model('nmytasks',nmytasksschema);

module.exports=nmytasks;

