const mongoose=require('mongoose');

const ppulandschema = new mongoose.Schema({
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
    docno: {
type: String
},
dor: {
type: String
},
surveyno: {
type: String
},
extent: {
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
const ppuland=mongoose.model('ppuland',ppulandschema);

module.exports=ppuland;

