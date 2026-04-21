const mongoose=require('mongoose');

const ainstschema = new mongoose.Schema({
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
    institution: {
type: String
},
address: {
type: String
},
pin: {
type: String
},
establishment: {
type: String
},
type: {
type: String
},
category: {
type: String
},
stream: {
type: String
},
autonomous: {
type: String
},
autonomyyear: {
type: String
},
autonomyvalidity: {
type: String
},
site: {
type: String
},
mobile: {
type: String
},
telephone: {
type: String
},
othertele: {
type: String
},
email: {
type: String
},
website: {
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
const ainst=mongoose.model('ainst',ainstschema);

module.exports=ainst;

