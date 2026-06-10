const IdCardTemplate = require("../Models/idcardtemplateds");
const User = require("../Models/user");
const Institution = require("../Models/insdetails");

const text = (value) => String(value ?? "").trim();
const lower = (value) => text(value).toLowerCase();
const escapeRegex = (value) => text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cleanKey = (value) => text(value).replace(/[^a-zA-Z0-9_.-]/g, "");
const optionFields = ["academicyear", "admissionyear", "program", "programcode", "regulation", "semester", "section", "Major", "Minor", "IDC", "SEC", "VAC", "category", "gender", "department", "name", "email", "phone", "regno"];

const templateShell = (accent, body, extra = "") => `
<div class="id-card" style="width:340px;height:540px;border-radius:18px;overflow:hidden;background:#fff;border:1px solid #d7dde8;font-family:Arial,sans-serif;box-shadow:0 12px 30px rgba(15,23,42,.16);position:relative;">
  <div style="height:110px;background:${accent};color:#fff;padding:16px;text-align:center;">
    <img src="{{logo}}" style="height:42px;max-width:70px;object-fit:contain;background:#fff;border-radius:8px;padding:3px;" />
    <div style="font-size:17px;font-weight:800;margin-top:7px;">{{institution}}</div>
  </div>
  ${body}
  ${extra}
  <div style="position:absolute;bottom:10px;left:18px;right:18px;text-align:center;font-size:10px;color:#64748b;">{{address}}</div>
</div>`;

const defaultTemplates = [
  ["Classic Blue", "#1d4ed8", `<div style="padding:18px;text-align:center;"><img src="{{photo}}" style="width:118px;height:138px;object-fit:cover;border:4px solid #1d4ed8;border-radius:12px;" /><h2 style="margin:12px 0 4px;color:#0f172a;">{{name}}</h2><div style="color:#1d4ed8;font-weight:800;">{{regno}}</div><div style="margin-top:14px;text-align:left;font-size:13px;line-height:1.9;"><b>Program:</b> {{program}}<br/><b>Semester:</b> {{semester}} {{section}}<br/><b>Email:</b> {{email}}<br/><b>Phone:</b> {{phone}}</div></div>`],
  ["Crimson Vertical", "#b91c1c", `<div style="padding:16px;text-align:center;"><div style="font-size:11px;font-weight:800;color:#b91c1c;letter-spacing:2px;margin-bottom:8px;">STUDENT IDENTITY CARD</div><img src="{{photo}}" style="width:126px;height:126px;object-fit:cover;border-radius:50%;border:5px solid #fee2e2;" /><h2 style="margin:14px 0 4px;">{{name}}</h2><div style="background:#fee2e2;color:#991b1b;border-radius:999px;padding:6px 10px;font-weight:800;">{{programcode}} / {{regno}}</div><p style="font-size:13px;text-align:left;line-height:1.8;margin-top:14px;">Category: {{category}}<br/>Gender: {{gender}}<br/>Email: {{email}}<br/>Phone: {{phone}}</p></div>`],
  ["Emerald Minimal", "#047857", `<div style="padding:20px;"><div style="display:flex;gap:14px;align-items:center;"><img src="{{photo}}" style="width:112px;height:136px;object-fit:cover;border-radius:8px;" /><div><h2 style="margin:0;color:#064e3b;">{{name}}</h2><p style="margin:6px 0;color:#047857;font-weight:800;">{{role}}</p><p style="font-size:12px;line-height:1.6;">{{program}}<br/>{{regno}}</p></div></div><div style="margin-top:20px;border-top:2px solid #d1fae5;padding-top:14px;font-size:13px;line-height:1.8;">Academic Year: {{academicyear}}<br/>Major: {{Major}}<br/>Email: {{email}}<br/>Phone: {{phone}}</div></div>`],
  ["Slate Professional", "#0f172a", `<div style="padding:18px;text-align:center;"><img src="{{photo}}" style="width:150px;height:170px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /><h2 style="margin:12px 0 0;">{{name}}</h2><div style="color:#475569;font-weight:700;">{{regno}}</div><table style="width:100%;font-size:12px;margin-top:14px;text-align:left;border-collapse:collapse;"><tr><td><b>Program</b></td><td>{{program}}</td></tr><tr><td><b>Semester</b></td><td>{{semester}}</td></tr><tr><td><b>Section</b></td><td>{{section}}</td></tr><tr><td><b>Phone</b></td><td>{{phone}}</td></tr></table></div>`],
  ["Purple Wave", "linear-gradient(135deg,#6d28d9,#a21caf)", `<div style="padding:18px;text-align:center;"><img src="{{photo}}" style="width:122px;height:142px;object-fit:cover;border-radius:20px;border:4px solid #ede9fe;" /><h2 style="margin:12px 0 4px;color:#581c87;">{{name}}</h2><div style="font-weight:800;color:#7e22ce;">{{program}}</div><div style="margin:14px auto;padding:10px;border-radius:12px;background:#faf5ff;text-align:left;font-size:13px;line-height:1.8;">Reg No: {{regno}}<br/>Email: {{email}}<br/>Phone: {{phone}}<br/>Year: {{academicyear}}</div></div>`],
  ["Gold Prestige", "#ca8a04", `<div style="padding:18px;text-align:center;background:#fffbeb;height:100%;box-sizing:border-box;"><img src="{{photo}}" style="width:125px;height:145px;object-fit:cover;border-radius:8px;border:5px solid #facc15;" /><h2 style="margin:13px 0 4px;color:#713f12;">{{name}}</h2><div style="font-weight:900;color:#a16207;">{{regno}}</div><p style="font-size:13px;line-height:1.9;text-align:left;">Program: {{program}}<br/>Code: {{programcode}}<br/>Semester: {{semester}}<br/>Blood Group: {{bloodgroup}}<br/>Phone: {{phone}}</p></div>`],
  ["Teal Compact", "#0f766e", `<div style="padding:14px;"><div style="display:grid;grid-template-columns:105px 1fr;gap:12px;align-items:center;"><img src="{{photo}}" style="width:105px;height:128px;object-fit:cover;border-radius:10px;" /><div><h2 style="font-size:18px;margin:0;">{{name}}</h2><b style="color:#0f766e;">{{regno}}</b><p style="font-size:11px;line-height:1.5;">{{email}}<br/>{{phone}}</p></div></div><div style="font-size:12px;line-height:1.8;margin-top:16px;background:#ecfeff;padding:12px;border-radius:12px;">{{program}}<br/>{{Major}} / {{Minor}}<br/>Semester {{semester}}, Section {{section}}</div></div>`],
  ["Orange Badge", "#ea580c", `<div style="padding:20px;text-align:center;"><div style="display:inline-block;padding:6px 14px;border-radius:999px;background:#ffedd5;color:#c2410c;font-weight:900;margin-bottom:10px;">ID CARD</div><img src="{{photo}}" style="width:132px;height:132px;object-fit:cover;border-radius:18px;" /><h2 style="margin:13px 0 2px;color:#7c2d12;">{{name}}</h2><div>{{regno}}</div><div style="margin-top:16px;font-size:13px;line-height:1.8;">{{program}}<br/>{{department}}<br/>{{email}}<br/>{{phone}}</div></div>`],
  ["Navy Landscape", "#1e3a8a", `<div style="padding:16px;text-align:center;"><img src="{{photo}}" style="width:150px;height:115px;object-fit:cover;border-radius:10px;border:3px solid #bfdbfe;" /><h2 style="margin:11px 0 4px;color:#1e3a8a;">{{name}}</h2><div style="font-weight:800;">{{regno}}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:left;font-size:12px;margin-top:14px;"><span><b>Program</b><br/>{{programcode}}</span><span><b>Semester</b><br/>{{semester}}</span><span><b>Category</b><br/>{{category}}</span><span><b>Phone</b><br/>{{phone}}</span></div></div>`],
  ["Clean White", "#334155", `<div style="padding:22px;text-align:center;"><img src="{{photo}}" style="width:120px;height:150px;object-fit:cover;border-radius:4px;border:1px solid #94a3b8;" /><h2 style="margin:15px 0 3px;color:#111827;">{{name}}</h2><div style="font-weight:800;color:#334155;">{{regno}}</div><hr style="border:0;border-top:1px solid #e2e8f0;margin:15px 0;" /><div style="font-size:13px;line-height:1.8;text-align:left;">Program: {{program}}<br/>Academic Year: {{academicyear}}<br/>Email: {{email}}<br/>Phone: {{phone}}</div></div>`]
];

const seedDefaults = async (colid, user = "") => {
  const count = await IdCardTemplate.countDocuments({ colid, isdefault: "Yes" });
  if (count >= 10) return;
  const docs = defaultTemplates.map(([templatename, accent, body], index) => ({
    colid,
    templatename,
    description: `Default ID card template ${index + 1}`,
    html: templateShell(accent, body),
    orientation: index === 8 ? "Landscape" : "Portrait",
    isdefault: "Yes",
    status: "Active",
    user
  }));
  await IdCardTemplate.insertMany(docs);
};

const templatePayload = (body) => ({
  templatename: text(body.templatename),
  description: text(body.description),
  html: String(body.html || ""),
  orientation: text(body.orientation || "Portrait"),
  isdefault: text(body.isdefault || "No"),
  status: text(body.status || "Active"),
  user: text(body.user)
});

const filterQuery = (colid, filters = []) => {
  const query = { colid, role: /^Student$/i };
  (filters || []).forEach((filter) => {
    const field = cleanKey(filter.field);
    const value = text(filter.value);
    if (!field || !value) return;
    if (["name", "email", "phone", "regno"].includes(field)) query[field] = { $regex: escapeRegex(value), $options: "i" };
    else query[field] = value;
  });
  return query;
};

const flattenUser = (student = {}, institution = {}) => {
  const customFields = student.customFields instanceof Map ? Object.fromEntries(student.customFields) : (student.customFields || {});
  return {
    ...student,
    ...customFields,
    institution: student.institution || institution.institutionname || "",
    institutionname: institution.institutionname || student.institution || "",
    address: institution.address || "",
    studentaddress: student.address || "",
    institutionaddress: institution.address || "",
    logo: institution.logolink || "",
    photo: student.photo || "",
    colid: student.colid
  };
};

const renderTemplate = (html, data) => String(html || "").replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, key) => {
  const value = data[key];
  if (value === undefined || value === null) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
});

exports.getTemplates = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    await seedDefaults(colid, text(req.query.user));
    const data = await IdCardTemplate.find({ colid }).sort({ isdefault: -1, templatename: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveTemplate = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const payload = templatePayload(req.body);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!payload.templatename || !payload.html) return res.status(400).json({ success: false, message: "Template name and HTML are required" });
    const data = req.body.id
      ? await IdCardTemplate.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true })
      : await IdCardTemplate.create({ ...payload, colid });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    await IdCardTemplate.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const options = {};
    await Promise.all(optionFields.map(async (field) => {
      const values = await User.distinct(field, { colid, role: /^Student$/i });
      options[field] = values.map(text).filter(Boolean).sort((a, b) => a.localeCompare(b));
    }));
    res.json({ success: true, fields: optionFields, options });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const data = await User.find(filterQuery(colid, req.body.filters)).select("-__v").sort({ name: 1 }).limit(100).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateCard = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const [template, student, institution] = await Promise.all([
      IdCardTemplate.findOne({ _id: req.body.templateid, colid }).lean(),
      User.findOne({ _id: req.body.studentid, colid }).lean(),
      Institution.findOne({ colid }).lean()
    ]);
    if (!template) return res.status(404).json({ success: false, message: "Template not found" });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    const data = flattenUser(student, institution || {});
    res.json({ success: true, html: renderTemplate(template.html, data), data, template });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
