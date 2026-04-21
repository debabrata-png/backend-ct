const mongoose=require('mongoose');

const admusersschema = new mongoose.Schema({
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
    student: {
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
refer: {
type: String
},
referuser: {
type: String
},
username: {
type: String
},
password: {
type: String
},
photo: {
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
const admusers=mongoose.model('admusers',admusersschema);

module.exports=admusers;

