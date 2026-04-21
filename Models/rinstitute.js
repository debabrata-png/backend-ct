const mongoose=require('mongoose');

const rinstituteschema = new mongoose.Schema({
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
orgname: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
type: String
},
state: {
type: String
},
taluk: {
type: String
},
pin: {
type: String
},
std: {
type: String
},
landline: {
type: String
},
fax: {
type: String
},
orgemail: {
type: String
},
orgmobile: {
type: String
},
website: {
type: String
},
establishmentyear: {
type: String
},
surveyno: {
type: String
},
isrural: {
type: String
},
isminority: {
type: String
},
minoritytype: {
type: String
},
coursename: {
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
const rinstitute=mongoose.model('rinstitute',rinstituteschema);

module.exports=rinstitute;

