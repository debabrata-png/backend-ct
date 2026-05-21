const AdmissionAddressConfiguration = require('../Models/admissionaddressconfiguration');

const text = (value) => String(value || '').trim();

const buildFilter = (query = {}) => {
  const filter = {};
  if (query.colid) filter.colid = Number(query.colid);
  if (query.country) filter.country = query.country;
  if (query.state) filter.state = query.state;
  if (query.district) filter.district = query.district;
  if (query.isactive) filter.isactive = query.isactive;
  return filter;
};

exports.getAddressConfigurations = async (req, res) => {
  try {
    const data = await AdmissionAddressConfiguration.find(buildFilter(req.query)).sort({ country: 1, state: 1, district: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createAddressConfiguration = async (req, res) => {
  try {
    const country = text(req.body.country);
    const state = text(req.body.state);
    const district = text(req.body.district);
    if (!req.body.colid || !country || !state || !district) {
      return res.status(400).json({ msg: 'Country, state and district are required' });
    }

    const data = await AdmissionAddressConfiguration.create({
      colid: Number(req.body.colid),
      country,
      state,
      district,
      isactive: req.body.isactive || 'Yes',
      user: req.body.user || ''
    });
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'This country, state and district already exists' });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateAddressConfiguration = async (req, res) => {
  try {
    const country = text(req.body.country);
    const state = text(req.body.state);
    const district = text(req.body.district);
    if (!req.body.id || !req.body.colid || !country || !state || !district) {
      return res.status(400).json({ msg: 'Country, state and district are required' });
    }

    const data = await AdmissionAddressConfiguration.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      {
        country,
        state,
        district,
        isactive: req.body.isactive || 'Yes',
        user: req.body.user || ''
      },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'This country, state and district already exists' });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteAddressConfiguration = async (req, res) => {
  try {
    await AdmissionAddressConfiguration.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkAddressConfigurations = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!colid) return res.status(400).json({ msg: 'College id is required' });
    if (!items.length) return res.status(400).json({ msg: 'No rows received' });

    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const rowNumber = item.rowNumber || index + 2;
      const country = text(item.country || item.Country);
      const state = text(item.state || item.State);
      const district = text(item.district || item.District);
      if (!country || !state || !district) {
        errors.push({ rowNumber, msg: 'Country, state and district are required' });
        continue;
      }
      try {
        await AdmissionAddressConfiguration.findOneAndUpdate(
          { colid, country, state, district },
          { colid, country, state, district, isactive: item.isactive || item.Active || 'Yes', user: req.body.user || '' },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }

    res.json({ saved, errors });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
