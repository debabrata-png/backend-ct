const mongoose=require('mongoose');

const mlinkschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    name: {
        type: String,
        required: [true,'Please enter name'],
        unique: false
    },
    category: {
        type: String
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
   
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Mlink=mongoose.model('Mlink',mlinkschema);

module.exports=Mlink;

