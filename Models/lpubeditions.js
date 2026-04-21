const mongoose=require('mongoose');

const lpubeditionsschema = new mongoose.Schema({
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
pubid: {
type: String
},
publication: {
type: String
},
edition: {
type: String
},
pubmonth: {
type: String
},
pubstatus: {
type: String
},
mode: {
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
const lpubeditions=mongoose.model('lpubeditions',lpubeditionsschema);

module.exports=lpubeditions;

