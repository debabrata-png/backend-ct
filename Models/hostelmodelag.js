const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  colid: { type: Number, required: true }, 

  hostelName: String,
  hostelAddress: String,
  hostelType: String,

  blockCode: String,
  blockName: String,

  floorCode: String,
  floorName: String,

  roomName: String,
  roomType: String,
  roomCapacity: Number,
  residentType: String
});

module.exports = mongoose.model("HostelMaster", hostelSchema);