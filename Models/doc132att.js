const mongoose=require('mongoose');

const doc132attschema = new mongoose.Schema({
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
course: {
type: String
},
coursecode: {
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
const doc132att=mongoose.model('doc132att',doc132attschema);

module.exports=doc132att;

