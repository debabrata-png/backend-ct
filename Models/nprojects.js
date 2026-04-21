const mongoose=require('mongoose');

const nprojectsschema = new mongoose.Schema({
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
    project: {
type: String
},
task: {
type: String
},
subtask: {
type: String
},
duedate: {
type: String
},
assignedto: {
type: String
},
status: {
type: String
},
issues: {
type: String
},
dependencyid: {
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
const nprojects=mongoose.model('nprojects',nprojectsschema);

module.exports=nprojects;

