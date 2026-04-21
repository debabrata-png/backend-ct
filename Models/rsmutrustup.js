const mongoose=require('mongoose');

const rsmutrustupschema = new mongoose.Schema({
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
    trustname: {
type: String
},
address: {
type: String
},
district: {
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
chairemail: {
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
const rsmutrustup=mongoose.model('rsmutrustup',rsmutrustupschema);

module.exports=rsmutrustup;

