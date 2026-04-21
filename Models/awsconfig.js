const mongoose=require('mongoose');

const awsconfigschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    bucket: {
        type: String
    },
    region: {
        type: String
    },
    type: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Awsconfig=mongoose.model('Awsconfig',awsconfigschema);

module.exports=Awsconfig;

