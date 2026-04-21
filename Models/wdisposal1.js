const mongoose=require('mongoose');

const wdisposal1schema = new mongoose.Schema({
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
binid: {
type: String
},
collectiondate: {
type: Date
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
const wdisposal1=mongoose.model('wdisposal1',wdisposal1schema);

module.exports=wdisposal1;

