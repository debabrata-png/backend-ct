const mongoose=require('mongoose');

const doc433billsschema = new mongoose.Schema({
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
    year: {
type: String
},
asset: {
type: String
},
assetcode: {
type: String
},
buydate: {
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
const doc433bills=mongoose.model('doc433bills',doc433billsschema);

module.exports=doc433bills;

