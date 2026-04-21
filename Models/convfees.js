const mongoose=require('mongoose');

const convfeesschema = new mongoose.Schema({
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
convid: {
type: String
},
convocation: {
type: String
},
program: {
type: String
},
category: {
type: String
},
fees: {
type: Number
},
type: {
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
const convfees=mongoose.model('convfees',convfeesschema);

module.exports=convfees;

