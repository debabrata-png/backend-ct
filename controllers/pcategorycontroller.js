const CategoryOfficer = require('./../Models/pcategoryofficer');

/* ================= CATEGORY OFFICER ================= */

// CREATE
exports.catOfficerCreate = async (req, res) => {
  const data = await CategoryOfficer.create(req.body);
  res.json(data);
};

// GET (WITH POPULATE)
exports.catOfficerGet = async (req, res) => {
  const data = await CategoryOfficer.find({
    colid: req.query.colid
  }).populate('categoryid');

  res.json(data);
};

// UPDATE
exports.catOfficerUpdate = async (req, res) => {
  const data = await CategoryOfficer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(data);
};

// DELETE
exports.catOfficerDelete = async (req, res) => {
  await CategoryOfficer.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};