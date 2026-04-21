const mongoose=require('mongoose');

const studparentsschema = new mongoose.Schema({
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
regno: {
type: String
},
parent: {
type: String
},
email: {
type: String
},
phone: {
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
const studparents=mongoose.model('studparents',studparentsschema);

module.exports=studparents;

