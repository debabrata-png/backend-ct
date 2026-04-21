const mongoose=require('mongoose');

const admlanguagesschema = new mongoose.Schema({
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
    language: {
type: String
},
readskills: {
type: String
},
writeskills: {
type: String
},
speakskills: {
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
const admlanguages=mongoose.model('admlanguages',admlanguagesschema);

module.exports=admlanguages;

