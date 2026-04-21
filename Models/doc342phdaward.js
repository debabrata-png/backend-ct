const mongoose=require('mongoose');

const doc342phdawardschema = new mongoose.Schema({
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
student: {
type: String
},
regno: {
type: String
},
program: {
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
const doc342phdaward=mongoose.model('doc342phdaward',doc342phdawardschema);

module.exports=doc342phdaward;

