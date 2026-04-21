const mongoose=require('mongoose');

const ppuaddfacdetailsschema = new mongoose.Schema({
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
faculty: {
type: String
},
designation: {
type: String
},
qualification: {
type: String
},
marksobt: {
type: String
},
degree: {
type: String
},
spclz: {
type: String
},
yearsofexpprof: {
type: String
},
yearsofexpind: {
type: String
},
dob: {
type: Date
},
doj: {
type: Date
},
payscale: {
type: String
},
basicpay: {
type: String
},
emoluments: {
type: String
},
univaprvl: {
type: String
},
ifqualpernorms: {
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
const ppuaddfacdetails=mongoose.model('ppuaddfacdetails',ppuaddfacdetailsschema);

module.exports=ppuaddfacdetails;

