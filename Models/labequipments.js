const mongoose=require('mongoose');

const labequipmentsschema = new mongoose.Schema({
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
    labname: {
type: String
},
equipments: {
type: String
},
programname: {
type: String
},
programcode: {
type: String
},
batchsize: {
type: Number
},
utilization: {
type: String
},
staffname: {
type: String
},
designation: {
type: String
},
qualification: {
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
const labequipments=mongoose.model('labequipments',labequipmentsschema);

module.exports=labequipments;

