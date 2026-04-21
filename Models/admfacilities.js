const mongoose=require('mongoose');

const admfacilitiesschema = new mongoose.Schema({
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
    hostel: {
type: String
},
scholarship: {
type: String
},
visa: {
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
const admfacilities=mongoose.model('admfacilities',admfacilitiesschema);

module.exports=admfacilities;

