const mongoose=require('mongoose');

const pauprocfeebschema = new mongoose.Schema({
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
    amount: {
type: Number
},
utrno: {
type: String
},
dof: {
type: Date
},
bankname: {
type: String
},
branch: {
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
const pauprocfeeb=mongoose.model('pauprocfeeb',pauprocfeebschema);

module.exports=pauprocfeeb;

