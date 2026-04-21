const mongoose=require('mongoose');

const rtrustschema = new mongoose.Schema({
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
orgtype: {
type: String
},
orgname: {
type: String
},
president: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
type: String
},
state: {
type: String
},
taluk: {
type: String
},
pin: {
type: String
},
std: {
type: String
},
landline: {
type: String
},
fax: {
type: String
},
orgemail: {
type: String
},
orgmobile: {
type: String
},
orgregno: {
type: String
},
orgregdate: {
type: Date
},
amedment: {
type: String
},
othercollege: {
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
const rtrust=mongoose.model('rtrust',rtrustschema);

module.exports=rtrust;

