const StudentMarks9ds = require('../Models/studentmarks9ds');
const SubjectComponentConfig9ds = require('../Models/subjectcomponentconfig9ds');
const User = require('../Models/user');
const CoScholasticActivity9ds = require('../Models/CoScholasticActivity9ds');
const CoScholasticGrade9ds = require('../Models/CoScholasticGrade9ds');

// Helper function to calculate grade
function calculateGrade(obtained, max) {
  if (!obtained || !max || max === 0) return 'E';
  const percentage = (obtained / max) * 100;
  if (percentage >= 91) return 'A1';
  if (percentage >= 81) return 'A2';
  if (percentage >= 71) return 'B1';
  if (percentage >= 61) return 'B2';
  if (percentage >= 51) return 'C1';
  if (percentage >= 41) return 'C2';
  if (percentage >= 33) return 'D';
  return 'E';
}

// Get students and subjects using aggregation pipeline
exports.getstudentsandsubjectsformarks9ds = async (req, res) => {
  try {
    const { colid, semester, academicyear, term, componentname, section } = req.query;

    const matchStage = {
      colid: Number(colid),
      semester: semester
    };

    if (section) {
      matchStage.section = section;
    }

    // Get students using aggregation
    const students = await User.aggregate([
      {
        $match: matchStage
      },
      {
        $project: {
          regno: 1,
          name: 1
        }
      },
      {
        $sort: { regno: 1 }
      }
    ]);

    // Check if it's an attendance component
    const attendanceFields = [
      'term1totalworkingdays', 'term1totalpresentdays',
      'term2totalworkingdays', 'term2totalpresentdays'
    ];
    const isAttendance = attendanceFields.includes(componentname);

    let subjects = [];
    let existingMarks = [];

    if (isAttendance) {
      // Return a dummy subject for attendance
      subjects = [{
        subjectcode: 'ATTENDANCE',
        subjectname: 'Attendance',
        maxmarks: 300 // Arbitrary max
      }];

      // Get existing marks for ATTENDANCE subject
      existingMarks = await StudentMarks9ds.aggregate([
        {
          $match: {
            colid: Number(colid),
            semester: semester,
            academicyear: academicyear,
            subjectcode: 'ATTENDANCE'
          }
        },
        {
          $project: {
            regno: 1,
            subjectcode: 1,
            obtainedmarks: `$${componentname}`, // Direct field name
            term1totalworkingdays: 1,
            term2totalworkingdays: 1,
            term1total: 1,
            term2total: 1,
            status: 1
          }
        }
      ]);

    } else {
      // Standard subject component logic
      const activeFieldName = `${componentname}active`;
      const maxFieldName = `${componentname}max`;

      subjects = await SubjectComponentConfig9ds.aggregate([
        {
          $match: {
            colid: Number(colid),
            semester: semester,
            academicyear: academicyear,
            isactive: true,
            [activeFieldName]: true
          }
        },
        {
          $project: {
            subjectcode: 1,
            subjectname: 1,
            isadditional: 1,
            maxmarks: `$${maxFieldName}`
          }
        },
        {
          $sort: { createdAt: 1 }
        }
      ]);

      // Get existing marks using aggregation with lookup
      existingMarks = await StudentMarks9ds.aggregate([
        {
          $match: {
            colid: Number(colid),
            semester: semester,
            academicyear: academicyear
          }
        },
        {
          $project: {
            regno: 1,
            subjectcode: 1,
            obtainedmarks: `$${componentname}obtained`,
            term1total: 1,
            term2total: 1,
            status: 1
          }
        }
      ]);
    }

    res.json({
      success: true,
      students: students,
      subjects: subjects,
      existingmarks: existingMarks,
      componentname: componentname,
      term: term
    });
  } catch (error) {
    console.error('Error in getstudentsandsubjectsformarks9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get students and subjects',
      error: error.message
    });
  }
};

// Bulk save marks using bulkWrite (optimized)
exports.bulksavemarksbycomponent9ds = async (req, res) => {
  try {
    const { colid, user, semester, academicyear, componentname, marks, extraUpdates } = req.body;

    if (!marks || marks.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No marks data provided'
      });
    }

    const attendanceFields = [
      'term1totalworkingdays', 'term1totalpresentdays',
      'term2totalworkingdays', 'term2totalpresentdays'
    ];
    const isAttendance = attendanceFields.includes(componentname);

    let obtainedFieldName;
    if (isAttendance) {
      obtainedFieldName = componentname;
    } else {
      obtainedFieldName = `${componentname}obtained`;
    }

    const isTerm1 = componentname.startsWith('term1');

    // Prepare bulk operations
    const bulkOps = marks.map(markEntry => {
      const { regno, subjectcode, obtained, studentname, subjectname } = markEntry;

      const updateFields = {
        [obtainedFieldName]: obtained || 0,
        updatedat: new Date()
      };

      if (extraUpdates) {
        Object.assign(updateFields, extraUpdates);
      }

      // Add student/subject names if provided
      if (studentname) updateFields.studentname = studentname;
      if (subjectname) updateFields.subjectname = subjectname;

      return {
        updateOne: {
          filter: {
            colid: Number(colid),
            regno: regno,
            subjectcode: subjectcode,
            semester: semester,
            academicyear: academicyear
          },
          update: {
            $set: updateFields,
            $setOnInsert: {
              name: 'system',
              user: user,
              colid: Number(colid),
              regno: regno,
              subjectcode: subjectcode,
              semester: semester,
              academicyear: academicyear,
              createdat: new Date()
            }
          },
          upsert: true
        }
      };
    });

    // Execute bulk write
    const bulkResult = await StudentMarks9ds.bulkWrite(bulkOps);

    // Recalculate totals: gather unique regnos and subjectcodes
    const regnos = [...new Set(marks.map(m => m.regno))];
    const subjectcodes = [...new Set(marks.map(m => m.subjectcode))];

    // Get all current marks for recalculation
    const marksToRecalc = await StudentMarks9ds.find({
      colid: Number(colid),
      regno: { $in: regnos },
      subjectcode: { $in: subjectcodes },
      semester: semester,
      academicyear: academicyear
    });

    // Fetch subject configs to get actual max marks for each subject
    const subjectConfigs = await SubjectComponentConfig9ds.find({
      colid: Number(colid),
      semester: semester,
      academicyear: academicyear,
      subjectcode: { $in: subjectcodes }
    });

    // Build a map: subjectcode → max marks for this term
    const maxMarksMap = {};
    subjectConfigs.forEach(cfg => {
      if (isTerm1) {
        const t1max =
          (cfg.term1periodictestactive ? (cfg.term1periodictestmax || 0) : 0) +
          (cfg.term1notebookactive ? (cfg.term1notebookmax || 0) : 0) +
          (cfg.term1enrichmentactive ? (cfg.term1enrichmentmax || 0) : 0) +
          (cfg.term1midexamactive ? (cfg.term1midexammax || 0) : 0);
        maxMarksMap[cfg.subjectcode] = t1max || 100; // fallback 100
      } else {
        const t2max =
          (cfg.term2periodictestactive ? (cfg.term2periodictestmax || 0) : 0) +
          (cfg.term2notebookactive ? (cfg.term2notebookmax || 0) : 0) +
          (cfg.term2enrichmentactive ? (cfg.term2enrichmentmax || 0) : 0) +
          (cfg.term2annualexamactive ? (cfg.term2annualexammax || 0) : 0);
        maxMarksMap[cfg.subjectcode] = t2max || 100; // fallback 100
      }
    });

    // Prepare total calculation updates using the actual max marks per subject
    const totalUpdateOps = marksToRecalc.map(mark => {
      let total, grade, totalField, gradeField;
      const subjectMax = maxMarksMap[mark.subjectcode] || 100;

      if (isTerm1) {
        total =
          (mark.term1periodictestobtained || 0) +
          (mark.term1notebookobtained || 0) +
          (mark.term1enrichmentobtained || 0) +
          (mark.term1midexamobtained || 0);
        grade = calculateGrade(total, subjectMax); // ✅ use actual max
        totalField = 'term1total';
        gradeField = 'term1grade';
      } else {
        total =
          (mark.term2periodictestobtained || 0) +
          (mark.term2notebookobtained || 0) +
          (mark.term2enrichmentobtained || 0) +
          (mark.term2annualexamobtained || 0);
        grade = calculateGrade(total, subjectMax); // ✅ use actual max
        totalField = 'term2total';
        gradeField = 'term2grade';
      }

      return {
        updateOne: {
          filter: { _id: mark._id },
          update: {
            $set: {
              [totalField]: total,
              [gradeField]: grade,
              updatedat: new Date()
            }
          }
        }
      };
    });

    // Update totals
    if (totalUpdateOps.length > 0) {
      await StudentMarks9ds.bulkWrite(totalUpdateOps);
    }

    res.json({
      success: true,
      message: `Successfully saved ${bulkResult.upsertedCount + bulkResult.modifiedCount} marks`,
      upserted: bulkResult.upsertedCount,
      modified: bulkResult.modifiedCount,
      matched: bulkResult.matchedCount
    });
  } catch (error) {
    console.error('Error in bulksavemarksbycomponent9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save marks',
      error: error.message
    });
  }
};

// Get student marks using aggregation
exports.getstudentmarks9ds = async (req, res) => {
  try {
    const { colid, regno, semester, academicyear } = req.query;

    const marks = await StudentMarks9ds.aggregate([
      {
        $match: {
          colid: Number(colid),
          regno: regno,
          semester: semester,
          academicyear: academicyear
        }
      },
      {
        $sort: { subjectname: 1 }
      },
      {
        $project: {
          __v: 0
        }
      }
    ]);

    res.json({
      success: true,
      count: marks.length,
      data: marks
    });
  } catch (error) {
    console.error('Error in getstudentmarks9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get student marks',
      error: error.message
    });
  }
};

// Finalize student marks using updateMany
exports.finalizestudentmarks9ds = async (req, res) => {
  try {
    const { colid, regno, semester, academicyear } = req.body;

    const result = await StudentMarks9ds.updateMany(
      {
        colid: Number(colid),
        regno: regno,
        semester: semester,
        academicyear: academicyear
      },
      {
        $set: {
          status: 'finalized',
          updatedat: new Date()
        }
      }
    );

    res.json({
      success: true,
      message: `Finalized ${result.modifiedCount} subject marks`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error in finalizestudentmarks9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to finalize marks',
      error: error.message
    });
  }
};

// Get distinct semesters, years and sections from User table
exports.getdistinctsemestersandyears9ds = async (req, res) => {
  try {
    const { colid } = req.query;

    // Get distinct semesters, admission years and sections using aggregation
    const result = await User.aggregate([
      {
        $match: {
          colid: Number(colid),
        }
      },
      {
        $group: {
          _id: null,
          semesters: { $addToSet: '$semester' },
          admissionyears: { $addToSet: '$admissionyear' },
          sections: { $addToSet: '$section' }
        }
      },
      {
        $project: {
          _id: 0,
          semesters: 1,
          admissionyears: 1,
          sections: 1
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.json({
        success: true,
        semesters: ['9', '10'],
        admissionyears: [],
        sections: []
      });
    }

    // Sort semesters, years and sections
    const semesters = result[0].semesters.sort();
    const admissionyears = result[0].admissionyears.filter(y => y).sort().reverse();
    const sections = result[0].sections.filter(s => s).sort();

    res.json({
      success: true,
      semesters: semesters,
      admissionyears: admissionyears,
      sections: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get semesters and years',
      error: error.message
    });
  }
};

// Returns distinct sections for a specific class (semester) from User table
// Used by Class 11/12 subject config so sections reflect actual enrolled students
exports.getdistinctsectionsbyclass9ds = async (req, res) => {
  try {
    const { colid, semester } = req.query;
    const matchQuery = { colid: Number(colid) };
    if (semester) matchQuery.semester = semester;

    const result = await User.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, sections: { $addToSet: '$section' } } },
      { $project: { _id: 0, sections: 1 } }
    ]);

    const sections = (result.length > 0 ? result[0].sections : [])
      .filter(s => s)
      .sort();

    res.json({ success: true, sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Start of new endpoint code
const Attendancenew = require('../Models/attendancenew');

// Helper function to calculate attendance (copied from marksheetdatactlrds.js)
async function calculateAttendance(regno, colid, semester, academicyear) {
  try {
    const year = academicyear ? academicyear.split('-')[0] : new Date().getFullYear().toString();

    const attendanceRecords = await Attendancenew.find({
      regno: regno,
      colid: Number(colid),
      semester: semester,
      year: year
    });

    if (attendanceRecords.length === 0) {
      return {
        term1: { working: 0, present: 0 },
        term2: { working: 0, present: 0 }
      };
    }

    const term1Records = [];
    const term2Records = [];

    attendanceRecords.forEach(record => {
      const month = new Date(record.classdate).getMonth() + 1;
      if (month >= 6 && month <= 10) {
        term1Records.push(record);
      } else {
        term2Records.push(record);
      }
    });

    const calculateStats = (records) => {
      const uniqueDates = new Set();
      let presentCount = 0;

      records.forEach(record => {
        const dateStr = new Date(record.classdate).toISOString().split('T')[0];
        uniqueDates.add(dateStr);
        if (record.att === 1 || record.status1 === 'P') {
          presentCount++;
        }
      });

      return {
        working: uniqueDates.size,
        present: presentCount
      };
    };

    return {
      term1: calculateStats(term1Records),
      term2: calculateStats(term2Records)
    };
  } catch (error) {
    console.error('Error calculating attendance:', error);
    return {
      term1: { working: 0, present: 0 },
      term2: { working: 0, present: 0 }
    };
  }
}

// Get marksheet data for PDF using StudentMarks9ds
exports.getmarksheetpdfdata9ds = async (req, res) => {
  try {
    const { regno, colid, semester, academicyear } = req.query;

    // 1. Fetch Student/User Data
    const userData = await User.findOne({
      regno,
      colid: Number(colid)
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // 2. Fetch Marks Data
    const allMarksData = await StudentMarks9ds.find({
      regno,
      colid: Number(colid),
      semester,
      academicyear
    }).sort({ createdAt: 1 });

    // Filter out Attendance record for scholastic table
    const marksData = allMarksData.filter(m => m.subjectcode !== 'ATTENDANCE');
    const attendanceRecord = allMarksData.find(m => m.subjectcode === 'ATTENDANCE') || {};

    // 2.5 Fetch Subject Configs for Max Marks
    const subjectCodes = marksData.map(m => m.subjectcode);
    const componentConfigs = await SubjectComponentConfig9ds.find({
      colid: Number(colid),
      semester,
      academicyear,
      subjectcode: { $in: subjectCodes }

    });

    // Create config map for easy lookup (includes createdAt for subject ordering)
    const configMap = {};
    componentConfigs.forEach(config => {
      configMap[config.subjectcode] = config;
    });

    // Sort marksData by the createdAt of the corresponding config (preserves user-configured order)
    marksData.sort((a, b) => {
      const aTime = (configMap[a.subjectcode] && configMap[a.subjectcode].createdAt) ? new Date(configMap[a.subjectcode].createdAt).getTime() : 0;
      const bTime = (configMap[b.subjectcode] && configMap[b.subjectcode].createdAt) ? new Date(configMap[b.subjectcode].createdAt).getTime() : 0;
      return aTime - bTime;
    });

    if (!marksData || marksData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Marks data not found for this student'
      });
    }

    // 3. Format Subjects Data
    const subjects = marksData.map(mark => {
      const config = configMap[mark.subjectcode] || {};

      // Get max marks from config, default to 40 if not found (or handle as 0 to avoid NaN)
      // Note: If max is 0, we can't divide, so handle that case

      // Term 1 Periodic Test Normalization
      const t1PTMax = config.term1periodictestmax || 40;
      const t1PTObtained = mark.term1periodictestobtained || 0;
      // Convert to out of 10
      const t1PTScaled = t1PTMax > 0 ? (t1PTObtained / t1PTMax) * 10 : 0;

      // Term 2 Periodic Test Normalization
      const t2PTMax = config.term2periodictestmax || 40;
      const t2PTObtained = mark.term2periodictestobtained || 0;
      // Convert to out of 10
      const t2PTScaled = t2PTMax > 0 ? (t2PTObtained / t2PTMax) * 10 : 0;

      // Recalculate Term Totals based on Scaled PT
      const term1TotalRaw =
        t1PTScaled +
        (mark.term1notebookobtained || 0) +
        (mark.term1enrichmentobtained || 0) +
        (mark.term1midexamobtained || 0);

      const term2TotalRaw =
        t2PTScaled +
        (mark.term2notebookobtained || 0) +
        (mark.term2enrichmentobtained || 0) +
        (mark.term2annualexamobtained || 0);

      // Compute the actual max after PT scaling:
      // PT is always scaled to 10 regardless of raw max.
      // Max = 10 (PT scaled) + NB max + EN max + ME max
      const t1NBMax = config.term1notebookmax || 5;
      const t1ENMax = config.term1enrichmentmax || 5;
      const t1MEMax = config.term1midexammax || 80;
      const term1Max = 10 + t1NBMax + t1ENMax + t1MEMax; // e.g. 10+5+5+80=100 or 10+5+5+50=70

      const t2NBMax = config.term2notebookmax || 5;
      const t2ENMax = config.term2enrichmentmax || 5;
      const t2MEMax = config.term2annualexammax || 80;
      const term2Max = 10 + t2NBMax + t2ENMax + t2MEMax;

      const term1GradeRecalc = calculateGrade(term1TotalRaw, term1Max);
      const term2GradeRecalc = calculateGrade(term2TotalRaw, term2Max);

      return {
        subjectname: mark.subjectname,
        isAdditional: config.isadditional || false, // Pass additional flag
        term1PeriodicTest: parseFloat(t1PTScaled.toFixed(1)), // Keep 1 decimal for PT
        term1Notebook: mark.term1notebookobtained || 0,
        term1Enrichment: mark.term1enrichmentobtained || 0,
        term1MidExam: mark.term1midexamobtained || 0,
        term1Total: parseFloat(term1TotalRaw.toFixed(1)), // Total with scaled PT
        term1Grade: term1GradeRecalc,

        term2PeriodicTest: parseFloat(t2PTScaled.toFixed(1)), // Keep 1 decimal for PT
        term2Notebook: mark.term2notebookobtained || 0,
        term2Enrichment: mark.term2enrichmentobtained || 0,
        term2AnnualExam: mark.term2annualexamobtained || 0,
        term2Total: parseFloat(term2TotalRaw.toFixed(1)), // Total with scaled PT
        term2Grade: term2GradeRecalc,
        compartmentobtained: (mark.compartmentobtained !== undefined && mark.compartmentobtained !== null)
          ? mark.compartmentobtained : null  // Supplementary exam marks
      };
    });

    // 4. Calculate Totals with 50% Weightage
    // term1Total and term2Total are out of 100 per subject
    const term1TotalMarks = subjects.reduce((sum, s) => sum + s.term1Total, 0);
    const term2TotalMarks = subjects.reduce((sum, s) => sum + s.term2Total, 0);

    // Apply 50% weightage for Final Assessment
    const term1TotalWeighted = term1TotalMarks * 0.5;
    const term2TotalWeighted = term2TotalMarks * 0.5;
    const grandTotal = term1TotalWeighted + term2TotalWeighted;

    // Max marks should be based on the weighted total (50 + 50 = 100 per subject)
    const maxMarks = subjects.length * 100;

    const percentage = maxMarks > 0 ? ((grandTotal / maxMarks) * 100).toFixed(2) : 0;
    const overallGrade = calculateGrade(grandTotal, maxMarks);

    // 5. Fetch Attendance (Manual from StudentMarks)
    // Fallback to first record if not found in dedicated record
    const fallbackRecord = marksData.length > 0 ? marksData[0] : {};

    // Helper to get value > 0
    const getVal = (rec, field) => (rec && rec[field]) ? rec[field] : 0;

    const attendanceData = {
      term1: {
        working: getVal(attendanceRecord, 'term1totalworkingdays') || getVal(fallbackRecord, 'term1totalworkingdays'),
        present: getVal(attendanceRecord, 'term1totalpresentdays') || getVal(fallbackRecord, 'term1totalpresentdays')
      },
      term2: {
        working: getVal(attendanceRecord, 'term2totalworkingdays') || getVal(fallbackRecord, 'term2totalworkingdays'),
        present: getVal(attendanceRecord, 'term2totalpresentdays') || getVal(fallbackRecord, 'term2totalpresentdays')
      }
    };

    // 5.5 Fetch Co-Scholastic Grades
    const coActivities = await CoScholasticActivity9ds.find({
      colid: Number(colid),
      semester: semester,
      academicyear: academicyear,
      isactive: true
    }).sort({ createdat: 1 });
    const coGrades = await CoScholasticGrade9ds.find({
      colid: Number(colid),
      regno: regno,
      semester: semester,
      academicyear: academicyear
    });

    const coGradeMap = {};
    coGrades.forEach(g => {
      coGradeMap[g.activityid.toString()] = g;
    });

    const coScholasticData = coActivities.map(act => ({
      code: act.code || '',
      area: act.activityname,
      term1Grade: (coGradeMap[act._id.toString()] && coGradeMap[act._id.toString()].term1grade) || '',
      term2Grade: (coGradeMap[act._id.toString()] && coGradeMap[act._id.toString()].term2grade) || ''
    }));

    // 5.8 Dynamic Rank Calculation
    // Fetch all marks for the same batch (colid, year, semester) to calculate rank
    // Step 1: Find all students in this specific section
    const sectionStudents = await User.find({
      colid: Number(colid),
      semester: semester,
      section: userData.section,
      admissionyear: academicyear,
      role: 'Student'
    }).lean();


    const sectionRegNos = sectionStudents.map(s => s.regno);

    // Fetch all marks for the batch (Filtered by SECTION regnos)
    const allStudentMarks = await StudentMarks9ds.find({
      colid: Number(colid),
      academicyear: academicyear,
      semester: semester,
      regno: { $in: sectionRegNos }
    }).lean();

    // Group by regno
    const studentGroups = {};
    allStudentMarks.forEach(m => {
      if (!studentGroups[m.regno]) studentGroups[m.regno] = [];
      studentGroups[m.regno].push(m);
    });

    // Calculate Grand Total for key students
    const studentTotals = Object.keys(studentGroups).map(rNo => {
      const sMarks = studentGroups[rNo];
      // Logic copied from above for total calculation
      // We need configMap for scaling. Assuming standard 40/10 if config missing for speed
      // Or better, assume the configMap fetched earlier covers all subjects in class.

      const studTotal = sMarks.reduce((acc, m) => {
        const conf = configMap[m.subjectcode] || {};

        // T1
        const t1Max = conf.term1periodictestmax || 40;
        const t1Obt = m.term1periodictestobtained || 0;
        const t1Sc = t1Max > 0 ? (t1Obt / t1Max) * 10 : 0;
        const t1Raw = t1Sc + (m.term1notebookobtained || 0) + (m.term1enrichmentobtained || 0) + (m.term1midexamobtained || 0);

        // T2
        const t2Max = conf.term2periodictestmax || 40;
        const t2Obt = m.term2periodictestobtained || 0;
        const t2Sc = t2Max > 0 ? (t2Obt / t2Max) * 10 : 0;
        const t2Raw = t2Sc + (m.term2notebookobtained || 0) + (m.term2enrichmentobtained || 0) + (m.term2annualexamobtained || 0);

        // Weighted
        return acc + (t1Raw * 0.5) + (t2Raw * 0.5);
      }, 0);

      return { regno: rNo, total: studTotal };
    });

    // Sort Descending
    studentTotals.sort((a, b) => b.total - a.total);

    // Find Rank
    const rankIndex = studentTotals.findIndex(s => s.regno === regno);
    const rank = rankIndex !== -1 ? rankIndex + 1 : '-';

    // 6a. Calculate Compartment Subjects (Class 6-12 only: failing subject = weighted score < 33)
    const compartmentSubjects = subjects
      .filter(s => !s.isAdditional)
      .filter(s => {
        const weightedScore = (s.term1Total * 0.5) + (s.term2Total * 0.5);
        const term1EbutTerm2Passed = (s.term1Grade === 'E' && s.term2Grade !== 'E');
        return weightedScore < 33 || term1EbutTerm2Passed;
      })
      .map(s => ({
        subjectname: s.subjectname,
        term1Total: s.term1Total,
        term2Total: s.term2Total,
        finalScore: parseFloat(((s.term1Total * 0.5) + (s.term2Total * 0.5)).toFixed(1)),
        compartmentobtained: s.compartmentobtained // Supplementary exam marks (null if not yet entered)
      }));

    // 6. Construct PDF Data Object
    const pdfData = {
      session: academicyear,
      classtype: '', // Not in StudentMarks9ds, leave empty or infer
      profile: {
        name: userData.name || '',
        father: userData.fathername || '',
        mother: userData.mothername || '',
        address: userData.address || '',
        classSection: `Class ${semester} - ${userData.section || 'A'}`,
        rollNo: userData.rollno || '', // Empty if not present
        dob: userData.dob || '',
        admissionNo: regno,
        contact: userData.phone || '',
        cbseRegNo: userData.cbseno || '',
        photo: userData.photo || '',
        section: userData.section || ''  // ← added: used by all report card pages
      },
      attendance: attendanceData,
      subjects: subjects,
      coScholastic: coScholasticData,
      term1TotalMarks,
      term2TotalMarks,
      term1TotalWeighted, // Added weighted total for display
      term2TotalWeighted, // Added weighted total for display
      grandTotal,
      percentage,
      overallGrade,
      rank: rank,
      compartmentSubjects,   // List of subjects where student scored < 33 (fail)
      remarks: 'Good', // Default remark
      promotedToClass: '', // User to fill manually?
      newSessionDate: ''
    };

    res.json({
      success: true,
      data: pdfData
    });

  } catch (error) {
    console.error('Error in getmarksheetpdfdata9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate marksheet PDF data',
      error: error.message
    });
  }
};
