const mongoose=require('mongoose');

const amimprovementsschema = new mongoose.Schema({
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
    observations: {
type: String
},
suggestion: {
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
const amimprovements=mongoose.model('amimprovements',amimprovementsschema);

module.exports=amimprovements;

