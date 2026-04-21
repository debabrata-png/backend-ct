const mongoose=require('mongoose');

const nn23schema = new mongoose.Schema({
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
designation: {
type: String
},
year: {
type: String
},
gender: {
type: String
},
state1: {
type: String
},
state2: {
type: String
},
country: {
type: String
},
foreigner: {
type: String
},
category1: {
type: String
},
category2: {
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
const nn23=mongoose.model('nn23',nn23schema);

module.exports=nn23;

