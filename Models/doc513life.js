const mongoose=require('mongoose');

const doc513lifeschema = new mongoose.Schema({
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
event: {
type: String
},
eventdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc513life=mongoose.model('doc513life',doc513lifeschema);

module.exports=doc513life;

