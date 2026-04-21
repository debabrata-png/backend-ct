const mongoose=require('mongoose');

const lpublicationsschema = new mongoose.Schema({
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
institution: {
type: String
},
publication: {
type: String
},
issn: {
type: String
},
editor: {
type: String
},
frequency: {
type: String
},
publisher: {
type: String
},
type: {
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
const lpublications=mongoose.model('lpublications',lpublicationsschema);

module.exports=lpublications;

