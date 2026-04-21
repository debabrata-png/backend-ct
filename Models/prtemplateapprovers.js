const mongoose=require('mongoose');

const prtemplateapproversschema = new mongoose.Schema({
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
    templateid: {
type: String
},
template: {
type: String
},
faculty: {
type: String
},
facultyid: {
type: String
},
level: {
type: Number
},
category: {
type: String
},
type: {
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
const prtemplateapprovers=mongoose.model('prtemplateapprovers',prtemplateapproversschema);

module.exports=prtemplateapprovers;

