const mongoose=require('mongoose');

const nugrievanceschema = new mongoose.Schema({
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
studentname: {
type: String
},
typeofgrievance: {
type: String
},
routcome: {
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
const nugrievance=mongoose.model('nugrievance',nugrievanceschema);

module.exports=nugrievance;

