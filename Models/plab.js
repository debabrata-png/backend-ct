const mongoose=require('mongoose');

const plabschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
admid: {
type: String
},
lab: {
type: String
},
test: {
type: String
},
finding: {
type: String
},
result: {
type: String
},
testdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const plab=mongoose.model('plab',plabschema);

module.exports=plab;

