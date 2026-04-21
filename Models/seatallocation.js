const mongoose = require("mongoose");

const seatAllocationSchema = new mongoose.Schema({
     name: {
        type: String,
    },
    user: {
        type: String,
    },
    colid: {
        type: Number,
    },
    year: {
type: String
},
examcode: {
type: String
},
  roomCapacity: { type: Number, required: true },
  programs: [
    {
      name: String,
      studentCount: Number,
    },
  ],
  seats: [
    {
      seatNumber: Number,
      program: String,
    },
  ],
});

module.exports = mongoose.model("seatallocation", seatAllocationSchema);
