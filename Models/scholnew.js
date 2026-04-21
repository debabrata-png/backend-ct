const mongoose=require('mongoose');

const scholnewschema = new mongoose.Schema({
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
scholarship: {
type: String
},
type: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
amount: {
type: Number
},
doclink: {
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
const scholnew=mongoose.model('scholnew',scholnewschema);

module.exports=scholnew;

