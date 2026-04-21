const mongoose=require('mongoose');

const lcatschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name'],
        unique: true
    },
    user: {
        type: String,
        required: [true,'Please enter user']
    },
    description: {
        type: String,
        required: [true,'Please enter description'],
        unique: false
    },
    status: {
        type: Number,
        required: [true,'Please enter status']
    }
})
//
const Lcat=mongoose.model('Lcat',lcatschema);

module.exports=Lcat;

