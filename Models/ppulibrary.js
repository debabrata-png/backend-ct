const mongoose=require('mongoose');

const ppulibraryschema = new mongoose.Schema({
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
    totalarea: {
type: String
},
librarian: {
type: String
},
qualiexp: {
type: String
},
spclfaci: {
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
const ppulibrary=mongoose.model('ppulibrary',ppulibraryschema);

module.exports=ppulibrary;

