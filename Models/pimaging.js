const mongoose=require('mongoose');

const pimagingschema = new mongoose.Schema({
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
result: {
type: String
},
finding: {
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
const pimaging=mongoose.model('pimaging',pimagingschema);

module.exports=pimaging;

