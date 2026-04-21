const mongoose=require('mongoose');

const qspeerschema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please enter email'],
        unique: true
    },
    user: {
        type: String
    },
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    phone: {
        type: String,
        required: [true,'Please enter phone']
    },
    gender: {
        type: String
    },
    department: {
        type: String
    },
    institution: {
        type: String
    },
    designation: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String
    }
})
//
const Qspeer=mongoose.model('Qspeers',qspeerschema);

module.exports=Qspeer;

