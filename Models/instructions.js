const mongoose=require('mongoose');

const insschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title'],
        unique: false
    },
    content: {
        type: String,
        required: [true,'Please enter content'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Ins=mongoose.model('Instructions',insschema);

module.exports=Ins;

