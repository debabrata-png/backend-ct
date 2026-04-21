const mongoose = require("mongoose");

const seatAllocationSchema = new mongoose.Schema({
  roomCapacity: { type: Number, required: true },
  totalRooms: { type: Number, required: true },
  programs: [
    {
      name: String,
      studentCount: Number,
    },
  ],
  rooms: [
    {
      roomNumber: Number,
      seats: [
        {
          seatNumber: Number,
          program: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("seatallocation1", seatAllocationSchema);
