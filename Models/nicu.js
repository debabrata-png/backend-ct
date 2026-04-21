const mongoose=require('mongoose');

const nicuschema = new mongoose.Schema({
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
    title: {
type: String
},
code: {
type: String
},
location: {
type: String
},
capacity: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nicu=mongoose.model('nicu',nicuschema);

module.exports=nicu;

