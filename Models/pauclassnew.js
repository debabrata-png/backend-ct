const mongoose=require('mongoose');

const pauclassnewschema = new mongoose.Schema({
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
    classroom: {
type: String
},
area: {
type: Number
},
latitude: {
type: String
},
longitude: {
type: String
},
capacity: {
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
const pauclassnew=mongoose.model('pauclassnew',pauclassnewschema);

module.exports=pauclassnew;

