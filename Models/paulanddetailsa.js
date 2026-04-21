const mongoose=require('mongoose');

const paulanddetailsaschema = new mongoose.Schema({
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
location: {
type: String
},
district: {
type: String
},
taluk: {
type: String
},
village: {
type: String
},
place: {
type: String
},
pincode: {
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
const paulanddetailsa=mongoose.model('paulanddetailsa',paulanddetailsaschema);

module.exports=paulanddetailsa;

