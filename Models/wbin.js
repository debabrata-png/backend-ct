const mongoose=require('mongoose');

const wbinschema = new mongoose.Schema({
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
    location: {
type: String
},
floor: {
type: String
},
bin: {
type: String
},
bintype: {
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
const wbin=mongoose.model('wbin',wbinschema);

module.exports=wbin;

