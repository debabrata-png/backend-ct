const mongoose=require('mongoose');

const doc351consultancyschema = new mongoose.Schema({
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
agency: {
type: String
},
project: {
type: String
},
fee: {
type: Number
},
faculty: {
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
const doc351consultancy=mongoose.model('doc351consultancy',doc351consultancyschema);

module.exports=doc351consultancy;

