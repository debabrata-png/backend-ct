const mongoose=require('mongoose');

const ncomminutesschema = new mongoose.Schema({
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
committee: {
type: String
},
committeeid: {
type: String
},
agenda: {
type: String
},
meetingdate: {
type: Date
},
type: {
type: String
},
discussion: {
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
const ncomminutes=mongoose.model('ncomminutes',ncomminutesschema);

module.exports=ncomminutes;

