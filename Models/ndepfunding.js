const mongoose=require('mongoose');

const ndepfundingschema = new mongoose.Schema({
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
type: String
},
scheme: {
type: String
},
agency: {
type: String
},
year: {
type: String
},
funds: {
type: Number
},
duration: {
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
const ndepfunding=mongoose.model('ndepfunding',ndepfundingschema);

module.exports=ndepfunding;

