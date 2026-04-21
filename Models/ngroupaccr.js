const mongoose=require('mongoose');

const ngroupaccrschema = new mongoose.Schema({
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
    group1: {
type: String
},
accreditation: {
type: String
},
qno: {
type: String
},
type: {
type: String
},
level: {
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
const ngroupaccr=mongoose.model('ngroupaccr',ngroupaccrschema);

module.exports=ngroupaccr;

