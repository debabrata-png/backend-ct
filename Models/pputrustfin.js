const mongoose=require('mongoose');

const pputrustfinschema = new mongoose.Schema({
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
    banker: {
type: String
},
branch: {
type: String
},
accno: {
type: String
},
balonye: {
type: String
},
balondate: {
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
const pputrustfin=mongoose.model('pputrustfin',pputrustfinschema);

module.exports=pputrustfin;

