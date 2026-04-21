const mongoose=require('mongoose');

const doc716reportsschema = new mongoose.Schema({
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
activity: {
type: String
},
eventdate: {
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
const doc716reports=mongoose.model('doc716reports',doc716reportsschema);

module.exports=doc716reports;

