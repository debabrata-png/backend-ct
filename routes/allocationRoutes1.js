const express = require("express");
const router = express.Router();
const SeatAllocation = require("./../Models/seatallocation1");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate a valid seat order for one room
function generateRoomSeating(students) {
  shuffle(students);
  let valid = false;
  let attempts = 0;
  while (!valid && attempts < 500) {
    valid = true;
    for (let i = 0; i < students.length - 1; i++) {
      if (students[i] === students[i + 1]) {
        valid = false;
        shuffle(students);
        break;
      }
    }
    attempts++;
  }

  if (!valid) throw new Error("Couldn't generate valid seating for room");
  return students.map((program, index) => ({
    seatNumber: index + 1,
    program,
  }));
}

// Split students into rooms
function distributeStudents(programs, roomCapacity, totalRooms) {
  // Flatten students into array
  let students = [];
  programs.forEach((p) => {
    for (let i = 0; i < p.studentCount; i++) {
      students.push(p.name);
    }
  });

  const totalStudents = students.length;
  const totalCapacity = roomCapacity * totalRooms;
  if (totalStudents > totalCapacity)
    throw new Error("Not enough total room capacity for all students");

  // Shuffle once for fair distribution
  shuffle(students);

  // Split into chunks (rooms)
  const rooms = [];
  for (let i = 0; i < totalRooms; i++) {
    const start = i * roomCapacity;
    const end = Math.min(start + roomCapacity, students.length);
    const roomStudents = students.slice(start, end);
    if (roomStudents.length === 0) break;

    const allocated = generateRoomSeating(roomStudents);
    rooms.push({
      roomNumber: i + 1,
      seats: allocated,
    });
  }

  return rooms;
}

router.post("/allocate", async (req, res) => {
  try {
    const { roomCapacity, totalRooms, programs } = req.body;

    const rooms = distributeStudents(programs, roomCapacity, totalRooms);

    const allocation = new SeatAllocation({
      roomCapacity,
      totalRooms,
      programs,
      rooms,
    });

    await allocation.save();
    res.status(201).json(allocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const allocations = await SeatAllocation.find();
  res.json(allocations);
});

module.exports = router;
