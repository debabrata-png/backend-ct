const VisitingFaculty = require("../Models/visitingfacultyds");
const VisitingFacultyClass = require("../Models/visitingfacultyclassds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const facultyPayload = (body = {}) => ({
  colid: number(body.colid),
  name: text(body.name),
  address: text(body.address),
  panno: text(body.panno || body.pan || body["PAN No"]),
  profile: text(body.profile),
  photolink: text(body.photolink || body.photoLink || body.photo),
  resumelink: text(body.resumelink || body.resumeLink || body["Resume Link"]),
  documents: Array.isArray(body.documents) ? body.documents.map((item) => ({
    documenttype: text(item.documenttype || item.documentType || item.type),
    description: text(item.description),
    link: text(item.link || item.url),
    filename: text(item.filename || item.name),
    uploadedat: item.uploadedat || new Date()
  })).filter((item) => item.link) : [],
  department: text(body.department),
  paymode: text(body.paymode).toLowerCase(),
  amount: number(body.amount) || 0,
  tds: number(body.tds) || 0,
  user: text(body.user)
});

const classPayload = (body = {}) => ({
  colid: number(body.colid),
  facultyid: text(body.facultyid),
  facultyname: text(body.facultyname || body.name),
  department: text(body.department),
  classdate: text(body.classdate || body.date),
  numberofclasses: number(body.numberofclasses || body.classes || body["Number of classes"]),
  user: text(body.user)
});

const buildFilter = (source = {}, fields = []) => {
  const filter = {};
  const colid = number(source.colid);
  if (colid !== undefined) filter.colid = colid;
  fields.forEach((field) => {
    if (source[field]) filter[field] = source[field];
  });
  return filter;
};

const validateFaculty = (payload) => {
  if (payload.colid === undefined) return "colid is required";
  if (!payload.name) return "Name is required";
  if (!["hourly", "monthly", "lecturewise"].includes(payload.paymode)) return "Pay mode is required";
  return "";
};

const validateClass = (payload) => {
  if (payload.colid === undefined) return "colid is required";
  if (!payload.facultyid) return "Faculty is required";
  if (!payload.facultyname) return "Faculty name is required";
  if (!payload.classdate) return "Class date is required";
  if (payload.numberofclasses === undefined) return "Number of classes is required";
  if (payload.numberofclasses < 0) return "Number of classes cannot be negative";
  return "";
};

exports.getFaculty = async (req, res) => {
  try {
    const filter = buildFilter(req.query, ["name", "panno", "department", "paymode"]);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await VisitingFaculty.find(filter).sort({ name: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveFaculty = async (req, res) => {
  try {
    const payload = facultyPayload(req.body);
    const error = validateFaculty(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await VisitingFaculty.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true, runValidators: true })
      : await VisitingFaculty.create(payload);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    await VisitingFaculty.findOneAndDelete({ _id: req.body.id, colid: number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.bulkFaculty = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const payload = facultyPayload({ ...items[index], colid: req.body.colid || items[index].colid, user: req.body.user || items[index].user });
      const error = validateFaculty(payload);
      if (error) {
        errors.push({ rowNumber: items[index].rowNumber || index + 2, message: error });
        continue;
      }
      await VisitingFaculty.findOneAndUpdate(
        { colid: payload.colid, name: payload.name, panno: payload.panno },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
      );
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const filter = buildFilter(req.query, ["facultyid", "facultyname", "department", "classdate"]);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (req.query.fromdate || req.query.todate) {
      filter.classdate = {};
      if (req.query.fromdate) filter.classdate.$gte = req.query.fromdate;
      if (req.query.todate) filter.classdate.$lte = req.query.todate;
    }
    const data = await VisitingFacultyClass.find(filter).sort({ classdate: -1, facultyname: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveClass = async (req, res) => {
  try {
    const payload = classPayload(req.body);
    const error = validateClass(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await VisitingFacultyClass.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true, runValidators: true })
      : await VisitingFacultyClass.findOneAndUpdate(
        { colid: payload.colid, facultyid: payload.facultyid, classdate: payload.classdate },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
      );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await VisitingFacultyClass.findOneAndDelete({ _id: req.body.id, colid: number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPayable = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    const facultyid = text(req.query.facultyid);
    if (colid === undefined || !facultyid) return res.status(400).json({ success: false, message: "Faculty and colid are required" });
    const faculty = await VisitingFaculty.findOne({ _id: facultyid, colid }).lean();
    if (!faculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    const classFilter = { colid, facultyid };
    if (req.query.fromdate || req.query.todate) {
      classFilter.classdate = {};
      if (req.query.fromdate) classFilter.classdate.$gte = req.query.fromdate;
      if (req.query.todate) classFilter.classdate.$lte = req.query.todate;
    }
    const classes = await VisitingFacultyClass.find(classFilter).sort({ classdate: 1 }).lean();
    const totalClasses = classes.reduce((sum, item) => sum + (Number(item.numberofclasses) || 0), 0);
    const gross = faculty.paymode === "monthly"
      ? (classes.length ? Number(faculty.amount) || 0 : 0)
      : totalClasses * (Number(faculty.amount) || 0);
    const tdsAmount = gross * ((Number(faculty.tds) || 0) / 100);
    res.json({
      success: true,
      faculty,
      classes,
      summary: {
        totalDays: classes.length,
        totalClasses,
        paymode: faculty.paymode,
        rate: Number(faculty.amount) || 0,
        gross,
        tdsPercent: Number(faculty.tds) || 0,
        tdsAmount,
        netPayable: gross - tdsAmount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
