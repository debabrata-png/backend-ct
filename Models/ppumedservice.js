const mongoose=require('mongoose');

const ppumedserviceschema = new mongoose.Schema({
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
    doctorname: {
type: String
},
qualification: {
type: String
},
spclz: {
type: String
},
address: {
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
const ppumedservice=mongoose.model('ppumedservice',ppumedserviceschema);

module.exports=ppumedservice;

