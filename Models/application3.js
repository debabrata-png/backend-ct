const mongoose=require('mongoose');

const application3schema = new mongoose.Schema({

email: {

type: String,

required: [true,'Please enter email']


},

name: {

type: String,

required: [true,'Please enter name']

},

phone: {

type: String,

required: [true,'Please enter phone']

},

password: {

type: String,

required: [true,'Please enter password']

},

address: {

type: String,

required: [true,'Please enter address']

},

previousregno: {

type: String,

required: [true,'Please enter previousregno']

},

programcode: {

type: String,

required: [true,'Please enter program code']

},

admissionyear: {

type: String,

required: [true,'Please enter admission year']

},

parent: {

type: String,

required: [true,'Enter parent name']

},

occupation: {

type: String,

required: [true,'Enter parent occupation']

},

parentphone: {

type: String,

required: [true,'Enter parent phone']

},

guardian: {

type: String,

required: [true,'Enter guardian']

},

guardianphone: {

type: String,

required: [true,'Enter guardian phone']

},

photo: {

type: String

},

dateofbirth: {

type: Date

},

marrital: {

type: String

},

religion: {

type: String

},

caste: {

type: String

},

category: {

type: String

},

regno: {

type: String

},



twelfthexam: {

    type: String
    
},
    
twelfthboard: {
    
    type: String
    
},

reservedcategory: {

type: String

},



twelfthpercentagemarks: {

    type: Number
    
},




twelfthschool: {

        type: String
                
},    



twelfthattempts: {

    type: String
                        
},


    
twelfthyop: {
    
    type: String
                            
},



twelfthsubject1: {

type: String

},

twelfthsub1marks: {

type: Number

},

twelfthsubject2: {

type: String

},

twelfthsub2marks: {

type: Number

},

twelfthsubject3: {

type: String

},

twelfthsub3marks: {

type: Number

},

twelfthsubject4: {

type: String

},

twelfthsub4marks: {

type: Number

},

twelfthsubject5: {

type: String

},

twelfthsub5marks: {

type: Number

},

twelfthsubject6: {

type: String

},

twelfthsub6marks: {

type: Number

},

bloodgroup: {

type: String

},

capid: {

type: String

},

refno: {

type: String

},

language1: {

type: String

},

language2: {

type: String

},

aadhar: {

type: String

},

hostelrequired: {

type: String

},

transportation: {

type: String

},

source: {

type: String

},

annualincome: {

type: String

},

lastlogin: {

type: Date

},

colid: {

type: Number,

required: [true,'Please enter colid']

},

status: {

type: String,

required: [true,'Please enter status']

},

applicationdate: {

    type: Date
},

checkbox: {

    type: String
    }

})

//

const Application3=mongoose.model('Application3',application3schema);




module.exports=Application3;


