const mongoose=require('mongoose');

const pauotherbuildareaschema = new mongoose.Schema({
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
    areadescrip: {
type: String
},
reqcarparea: {
type: Number
},
availcarparea: {
type: Number
},
deficiency: {
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
const pauotherbuildarea=mongoose.model('pauotherbuildarea',pauotherbuildareaschema);

module.exports=pauotherbuildarea;

