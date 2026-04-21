const mongoose=require('mongoose');

const nbaug33resultschema = new mongoose.Schema({
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
studname: {
type: String
},
regno: {
type: String
},
programname: {
type: String
},
programcode: {
type: String
},
score: {
type: Number
},
result: {
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
const nbaug33result=mongoose.model('nbaug33result',nbaug33resultschema);

module.exports=nbaug33result;

