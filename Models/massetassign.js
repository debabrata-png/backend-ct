const mongoose=require('mongoose');

const massetassignschema = new mongoose.Schema({
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
assetid: {
type: String
},
asset: {
type: String
},
username: {
type: String
},
assigndate: {
type: Date
},
returndate: {
type: Date
},
assetstatus: {
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
const massetassign=mongoose.model('massetassign',massetassignschema);

module.exports=massetassign;

