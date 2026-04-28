const XLSX = require("xlsx");
const MeritList = require("../Models/meritlist");

let legacyIndexDropAttempted = false;

const fields = [
  "student",
  "phone",
  "email",
  "category",
  "colid",
  "academicyear",
  "programname",
  "subjects",
  "externaltheorymarks",
  "sscaggregatemarks",
  "tenthmarks",
  "englishmarks",
  "age",
  "bridgecourserequired",
  "status"
];

const numericFields = new Set([
  "colid",
  "externaltheorymarks",
  "sscaggregatemarks",
  "tenthmarks",
  "englishmarks",
  "age"
]);

const aliases = {
  student: ["student", "studentname", "name"],
  phone: ["phone", "mobile", "mobileno", "contact", "contactno"],
  email: ["email", "emailid"],
  category: ["category"],
  colid: ["colid", "collegeid", "institutionid"],
  academicyear: ["academicyear", "academic_year", "year"],
  programname: ["programname", "program", "programme", "programmename", "course"],
  subjects: ["subjects", "subject"],
  externaltheorymarks: ["externaltheorymarks", "externaltheory", "theorymarks"],
  sscaggregatemarks: ["sscaggregatemarks", "qualifyingmarks", "sscaggregate", "sscmarks"],
  tenthmarks: ["tenthmarks", "10thmarks", "tenth", "class10marks"],
  englishmarks: ["englishmarks", "english"],
  age: ["age"],
  bridgecourserequired: ["bridgecourserequired", "bridgecourse", "bridgecourse_required"],
  status: ["status"]
};

const aliasLookup = Object.entries(aliases).reduce((acc, [field, names]) => {
  names.forEach((name) => {
    acc[normalizeKey(name)] = field;
  });
  return acc;
}, {});

function normalizeKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function cleanPayload(input = {}, fallbackColid) {
  const output = {};

  Object.entries(input).forEach(([key, value]) => {
    const field = aliasLookup[normalizeKey(key)] || key;
    if (!fields.includes(field)) {
      return;
    }
    output[field] = numericFields.has(field) ? toNumber(value) : String(value || "").trim();
  });

  if ((output.colid === undefined || output.colid === null) && fallbackColid) {
    output.colid = toNumber(fallbackColid);
  }

  if (!output.academicyear) {
    output.academicyear = "2026-27";
  }

  output.bridgecourserequired = getBridgeCourseRequired(output);

  return output;
}

function getBridgeCourseRequired(payload) {
  const program = String(payload.programname || "").toLowerCase();
  const subjects = String(payload.subjects || "").toLowerCase();

  const hasAccountacy = subjects.includes("accountacy") || subjects.includes("accountancy");

  if (program.includes("b.com") && !hasAccountacy) {
    return "Yes";
  }

  return payload.bridgecourserequired || "No";
}

async function dropLegacyUniqueIndexIfNeeded() {
  if (legacyIndexDropAttempted) {
    return;
  }

  legacyIndexDropAttempted = true;
  try {
    await MeritList.collection.dropIndex("colid_1_programId_1_academicYear_1_meritListNumber_1");
  } catch (error) {
    if (error.codeName !== "IndexNotFound" && error.code !== 27) {
      console.log("Could not drop legacy merit list unique index:", error.message);
    }
  }
}

function buildQuery(req) {
  const query = {};
  const colid = toNumber(req.query.colid || req.body.colid);

  if (colid !== undefined) {
    query.colid = colid;
  }

  ["category", "programname", "status"].forEach((field) => {
    if (req.query[field]) {
      query[field] = req.query[field];
    }
  });

  if (req.query.academicyear) {
    if (req.query.academicyear === "2026-27") {
      query.$and = [
        ...(query.$and || []),
        {
          $or: [
            { academicyear: req.query.academicyear },
            { academicyear: { $exists: false } },
            { academicyear: "" },
            { academicyear: null }
          ]
        }
      ];
    } else {
      query.academicyear = req.query.academicyear;
    }
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    query.$or = [
      { student: searchRegex },
      { phone: searchRegex },
      { email: searchRegex },
      { category: searchRegex },
      { programname: searchRegex },
      { status: searchRegex }
    ];
  }

  return query;
}

exports.createMeritList = async (req, res) => {
  try {
    await dropLegacyUniqueIndexIfNeeded();
    const payload = cleanPayload(req.body);
    if (payload.colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const merit = await MeritList.create(payload);
    res.status(201).json({ success: true, data: merit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMeritLists = async (req, res) => {
  try {
    const query = buildQuery(req);
    if (query.colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const data = await MeritList.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAppliedMeritLists = async (req, res) => {
  try {
    const query = buildQuery(req);
    query.status = "Applied";

    if (query.colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const data = await MeritList.find(query).sort({
      externaltheorymarks: -1,
      sscaggregatemarks: -1,
      englishmarks: -1,
      tenthmarks: -1,
      age: -1,
      student: 1
    });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMeritListById = async (req, res) => {
  try {
    const data = await MeritList.findById(req.query.id || req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Merit list record not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMeritList = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const payload = cleanPayload(req.body);
    delete payload.id;

    const data = await MeritList.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!data) {
      return res.status(404).json({ success: false, message: "Merit list record not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMeritListStatus = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const status = req.body.status || req.query.status;
    const allowedStatuses = ["Applied", "Selected", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const data = await MeritList.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, message: "Merit list record not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMeritList = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const data = await MeritList.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ success: false, message: "Merit list record not found" });
    }

    res.status(200).json({ success: true, message: "Merit list record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkUploadMeritList = async (req, res) => {
  try {
    await dropLegacyUniqueIndexIfNeeded();
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "Excel file is required" });
    }

    const fallbackColid = req.body.colid || req.query.colid;
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });

    const records = rows
      .map((row) => cleanPayload(row, fallbackColid))
      .filter((row) => row.colid !== undefined);

    if (records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid rows found. Each row must have colid, or provide colid with upload."
      });
    }

    const data = await MeritList.insertMany(records);
    res.status(201).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
