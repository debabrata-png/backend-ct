const express = require("express");
const router = express.Router();
const SeatAllocation = require("./../Models/seatallocation2");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate seating for one room, ensuring no adjacent same program
function generateRoomSeating(students) {
  shuffle(students);
  let valid = false;
  let attempts = 0;

  while (!valid && attempts < 500) {
    valid = true;
    for (let i = 0; i < students.length - 1; i++) {
      if (students[i].program === students[i + 1].program) {
        valid = false;
        shuffle(students);
        break;
      }
    }
    attempts++;
  }

  if (!valid) throw new Error("Couldn't generate valid seating arrangement");

  return students.map((student, index) => ({
    seatNumber: index + 1,
    name: student.name,
    regNo: student.regNo,
    program: student.program,
  }));
}

// Distribute students into rooms
function distributeStudents(students, roomCapacity, totalRooms) {
  if (students.length > roomCapacity * totalRooms)
    throw new Error("Not enough room capacity for all students");

  shuffle(students);

  const rooms = [];
  for (let i = 0; i < totalRooms; i++) {
    const start = i * roomCapacity;
    const end = Math.min(start + roomCapacity, students.length);
    const roomStudents = students.slice(start, end);
    if (roomStudents.length === 0) break;

    const allocated = generateRoomSeating(roomStudents);
    rooms.push({ roomNumber: i + 1, seats: allocated });
  }

  return rooms;
}

// POST /api/allocate
router.post("/allocate", async (req, res) => {
  try {
    const { roomCapacity, totalRooms, students } = req.body;

    const rooms = distributeStudents(students, roomCapacity, totalRooms);

    const allocation = new SeatAllocation({
      roomCapacity,
      totalRooms,
      students,
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
