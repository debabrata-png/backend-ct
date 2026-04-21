const mongoose=require('mongoose');

const evguestsschema = new mongoose.Schema({
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
    eventid: {
type: String
},
event: {
type: String
},
guest: {
type: String
},
email: {
type: String
},
phone: {
type: String
},
designation: {
type: String
},
institute: {
type: String
},
address: {
type: String
},
country: {
type: String
},
username: {
type: String
},
password: {
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
const evguests=mongoose.model('evguests',evguestsschema);

module.exports=evguests;

