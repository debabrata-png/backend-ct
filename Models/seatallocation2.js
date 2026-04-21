const mongoose = require("mongoose");

const seatAllocationSchema = new mongoose.Schema({
  roomCapacity: { type: Number, required: true },
  totalRooms: { type: Number, required: true },
  students: [
    {
      name: String,
      regNo: String,
      program: String,
    },
  ],
  rooms: [
    {
      roomNumber: Number,
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
});

module.exports = mongoose.model("seatallocation2", seatAllocationSchema);
