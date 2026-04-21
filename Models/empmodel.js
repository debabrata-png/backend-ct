const mongoose=require('mongoose');

const empschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    phone: {
        type: String,
        required: [true,'Please enter phone'],
        unique: true
    },
    email: {
        type: String,
        required: [true,'Please enter email'],
        unique: true
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    age: {
        type: Number,
        required: [true,'Please enter age']
    }
})
//
const Emp=mongoose.model('Emp',empschema);

module.exports=Emp;

