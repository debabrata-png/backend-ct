const mongoose=require('mongoose');

const noffscholarshipschema = new mongoose.Schema({
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
agency: {
type: String
},
scholarship: {
type: String
},
amount: {
type: Number
},
type: {
type: String
},
currentprogram: {
type: String
},
student: {
type: String
},
department: {
type: String
},
studentregno: {
type: String
},
studentcontact: {
type: String
},
selectiondate: {
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
const noffscholarship=mongoose.model('noffscholarship',noffscholarshipschema);

module.exports=noffscholarship;

