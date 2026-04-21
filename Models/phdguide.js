const mongoose=require('mongoose');

const phdguideschema = new mongoose.Schema({
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
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    researchguide: {
        type: String,
        required: [true,'Please enter name if recognized as research guide'],
        unique: false
    },
    ifrecognized: {
        type: String
    },
    qualification: {
        type: String
    },
    pgyear: {
        type: String
    },
    phdyear: {
        type: String
    },
    yog: {
        type: String,
        required: [true,'Please enter year of recognition as research guide'],
        unique: false
    },
    scholar: {
        type: String,
        required: [true,'Please enter scholar'],
        unique: false
    },
    doclink: {
        type: String
    },
    
    title: {
        type: String,
        required: [true,'Please enter title of thesis'],
        unique: false
    },
    yor: {
        type: String,
        required: [true,'Please enter year of registration of scholar'],
        unique: false
    },    
    yop: {
        type: String,
        required: [true,'Please enter year of phd awarded'],
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
const Phdguide=mongoose.model('Phdguide',phdguideschema);

module.exports=Phdguide;

