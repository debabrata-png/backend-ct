const mongoose=require('mongoose');

const metricrulesschema = new mongoose.Schema({
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
    metric: {
        type: String,
        required: [true,'Please enter journal'],
        unique: false
    },
    accreditation: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const Metricrules=mongoose.model('Metricrules',metricrulesschema);

module.exports=Metricrules;

