const mongoose=require('mongoose');

const nofficefacilityschema = new mongoose.Schema({
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
    natureOfwork: {
type: String
},
noOfEmp: {
type: Number
},
noOfComp: {
type: Number
},
noOfPrinters: {
type: Number
},
repFacility: {
type: String
},
noOfSafetyLocker: {
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
const nofficefacility=mongoose.model('nofficefacility',nofficefacilityschema);

module.exports=nofficefacility;

