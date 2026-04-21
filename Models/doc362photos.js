const mongoose=require('mongoose');

const doc362photosschema = new mongoose.Schema({
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
event: {
type: String
},
report: {
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
const doc362photos=mongoose.model('doc362photos',doc362photosschema);

module.exports=doc362photos;

