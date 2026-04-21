const mongoose=require('mongoose');

const employmentallschema = new mongoose.Schema({
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
    company: {
type: String
},
designation: {
type: String
},
fromdate: {
type: Date
},
todate: {
type: Date
},
totalexp: {
type: Number
},
location: {
type: String
},
manager: {
type: String
},
mphone: {
type: String
},
memail: {
type: String
},
hr: {
type: String
},
hremail: {
type: String
},
hrphone: {
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
const employmentall=mongoose.model('employmentall',employmentallschema);

module.exports=employmentall;

