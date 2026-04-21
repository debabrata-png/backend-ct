const mongoose=require('mongoose');

const wspill1schema = new mongoose.Schema({
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
    location: {
type: String
},
type: {
type: String
},
binid: {
type: String
},
spilldetails: {
type: String
},
spilldate: {
type: Date
},
spilltime: {
type: String
},
actiontaken: {
type: String
},
status: {
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
const wspill1=mongoose.model('wspill1',wspill1schema);

module.exports=wspill1;

