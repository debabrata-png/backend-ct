const AiConfiguration = require('../Models/aiconfigurationds');

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const payloadFromBody = (body = {}) => ({
  colid: toNumber(body.colid),
  type: body.type || 'ChatGPT',
  apikey: body.apikey || '',
  description: body.description || '',
  active: body.active || 'Yes',
  default: body.default || 'No',
  user: body.user || ''
});

exports.getAiConfigurations = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const data = await AiConfiguration.find({ colid }).sort({ type: 1, default: -1, active: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createAiConfiguration = async (req, res) => {
  try {
    const payload = payloadFromBody(req.body);
    if (payload.colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!payload.type || !payload.apikey) {
      return res.status(400).json({ msg: 'type and API key are required' });
    }

    const data = await AiConfiguration.create(payload);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateAiConfiguration = async (req, res) => {
  try {
    const payload = payloadFromBody(req.body);
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });

    const data = await AiConfiguration.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      payload,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteAiConfiguration = async (req, res) => {
  try {
    await AiConfiguration.findOneAndDelete({
      _id: req.body.id,
      colid: toNumber(req.body.colid)
    });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
