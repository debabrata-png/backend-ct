const mongoose=require('mongoose');

const ppufacworkloadschema = new mongoose.Schema({
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
workload: {
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
const ppufacworkload=mongoose.model('ppufacworkload',ppufacworkloadschema);

module.exports=ppufacworkload;

