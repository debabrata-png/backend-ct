const mongoose=require('mongoose');

const linkschema = new mongoose.Schema({
    criteria: {
        type: String,
        required: [true,'Please enter name'],
        unique: false
    },
    user: {
        type: String,
        required: [true,'Please enter user']
    },
    uploadlink: {
        type: String,
        required: [true,'Please enter upload link'],
        unique: false
    },
    viewlink: {
        type: String,
        required: [true,'Please enter view link'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: Number,
        required: [true,'Please enter status']
    }
})
//
const Link=mongoose.model('Link',linkschema);

module.exports=Link;

