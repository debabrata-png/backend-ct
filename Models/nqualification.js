const mongoose=require('mongoose');

const nqualificationschema = new mongoose.Schema({
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
    qualification: {
type: String
},
college: {
type: String
},
university: {
type: String
},
year: {
type: String
},
regno: {
type: String
},
council: {
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
const nqualification=mongoose.model('nqualification',nqualificationschema);

module.exports=nqualification;

