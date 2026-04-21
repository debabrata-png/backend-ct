const mongoose=require('mongoose');

const nn211aschema = new mongoose.Schema({
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
    committee: {
type: String
},
comcode: {
type: String
},
year: {
type: String
},
ugc: {
type: String
},
member: {
type: String
},
sme: {
type: String
},
meetingdate: {
type: Date
},
doclink: {
type: String
},
type: {
type: String
},
level: {
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
const nn211a=mongoose.model('nn211a',nn211aschema);

module.exports=nn211a;

