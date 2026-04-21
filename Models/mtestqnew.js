const mongoose=require('mongoose');

const mtestqnewschema = new mongoose.Schema({
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
    testid: {
type: String
},
sectionid: {
type: String
},
question: {
type: String
},
optiona: {
type: String
},
optionb: {
type: String
},
optionc: {
type: String
},
optiond: {
type: String
},
correcta: {
type: String
},
type: {
type: String
},
level: {
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
const mtestqnew=mongoose.model('mtestqnew',mtestqnewschema);

module.exports=mtestqnew;

