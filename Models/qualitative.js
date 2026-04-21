const mongoose=require('mongoose');

const qualitativeschema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    metric: {
        type: String
    },
    question: {
        type: String
    },
    answer: {
        type: String
    },
    accreditation: {
        type: String
    },
    year: {
        type: String
    },
    link: {
        type: String  
    }
})
//
const Qualitative=mongoose.model('Qualitative',qualitativeschema);

module.exports=Qualitative;

