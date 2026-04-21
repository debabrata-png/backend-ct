const mongoose=require('mongoose');

const ppubuildingschema = new mongoose.Schema({
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
    description: {
type: String
},
size: {
type: String
},
quantity: {
type: Number
},
rooftype: {
type: String
},
amendetail: {
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
const ppubuilding=mongoose.model('ppubuilding',ppubuildingschema);

module.exports=ppubuilding;

