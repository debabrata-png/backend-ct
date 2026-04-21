const mongoose=require('mongoose');

const mguidesschema = new mongoose.Schema({
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
    category1: {
type: String
},
category2: {
type: String
},
keywords: {
type: String
},
subject: {
type: String
},
module: {
type: String
},
topic: {
type: String
},
link: {
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
const mguides=mongoose.model('mguides',mguidesschema);

module.exports=mguides;

