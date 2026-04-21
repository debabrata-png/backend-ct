const mongoose=require('mongoose');

const paulanddetailsbschema = new mongoose.Schema({
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
    landext: {
type: String
},
docno: {
type: String
},
dol: {
type: Date
},
surveyno: {
type: String
},
extent: {
type: String
},
totalextland: {
type: String
},
totalextbuilt: {
type: String
},
deficiency: {
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
const paulanddetailsb=mongoose.model('paulanddetailsb',paulanddetailsbschema);

module.exports=paulanddetailsb;

