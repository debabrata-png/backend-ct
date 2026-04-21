const express = require("express");
const router = express.Router();
const SeatAllocation = require("./../Models/seatallocation");

// Utility function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate seat allocation ensuring no same-program neighbors
function generateAllocation(roomCapacity, programs) {
  // Step 1: Expand students into an array by program
  let students = [];
  programs.forEach((p) => {
    for (let i = 0; i < p.studentCount; i++) {
      students.push(p.name);
    }
  });

  if (students.length > roomCapacity)
    throw new Error("Student count exceeds room capacity");

  shuffle(students);

  // Step 2: Ensure no adjacent same-program students
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

  if (!valid)
    throw new Error("Unable to find a valid non-adjacent arrangement");

  // Step 3: Assign seat numbers
  return students.map((program, index) => ({
    seatNumber: index + 1,
    program,
  }));
}

// POST /api/allocate
router.post("/allocate", async (req, res) => {
  try {
    const { roomCapacity, programs } = req.body;

    const seats = generateAllocation(roomCapacity, programs);

    const newAllocation = new SeatAllocation({
      roomCapacity,
      programs,
      seats,
    });

    await newAllocation.save();
    res.status(201).json(newAllocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all allocations
router.get("/", async (req, res) => {
  const allocations = await SeatAllocation.find();
  res.json(allocations);
});

module.exports = router;
