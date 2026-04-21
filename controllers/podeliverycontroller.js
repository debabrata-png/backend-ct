const Schedule = require('./../Models/podeliveryschedule');
const PO = require('./../Models/ppo');

/* ================= CREATE / UPDATE ================= */
exports.scheduleSave = async (req, res) => {
  const { poid, stages } = req.body;

  let schedule = await Schedule.findOne({ poid });

  if (schedule) {
    schedule.stages = stages;
    await schedule.save();
  } else {
    schedule = await Schedule.create(req.body);
  }

  res.json(schedule);
};

/* ================= GET ================= */
exports.scheduleGet = async (req, res) => {
  const data = await Schedule.findOne({
    poid: req.query.poid
  });

  res.json(data);
};

/* ================= GET PO LIST ================= */
exports.poList = async (req, res) => {
  const data = await PO.find({ colid: req.query.colid })
    .populate('vendorid');

  res.json(data);
};