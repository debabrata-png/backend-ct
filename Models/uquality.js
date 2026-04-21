const mongoose=require('mongoose');

const uqualityschema = new mongoose.Schema({
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
    type: {
type: String
},
ifadopt: {
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
const uquality=mongoose.model('uquality',uqualityschema);

module.exports=uquality;

