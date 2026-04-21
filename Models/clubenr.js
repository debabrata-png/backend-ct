const mongoose=require('mongoose');

const clubenrschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    clubcode: {
        type: String,
        required: [true,'Please enter clubcode'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    club: {
        type: String,
        required: [true,'Please enter club'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter program'],
        unique: false
    },
    academicyear: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Clubenr=mongoose.model('Clubenr',clubenrschema);

module.exports=Clubenr;

