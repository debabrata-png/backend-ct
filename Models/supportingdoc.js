const mongoose=require('mongoose');

const supportingdocschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    field1: {
        type: String
    },
    link: {
        type: String
    },
    filename: {
        type: String
    },
    classdate: {
        type: Date
    },
    criteria: {
        type: String
    },
    metric: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    collection1: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Supportingdoc=mongoose.model('Supportingdoc',supportingdocschema);

module.exports=Supportingdoc;

