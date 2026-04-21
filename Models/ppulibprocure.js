const mongoose=require('mongoose');

const ppulibprocureschema = new mongoose.Schema({
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
    ifprocured: {
type: String
},
dop: {
type: String
},
ordercopy: {
type: String
},
noofcopy: {
type: Number
},
noofaddbook: {
type: Number
},
noofaddjournal: {
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
const ppulibprocure=mongoose.model('ppulibprocure',ppulibprocureschema);

module.exports=ppulibprocure;

