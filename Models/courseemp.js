const mongoose=require('mongoose');

const courseempschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    program: {
        type: String
    },
    course: {
        type: String,
        required: [true,'Please enter course'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    yop: {
        type: String,
        required: [true,'Please enter year of introduction'],
        unique: false
    },
    activities: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const Courseemp=mongoose.model('Courseemp',courseempschema);

module.exports=Courseemp;

