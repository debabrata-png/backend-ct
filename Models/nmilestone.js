const mongoose=require('mongoose');

const nmilestoneschema = new mongoose.Schema({
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
    client: {
type: String
},
clientid: {
type: String
},
milestone: {
type: String
},
duedate: {
type: Date
},
amount: {
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
const nmilestone=mongoose.model('nmilestone',nmilestoneschema);

module.exports=nmilestone;

