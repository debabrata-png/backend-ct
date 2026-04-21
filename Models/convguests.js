const mongoose=require('mongoose');

const convguestsschema = new mongoose.Schema({
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
guest: {
type: String
},
designation: {
type: String
},
organization: {
type: String
},
type: {
type: String
},
source: {
type: String
},
convday: {
type: String
},
attenddate: {
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
const convguests=mongoose.model('convguests',convguestsschema);

module.exports=convguests;

