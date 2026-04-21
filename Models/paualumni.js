const mongoose=require('mongoose');

const paualumnischema = new mongoose.Schema({
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
    item: {
type: String
},
avail: {
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
const paualumni=mongoose.model('paualumni',paualumnischema);

module.exports=paualumni;

