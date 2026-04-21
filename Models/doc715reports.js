const mongoose=require('mongoose');

const doc715reportsschema = new mongoose.Schema({
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
const doc715reports=mongoose.model('doc715reports',doc715reportsschema);

module.exports=doc715reports;

