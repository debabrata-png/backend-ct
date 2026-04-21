const mongoose=require('mongoose');

const doc716greeenschema = new mongoose.Schema({
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
reportdate: {
type: String
},
validtilldate: {
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
const doc716greeen=mongoose.model('doc716greeen',doc716greeenschema);

module.exports=doc716greeen;

