const mongoose=require('mongoose');

const passpercentschema = new mongoose.Schema({
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
program: {
    type: String
    },
programcode: {
    type: String
     },
student: {
type: String
},
regno: {
type: String
},
ifpass: {
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
const passpercent=mongoose.model('passpercent',passpercentschema);

module.exports=passpercent;

