const mongoose=require('mongoose');

const wdisposalschema = new mongoose.Schema({
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
    location: {
type: String
},
type: {
type: String
},
agency: {
type: String
},
disposaldate: {
type: Date
},
disposaltime: {
type: String
},
vendor: {
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
const wdisposal=mongoose.model('wdisposal',wdisposalschema);

module.exports=wdisposal;

