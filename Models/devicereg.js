const mongoose=require('mongoose');

const deviceregschema = new mongoose.Schema({
    user: {
        type: String,
        required: [true,'Please enter email'],
        unique: true
    },
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    expotoken: {
        type: String,
        required: [true,'Please enter expotoken']
    },
    type: {
        type: String,
        required: [true,'Please enter type']
    },
    regno: {
        type: String
    },
    lastlogin: {
        type: Date
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
const Devicereg=mongoose.model('Devicereg',deviceregschema);

module.exports=Devicereg;

