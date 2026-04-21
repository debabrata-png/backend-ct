const mongoose=require('mongoose');

const rmsutrustdatacngschema = new mongoose.Schema({
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
    trusthead: {
type: String
},
trustname: {
type: String
},
address: {
type: String
},
address2: {
type: String
},
regno: {
type: String
},
dateofreg: {
type: Date
},
chairmanname: {
type: String
},
fathername: {
type: String
},
email: {
type: String
},
mobno: {
type: Number
},
restelno: {
type: Number
},
trustemail: {
type: String
},
trustno: {
type: Number
},
offtelno: {
type: Number
},
faxno: {
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
const rmsutrustdatacng=mongoose.model('rmsutrustdatacng',rmsutrustdatacngschema);

module.exports=rmsutrustdatacng;

