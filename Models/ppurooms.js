const mongoose=require('mongoose');

const ppuroomsschema = new mongoose.Schema({
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
area: {
type: String
},
noofrooms: {
type: Number
},
noofstudacmd: {
type: Number
},
totalarea: {
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
const ppurooms=mongoose.model('ppurooms',ppuroomsschema);

module.exports=ppurooms;

