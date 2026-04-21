const mongoose=require('mongoose');

const extawardsschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    awardname: {
        type: String,
        required: [true,'Please enter name of the award/recognition for institution'],
        unique: false
    },
    awardbody: {
        type: String,
        required: [true,'Please enter type of participation'],
        unique: false
    },
    activity: {
        type: String,
        required: [true,'Please enter name of the extension activity'],
        unique: false
    },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const InstitutionalAwards=mongoose.model('InstitutionalAwards',extawardsschema);

module.exports=InstitutionalAwards;

