const mongoose = require("mongoose");

const seatAllocationSchema = new mongoose.Schema({
  rooms: [
    {
      roomName: String,
      capacity: Number,
      seats: [
        {
          seatNumber: Number,
          name: String,
          regNo: String,
          program: String,
        },
      ],
    },
  ],
  students: [
    {
      name: String,
      regNo: String,
      program: String,
    },
  ],
  unallocated: [
    {
      name: String,
      regNo: String,
      program: String,
    },
  ],
});

module.exports = mongoose.model("seatallocation4", seatAllocationSchema);
