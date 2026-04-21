const hostelmodel = require("../Models/hostelmodel");
const hostelroommodel = require("../Models/hostelroommodel");
const hostelbedallocation = require("../Models/hostelbedallocation");
const User = require("../Models/user");
const Ledgerstud = require("../Models/ledgerstud");
const hostelapplication = require("../Models/hostelapplication");

// ✅ Create Building
exports.createBuilding = async (req, res) => {
  try {
    const building = await hostelmodel.create(req.body);
    return res.status(201).json({ success: true, data: building });
  } catch (err) {
  }
};

// ✅ Get All Buildings (with pagination)
exports.getBuildings = async (req, res) => {
  try {
    const { page = 1, limit = 10, colid } = req.query;
    const total = await hostelmodel.countDocuments();
    const buildings = await hostelmodel.find({
        colid: colid
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    return res.status(200).json({ success: true, total, page: Number(page), limit: Number(limit), data: buildings });
  } catch (err) {
  }
};

// ✅ Update Building
exports.updateBuilding = async (req, res) => {
  try {
    const {id} = req.query;
    const building = await hostelmodel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: building });
  } catch (err) {
  }
};

// ✅ Delete Building
exports.deleteBuilding = async (req, res) => {
  try {
    await hostelmodel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Building deleted" });
  } catch (err) {
  }
};

// ✅ Create Room
exports.createRoom = async (req, res) => {
  try {
    const room = await hostelroommodel.create(req.body);
    return res.status(201).json({ success: true, data: room });
  } catch (err) {
  }
};

// ✅ Get All Rooms (with pagination)
exports.getRooms = async (req, res) => {
  try {
    const { page = 1, limit = 10, buildingname, colid } = req.query;
    const total = await hostelroommodel.countDocuments();
    const rooms = await hostelroommodel.find({
        buildingname: buildingname,
        colid: colid
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    return res.status(200).json({ success: true, total, page: Number(page), limit: Number(limit), data: rooms });
  } catch (err) {
  }
};

// ✅ Update Room
exports.updateRoom = async (req, res) => {
  try {
    const {id} = req.query;
    const room = await hostelroommodel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: room });
  } catch (err) {
  }
};

// ✅ Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    await hostelroommodel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Room deleted" });
  } catch (err) {
  }
};

// ✅ Search Rooms by Room Name with Pagination
exports.searchRooms = async (req, res) => {
  try {
    const { roomname = "", page = 1, limit = 10 } = req.query;
    const filter = roomname ? { roomname: { $regex: roomname, $options: "i" } } : {};
    const total = await hostelroommodel.countDocuments(filter);
    const rooms = await hostelroommodel.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return res.status(200).json({ success: true, total, page: Number(page), limit: Number(limit), data: rooms });
  } catch (err) {
  }
};


// ✅ allocate Bed
exports.allocateBed = async (req, res) => {
  try {
    const { buildingname, roomname, bednumber, regno, student, colid } = req.body;
    const newAlloc = await hostelbedallocation.create({ buildingname, roomname, bednumber, regno, student, colid });
    return res.status(201).json({ success: true, message: "Bed allocated", data: newAlloc });
  } catch (err) {
  }
};

// ✅ Update Bed
exports.updateBed = async (req, res) => {
  try {
    const {id} = req.query;
    const { regno, student } = req.body;
    const bed = await hostelbedallocation.findByIdAndUpdate(
      id,
      { regno, student },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "Bed updated", data: bed });
  } catch (err) {
  }
};


// ✅ Delete BedAllocation
exports.deleteBed = async (req, res) => {
  try {
    await hostelbedallocation.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Bed allocation deleted" });
  } catch (err) {
  }
};

// ✅ Get All Bed Allocations (with pagination)
exports.getAllBedAllocations = async (req, res) => {
  try {
    const { page = 1, limit = 10, roomname, buildingname, colid } = req.query;
    const total = await hostelbedallocation.countDocuments();
    const allocations = await hostelbedallocation.find({
        roomname: roomname,
        buildingname: buildingname,
        colid: colid,
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return res.status(200).json({ success: true, total, page: Number(page), limit: Number(limit), data: allocations });
  } catch (err) {
  }
};

// alrady have do not need to add again
exports.searchStudentByRegno = async (req, res) => {
  try {
    const { regno } = req.query;

    const student = await User.findOne({ regno: regno.trim() });

    return res.status(200).json({ success: true, data: student });
  } catch (error) {
  }
};

exports.login = async (req, res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    const { colid, name, email: userEmail, regno, role } = user;

    return res.status(200).json({ colid, name, email: userEmail, regno, role });
} catch(err){}
} 

exports.createledgerstud = async (req, res) =>{
  try {
    const ledgerstud = await Ledgerstud.create(req.body);
    return res.status(200).json({
      success: true,
      message: "ledgerstud created successfully",
      data: ledgerstud
    })
  } catch (error) {
  }
}

exports.createhostelapplication = async (req, res) => {
  try {
    const data = req.body; // should be an array of hostel applications
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array",
      });
    }

    const hosteapps = await hostelapplication.insertMany(data);

    return res.status(200).json({
      success: true,
      message: "Hostel applications created successfully",
      data: hosteapps,
    });
  } catch (error) {
    console.error("InsertMany Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating hostel applications",
      error: error.message,
    });
  }
};


exports.updatehostelapplication = async (req, res) =>{
  try {
    const updatedhostelapp = await hostelapplication.updateMany(
      {regno: req.body.regno, appstatus: "Pending", year: req.body.year},
     {$set: req.body}
    )
    return res.status(200).json({
      success: "true",
      data: updatedhostelapp
    })
  } catch (error) {
    
  }
}

exports.checkallocatedbedtouser = async (req, res) =>{
  try {
    const { regno } = req.query;
  const record = await hostelbedallocation.findOne({ regno });
  return res.json({ allocated: !!record });
  } catch (error) {
    
  }
}