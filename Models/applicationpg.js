const mongoose=require('mongoose');

const applicationpgschema = new mongoose.Schema({

email: {
type: String,
required: [true,'Please enter email']
},

name: {
type: String,
required: [true,'Please enter applicant name']
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

reservedcategory: {
type: String
},

uginstitution: {
type: String            
},

uguniversity: {
type: String            
},

ugpercentage: {
type: String   
},

ugattempts: {
type: String                    
},

ugyop: {
type: String                           
},

ugsem1marks: {
type: Number
},

ugsem1percentage: {
type: String
},

ugsem2marks: {
type: Number
},
    
ugsem2percentage: {
type: String
},

ugsem3marks: {
type: Number
},
    
ugsem3percentage: {
type: String
},
    
ugsem4marks: {
type: Number
},
        
ugsem4percentage: {
type: String
},

ugsem5marks: {
type: Number
},
            
ugsem5percentage: {
type: String
},

ugsem6marks: {
type: Number
},
            
ugsem6percentage: {
type: String
},

ugsem7marks: {
type: Number
},
                
ugsem7percentage: {
type: String
},

ugsem8marks: {
type: Number
},
            
ugsem8percentage: {
type: String
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
},

inststate: {
    type: String
},

instdistrict: {
    type: String
},

instname: {
    type: String
}

})

//

const Applicationpg=mongoose.model('Applicationpg',applicationpgschema);

module.exports=Applicationpg;


