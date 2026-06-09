const ConductExamCourse = require("../Models/conductexamcourseds");
const ConductExamRoll = require("../Models/conductexamrollds");
const ConductExamStationary = require("../Models/conductexamstationaryds");
const Institution = require("../Models/insdetails");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const colNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const uniq = (values = []) => [...new Set(values.map((item) => text(item)).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const payload = (body = {}) => ({
  colid: colNumber(body.colid),
  academicyear: text(body.academicyear),
  regulation: text(body.regulation),
  program: text(body.program),
  programcode: text(body.programcode),
  coursetype: ["Theory", "Practical"].includes(text(body.coursetype)) ? text(body.coursetype) : "Theory",
  category: text(body.category),
  item: text(body.item),
  noofunits: number(body.noofunits || body["no. of units"] || body.noOfUnits),
  unittype: ["no", "ltr", "mm", "cm", "m", "gallons"].includes(text(body.unittype || body.unitType)) ? text(body.unittype || body.unitType) : "no",
  user: text(body.user)
});

const validate = (item) => {
  if (item.colid === undefined) return "colid is required";
  for (const field of ["academicyear", "regulation", "program", "coursetype", "category", "item", "unittype"]) {
    if (!item[field]) return `${field} is required`;
  }
  if (item.noofunits < 0) return "No. of units cannot be negative";
  return "";
};

const filterFrom = (source = {}) => {
  const filter = {};
  const colid = colNumber(source.colid);
  if (colid !== undefined) filter.colid = colid;
  ["academicyear", "regulation", "program", "programcode", "coursetype", "category", "item", "unittype"].forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  return filter;
};

const upsertFilter = (item) => ({
  colid: item.colid,
  academicyear: item.academicyear,
  regulation: item.regulation,
  programcode: item.programcode,
  program: item.program,
  coursetype: item.coursetype,
  category: item.category,
  item: item.item,
  unittype: item.unittype
});

exports.options = async (req, res) => {
  try {
    const filter = filterFrom(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [courses, stationary] = await Promise.all([
      ConductExamCourse.find({ colid: filter.colid }).sort({ academicyear: -1, program: 1 }).lean(),
      ConductExamStationary.find({ colid: filter.colid }).lean()
    ]);
    res.json({
      success: true,
      courses,
      stationary,
      academicyears: uniq([...courses.map((row) => row.academicyear), ...stationary.map((row) => row.academicyear)]),
      regulations: uniq([...courses.map((row) => row.regulation), ...stationary.map((row) => row.regulation)]),
      exams: uniq(courses.map((row) => `${row.examcode}||${row.exam}`)).map((value) => {
        const [examcode, exam] = value.split("||");
        return { examcode, exam };
      }),
      programs: uniq([...courses.map((row) => `${row.programcode || ""}||${row.program}`), ...stationary.map((row) => `${row.programcode || ""}||${row.program}`)]).map((value) => {
        const [programcode, program] = value.split("||");
        return { programcode, program };
      }).filter((row) => row.program || row.programcode)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStationary = async (req, res) => {
  try {
    const filter = filterFrom(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ConductExamStationary.find(filter).sort({ academicyear: -1, program: 1, coursetype: 1, category: 1, item: 1 }).lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveStationary = async (req, res) => {
  try {
    const item = payload(req.body);
    const error = validate(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await ConductExamStationary.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await ConductExamStationary.findOneAndUpdate(upsertFilter(item), item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? "Stationary item already exists for this selection" : error.message });
  }
};

exports.deleteStationary = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.body.id) return res.status(400).json({ success: false, message: "id is required" });
    const result = await ConductExamStationary.deleteOne({ _id: req.body.id, colid });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkStationary = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = colNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "No rows found" });
    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = payload({ ...items[index], colid, user: req.body.user || items[index].user });
      const error = validate(item);
      if (error) {
        errors.push({ rowNumber: items[index].rowNumber || index + 2, message: error });
        continue;
      }
      await ConductExamStationary.findOneAndUpdate(upsertFilter(item), item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.requirement = async (req, res) => {
  try {
    const filter = filterFrom(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!filter.academicyear || !text(req.query.examcode)) return res.status(400).json({ success: false, message: "Academic year and exam code are required" });
    const courseFilter = { colid: filter.colid, academicyear: filter.academicyear, examcode: text(req.query.examcode) };
    ["regulation", "program", "programcode"].forEach((field) => {
      if (filter[field]) courseFilter[field] = filter[field];
    });
    const courses = await ConductExamCourse.find(courseFilter).sort({ program: 1, coursetype: 1, course: 1 }).lean();
    const courseTypeByCode = courses.reduce((acc, row) => {
      acc[text(row.coursecode)] = text(row.coursetype) || "Theory";
      return acc;
    }, {});
    const rollFilter = { ...courseFilter, applied: "Yes" };
    const appliedRows = await ConductExamRoll.find(rollFilter).select("coursecode").lean();
    const counts = appliedRows.reduce((acc, row) => {
      const type = courseTypeByCode[text(row.coursecode)] || "Theory";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    const courseCounts = courses.reduce((acc, row) => {
      const type = text(row.coursetype) || "Theory";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    const stationaryFilter = { colid: filter.colid, academicyear: filter.academicyear };
    ["regulation", "program", "programcode"].forEach((field) => {
      if (filter[field]) stationaryFilter[field] = filter[field];
    });
    const stationary = await ConductExamStationary.find(stationaryFilter).sort({ coursetype: 1, category: 1, item: 1 }).lean();
    const rows = stationary.map((item) => {
      const courseCount = counts[item.coursetype] || 0;
      return {
        ...item,
        courseCount,
        examCount: courseCounts[item.coursetype] || 0,
        totalunits: Number((Number(item.noofunits || 0) * courseCount).toFixed(2))
      };
    });
    const totals = rows.reduce((acc, row) => {
      const key = `${row.category}||${row.item}||${row.unittype}`;
      if (!acc[key]) acc[key] = { category: row.category, item: row.item, unittype: row.unittype, totalunits: 0 };
      acc[key].totalunits += Number(row.totalunits || 0);
      return acc;
    }, {});
    const institution = await Institution.findOne({ colid: filter.colid }).sort({ _id: -1 }).lean();
    res.json({
      success: true,
      rows,
      courses,
      summary: Object.values(totals).map((row) => ({ ...row, totalunits: Number(row.totalunits.toFixed(2)) })),
      counts: {
        Theory: counts.Theory || 0,
        Practical: counts.Practical || 0,
        total: appliedRows.length,
        theoryExams: courseCounts.Theory || 0,
        practicalExams: courseCounts.Practical || 0,
        totalExams: courses.length
      },
      institution
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
