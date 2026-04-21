const mongoose=require('mongoose');

const paunoofdrawhallschema = new mongoose.Schema({
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
    degree: {
type: String
},
reqhalls: {
type: Number
},
availhalls: {
type: Number
},
deficiency: {
type: Number
},
reqdrawarea: {
type: Number
},
avladrawarea: {
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
const paunoofdrawhall=mongoose.model('paunoofdrawhall',paunoofdrawhallschema);

module.exports=paunoofdrawhall;

