const mongoose=require('mongoose');

const ppulibstaffschema = new mongoose.Schema({
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
    staffname: {
type: String
},
designation: {
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
const ppulibstaff=mongoose.model('ppulibstaff',ppulibstaffschema);

module.exports=ppulibstaff;

