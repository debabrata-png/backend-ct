const mongoose=require('mongoose');

const periodschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    periodtitle: {
        type: String,
        required: [true,'Please enter period title'],
        unique: false
    },
    starttime: {
        type: String,
        required: [true,'Please enter starttime'],
        unique: false
    },
    endtime: {
        type: String,
        required: [true,'Please enter endtime'],
        unique: false
    },
    periodnumber: {
        type: Number,
        required: [true,'Please enter period number'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Period=mongoose.model('Period',periodschema);

module.exports=Period;

