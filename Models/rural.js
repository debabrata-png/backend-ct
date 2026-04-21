const mongoose=require('mongoose');

const ruralschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    urban: {
        type: Number,
        required: [true,'Please enter no.of urban enrollment '],
        unique: false
    },
    rural: {
        type: Number,
        required: [true,'Please enter no.of rural enrollment'],
        unique: false
    },
    total: {
        type: Number,
        required: [true,'Please enter total no.of enrollment'],
        unique: false
    },
    

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const RuralLearners=mongoose.model('RuralLearners',ruralschema);

module.exports=RuralLearners;

