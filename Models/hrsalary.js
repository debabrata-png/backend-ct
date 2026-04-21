const mongoose=require('mongoose');

const hrsalaryschema = new mongoose.Schema({
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
month: {
type: String
},
duedate: {
type: Date
},
structure: {
type: String
},
structureid: {
type: String
},
employee: {
type: String
},
empid: {
type: String
},
component: {
type: String
},
amount: {
type: Number
},
type: {
type: String
},
level: {
type: String
},
paystatus: {
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
const hrsalary=mongoose.model('hrsalary',hrsalaryschema);

module.exports=hrsalary;

