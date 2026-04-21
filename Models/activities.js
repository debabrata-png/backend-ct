const mongoose=require('mongoose');

const activitiesschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    activity: {
        type: String
    },
    metric: {
        type: String
    },
    currentvalue: {
        type: Number
    },
    firstkpi: {
        type: Number
    },
    threekpi: {
        type: Number
    },
    fivekpi: {
        type: Number
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    comments: {
        type: String
    },
    type: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Activities=mongoose.model('Activities',activitiesschema);

module.exports=Activities;

