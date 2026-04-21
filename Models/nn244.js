const mongoose=require('mongoose');

const nn244schema = new mongoose.Schema({
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
    faculty: {
type: String
},
designation: {
type: String
},
year: {
type: String
},
mooc: {
type: String
},
mplatform: {
type: String
},
certdate: {
type: Date
},
mrole: {
type: String
},
type: {
type: String
},
level: {
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
const nn244=mongoose.model('nn244',nn244schema);

module.exports=nn244;

