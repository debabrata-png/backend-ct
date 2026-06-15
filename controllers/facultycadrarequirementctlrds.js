const User = require("../Models/user");

const clean = (value) => String(value || "").trim();
const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const classifyDesignation = (value) => {
  const designation = clean(value).toLowerCase();
  if (!designation) return "other";
  if (designation.includes("assistant professor") || designation.includes("asst professor") || designation.includes("asst. professor")) return "assistantprofessor";
  if (designation.includes("associate professor") || designation.includes("assoc professor") || designation.includes("assoc. professor")) return "associateprofessor";
  if (designation.includes("professor")) return "professor";
  return "other";
};

exports.getFacultyCadraUserSummary = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const academicyear = clean(req.body.academicyear);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!academicyear) return res.status(400).json({ success: false, message: "Academic year is required" });

    const [studentAgg, facultyRows] = await Promise.all([
      User.aggregate([
        {
          $match: {
            colid,
            role: { $regex: /^Student$/i },
            academicyear
          }
        },
        {
          $group: {
            _id: {
              program: { $ifNull: ["$program", "Not specified"] },
              programcode: { $ifNull: ["$programcode", ""] }
            },
            studentcount: { $sum: 1 }
          }
        },
        { $sort: { studentcount: -1, "_id.program": 1 } }
      ]),
      User.find({
        colid,
        status: 1,
        role: { $not: /^Student$/i }
      }).select("designation customFields name email role").lean()
    ]);

    const designationCounts = {
      professor: 0,
      associateprofessor: 0,
      assistantprofessor: 0,
      other: 0
    };

    facultyRows.forEach((row) => {
      const customDesignation = row.customFields instanceof Map
        ? row.customFields.get("designation")
        : row.customFields?.designation;
      const key = classifyDesignation(row.designation || customDesignation);
      designationCounts[key] += 1;
    });

    res.json({
      success: true,
      students: studentAgg.map((row) => ({
        program: row._id.program || "Not specified",
        programcode: row._id.programcode || "",
        studentcount: row.studentcount || 0
      })),
      faculty: {
        ...designationCounts,
        total: designationCounts.professor + designationCounts.associateprofessor + designationCounts.assistantprofessor,
        totalactive: facultyRows.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
