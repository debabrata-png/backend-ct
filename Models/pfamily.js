const mongoose=require('mongoose');

const pfamilyschema = new mongoose.Schema({
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
admid: {
type: String
},
family: {
type: String
},
illness: {
type: String
},
duration: {
type: String
},
relation: {
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
const pfamily=mongoose.model('pfamily',pfamilyschema);

module.exports=pfamily;

