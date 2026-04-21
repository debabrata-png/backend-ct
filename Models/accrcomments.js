const mongoose=require('mongoose');

const accrcommentsschema = new mongoose.Schema({
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
    field1: {
        type: String
    },
    comments: {
        type: String
    },
    commentsdate: {
        type: Date
    },
    metric: {
        type: String
    },
    type: {
        type: String
    }
})
//
const Accrcomments=mongoose.model('Accrcomments',accrcommentsschema);

module.exports=Accrcomments;

