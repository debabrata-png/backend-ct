const mongoose=require('mongoose');

const alumniusersschema = new mongoose.Schema({
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
    alumni: {
type: String
},
address: {
type: String
},
city: {
type: String
},
country: {
type: String
},
email: {
type: String
},
phone: {
type: String
},
program: {
type: String
},
regno: {
type: String
},
batch: {
type: String
},
photo: {
    type: String
    },
username: {
type: String
},
password: {
type: String
},
paymentref: {
    type: String
    },
payamount: {
        type: Number
        },   
paydate: {
    type: Date
},
paymode: {
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
const alumniusers=mongoose.model('alumniusers',alumniusersschema);

module.exports=alumniusers;

