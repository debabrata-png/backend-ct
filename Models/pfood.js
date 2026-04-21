const mongoose=require('mongoose');

const pfoodschema = new mongoose.Schema({
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
    patient: {
type: String
},
puser: {
type: String
},
type: {
type: String
},
foodtype: {
type: String
},
amount: {
type: String
},
fooddate: {
type: Date
},
foodstatus: {
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
const pfood=mongoose.model('pfood',pfoodschema);

module.exports=pfood;

