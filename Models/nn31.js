const mongoose=require('mongoose');

const nn31schema = new mongoose.Schema({
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
facility: {
type: String
},
Faccode: {
type: String
},
mlocation: {
type: String
},
doclink: {
type: String
},
type: {
type: String
},
level: {
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
const nn31=mongoose.model('nn31',nn31schema);

module.exports=nn31;

