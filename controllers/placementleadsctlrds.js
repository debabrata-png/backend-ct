const PlacementLead = require('../Models/placementleadds');
const PlacementLeadStage = require('../Models/placementleadstageds');
const PlacementVisitPlan = require('../Models/placementvisitplands');
const User = require('../Models/user');

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || '').trim();

const baseKeys = new Set([
  'id',
  '_id',
  'colid',
  'companyname',
  'company name',
  'company',
  'leadname',
  'lead name',
  'name',
  'leademail',
  'lead email',
  'email',
  'leadphone',
  'lead phone',
  'phone',
  'leadstatus',
  'lead status',
  'status',
  'completed',
  'user',
  'customfields',
  'createdat',
  'updatedat'
]);

const normalizeKey = (key) => text(key).toLowerCase().replace(/[\s_]+/g, '');

const firstValue = (row, keys) => {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && text(row[key]) !== '') return row[key];
  }
  const normalized = {};
  Object.keys(row || {}).forEach((key) => { normalized[normalizeKey(key)] = row[key]; });
  for (const key of keys) {
    const value = normalized[normalizeKey(key)];
    if (value !== undefined && value !== null && text(value) !== '') return value;
  }
  return '';
};

const customFieldsFromRow = (row = {}) => {
  const custom = { ...(row.customfields || {}) };
  Object.keys(row).forEach((key) => {
    if (!baseKeys.has(text(key).toLowerCase())) custom[text(key)] = row[key];
  });
  Object.keys(custom).forEach((key) => {
    if (!text(key)) delete custom[key];
  });
  return custom;
};

const payloadFromBody = (body = {}) => ({
  colid: toNumber(body.colid),
  companyname: text(body.companyname || body.companyName || body['company name'] || body.company),
  leadname: text(body.leadname || body.leadName || body['lead name'] || body.name),
  leademail: text(body.leademail || body.leadEmail || body['lead email'] || body.email).toLowerCase(),
  leadphone: text(body.leadphone || body.leadPhone || body['lead phone'] || body.phone),
  leadstatus: text(body.leadstatus || body.leadStatus || body['lead status'] || body.status),
  completed: text(body.completed || 'No') || 'No',
  customfields: customFieldsFromRow(body),
  user: text(body.user)
});

exports.getLeadStages = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const data = await PlacementLeadStage.find({ colid }).sort({ order: 1, stage: 1 }).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.saveLeadStage = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const stage = text(req.body.stage);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!stage) return res.status(400).json({ msg: 'Stage is required' });
    const payload = {
      colid,
      stage,
      description: text(req.body.description),
      isactive: text(req.body.isactive || 'Yes') || 'Yes',
      order: Number(req.body.order || 0),
      user: text(req.body.user)
    };
    const data = req.body.id
      ? await PlacementLeadStage.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true, runValidators: true })
      : await PlacementLeadStage.findOneAndUpdate({ colid, stage }, payload, { upsert: true, new: true, runValidators: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteLeadStage = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });
    await PlacementLeadStage.findOneAndDelete({ _id: req.body.id, colid });
    res.json({ success: true, msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPlacementLeads = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const data = await PlacementLead.find({ colid }).sort({ createdAt: -1 }).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createPlacementLead = async (req, res) => {
  try {
    const payload = payloadFromBody(req.body);
    if (payload.colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!payload.companyname || !payload.leadname) {
      return res.status(400).json({ msg: 'Company name and lead name are required' });
    }
    const data = await PlacementLead.create(payload);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updatePlacementLead = async (req, res) => {
  try {
    const payload = payloadFromBody(req.body);
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });
    if (payload.colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const data = await PlacementLead.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      payload,
      { new: true, runValidators: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deletePlacementLead = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });
    await PlacementLead.findOneAndDelete({ _id: req.body.id, colid });
    res.json({ success: true, msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkPlacementLeads = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
    if (!rows.length) return res.status(400).json({ msg: 'No rows found for upload' });

    const docs = rows.map((row) => ({
      colid,
      companyname: text(firstValue(row, ['companyname', 'companyName', 'Company Name', 'company'])),
      leadname: text(firstValue(row, ['leadname', 'leadName', 'Lead Name', 'name'])),
      leademail: text(firstValue(row, ['leademail', 'leadEmail', 'Lead Email', 'email'])).toLowerCase(),
      leadphone: text(firstValue(row, ['leadphone', 'leadPhone', 'Lead Phone', 'phone'])),
      leadstatus: text(firstValue(row, ['leadstatus', 'leadStatus', 'Lead Status', 'status'])),
      completed: text(firstValue(row, ['completed', 'Completed'])) || 'No',
      customfields: customFieldsFromRow(row),
      user: text(req.body.user || row.user)
    })).filter((item) => item.companyname && item.leadname);

    if (!docs.length) return res.status(400).json({ msg: 'No valid rows found. Company name and lead name are required.' });

    const inserted = await PlacementLead.insertMany(docs, { ordered: false });
    res.json({ success: true, inserted: inserted.length });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPlacementUsers = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const users = await User.find({
      colid,
      role: { $not: /^Student$/i },
      email: { $exists: true, $ne: '' }
    }).select('name email department role').sort({ name: 1, email: 1 }).lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createVisitPlan = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const leadid = text(req.body.leadid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!leadid) return res.status(400).json({ msg: 'Lead is required' });
    if (!req.body.planneddate) return res.status(400).json({ msg: 'Planned date is required' });

    const lead = await PlacementLead.findOne({ _id: leadid, colid }).lean();
    if (!lead) return res.status(404).json({ msg: 'Placement lead not found' });

    const data = await PlacementVisitPlan.create({
      colid,
      leadid,
      companyname: lead.companyname,
      leadname: lead.leadname,
      leademail: lead.leademail,
      leadphone: lead.leadphone,
      assigneduser: text(req.body.assigneduser || req.body.user),
      assignedname: text(req.body.assignedname || req.body.name),
      planneddate: req.body.planneddate,
      comments: text(req.body.comments),
      description: text(req.body.description),
      user: text(req.body.user)
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getVisitPlans = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const query = { colid };
    if (req.query.assigneduser) query.assigneduser = text(req.query.assigneduser);
    if (req.query.leadid) query.leadid = text(req.query.leadid);
    if (req.query.startdate || req.query.enddate) {
      query.planneddate = {};
      if (req.query.startdate) query.planneddate.$gte = new Date(req.query.startdate);
      if (req.query.enddate) {
        const end = new Date(req.query.enddate);
        end.setHours(23, 59, 59, 999);
        query.planneddate.$lte = end;
      }
    }
    const data = await PlacementVisitPlan.find(query).sort({ planneddate: 1, companyname: 1 }).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateVisitPlanWork = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    if (!req.body.id) return res.status(400).json({ msg: 'id is required' });

    const update = {
      workdone: text(req.body.workdone),
      nextfollowupdate: req.body.nextfollowupdate || null
    };
    const data = await PlacementVisitPlan.findOneAndUpdate(
      { _id: req.body.id, colid },
      update,
      { new: true, runValidators: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
