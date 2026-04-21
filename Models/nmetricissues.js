const mongoose=require('mongoose');

const nmetricissuesschema = new mongoose.Schema({
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
    criteria: {
type: String
},
metric: {
type: String
},
category: {
type: String
},
department: {
type: String
},
issues: {
type: String
},
datechecked: {
type: Date
},
status: {
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
const nmetricissues=mongoose.model('nmetricissues',nmetricissuesschema);

module.exports=nmetricissues;

