const mongoose=require('mongoose');

const rsmulanddetacngschema = new mongoose.Schema({
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
location2: {
type: String
},
disctict: {
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
type: Number
},
documentno: {
type: Number
},
datea: {
type: Date
},
survery: {
type: Number
},
builtarea: {
type: String
},
landmark: {
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
const rsmulanddetacng=mongoose.model('rsmulanddetacng',rsmulanddetacngschema);

module.exports=rsmulanddetacng;

