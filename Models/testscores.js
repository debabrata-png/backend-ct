const mongoose=require('mongoose');

const testscoresschema = new mongoose.Schema({
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
    year: {
type: String
},
coursecode: {
type: String
},
module: {
type: String
},
difficulty: {
type: String
},
testid: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
questionid: {
type: String
},
question: {
type: String
},
option: {
type: String
},
score: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const testscores=mongoose.model('testscores',testscoresschema);

module.exports=testscores;

