const mongoose=require('mongoose');

const doc712permissionschema = new mongoose.Schema({
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
agency: {
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
const doc712permission=mongoose.model('doc712permission',doc712permissionschema);

module.exports=doc712permission;

