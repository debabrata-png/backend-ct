const mongoose=require('mongoose');

const paunadminareaschema = new mongoose.Schema({
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
    buildspace: {
type: String
},
carparea: {
type: Number
},
avail: {
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
const paunadminarea=mongoose.model('paunadminarea',paunadminareaschema);

module.exports=paunadminarea;

