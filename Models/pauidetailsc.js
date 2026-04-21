const mongoose=require('mongoose');

const pauidetailscschema = new mongoose.Schema({
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
    ifsectwof: {
type: String
},
letternotwof: {
type: String
},
dtwof: {
type: Date
},
ifsectwlfb: {
type: String
},
letternotwlfb: {
type: String
},
dtwlfb: {
type: Date
},
otheraccrd: {
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
const pauidetailsc=mongoose.model('pauidetailsc',pauidetailscschema);

module.exports=pauidetailsc;

