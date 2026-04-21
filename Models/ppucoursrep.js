const mongoose=require('mongoose');

const ppucoursrepschema = new mongoose.Schema({
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
    ifbreak: {
type: String
},
brkdetails: {
type: String
},
instful: {
type: String
},
ifcomplrep: {
type: String
},
complrepdetails: {
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
const ppucoursrep=mongoose.model('ppucoursrep',ppucoursrepschema);

module.exports=ppucoursrep;

