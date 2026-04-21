const mongoose=require('mongoose');

const pdischargeschema = new mongoose.Schema({
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
discharge: {
type: String
},
dischargedate: {
type: Date
},
followup: {
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
const pdischarge=mongoose.model('pdischarge',pdischargeschema);

module.exports=pdischarge;

