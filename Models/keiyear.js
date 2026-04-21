const mongoose=require('mongoose');

const keiyearschema = new mongoose.Schema({
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
yearstatus: {
type: String
},
role: {
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
const keiyear=mongoose.model('keiyear',keiyearschema);

module.exports=keiyear;

