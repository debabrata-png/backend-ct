const mongoose=require('mongoose');

const alumnieventsschema = new mongoose.Schema({
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
    event: {
type: String
},
startdate: {
type: Date
},
enddate: {
type: String
},
description: {
type: String
},
location: {
type: String
},
registration: {
type: String
},
mode: {
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
const alumnievents=mongoose.model('alumnievents',alumnieventsschema);

module.exports=alumnievents;

