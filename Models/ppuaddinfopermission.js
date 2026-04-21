const mongoose=require('mongoose');

const ppuaddinfopermissionschema = new mongoose.Schema({
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
    type: {
type: String
},
daterefno: {
type: String
},
doa: {
type: Date
},
expdate: {
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
const ppuaddinfopermission=mongoose.model('ppuaddinfopermission',ppuaddinfopermissionschema);

module.exports=ppuaddinfopermission;

