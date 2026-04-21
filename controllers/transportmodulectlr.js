const busds = require('../Models/busds');
const busseatallocationds = require('../Models/busseatallocationds');
const routeds = require('../Models/routeds');
const Ledgerstud = require("../Models/ledgerstud");
const User = require('../Models/user');

// CREATE
exports.createbus = async (req, res) => {
  try {
    const {
       busnumber
    } = req.body;

    const exists = await busds.findOne({ busnumber });
    if (exists) return res.status(400).json({ success: false, message: 'Bus number already exists' });

    const bus = await busds.create(req.body);

    return res.status(201).json({ success: true, data: bus });
  } catch (err) {
  }
};

// READ ALL
exports.getallbuses = async (req, res) => {
  try {
    const {colid} = req.query;
    const buses = await busds.find({
      colid: parseInt(colid)
    }).populate('routeid');
    return res.status(200).json({ success: true, data: buses });
  } catch (err) {
  }
};

// READ ONE
exports.getbusbyid = async (req, res) => {
  try {
    const bus = await busds.findById(req.query.id).populate('routeid');
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    return res.status(200).json({ success: true, data: bus });
  } catch (err) {
  }
};

// UPDATE
exports.updatebus = async (req, res) => {
  try {
    const bus = await busds.findByIdAndUpdate(req.body.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    return res.status(200).json({ success: true, data: bus });
  } catch (err) {
  }
};

// DELETE
exports.deletebus = async (req, res) => {
  try {
    const bus = await busds.findByIdAndDelete(req.query.id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    return res.status(200).json({ success: true, message: 'Bus deleted' });
  } catch (err) {
  }
};

// SEARCH BY BUS NUMBER
exports.searchbybusnumber = async (req, res) => {
  try {
    const { busnumber } = req.query;
    const bus = await busds.findOne({ busnumber: busnumber.trim() });
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    return res.status(200).json({ success: true, data: bus });
  } catch (err) {
  }
};

// CREATE
exports.createroute = async (req, res) => {
  try {
    const { routecode} = req.body;

    const exists = await routeds.findOne({ routecode });
    if (exists) return res.status(400).json({ success: false, message: 'Route code already exists' });

    const route = await routeds.create(req.body);
    return res.status(201).json({ success: true, data: route });
  } catch (err) {
  }
};

// READ ALL
exports.getallroutes = async (req, res) => {
  try {
    const {colid} = req.query
    const routes = await routeds.find({
      colid: parseInt(colid)
    });
    return res.status(200).json({ success: true, data: routes });
  } catch (err) {
  }
};

// READ ONE
exports.getroutebyid = async (req, res) => {
  try {
    const route = await routeds.findById(req.query.id);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.status(200).json({ success: true, data: route });
  } catch (err) {
  }
};

// UPDATE
exports.updateroute = async (req, res) => {
  try {
    const route = await routeds.findByIdAndUpdate(req.body.id, req.body, { new: true });
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.status(200).json({ success: true, data: route });
  } catch (err) {
  }
};

// DELETE
exports.deleteroute = async (req, res) => {
  try {
    const route = await routeds.findByIdAndDelete(req.query.id);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.status(200).json({ success: true, message: 'Route deleted' });
  } catch (err) {
  }
};

// SEARCH BY ROUTE CODE
exports.searchbyroutecode = async (req, res) => {
  try {
    const { routecode } = req.query;
    const route = await routeds.findOne({ routecode: routecode.trim() });
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.status(200).json({ success: true, data: route });
  } catch (err) {
  }
};

// CREATE
exports.createAllocation = async (req, res) => {
  try {
    const { name, user, colid, studentname, regno, busid, busnumber, seatNo } = req.body;

    const exists = await busseatallocationds.findOne({ regno, colid: Number(colid)});
    if (exists) return res.status(400).json({ success: false, message: 'Student already allocated on this bus' });

    const allocation = await busseatallocationds.create({ name, user, colid: parseInt(colid), studentname, regno, busid, busnumber, seatno: seatNo });
    return res.status(201).json({ success: true, data: allocation });
  } catch (err) {
  }
};

// DELETE
exports.deleteAllocation = async (req, res) => {
  try {
    const allocation = await busseatallocationds.findByIdAndDelete(req.query.id);
    if (!allocation) return res.status(404).json({ success: false, message: 'Allocation not found' });
    return res.status(200).json({ success: true, message: 'Allocation deleted' });
  } catch (err) {
  }
};

// SEARCH BY REGNO + COLID
exports.checkseatallocation = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const allocation = await busseatallocationds.find({
      regno: regno.trim(),
      colid: parseInt(colid)
    }).populate('busid');
    return res.status(200).json({ success: true, data: allocation });
  } catch (err) {
  }
};

// LIST ALL ALLOCATIONS FOR A SPECIFIC BUS
exports.getallocationsbybusid = async (req, res) => {
  try {
    const allocations = await busseatallocationds.find({ busid: req.query.busid,
      colid: parseInt(req.query.colid)
     }).populate('busid');
    return res.status(200).json({ success: true, data: allocations });
  } catch (err) {
  }
};

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

exports.searchstudentbyregno = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const student = await User.findOne({ regno: regno.trim(), colid: parseInt(colid) });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (err) {
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ colid, name, email: userEmail, regno, role });
  } catch (e) {
  }
};