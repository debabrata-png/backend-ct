const mongoose=require('mongoose');

const pputrustschema = new mongoose.Schema({
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
    trustname: {
type: String
},
trustadrs: {
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
const pputrust=mongoose.model('pputrust',pputrustschema);

module.exports=pputrust;

