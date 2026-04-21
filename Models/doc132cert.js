const mongoose=require('mongoose');

const doc132certschema = new mongoose.Schema({
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
courscode: {
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
const doc132cert=mongoose.model('doc132cert',doc132certschema);

module.exports=doc132cert;

