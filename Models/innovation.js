const mongoose=require('mongoose');

const innovationschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    year: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter title '],
        unique: false
    },
    awardee: {
        type: String,
        required: [true,'Please enter the awardee'],
        unique: false
    },
    agency: {
        type: String,
        required: [true,'Please enter agency name and contact'],
        unique: false
    },
    
    
    designation: {
        type: String
        },
    
    
    category: {
        type: String,
        required: [true,'Please select the category '],
        unique: false
    },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const Innovation=mongoose.model('Innovation',innovationschema);

module.exports=Innovation;

