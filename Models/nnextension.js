const mongoose=require('mongoose');

const nnextensionschema = new mongoose.Schema({
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
activity: {
type: String
},
noofstudents: {
type: Number
},
noofteachers: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const nnextension=mongoose.model('nnextension',nnextensionschema);

module.exports=nnextension;

