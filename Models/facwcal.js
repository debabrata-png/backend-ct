const mongoose=require('mongoose');

const facwcalschema = new mongoose.Schema({
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
    facultyid: {
type: String
},
faculty: {
type: String
},
wday: {
type: String
},
period: {
type: String
},
wdayp: {
type: String
},
program: {
type: String
},
course: {
type: String
},
semester: {
type: String
},
section: {
type: String
},
year: {
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
const facwcal=mongoose.model('facwcal',facwcalschema);

module.exports=facwcal;

