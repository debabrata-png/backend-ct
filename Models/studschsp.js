const mongoose=require('mongoose');

const studschspschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    scheme: {
        type: String,
        required: [true,'Please enter name of the scheme'],
        unique: false
    },
    noofgovstud: {
        type: String,
        required: [true,'Please enter no. of students benefitted by government scheme'],
        unique: false
    },
    amountgov: {
        type: Number,
        required: [true,'Please enter amount received from government'],
        unique: false
    },
    noofinststud: {
        type: String,
        required: [true,'Please enter no. of students benefitted by institutional scheme'],
        unique: false
    },
    amountinst: {
        type: Number,
        required: [true,'Please enter amount received from institution'],
        unique: false
    },

    noofngostud: {
        type: Number
        },
    amountngo: {
        type: Number
        },
    ngoagencyname: {
        type: String
        },
    noofinsdustrystud: {
        type: Number
        },
    amountindustry: {
        type: Number
        },
    industry: {
        type: String
        },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const StudentScholarship=mongoose.model('StudentScholarship',studschspschema);

module.exports=StudentScholarship;

