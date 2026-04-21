const mongoose=require('mongoose');

const rnothercschema = new mongoose.Schema({
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
program: {
type: String
},
offerstatus: {
type: String
},
notificationno: {
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
const rnotherc=mongoose.model('rnotherc',rnothercschema);

module.exports=rnotherc;

