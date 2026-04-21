const mongoose = require('mongoose');

const hostelbuildingschema = new mongoose.Schema({
  buldingname: { type: String, required: true },
  totalrooms: { type: Number, required: true },
  colid: {type: Number, required: true}
});

const hostelmodel = mongoose.model('hostelmodel', hostelbuildingschema);
module.exports = hostelmodel;
