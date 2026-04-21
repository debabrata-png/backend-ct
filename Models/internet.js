const mongoose=require('mongoose');

const internetschema = new mongoose.Schema({
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
    provider: {
type: String
},
programname: {
type: String
},
programcode: {
type: String
},
bandwidth: {
type: String
},
wifi: {
type: String
},
internetaccess: {
type: String
},
cybersecurity: {
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
const internet=mongoose.model('internet',internetschema);

module.exports=internet;

