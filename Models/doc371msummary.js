const mongoose=require('mongoose');

const doc371msummaryschema = new mongoose.Schema({
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
mou: {
type: String
},
summary: {
type: String
},
startdate: {
type: Date
},
enddate: {
type: String
},
nature: {
type: String
},
activities: {
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
const doc371msummary=mongoose.model('doc371msummary',doc371msummaryschema);

module.exports=doc371msummary;

