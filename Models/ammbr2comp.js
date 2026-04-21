const mongoose=require('mongoose');

const ammbr2compschema = new mongoose.Schema({
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
collegeid: {
type: Number
},
college: {
type: String
},
item: {
type: String
},
compliance: {
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
const ammbr2comp=mongoose.model('ammbr2comp',ammbr2compschema);

module.exports=ammbr2comp;

