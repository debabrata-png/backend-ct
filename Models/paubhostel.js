const mongoose=require('mongoose');

const paubhostelschema = new mongoose.Schema({
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
    bhostel: {
type: String
},
hostelbuild: {
type: String
},
lochostel: {
type: String
},
distofcol: {
type: String
},
totadmitstrn: {
type: Number
},
blname: {
type: String
},
room: {
type: String
},
carea: {
type: Number
},
noofreqroom: {
type: Number
},
availroom: {
type: Number
},
caproom: {
type: Number
},
availcaproom: {
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
const paubhostel=mongoose.model('paubhostel',paubhostelschema);

module.exports=paubhostel;

