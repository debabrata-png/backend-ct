const mongoose=require('mongoose');

const doc714billsschema = new mongoose.Schema({
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
facility: {
type: String
},
billdate: {
type: Date
},
groupbill: {
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
const doc714bills=mongoose.model('doc714bills',doc714billsschema);

module.exports=doc714bills;

