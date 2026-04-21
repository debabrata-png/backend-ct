const mongoose=require('mongoose');

const pauccomfareaschema = new mongoose.Schema({
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
    reqarea: {
type: String
},
availarea: {
type: String
},
deficiency: {
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
const pauccomfarea=mongoose.model('pauccomfarea',pauccomfareaschema);

module.exports=pauccomfarea;

