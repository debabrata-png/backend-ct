const mongoose=require('mongoose');

const rnadministrativeschema = new mongoose.Schema({
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
availability: {
type: String
},
sizeinsqft: {
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
const rnadministrative=mongoose.model('rnadministrative',rnadministrativeschema);

module.exports=rnadministrative;

