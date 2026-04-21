const mongoose=require('mongoose');

const empapprecschema = new mongoose.Schema({
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
staff: {
type: String
},
staffemail: {
type: String
},
remarks: {
type: String
},
reviewdate: {
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
const empapprec=mongoose.model('empapprec',empapprecschema);

module.exports=empapprec;

