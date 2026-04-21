const mongoose=require('mongoose');

const doc253screenshotschema = new mongoose.Schema({
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
    software: {
type: String
},
year: {
type: String
},
document: {
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
const doc253screenshot=mongoose.model('doc253screenshot',doc253screenshotschema);

module.exports=doc253screenshot;

