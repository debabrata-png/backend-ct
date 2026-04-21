const mongoose = require('mongoose');

const exammarks2dsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: {type: String, required: true },
    colid: { type: Number, required: true },
    student: { type: String, required: true },
    regno: { type: String, required: true },
    mothername: { type: String},
    fathername: {type: String},
    gender: { type: String},
    program: {type: String},
    examcode: {type: String},
    month: { type: String},
    year: { type: String},
    status: { type: String},
    regulation: { type: String},
    semester: { type: String},
    branch: { type: String},
    papercode: { type: String},
    papername: { type: String},
    thmax: { type: Number},
    thobtained: { type: Number},
    prmax: { type: Number},
    probtained: { type: Number},
    iatmax: { type: Number},
    iatobtained: { type: Number},
    iapmax: { type: Number},
    iapobtained: { type: Number},
});

const exammarks2ds = mongoose.model('exammarks2ds', exammarks2dsschema);

module.exports = exammarks2ds;