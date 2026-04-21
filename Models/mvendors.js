const mongoose=require('mongoose');

const mvendorsschema = new mongoose.Schema({
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
    vendor: {
type: String
},
address: {
type: String
},
pan: {
type: String
},
gst: {
type: String
},
state: {
type: String
},
type: {
type: String
},
apprstatus: {
type: String
},
doclink: {
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
const mvendors=mongoose.model('mvendors',mvendorsschema);

module.exports=mvendors;

