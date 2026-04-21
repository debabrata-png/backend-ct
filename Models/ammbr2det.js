const mongoose=require('mongoose');

const ammbr2detschema = new mongoose.Schema({
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
const ammbr2det=mongoose.model('ammbr2det',ammbr2detschema);

module.exports=ammbr2det;

