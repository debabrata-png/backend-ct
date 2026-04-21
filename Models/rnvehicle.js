const mongoose=require('mongoose');

const rnvehicleschema = new mongoose.Schema({
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
    year: {
type: String
},
vehicleregno: {
type: String
},
capacity: {
type: Number
},
rcbook: {
type: String
},
insurance: {
type: String
},
dl: {
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
const rnvehicle=mongoose.model('rnvehicle',rnvehicleschema);

module.exports=rnvehicle;

