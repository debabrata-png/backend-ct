const mongoose=require('mongoose');

const pfacmasterschema = new mongoose.Schema({
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
academicyear: {
type: String
},
phd: {
type: String
},
designation: {
type: String
},
islatest: {
type: String
},
publication: {
type: String
},
book: {
type: String
},
patent: {
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
const pfacmaster=mongoose.model('pfacmaster',pfacmasterschema);

module.exports=pfacmaster;

