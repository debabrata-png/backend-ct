const mongoose=require('mongoose');

const doc351corporateschema = new mongoose.Schema({
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
corporate: {
type: String
},
training: {
type: String
},
amount: {
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
const doc351corporate=mongoose.model('doc351corporate',doc351corporateschema);

module.exports=doc351corporate;

