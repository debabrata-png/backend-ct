const mongoose=require('mongoose');

const aequipmentsschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
equipment: {
type: String
},
type: {
type: String
},
required: {
type: Number
},
available: {
type: Number
},
deficiency: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const aequipments=mongoose.model('aequipments',aequipmentsschema);

module.exports=aequipments;

