const mongoose=require('mongoose');

const aminfsuffschema = new mongoose.Schema({
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
    item: {
type: String
},
ifsufficient: {
type: String
},
observations: {
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
const aminfsuff=mongoose.model('aminfsuff',aminfsuffschema);

module.exports=aminfsuff;

