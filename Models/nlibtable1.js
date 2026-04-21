const mongoose=require('mongoose');

const nlibtable1schema = new mongoose.Schema({
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
    yrBudget: {
type: Number
},
totArea: {
type: Number
},
arReadingRoom: {
type: Number
},
noOfRacks: {
type: Number
},
noOfComp: {
type: Number
},
noOfCompWithInternet: {
type: Number
},
internetCon: {
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
const nlibtable1=mongoose.model('nlibtable1',nlibtable1schema);

module.exports=nlibtable1;

