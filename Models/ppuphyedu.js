const mongoose=require('mongoose');

const ppuphyeduschema = new mongoose.Schema({
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
    dirname: {
type: String
},
qualiexp: {
type: String
},
noofattndr: {
type: Number
},
attndrname: {
type: String
},
totalarea: {
type: String
},
outgames: {
type: String
},
ingames: {
type: String
},
gym: {
type: String
},
funds: {
type: String
},
itemsncost: {
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
const ppuphyedu=mongoose.model('ppuphyedu',ppuphyeduschema);

module.exports=ppuphyedu;

