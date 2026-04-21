const mongoose=require('mongoose');

const emailregformschema = new mongoose.Schema({

name: {
    type: String,
    required: [true,'Please enter name']
},

email: {
type: String,
required: [true,'Please enter email']
},

phone: {
type: String,
required: [true,'Please enter phone']
},

instname: {
type: String,
required: [true,'Please enter institution name']
},

state: {
type: String,
required: [true,'Please enter state']
},

time: {
type: String,
required: [true,'Please select time']
},

details: {
type: String,
required: [true,'Please enter your details']
},

status: {
type: String,
required: [true,'Please enter status']
},

applicationdate: {
    type: Date
    },

source: {
type: String
},

colid: {
type: Number,
required: [true,'Please enter colid']
}

})

//

const EmailRegForm=mongoose.model('EmailRegForm',emailregformschema);

module.exports=EmailRegForm;


