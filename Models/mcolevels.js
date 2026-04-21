const mongoose=require('mongoose');

const mcolevelsschema = new mongoose.Schema({
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
    coursename: {
type: String
},
coursecode: {
type: String
},
co: {
type: String
},
level: {
type: String
},
minvalue: {
type: Number
},
maxvalue: {
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
const mcolevels=mongoose.model('mcolevels',mcolevelsschema);

module.exports=mcolevels;

