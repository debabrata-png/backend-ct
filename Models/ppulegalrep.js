const mongoose=require('mongoose');

const ppulegalrepschema = new mongoose.Schema({
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
    legalrep: {
type: String
},
address: {
type: String
},
telephone: {
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
const ppulegalrep=mongoose.model('ppulegalrep',ppulegalrepschema);

module.exports=ppulegalrep;

