const mongoose=require('mongoose');

const nclientschema = new mongoose.Schema({
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
    name: {
type: String
},
address: {
type: String
},
state: {
type: String
},
country: {
type: String
},
gst: {
type: String
},
pan: {
type: String
},
type: {
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
const nclient=mongoose.model('nclient',nclientschema);

module.exports=nclient;

