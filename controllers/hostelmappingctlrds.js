const HostelBuilding = require("../Models/hostelbuildingmapds");
const HostelRoom = require("../Models/hostelroommapds");
const HostelAssignment = require("../Models/hostelbedassignmentmapds");
const User = require("../Models/user");

const text = (value) => String(value || "").trim();
const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const splitList = (value) => Array.isArray(value)
  ? value.map(text).filter(Boolean)
  : String(value || "").split(",").map(text).filter(Boolean);

const buildQuery = (source = {}, fields = []) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  fields.forEach((field) => {
    if (source[field]) query[field] = source[field];
  });
  return query;
};

const cleanBuilding = (body = {}) => ({
  buildingname: text(body.buildingname),
  hosteltype: text(body.hosteltype),
  guesttype: text(body.guesttype),
  blocks: splitList(body.blocks),
  floors: splitList(body.floors),
  status: text(body.status) || "Active",
  colid: toNumber(body.colid),
  user: text(body.user)
});

const cleanRoom = (body = {}) => ({
  buildingid: body.buildingid || undefined,
  buildingname: text(body.buildingname),
  hosteltype: text(body.hosteltype),
  guesttype: text(body.guesttype),
  block: text(body.block),
  floor: text(body.floor),
  roomno: text(body.roomno),
  roomtype: text(body.roomtype),
  roomrentpermonth: toNumber(body.roomrentpermonth) || 0,
  noofbeds: toNumber(body.noofbeds) || 1,
  residenttype: text(body.residenttype || body.guesttype),
  status: text(body.status) || "Active",
  colid: toNumber(body.colid),
  user: text(body.user)
});

const validateBuilding = (p) => {
  if (p.colid === undefined) return "colid is required";
  if (!p.buildingname) return "Building name is required";
  if (!["Boys", "Girls", "Mixed"].includes(p.hosteltype)) return "Hostel type is required";
  if (!["Student", "Faculty", "Guests", "Mixed"].includes(p.guesttype)) return "Guest type is required";
  return "";
};

const validateRoom = (p) => {
  if (p.colid === undefined) return "colid is required";
  if (!p.buildingname) return "Building is required";
  if (!p.block) return "Block is required";
  if (!p.floor) return "Floor is required";
  if (!p.roomno) return "Room no is required";
  if (!p.roomtype) return "Room type is required";
  if (!p.noofbeds || p.noofbeds < 1) return "No of beds is required";
  return "";
};

const roomWithVacancy = async (rooms) => {
  const roomIds = rooms.map((room) => room._id);
  const activeAssignments = await HostelAssignment.find({ roomid: { $in: roomIds }, status: "Active" }).lean();
  const occupiedMap = new Map();
  activeAssignments.forEach((item) => {
    const key = String(item.roomid);
    occupiedMap.set(key, (occupiedMap.get(key) || 0) + 1);
  });
  return rooms.map((room) => {
    const occupiedbeds = occupiedMap.get(String(room._id)) || 0;
    return {
      ...room,
      occupiedbeds,
      vacantbeds: Math.max((Number(room.noofbeds) || 0) - occupiedbeds, 0)
    };
  });
};

exports.createBuilding = async (req, res) => {
  try {
    const payload = cleanBuilding(req.body);
    const error = validateBuilding(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await HostelBuilding.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBuildings = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["buildingname", "hosteltype", "guesttype", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await HostelBuilding.find(query).sort({ buildingname: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const payload = cleanBuilding(req.body);
    const error = validateBuilding(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await HostelBuilding.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Building not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const data = await HostelBuilding.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Building not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const payload = cleanRoom(req.body);
    const error = validateRoom(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await HostelRoom.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["buildingname", "hosteltype", "guesttype", "block", "floor", "roomno", "roomtype", "residenttype", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const rooms = await HostelRoom.find(query).sort({ buildingname: 1, block: 1, floor: 1, roomno: 1 }).lean();
    const data = await roomWithVacancy(rooms);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const payload = cleanRoom(req.body);
    const error = validateRoom(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await HostelRoom.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Room not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const active = await HostelAssignment.findOne({ roomid: req.body.id, status: "Active" });
    if (active) return res.status(400).json({ success: false, message: "Room has active assignment" });
    const data = await HostelRoom.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Room not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [buildings, rooms] = await Promise.all([
      HostelBuilding.find({ colid, status: "Active" }).sort({ buildingname: 1 }).lean(),
      HostelRoom.find({ colid, status: "Active" }).sort({ buildingname: 1, roomno: 1 }).lean()
    ]);
    res.json({
      success: true,
      buildings,
      rooms: await roomWithVacancy(rooms),
      blocks: [...new Set(buildings.flatMap((item) => item.blocks || []))].sort(),
      floors: [...new Set(buildings.flatMap((item) => item.floors || []))].sort()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const query = { colid, role: "Student" };
    if (req.query.programcode) query.programcode = req.query.programcode;
    ["name", "email", "phone"].forEach((field) => {
      if (req.query[field]) query[field] = { $regex: req.query[field], $options: "i" };
    });
    const data = await User.find(query).select("name email phone programcode regno degree").sort({ name: 1 }).limit(100).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const room = await HostelRoom.findById(req.body.roomid).lean();
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    const bedno = toNumber(req.body.bedno);
    if (!bedno || bedno < 1 || bedno > room.noofbeds) return res.status(400).json({ success: false, message: "Invalid bed no" });
    const occupied = await HostelAssignment.findOne({ roomid: room._id, bedno, status: "Active" });
    if (occupied) return res.status(400).json({ success: false, message: "Bed is already occupied" });
    const student = await User.findById(req.body.studentid).lean();
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    const payload = {
      buildingid: room.buildingid,
      roomid: room._id,
      buildingname: room.buildingname,
      hosteltype: room.hosteltype,
      guesttype: room.guesttype,
      block: room.block,
      floor: room.floor,
      roomno: room.roomno,
      roomtype: room.roomtype,
      residenttype: room.residenttype,
      bedno,
      studentid: student._id,
      student: student.name,
      studentemail: student.email,
      studentphone: student.phone,
      programcode: student.programcode,
      program: student.degree || "",
      regno: student.regno,
      status: text(req.body.status) || "Active",
      colid: toNumber(req.body.colid),
      user: text(req.body.user)
    };
    const data = await HostelAssignment.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["buildingname", "hosteltype", "guesttype", "block", "floor", "roomno", "bedno", "student", "studentemail", "programcode", "residenttype", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await HostelAssignment.find(query).sort({ buildingname: 1, roomno: 1, bedno: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    await HostelAssignment.findByIdAndUpdate(req.body.id, { status: "Cancelled" });
    req.body.id = undefined;
    return exports.createAssignment(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const data = await HostelAssignment.findByIdAndUpdate(req.body.id, { status: "Cancelled" }, { new: true });
    if (!data) return res.status(404).json({ success: false, message: "Assignment not found" });
    res.json({ success: true, message: "Cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
