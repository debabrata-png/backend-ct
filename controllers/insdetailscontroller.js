const Institution = require('./../Models/insdetails');

exports.instCreate = async (req, res) => {
  const data = new Institution(req.body);
  await data.save();
  res.json(data);
};

exports.instGetAll = async (req, res) => {
  const { colid } = req.query;
  const filter = colid ? { colid } : {};
  const data = await Institution.find(filter);
  res.json(data);
};

exports.instGetOne = async (req, res) => {
  const data = await Institution.findById(req.params.id);
  res.json(data);
};

exports.instUpdate = async (req, res) => {
  const data = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.instDelete = async (req, res) => {
  await Institution.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

exports.vinsGet = async (req, res) => {

  try {

    const data = await Institution.findOne({
      colid: req.query.colid
    });

    res.json(data);

  } catch (e) {
    res.status(500).json({ msg: 'Error loading institution' });
  }
};