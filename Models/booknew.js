const mongoose=require('mongoose');

const booknewschema = new mongoose.Schema({
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
    name: {
type: String
},
booktitle: {
type: String
},
papertitle: {
type: String
},
proceeding: {
type: String
},
yop: {
type: String
},
issn: {
type: String
},
publisher: {
type: String
},
affiliated: {
type: String
},
conferencename: {
type: String
},
level: {
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
const booknew=mongoose.model('booknew',booknewschema);

module.exports=booknew;

