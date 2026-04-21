const mongoose=require('mongoose');

const amrecommendationschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    program: {
type: String
},
programcode: {
type: String
},
ifok: {
type: String
},
recommendations: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const amrecommendation=mongoose.model('amrecommendation',amrecommendationschema);

module.exports=amrecommendation;

