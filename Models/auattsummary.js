const mongoose=require('mongoose');

const auattsummaryschema = new mongoose.Schema({
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
    collegecode: {
type: String
},
year: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
course: {
type: String
},
coursecode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
umis: {
type: String
},
attpercentage: {
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
const auattsummary=mongoose.model('auattsummary',auattsummaryschema);

module.exports=auattsummary;

