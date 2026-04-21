const mongoose=require('mongoose');

const doc712photosschema = new mongoose.Schema({
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
    facility: {
type: String
},
link: {
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
const doc712photos=mongoose.model('doc712photos',doc712photosschema);

module.exports=doc712photos;

