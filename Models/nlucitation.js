const mongoose=require('mongoose');

const nlucitationschema = new mongoose.Schema({
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
facultyname: {
type: String
},
research: {
type: String
},
agencyfund: {
type: String
},
casefileno: {
type: String
},
courtdetails: {
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
const nlucitation=mongoose.model('nlucitation',nlucitationschema);

module.exports=nlucitation;

