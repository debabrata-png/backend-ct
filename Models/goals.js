const mongoose=require('mongoose');

const goalsschema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    department: {
        type: String
    },
    goal: {
        type: String
    },
    description: {
        type: String
    },
    duedate: {
        type: Date
    },
    rating: {
        type: Number
    },
    activities: {
        type: String
    },
    comments: {
        type: String
    },
    year: {
        type: String
    },
    status1: {
        type: String  
    }
})
//
const Goals=mongoose.model('Goals',goalsschema);

module.exports=Goals;

