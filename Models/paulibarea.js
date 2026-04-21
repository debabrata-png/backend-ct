const mongoose=require('mongoose');

const paulibareaschema = new mongoose.Schema({
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
    institute: {
type: String
},
parea: {
type: Number
},
availarea: {
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
const paulibarea=mongoose.model('paulibarea',paulibareaschema);

module.exports=paulibarea;

