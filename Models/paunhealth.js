const mongoose=require('mongoose');

const paunhealthschema = new mongoose.Schema({
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
    title: {
type: String
},
firstname: {
type: String
},
lastname: {
type: String
},
designation: {
type: String
},
qualification: {
type: String
},
experience: {
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
const paunhealth=mongoose.model('paunhealth',paunhealthschema);

module.exports=paunhealth;

