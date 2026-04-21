const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const SeatAllocation = require("./../Models/seatallocation4");

const storage = multer.memoryStorage();
const upload = multer({ storage });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

  return students.map((s, i) => ({
    seatNumber: i + 1,
    name: s.name,
    regNo: s.regNo,
    program: s.program,
  }));
}

function distributeStudents(students, rooms) {
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  shuffle(students);

  let index = 0;
  const resultRooms = [];
  const unallocated = [];

  for (const room of rooms) {
    const assigned = students.slice(index, index + room.capacity);
    index += room.capacity;

    if (assigned.length === 0) break;

    const arranged = generateRoomSeating(assigned);
    resultRooms.push({
      roomName: room.roomName,
      capacity: room.capacity,
      seats: arranged,
    });
  }

  if (index < students.length) {
    unallocated.push(...students.slice(index));
  }

  return { resultRooms, unallocated };
}

// POST /api/allocate-with-excel
router.post("/allocate-with-excel", upload.single("file"), async (req, res) => {
  try {
    const { rooms } = JSON.parse(req.body.rooms);
    const fileBuffer = req.file.buffer;

    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const students = data.map((row) => ({
      name: row.Name,
      regNo: row.RegNo,
      program: row.Program,
    }));

    const { resultRooms, unallocated } = distributeStudents(students, rooms);

    const allocation = new SeatAllocation({
      rooms: resultRooms,
      students,
      unallocated,
    });

    await allocation.save();

    res.status(201).json(allocation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const allocations = await SeatAllocation.find();
  res.json(allocations);
});

module.exports = router;
