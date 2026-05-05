const Awsconfig = require('../Models/awsconfig');

const payload = (body) => ({
  name: body.name || '',
  username: body.username || '',
  password: body.password || '',
  bucket: body.bucket || '',
  region: body.region || '',
  type: body.type || 'aws',
  default: body.default || 'No',
  colid: Number(body.colid),
  user: body.user || ''
});

exports.getAwsConfigs = async (req, res) => {
  try {
    const data = await Awsconfig.find({ colid: Number(req.query.colid) }).sort({ name: 1, bucket: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createAwsConfig = async (req, res) => {
  try {
    const data = await Awsconfig.create(payload(req.body));
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateAwsConfig = async (req, res) => {
  try {
    const data = await Awsconfig.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      payload(req.body),
      { new: true, runValidators: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteAwsConfig = async (req, res) => {
  try {
    await Awsconfig.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
