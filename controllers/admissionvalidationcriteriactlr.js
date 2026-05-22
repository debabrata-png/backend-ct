const AdmissionValidationCriteria = require('../Models/admissionvalidationcriteria');

const text = (value) => String(value || '').trim();

const buildFilter = (query = {}) => {
  const filter = {};
  if (query.colid) filter.colid = Number(query.colid);
  if (query.formid) filter.formid = query.formid;
  if (query.formname) filter.formname = new RegExp(text(query.formname), 'i');
  return filter;
};

exports.getValidationCriteria = async (req, res) => {
  try {
    const data = await AdmissionValidationCriteria.find(buildFilter(req.query)).sort({ formname: 1, formid: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createValidationCriteria = async (req, res) => {
  try {
    const formname = text(req.body.formname);
    const formid = text(req.body.formid);
    if (!req.body.colid || !formname || !formid) {
      return res.status(400).json({ msg: 'Form name and form id are required' });
    }

    const data = await AdmissionValidationCriteria.create({
      colid: Number(req.body.colid),
      formname,
      formid,
      validationcriteria: req.body.validationcriteria || '',
      user: req.body.user || ''
    });
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Validation criteria already exists for this form id' });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateValidationCriteria = async (req, res) => {
  try {
    const formname = text(req.body.formname);
    const formid = text(req.body.formid);
    if (!req.body.id || !req.body.colid || !formname || !formid) {
      return res.status(400).json({ msg: 'Form name and form id are required' });
    }

    const data = await AdmissionValidationCriteria.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      {
        formname,
        formid,
        validationcriteria: req.body.validationcriteria || '',
        user: req.body.user || ''
      },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Validation criteria already exists for this form id' });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteValidationCriteria = async (req, res) => {
  try {
    await AdmissionValidationCriteria.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
