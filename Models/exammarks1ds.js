const mongoose = require('mongoose');

const exammarks1dsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: {type: String, required: true },
    colid: { type: Number, required: true },
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
    prmax: { type: Number},
    iatmax: { type: Number},
    iapmax: { type: Number},
});

const exammarks1ds = mongoose.model('exammarks1ds', exammarks1dsschema);

module.exports = exammarks1ds;