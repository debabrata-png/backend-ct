const mongoose = require('mongoose');

const hostelroomschema = new mongoose.Schema({
  buildingname: { type: String, required: true },
  roomname: { type: String, required: true },
  totalbeds: { type: Number, required: true },
  colid: {type: Number},
  rentperbed: {type: Number}
});

const hostelroommodel = mongoose.model('hostelroommodel', hostelroomschema);

module.exports = hostelroommodel;
