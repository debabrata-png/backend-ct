const mongoose=require('mongoose');

const pcounselcschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
admid: {
type: String
},
pdate: {
type: Date
},
discussion: {
type: String
},
ptime: {
type: String
},
doccomments: {
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
const pcounselc=mongoose.model('pcounselc',pcounselcschema);

module.exports=pcounselc;

