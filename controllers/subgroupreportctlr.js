// controllers/reportctlr.js
const StudSubject = require("../Models/studsubjectds");

// Get filter options with cascading support
exports.getFilterOptions = async (req, res) => {
  try {
    const { colid, year, programcode, semester, groupname } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid required" });
    }

    // Build match criteria based on provided filters
    const matchCriteria = { colid: parseInt(colid) };
    if (year) matchCriteria.year = year;
    if (programcode) matchCriteria.programcode = programcode;
    if (semester) matchCriteria.semester = semester;
    if (groupname) matchCriteria.groupname = groupname;

    // Get distinct values for each filter based on previous selections
    const years = await StudSubject.distinct("year", { colid: parseInt(colid) });
    
    const programcodes = await StudSubject.distinct("programcode", { 
      colid: parseInt(colid),
      ...(year && { year })
    });
    
    const semesters = await StudSubject.distinct("semester", { 
      colid: parseInt(colid),
      ...(year && { year }),
      ...(programcode && { programcode })
    });
    
    const groupnames = await StudSubject.distinct("groupname", { 
      colid: parseInt(colid),
      ...(year && { year }),
      ...(programcode && { programcode }),
      ...(semester && { semester })
    });
    
    const subjects = await StudSubject.distinct("subject", { 
      colid: parseInt(colid),
      ...(year && { year }),
      ...(programcode && { programcode }),
      ...(semester && { semester }),
      ...(groupname && { groupname })
    });

    res.json({
      success: true,
      data: {
        years: years.filter(y => y).sort(),
        programcodes: programcodes.filter(p => p).sort(),
        semesters: semesters.filter(s => s).sort(),
        groupnames: groupnames.filter(g => g).sort(),
        subjects: subjects.filter(s => s).sort()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching filter options",
      error: error.message
    });
  }
};

// Generate report based on filters using aggregation
exports.generateReport = async (req, res) => {
  try {
    const { colid, year, programcode, semester, subject, status, groupname } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid required" });
    }

    // Build match stage
    const matchStage = { colid: parseInt(colid) };
    if (year) matchStage.year = year;
    if (programcode) matchStage.programcode = programcode;
    if (semester) matchStage.semester = semester;
    if (subject) matchStage.subject = subject;
    if (status) matchStage.status = status;
    if (groupname) matchStage.groupname = groupname;

    // Aggregation pipeline for overall statistics
    const overallStats = await StudSubject.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
          }
        }
      }
    ]);

    // Aggregation by Group
    const byGroup = await StudSubject.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$groupname",
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Aggregation by Subject
    const bySubject = await StudSubject.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$subject",
          groupname: { $first: "$groupname" },
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Aggregation by Student
    const byStudent = await StudSubject.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$regno",
          student: { $first: "$student" },
          programcode: { $first: "$programcode" },
          year: { $first: "$year" },
          semester: { $first: "$semester" },
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
          }
        }
      },
      { $sort: { student: 1 } }
    ]);

    // Get detailed applications
    const applications = await StudSubject.find(matchStage)
      .sort({ student: 1, subject: 1 })
      .lean();

    res.json({
      success: true,
      data: {
        statistics: {
          overall: overallStats[0] || { total: 0, approved: 0, rejected: 0, pending: 0 },
          byGroup: byGroup.map(g => ({ groupname: g._id, ...g })),
          bySubject: bySubject.map(s => ({ subject: s._id, ...s })),
          byStudent: byStudent.map(s => ({ regno: s._id, ...s }))
        },
        applications,
        filters: { year, programcode, semester, subject, status, groupname }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating report",
      error: error.message
    });
  }
};

// Export report data
exports.exportReport = async (req, res) => {
  try {
    const { colid, year, programcode, semester, subject, status, groupname } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid required" });
    }

    // Build match stage
    const matchStage = { colid: parseInt(colid) };
    if (year) matchStage.year = year;
    if (programcode) matchStage.programcode = programcode;
    if (semester) matchStage.semester = semester;
    if (subject) matchStage.subject = subject;
    if (status) matchStage.status = status;
    if (groupname) matchStage.groupname = groupname;

    // Aggregation for export
    const exportData = await StudSubject.aggregate([
      { $match: matchStage },
      {
        $project: {
          _id: 0,
          student: 1,
          regno: 1,
          subject: 1,
          groupname: 1,
          type: { $ifNull: ["$type", "-"] },
          year: 1,
          programcode: 1,
          semester: 1,
          status: 1,
          appliedOn: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$createdAt"
            }
          }
        }
      },
      { $sort: { student: 1, subject: 1 } }
    ]);

    res.json({
      success: true,
      data: exportData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error exporting report",
      error: error.message
    });
  }
};

// Get summary report using aggregation
exports.getSummaryReport = async (req, res) => {
  try {
    const { colid, year, programcode, semester } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid required" });
    }

    const matchStage = { colid: parseInt(colid) };
    if (year) matchStage.year = year;
    if (programcode) matchStage.programcode = programcode;
    if (semester) matchStage.semester = semester;

    const programSummary = await StudSubject.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            programcode: "$programcode",
            semester: "$semester",
            year: "$year"
          },
          totalApplications: { $sum: 1 },
          totalStudents: { $addToSet: "$regno" },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          programcode: "$_id.programcode",
          semester: "$_id.semester",
          year: "$_id.year",
          totalApplications: 1,
          totalStudents: { $size: "$totalStudents" },
          approved: 1,
          rejected: 1,
          pending: 1,
          approvalRate: {
            $cond: [
              { $eq: ["$totalApplications", 0] },
              0,
              { $multiply: [{ $divide: ["$approved", "$totalApplications"] }, 100] }
            ]
          }
        }
      },
      { $sort: { "programcode": 1, "semester": 1 } }
    ]);

    res.json({
      success: true,
      data: programSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating summary report",
      error: error.message
    });
  }
};
