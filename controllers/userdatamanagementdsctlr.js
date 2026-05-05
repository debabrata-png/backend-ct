const User = require('../Models/user');
const UserCustomField = require('../Models/usercustomfieldds');

const excludedFilterFields = new Set(['_id', '__v', 'colid', 'user', 'customFields']);
const hiddenFields = new Set(['_id', '__v', 'colid', 'user', 'customFields', 'lastlogin']);

const cleanValue = (value) => {
  if (value === undefined || value === null) return '';
  return value;
};

const dateAfterDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const hasDemoText = (payload) => {
  const name = String(payload.name || '').toLowerCase();
  const email = String(payload.email || '').toLowerCase();
  return name.includes('demo') || email.includes('demo');
};

const baseUserFields = () => Object.keys(User.schema.paths).filter((field) => !hiddenFields.has(field));

const fieldOptions = (field) => {
  if (field === 'gender') return ['Male', 'Female', 'Not specified'];
  if (field === 'category') return ['General', 'SC', 'ST', 'OBC', 'EBC', 'EWS', 'PH'];
  if (field === 'isdisabled') return ['Yes', 'No'];
  return [];
};

const numericFields = () => Object.entries(User.schema.paths)
  .filter(([, path]) => path.instance === 'Number')
  .map(([field]) => field);

const normalizeCustomFields = (customFields) => {
  if (!customFields) return {};
  if (customFields instanceof Map) return Object.fromEntries(customFields);
  if (typeof customFields === 'object') return customFields;
  return {};
};

const colidOnlyFilter = (colid) => ({ colid: Number(colid) });

const userPayload = (body, customFieldDefs = []) => {
  const payload = {};
  const numberFields = new Set(numericFields());

  baseUserFields().forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = numberFields.has(field) ? Number(body[field] || 0) : cleanValue(body[field]);
    }
  });

  payload.colid = Number(body.colid);
  payload.user = body.user || '';
  payload.lastlogin = hasDemoText(payload) ? dateAfterDays(3) : dateAfterDays(365);

  const customInput = normalizeCustomFields(body.customFields);
  const customValues = {};
  customFieldDefs.forEach((field) => {
    if (customInput[field.fieldname] !== undefined) {
      customValues[field.fieldname] = customInput[field.fieldname];
    } else if (body[field.fieldname] !== undefined) {
      customValues[field.fieldname] = body[field.fieldname];
    }
  });
  payload.customFields = customValues;

  return payload;
};

const serializeUser = (row) => {
  const data = row.toObject ? row.toObject() : row;
  data.customFields = normalizeCustomFields(data.customFields);
  return data;
};

const buildFilter = (colid, filters = []) => {
  const mongoFilter = colidOnlyFilter(colid);
  const numberFields = new Set(numericFields());

  filters.forEach((filter) => {
    if (!filter?.field || excludedFilterFields.has(filter.field)) return;
    const value = filter.value;
    if (value === undefined || value === null || String(value).trim() === '') return;

    const fieldPath = String(filter.field).startsWith('customFields.')
      ? filter.field
      : filter.field;

    if (numberFields.has(filter.field)) {
      mongoFilter[fieldPath] = Number(value);
    } else {
      mongoFilter[fieldPath] = { $regex: String(value), $options: 'i' };
    }
  });

  return mongoFilter;
};

exports.getMeta = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const customFields = await UserCustomField.find({ ...colidOnlyFilter(colid), isactive: 'Yes' }).sort({ page: 1, section: 1, order: 1, label: 1 }).lean();
    const fields = baseUserFields().map((field) => ({
      field,
      label: field,
      type: User.schema.paths[field]?.instance === 'Number' ? 'number' : 'text',
      options: fieldOptions(field),
      source: 'user'
    }));
    const custom = customFields.map((field) => ({
      field: `customFields.${field.fieldname}`,
      fieldname: field.fieldname,
      label: field.label,
      type: field.type || 'text',
      options: field.options || [],
      source: 'custom'
    }));

    res.json({ fields, customFields: customFields || [], filterFields: [...fields, ...custom] });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const field = req.query.field;
    if (!field || excludedFilterFields.has(field)) return res.json([]);
    const values = await User.distinct(field, colidOnlyFilter(colid));
    res.json(values.filter((item) => item !== undefined && item !== null && String(item).trim() !== '').sort());
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const filter = buildFilter(req.body.colid, req.body.filters || []);
    const data = await User.find(filter).sort({ createdAt: -1, name: 1 }).limit(Number(req.body.limit || 1000));
    res.json(data.map(serializeUser));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const customFieldDefs = await UserCustomField.find({ ...colidOnlyFilter(colid), isactive: 'Yes' }).lean();
    const payload = userPayload(req.body, customFieldDefs);
    const data = await User.create(payload);
    res.json(serializeUser(data));
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const customFieldDefs = await UserCustomField.find({ ...colidOnlyFilter(colid), isactive: 'Yes' }).lean();
    const payload = userPayload(req.body, customFieldDefs);
    const duplicate = await User.findOne({ _id: { $ne: req.body.id }, email: payload.email });
    if (duplicate) return res.status(400).json({ msg: 'Duplicate email is not allowed' });

    const data = await User.findOneAndUpdate(
      { _id: req.body.id, ...colidOnlyFilter(colid) },
      payload,
      { new: true, runValidators: true }
    );
    res.json(serializeUser(data));
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.id, ...colidOnlyFilter(req.body.colid) });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkCreate = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ msg: 'College id is required' });
    if (items.length === 0) return res.status(400).json({ msg: 'No rows received' });

    const customFieldDefs = await UserCustomField.find({ ...colidOnlyFilter(colid), isactive: 'Yes' }).lean();
    const errors = [];
    let saved = 0;

    for (let index = 0; index < items.length; index += 1) {
      const rowNumber = items[index].rowNumber || index + 2;
      const payload = userPayload({ ...items[index], colid, user: req.body.user || items[index].user }, customFieldDefs);
      if (!payload.email) {
        errors.push({ rowNumber, msg: 'Email is required' });
        continue;
      }

      try {
        await User.findOneAndUpdate(
          { email: payload.email },
          payload,
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }

    res.json({ saved, errors });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Duplicate email is not allowed' });
    res.status(500).json({ msg: err.message });
  }
};
