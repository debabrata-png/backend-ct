const mongoose=require('mongoose');

const ppuaddinfosyllabischema = new mongoose.Schema({
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
    type: {
type: String
},
details: {
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
const ppuaddinfosyllabi=mongoose.model('ppuaddinfosyllabi',ppuaddinfosyllabischema);

module.exports=ppuaddinfosyllabi;

