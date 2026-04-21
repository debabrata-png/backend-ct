const mongoose=require('mongoose');

const ppulabequipschema = new mongoose.Schema({
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
labname: {
type: String
},
equipname: {
type: String
},
quantity: {
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
const ppulabequip=mongoose.model('ppulabequip',ppulabequipschema);

module.exports=ppulabequip;

