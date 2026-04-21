const mongoose=require('mongoose');

const phdfaceschema = new mongoose.Schema({
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
    faculty: {
type: String
},
phdyear: {
type: String
},
ifdegree: {
    type: String
    },
pgyear: {
type: String
},
qualification: {
type: String
},
department: {
type: String
},
email: {
type: String
},
empid: {
type: String
},
gender: {
type: String
},
isphd: {
    type: String
    },
category: {
    type: String
    },
joinyear: {
type: String
},
awardinginst: {
    type: String
    },
leftyear: {
type: String
},
designation: {
type: String
},
joiningdate: {
type: String
},
leavingdate: {
type: String
},
pan: {
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
const phdface=mongoose.model('phdface',phdfaceschema);

module.exports=phdface;

