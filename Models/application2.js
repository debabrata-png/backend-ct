const mongoose=require('mongoose');

const application2schema = new mongoose.Schema({

email: {

type: String,

required: [true,'Please enter email'],

unique: true

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

tenthexam: {

type: String

},

tenthboard: {

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

tenthpercentagemarks: {

type: Number

},

twelfthpercentagemarks: {

    type: Number
    
},

tenthschool: {

    type: String
        
},


twelfthschool: {

        type: String
                
},    

tenthattempts: {

    type: String
                    
},

twelfthattempts: {

    type: String
                        
},

tenthyop: {

    type: String
                        
},
    
twelfthyop: {
    
    type: String
                            
},

tenthsubject1: {

    type: String
    
    },
    
tenthsub1marks: {
    
    type: Number
    
    },
    
tenthsubject2: {
    
    type: String
    
    },
    
tenthsub2marks: {
    
    type: Number
    
    },
    
tenthsubject3: {
    
    type: String
    
    },
    
tenthsub3marks: {
    
    type: Number
    
    },
    
tenthsubject4: {
    
    type: String
    
    },
    
tenthsub4marks: {
    
    type: Number
    
    },
    
tenthsubject5: {
    
    type: String
    
    },
    
tenthsub5marks: {
    
    type: Number
    
    },
    
tenthsubject6: {
    
    type: String
    
    },
    
tenthsub6marks: {
    
    type: Number
    
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

checkbox: {

    type: String
    }

})

//

const Application2=mongoose.model('Application2',application2schema);




module.exports=Application2;


