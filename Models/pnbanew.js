const mongoose=require('mongoose');

const pnbanewschema = new mongoose.Schema({
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
isnba: {
type: String
},
anyother: {
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
const pnbanew=mongoose.model('pnbanew',pnbanewschema);

module.exports=pnbanew;

