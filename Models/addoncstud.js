const mongoose=require('mongoose');

const addoncstudschema = new mongoose.Schema({
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
    coursetitle: {
type: String
},
coursecode: {
type: String
},
year: {
type: String
},
student: {
type: String
},
regno: {
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
const addoncstud=mongoose.model('addoncstud',addoncstudschema);

module.exports=addoncstud;

