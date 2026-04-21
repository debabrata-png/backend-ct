const mongoose=require('mongoose');

const amequipmentsschema = new mongoose.Schema({
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
    equipment: {
type: String
},
category: {
type: String
},
make: {
type: String
},
modelno: {
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
const amequipments=mongoose.model('amequipments',amequipmentsschema);

module.exports=amequipments;

