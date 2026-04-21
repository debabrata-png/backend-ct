const mongoose=require('mongoose');

const pputechstaffschema = new mongoose.Schema({
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
    staffname: {
type: String
},
designation: {
type: String
},
eduqualif: {
type: String
},
dob: {
type: Date
},
doj: {
type: Date
},
payscale: {
type: String
},
emoluments: {
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
const pputechstaff=mongoose.model('pputechstaff',pputechstaffschema);

module.exports=pputechstaff;

