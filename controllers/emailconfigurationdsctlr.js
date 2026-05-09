const EmailConfiguration = require('../Models/emailconfigurationds');

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const payloadFromBody = (body = {}) => ({
  colid: toNumber(body.colid),
  username: body.username || '',
  password: body.password || '',
  type: body.type || '',
  provider: body.provider || '',
  smtp: body.smtp || '',
  smptp: body.smptp || '',
  port: toNumber(body.port) || 587,
  secure: body.secure || 'No',
  default: body.default || 'No',
  isactive: body.isactive || 'Yes'
});

exports.getEmailConfigurations = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const data = await EmailConfiguration.find({ colid }).sort({ provider: 1, type: 1, username: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createEmailConfiguration = async (req, res) => {
  try {
    const payload = payloadFromBody(req.body);
    if (payload.colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!payload.username || !payload.password || !payload.provider || !payload.type) {
      return res.status(400).json({ msg: 'username, password, provider and type are required' });
    }

    const data = await EmailConfiguration.create(payload);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateEmailConfiguration = async (req, res) => {
  try {
    const payload = payloadFromBody(req.body);
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });

    const data = await EmailConfiguration.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      payload,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteEmailConfiguration = async (req, res) => {
  try {
    await EmailConfiguration.findOneAndDelete({
      _id: req.body.id,
      colid: toNumber(req.body.colid)
    });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
