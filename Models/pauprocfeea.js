const mongoose=require('mongoose');

const pauprocfeeaschema = new mongoose.Schema({
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
    coursename: {
type: String
},
noofcourse: {
type: Number
},
inspecfee: {
type: Number
},
totam: {
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
const pauprocfeea=mongoose.model('pauprocfeea',pauprocfeeaschema);

module.exports=pauprocfeea;

