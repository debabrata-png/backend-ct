const mongoose=require('mongoose');

const ppucompfacischema = new mongoose.Schema({
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
    department: {
type: String
},
degree: {
type: String
},
program: {
type: String
},
sancstrngth: {
type: Number
},
noofterminals: {
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
const ppucompfaci=mongoose.model('ppucompfaci',ppucompfacischema);

module.exports=ppucompfaci;

