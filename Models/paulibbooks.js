const mongoose=require('mongoose');

const paulibbooksschema = new mongoose.Schema({
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
req: {
type: Number
},
avail: {
type: Number
},
deficiency: {
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
const paulibbooks=mongoose.model('paulibbooks',paulibbooksschema);

module.exports=paulibbooks;

