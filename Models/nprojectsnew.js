const mongoose=require('mongoose');

const nprojectsnewschema = new mongoose.Schema({
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
startdate: {
type: Date
},
duedate: {
type: Date
},
assignedto: {
type: String
},
status: {
type: String
},
percent: {
type: Number
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
const nprojectsnew=mongoose.model('nprojectsnew',nprojectsnewschema);

module.exports=nprojectsnew;

