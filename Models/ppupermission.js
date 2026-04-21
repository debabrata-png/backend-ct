const mongoose=require('mongoose');

const ppupermissionschema = new mongoose.Schema({
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
    letterno: {
type: String
},
doi: {
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
const ppupermission=mongoose.model('ppupermission',ppupermissionschema);

module.exports=ppupermission;

