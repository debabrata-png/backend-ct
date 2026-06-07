const ConductExamInvigilation = require("../Models/conductexaminvigilationds");
const ConductExamCourse = require("../Models/conductexamcourseds");
const User = require("../Models/user");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const money = (value) => {
  if (value === "" || value === null || value === undefined) return 0;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const uniq = (values) => [...new Set(values.map((item) => text(item)).filter(Boolean))].sort((a, b) => a.localeCompare(b));

const payload = (body = {}) => ({
  colid: number(body.colid),
  academicyear: text(body.academicyear || body.academicYear),
  regulation: text(body.regulation),
  exam: text(body.exam || body.examname),
  examcode: text(body.examcode),
  invigilatorname: text(body.invigilatorname || body.invigilatorName),
  invigilatoremail: text(body.invigilatoremail || body.invigilatorEmail),
  invigilatorcourse: text(body.invigilatorcourse || body.invigilatorCourse),
  invigilatorcoursecode: text(body.invigilatorcoursecode || body.invigilatorCoursecode || body.invigilatorCourseCode),
  amountpersession: money(body.amountpersession || body.amountPerSession),
  user: text(body.user)
});

const validate = (item) => {
  if (item.colid === undefined) return "colid is required";
  for (const field of ["academicyear", "regulation", "exam", "examcode", "invigilatorname", "invigilatoremail"]) {
    if (!item[field]) return `${field} is required`;
  }
  return "";
};

const buildFilter = (source = {}) => {
  const filter = {};
  const colid = number(source.colid);
  if (colid !== undefined) filter.colid = colid;
  ["academicyear", "regulation", "exam", "examcode", "invigilatorname", "invigilatoremail", "invigilatorcourse", "invigilatorcoursecode"].forEach((field) => {
    if (source[field]) filter[field] = source[field];
  });
  return filter;
};

exports.getInvigilation = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ConductExamInvigilation.find(filter).sort({ academicyear: -1, exam: 1, invigilatorname: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveInvigilation = async (req, res) => {
  try {
    const item = payload(req.body);
    const error = validate(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await ConductExamInvigilation.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await ConductExamInvigilation.create(item);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteInvigilation = async (req, res) => {
  try {
    await ConductExamInvigilation.findOneAndDelete({ _id: req.body.id, colid: number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.bulkInvigilation = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = payload({ ...items[index], colid: req.body.colid || items[index].colid, user: req.body.user || items[index].user });
      const error = validate(item);
      if (error) {
        errors.push({ rowNumber: items[index].rowNumber || index + 2, message: error });
        continue;
      }
      await ConductExamInvigilation.create(item);
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.options = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [courses, invigilations, users] = await Promise.all([
      ConductExamCourse.find({ colid }).sort({ academicyear: -1, exam: 1, program: 1, course: 1 }).lean(),
      ConductExamInvigilation.find({ colid }).lean(),
      User.find({ colid, role: { $not: /^student$/i } }).select("name email role department").sort({ name: 1, email: 1 }).lean()
    ]);
    const all = [...courses, ...invigilations];
    res.json({
      success: true,
      courses,
      users: users.map((user) => ({ _id: user._id, name: user.name || "", email: user.email || "", role: user.role || "", department: user.department || "" })),
      academicyears: uniq(all.map((row) => row.academicyear)),
      regulations: uniq(all.map((row) => row.regulation)),
      exams: uniq(all.map((row) => row.exam)),
      examcodes: uniq(all.map((row) => row.examcode)),
      invigilatornames: uniq(invigilations.map((row) => row.invigilatorname)),
      invigilatoremails: uniq(invigilations.map((row) => row.invigilatoremail)),
      invigilatorcoursecodes: uniq(invigilations.map((row) => row.invigilatorcoursecode))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
