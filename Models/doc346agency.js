const mongoose=require('mongoose');

const doc346agencyschema = new mongoose.Schema({
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
faculty: {
type: String
},
agency: {
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
const doc346agency=mongoose.model('doc346agency',doc346agencyschema);

module.exports=doc346agency;

