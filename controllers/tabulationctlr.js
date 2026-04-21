const User = require('../Models/user.js');
const ExamMarks2 = require('../Models/exammarks2ds.js');
const ExamMarks1 = require('../Models/exammarks1ds.js');

// UGC 10-Point Grading System
const getUGCGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'O', gradePoint: 10 };
  if (percentage >= 80) return { grade: 'A+', gradePoint: 9 };
  if (percentage >= 70) return { grade: 'A', gradePoint: 8 };
  if (percentage >= 60) return { grade: 'B+', gradePoint: 7 };
  if (percentage >= 50) return { grade: 'B', gradePoint: 6 };
  if (percentage >= 40) return { grade: 'C', gradePoint: 5 };
  if (percentage >= 36) return { grade: 'P', gradePoint: 4 };
  return { grade: 'F', gradePoint: 0 };
};

// HELPER FUNCTION: Calculate credit based on marks (3-4 credits per paper)
const calculateCredit = (max) => {
  if (max >= 80) return 4; // Theory/Lab based
  if (max >= 50) return 3;
  if (max >= 40) return 2;
  return 1;
};

// API 1: Get Student Info
exports.getStudentInfoForTabulation = async (req, res) => {
  try {
    const { colid, regno } = req.query;

    const student = await User.findOne({ colid: Number(colid), regno });
    const examRecord = await ExamMarks2.findOne({ colid: Number(colid), regno }).select('fathername mothername gender');

    if (!student && !examRecord) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      student: {
        regno: regno,
        name: student?.name || examRecord?.name || '',
        fathername: examRecord?.fathername || student?.fathername || '',
        mothername: examRecord?.mothername || student?.mothername || '',
        enrollmentNo: regno,
        program: student?.programcode || '',
        branch: student?.department || '',
        semester: student?.semester || '',
        category: student?.category || '',
        gender: examRecord?.gender || student?.gender || '',
        admissionYear: student?.admissionyear || ''
      }
    });
  } catch (err) {
    // res.status(500).json({ success: false, error: err.message });
  }
};

// API 3: Get Current Semester Marks (with calculated credits)
exports.getCurrentSemesterMarks = async (req, res) => {
  try {
    const { colid, regno, semester, year, program, regulation, branch } = req.query;

    const semesterNum = parseInt(semester);
    const yearNum = parseInt(year);

    // Get structure from ExamMarks1 to know max marks
    const allRecords = await ExamMarks1.find({
      colid: Number(colid),
      program: program,
      semester: semesterNum,
      regulation: regulation,
      branch: branch
    }).lean();

    if (allRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No structure data found`
      });
    }

    // Get student marks from ExamMarks2
    const studentMarks = await ExamMarks2.find({
      colid: Number(colid),
      regno: regno,
      semester: semesterNum,
      year: yearNum
    }).lean();

    if (studentMarks.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No marks found for student ${regno}`
      });
    }

    let totalCredits = 0;
    let totalGradePoints = 0;
    let totalObtained = 0;
    let totalMax = 0;
    let failedPapers = [];
    let examCode = '';
    let month = '';
    let yearValue = '';
    let status = '';

    const uniquePaperCodes = [...new Set(studentMarks.map(m => m.papercode))];

    const detailedMarks = uniquePaperCodes.map(papercode => {
  const paperStructure = allRecords.find(r => r.papercode === papercode);
  const studentMark = studentMarks.find(m => m.papercode === papercode);

  if (!paperStructure || !studentMark) {
    return null;
  }

  if (!examCode) {
    examCode = studentMark.examcode || '';
    month = studentMark.month || '';
    yearValue = studentMark.year || '';
    status = studentMark.status || '';
  }

  const thObtained = studentMark.thobtained || 0;
  const prObtained = studentMark.probtained || 0;
  const iatObtained = studentMark.iatobtained || 0;
  const iapObtained = studentMark.iapobtained || 0;

  const total = thObtained + prObtained + iatObtained + iapObtained;

  const thMax = paperStructure.thmax || 0;
  const prMax = paperStructure.prmax || 0;
  const iatMax = paperStructure.iatmax || 0;
  const iapMax = paperStructure.iapmax || 0;

  const maxTotal = thMax + prMax + iatMax + iapMax;

  const credit = calculateCredit(maxTotal);
  const percentage = maxTotal > 0 ? parseFloat(((total / maxTotal) * 100).toFixed(2)) : 0;
  const gradeInfo = getUGCGrade(percentage);

  totalCredits += credit;
  totalGradePoints += gradeInfo.gradePoint * credit;
  totalObtained += total;
  totalMax += maxTotal;

  // ✅ FIX: Only add paper code if it's F grade AND not already in array
  if (gradeInfo.grade === 'F') {
    if (!failedPapers.includes(paperStructure.papercode)) {
      failedPapers.push(paperStructure.papercode);
    }
  }

  return {
    paperCode: paperStructure.papercode,
    paperName: paperStructure.papername,
    type: prMax > 0 ? 'P' : 'T',
    thMax,
    thObtained,
    prMax,
    prObtained,
    iatMax,
    iatObtained,
    iapMax,
    iapObtained,
    credit,
    total,
    maxTotal,
    percentage,
    grade: gradeInfo.grade,
    gradePoint: gradeInfo.gradePoint
  };
}).filter(m => m !== null);

const percentage = totalMax > 0 ? parseFloat(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
const sgpa = totalCredits > 0 ? parseFloat((totalGradePoints / totalCredits).toFixed(2)) : 0;

// ✅ FIX: This line now correctly determines Pass/Fail
res.status(200).json({
  success: true,
  currentSemester: {
    program: program,
    regulation: regulation,
    branch: branch,
    semester: semesterNum,
    year: yearValue,
    examCode,
    month,
    status,
    marks: detailedMarks,
    totalObtained,
    totalMax,
    percentage,
    totalCredits,
    sgpa,
    totalGradePoints,
    failedPapers: failedPapers.length > 0 ? failedPapers.join(', ') : 'None',
    result: failedPapers.length > 0 ? 'Fail' : 'Pass'  // ✅ NOW WORKS CORRECTLY
  }
});


  } catch (err) {
    // console.error('Error in getCurrentSemesterMarks:', err);
    // res.status(500).json({ success: false, error: err.message });
  }
};

// API 4: Get All Semester Summary (with calculated credits)
exports.getAllSemesterSummary = async (req, res) => {
  try {
    const { colid, regno, program } = req.query;

    const studentMarks = await ExamMarks2.find({
      colid: Number(colid),
      regno: regno
    }).lean().sort({ year: 1, semester: 1 });

    if (studentMarks.length === 0) {
      return res.status(200).json({
        success: true,
        semesterSummary: [],
        cgpa: 0
      });
    }

    // Get unique semester-year combinations
    const semesterMap = new Map();
    studentMarks.forEach(mark => {
      const key = `${mark.semester}-${mark.year}`;
      if (!semesterMap.has(key)) {
        semesterMap.set(key, {
          semester: mark.semester,
          year: mark.year
        });
      }
    });

    const semesters = Array.from(semesterMap.values()).sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      if (yearA !== yearB) return yearA - yearB;
      return a.semester - b.semester;
    });

    const semesterSummary = [];
    let allCredits = 0;
    let allGradePoints = 0;

    for (let semData of semesters) {
      const semMarks = studentMarks.filter(m =>
        m.semester === semData.semester &&
        String(m.year) === String(semData.year)
      );

      if (semMarks.length === 0) continue;

      const firstMark = semMarks[0];

      // Get structure from ExamMarks1
      const allSemRecords = await ExamMarks1.find({
        colid: Number(colid),
        semester: semData.semester,
        regulation: firstMark.regulation,
        branch: firstMark.branch,
        program: firstMark.program
      }).lean();

      let totalObtained = 0;
      let totalMax = 0;
      let credits = 0;
      let gradePoints = 0;
      let failedCount = 0;

      const uniquePapers = [...new Set(semMarks.map(m => m.papercode))];

      uniquePapers.forEach(papercode => {
        const paper = allSemRecords.find(p => p.papercode === papercode);
        const mark = semMarks.find(m => m.papercode === papercode);

        if (paper && mark) {
          const obtained = (mark.thobtained || 0) + (mark.probtained || 0) +
            (mark.iatobtained || 0) + (mark.iapobtained || 0);
          const max = (paper.thmax || 0) + (paper.prmax || 0) +
            (paper.iatmax || 0) + (paper.iapmax || 0);

          totalObtained += obtained;
          totalMax += max;

          // CALCULATE CREDIT SERVER-SIDE
          const paperCredit = calculateCredit(max);
          credits += paperCredit;

          const percentage = max > 0 ? ((obtained / max) * 100) : 0;
          const gradeInfo = getUGCGrade(percentage);
          gradePoints += gradeInfo.gradePoint * paperCredit;

          if (gradeInfo.grade === 'F') failedCount++;
        }
      });

      const percentage = totalMax > 0 ? parseFloat(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
      const sgpa = credits > 0 ? parseFloat((gradePoints / credits).toFixed(2)) : 0;

      allCredits += credits;
      allGradePoints += gradePoints;

      semesterSummary.push({
        semester: semData.semester,
        year: semData.year,
        month: firstMark.month || '',
        examCode: firstMark.examcode || '',
        total: totalObtained,
        maxTotal: totalMax,
        percentage,
        credits,
        sgpa,
        result: failedCount === 0 ? 'Pass' : 'Fail'
      });
    }

    const cgpa = allCredits > 0 ? parseFloat((allGradePoints / allCredits).toFixed(2)) : 0;

    res.status(200).json({
      success: true,
      semesterSummary,
      cgpa
    });

  } catch (err) {
    // console.error('Error in getAllSemesterSummary:', err);
    // res.status(500).json({ success: false, error: err.message });
  }
};

// API: Get Available Data
exports.getAvailableData = async (req, res) => {
  try {
    const { colid, program, branch, regulation } = req.query;

    const allRecords = await ExamMarks2.find({
      colid: Number(colid),
      program: program,
      branch: branch,
      regulation: regulation
    }).select('semester year month').lean();

    if (allRecords.length === 0) {
      return res.status(200).json({
        success: true,
        availableData: []
      });
    }

    const uniqueData = [];
    const seen = new Set();

    allRecords.forEach(record => {
      const key = `${record.semester}-${record.year}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueData.push({
          semester: record.semester,
          year: record.year,
          month: record.month || ''
        });
      }
    });

    res.status(200).json({
      success: true,
      availableData: uniqueData
    });

  } catch (err) {
    // console.error('Error in getAvailableData:', err);
    // res.status(500).json({ success: false, error: err.message });
  }
};

// API 5: Get Transcript (Year-by-Year Breakdown)
exports.getTranscript = async (req, res) => {
  try {
    const { colid, regno, program } = req.query;

    const transcriptData = await ExamMarks2.aggregate([
      // Stage 1: Match student's marks
      {
        $match: {
          colid: Number(colid),
          regno,
        },
      },

      // Stage 2: Add calculated year field
      {
        $addFields: {
          year: {
            $ceil: { $divide: [{ $toInt: "$semester" }, 2] },
          },
          theoryTotal: { $add: ["$thobtained", "$iatobtained"] },
          theoryMax: { $add: ["$thmax", "$iatmax"] },
          practicalTotal: { $add: ["$probtained", "$iapobtained"] },
          practicalMax: { $add: ["$prmax", "$iapmax"] },
        },
      },

      // Stage 3: Add grand totals
      {
        $addFields: {
          paperTotalObtained: {
            $add: ["$theoryTotal", "$practicalTotal"],
          },
          paperTotalMax: {
            $add: ["$theoryMax", "$practicalMax"],
          },
        },
      },

      // Stage 4: Group by year to calculate year summary
      {
        $group: {
          _id: "$year",
          year: { $first: "$year" },
          papers: {
            $push: {
              papercode: "$papercode",
              papername: "$papername",
              thmax: "$thmax",
              thobtained: "$thobtained",
              iatmax: "$iatmax",
              iatobtained: "$iatobtained",
              prmax: "$prmax",
              probtained: "$probtained",
              iapmax: "$iapmax",
              iapobtained: "$iapobtained",
              theoryMax: "$theoryMax",
              theoryObtained: "$theoryTotal",
              practicalMax: "$practicalMax",
              practicalObtained: "$practicalTotal",
              totalObtained: "$paperTotalObtained",
              totalMax: "$paperTotalMax",
            },
          },
          yearTheoryTotal: { $sum: "$theoryTotal" },
          yearTheoryMax: { $sum: "$theoryMax" },
          yearPracticalTotal: { $sum: "$practicalTotal" },
          yearPracticalMax: { $sum: "$practicalMax" },
          studentName: { $first: "$name" },
          fathername: { $first: "$fathername" },
          mothername: { $first: "$mothername" },
          gender: { $first: "$gender" },
        },
      },

      // Stage 5: Calculate year percentage and division
      {
        $addFields: {
          yearTotal: { $add: ["$yearTheoryTotal", "$yearPracticalTotal"] },
          yearMax: { $add: ["$yearTheoryMax", "$yearPracticalMax"] },
        },
      },

      {
        $addFields: {
          yearPercentage: {
            $cond: [
              { $eq: ["$yearMax", 0] },
              0,
              {
                $round: [
                  { $multiply: [{ $divide: ["$yearTotal", "$yearMax"] }, 100] },
                  2,
                ],
              },
            ],
          },
        },
      },

      {
        $addFields: {
          yearDivision: {
            $cond: [
              { $gte: ["$yearPercentage", 75] },
              "First",
              {
                $cond: [
                  { $gte: ["$yearPercentage", 60] },
                  "Second",
                  {
                    $cond: [
                      { $gte: ["$yearPercentage", 50] },
                      "Third",
                      "Fail",
                    ],
                  },
                ],
              },
            ],
          },
        },
      },

      // Stage 6: Sort by year
      {
        $sort: { year: 1 },
      },
    ]).exec();

    if (!transcriptData || transcriptData.length === 0) {
      return res.status(404).json({ message: "No transcript data found" });
    }

    const allYearsData = [];
    let grandTotalObtained = 0;
    let grandTotalMax = 0;

    // Create array for all 4 years (even empty ones)
    for (let y = 1; y <= 4; y++) {
      const yearData = transcriptData.find((d) => d.year === y);

      if (yearData) {
        allYearsData.push({
          year: y,
          papers: yearData.papers.map((paper) => ({
            paperCode: paper.papercode,
            paperName: paper.papername,
            theoryObtained: paper.thobtained || 0,
            theoryMax: paper.thmax || 0,
            practicalObtained: paper.probtained || 0,
            practicalMax: paper.prmax || 0,
            iatObtained: paper.iatobtained || 0,
            iatMax: paper.iatmax || 0,
            iapObtained: paper.iapobtained || 0,
            iapMax: paper.iapmax || 0,
            totalObtained: paper.totalObtained,
            totalMax: paper.totalMax,
          })),
          summary: {
            theoryObtained: yearData.yearTheoryTotal,
            theoryMax: yearData.yearTheoryMax,
            practicalObtained: yearData.yearPracticalTotal,
            practicalMax: yearData.yearPracticalMax,
            total: yearData.yearTotal,
            maxTotal: yearData.yearMax,
            percentage: yearData.yearPercentage,
            division: yearData.yearDivision,
          },
        });

        grandTotalObtained += yearData.yearTotal;
        grandTotalMax += yearData.yearMax;
      } else {
        allYearsData.push({
          year: y,
          papers: [],
          summary: {
            theoryObtained: 0,
            theoryMax: 0,
            practicalObtained: 0,
            practicalMax: 0,
            total: 0,
            maxTotal: 0,
            percentage: 0,
            division: "Fail",
          },
        });
      }
    }

    // Calculate CGPA
    const overallPercentage =
      grandTotalMax > 0
        ? ((grandTotalObtained / grandTotalMax) * 100).toFixed(2)
        : "0.00";
    const cgpa = (parseFloat(overallPercentage) / 10).toFixed(2);

    // Get student info from first record
    const studentInfo = transcriptData[0] || {};

    res.status(200).json({
      success: true,
      student: {
        enrollmentNo: regno,
        name: studentInfo.studentName || "N/A",
        fathername: studentInfo.fathername || "N/A",
        mothername: studentInfo.mothername || "N/A",
        gender: studentInfo.gender || "N/A",
        program: program || studentInfo.program || "N/A",
      },
      allYearsData,
      cgpa,
      overallPercentage,
    });
  } catch (error) {
    // console.error("Error in getTranscript:", error);
    // res.status(500).json({ 
    //   message: "Server error", 
    //   error: error.message 
    // });
  }
};

// API: Get Bulk Tabulation Data
// API: Get Bulk Tabulation Data (From ExamMarks2ds only)
exports.getBulkTabulationData = async (req, res) => {
  try {
    const { colid, program, branch, regulation, semester, year } = req.query;

    // Get all unique students from ExamMarks2 for this semester/year
    const allMarks = await ExamMarks2.find({
      colid: Number(colid),
      program: program,
      branch: branch,
      regulation: regulation,
      semester: parseInt(semester),
      year: parseInt(year),
    }).lean();

    if (allMarks.length === 0) {
      return res.status(404).json({ success: false, message: "No students found" });
    }

    // Get unique registration numbers
    const uniqueRegno = [...new Set(allMarks.map((m) => m.regno))];

    if (uniqueRegno.length === 0) {
      return res.status(404).json({ success: false, message: "No students found" });
    }

    const studentsData = [];

    // Process each student
    for (let regno of uniqueRegno) {
      // Get all marks for this student in this semester
      const studentSemMarks = await ExamMarks2.find({
        colid: Number(colid),
        regno: regno,
        semester: parseInt(semester),
        year: parseInt(year),
      }).lean();

      if (studentSemMarks.length === 0) continue;

      const firstMark = studentSemMarks[0];

      // Build student info from ExamMarks2
      const studentInfo = {
        enrollmentNo: regno,
        name: firstMark.student || "",
        fathername: firstMark.fathername || "",
        mothername: firstMark.mothername || "",
        gender: firstMark.gender || "",
      };

      // Get structure
      const allSemRecords = await ExamMarks1.find({
        colid: Number(colid),
        semester: parseInt(semester),
        regulation: firstMark.regulation,
        branch: firstMark.branch,
        program: firstMark.program,
      }).lean();

      let totalObtained = 0;
      let totalMax = 0;
      let credits = 0;
      let gradePoints = 0;
      let failedPapers = [];
      const marks = [];

      // Process each paper
      const uniquePapers = [...new Set(studentSemMarks.map((m) => m.papercode))];

      for (let papercode of uniquePapers) {
        const paper = allSemRecords.find((p) => p.papercode === papercode);
        const mark = studentSemMarks.find((m) => m.papercode === papercode);

        if (paper && mark) {
          const obtained =
            (mark.thobtained || 0) +
            (mark.probtained || 0) +
            (mark.iatobtained || 0) +
            (mark.iapobtained || 0);
          const max =
            (paper.thmax || 0) +
            (paper.prmax || 0) +
            (paper.iatmax || 0) +
            (paper.iapmax || 0);

          totalObtained += obtained;
          totalMax += max;

          const paperCredit = calculateCredit(max);
          credits += paperCredit;

          const percentage = max > 0 ? (obtained / max) * 100 : 0;
          const gradeInfo = getUGCGrade(percentage);
          gradePoints += gradeInfo.gradePoint * paperCredit;

          marks.push({
            paperCode: papercode,
            paperName: paper.papername,
            thObtained: mark.thobtained || 0,
            thMax: paper.thmax || 0,
            prObtained: mark.probtained || 0,
            prMax: paper.prmax || 0,
            iatObtained: mark.iatobtained || 0,
            iatMax: paper.iatmax || 0,
            iapObtained: mark.iapobtained || 0,
            iapMax: paper.iapmax || 0,
            total: obtained,
            maxTotal: max,
            percentage: parseFloat(percentage.toFixed(2)),
            credit: paperCredit,
            grade: gradeInfo.grade,
            gradePoint: gradeInfo.gradePoint,
          });

          if (gradeInfo.grade === "F") failedPapers.push(papercode);
        }
      }

      const percentage =
        totalMax > 0
          ? parseFloat(((totalObtained / totalMax) * 100).toFixed(2))
          : 0;
      const sgpa =
        credits > 0
          ? parseFloat((gradePoints / credits).toFixed(2))
          : 0;

      // Get all semesters data for CGPA calculation
      const allStudentMarks = await ExamMarks2.find({
        colid: Number(colid),
        regno: regno,
      })
        .lean()
        .sort({ year: 1, semester: 1 });

      let allCredits = 0;
      let allGradePoints = 0;

      // Get unique semester combinations
      const semesterMap = new Map();
      allStudentMarks.forEach((mark) => {
        const key = `${mark.semester}-${mark.year}`;
        if (!semesterMap.has(key)) {
          semesterMap.set(key, { semester: mark.semester, year: mark.year });
        }
      });

      const semesters = Array.from(semesterMap.values()).sort((a, b) => {
        const yearA = parseInt(a.year);
        const yearB = parseInt(b.year);
        if (yearA !== yearB) return yearA - yearB;
        return a.semester - b.semester;
      });

      // Process each semester for CGPA
      for (let semData of semesters) {
        const semMarks = allStudentMarks.filter(
          (m) =>
            m.semester === semData.semester &&
            String(m.year) === String(semData.year)
        );

        if (semMarks.length === 0) continue;

        const semFirstMark = semMarks[0];
        const semRecords = await ExamMarks1.find({
          colid: Number(colid),
          semester: semData.semester,
          regulation: semFirstMark.regulation,
          branch: semFirstMark.branch,
          program: semFirstMark.program,
        }).lean();

        let semCredits = 0;
        let semGradePoints = 0;

        const uniqueSemPapers = [...new Set(semMarks.map((m) => m.papercode))];

        uniqueSemPapers.forEach((papercode) => {
          const semPaper = semRecords.find((p) => p.papercode === papercode);
          const semMark = semMarks.find((m) => m.papercode === papercode);

          if (semPaper && semMark) {
            const obtained =
              (semMark.thobtained || 0) +
              (semMark.probtained || 0) +
              (semMark.iatobtained || 0) +
              (semMark.iapobtained || 0);
            const max =
              (semPaper.thmax || 0) +
              (semPaper.prmax || 0) +
              (semPaper.iatmax || 0) +
              (semPaper.iapmax || 0);

            const semPaperCredit = calculateCredit(max);
            semCredits += semPaperCredit;

            const percentage = max > 0 ? (obtained / max) * 100 : 0;
            const gradeInfo = getUGCGrade(percentage);
            semGradePoints += gradeInfo.gradePoint * semPaperCredit;
          }
        });

        allCredits += semCredits;
        allGradePoints += semGradePoints;
      }

      const allSemesterDataMap = {}; // Use object/map instead of array

      // Initialize all 8 semesters with empty/null
      for (let i = 1; i <= 8; i++) {
        allSemesterDataMap[i] = null;
      }

      // Process each semester and put in correct position
      for (let sem of semesters) {
        const semMarks = allStudentMarks.filter(
          (m) =>
            m.semester === sem.semester &&
            String(m.year) === String(sem.year)
        );

        if (semMarks.length === 0) continue;

        const semFirstMark = semMarks[0];
        const semRecords = await ExamMarks1.find({
          colid: Number(colid),
          semester: sem.semester,
          regulation: semFirstMark.regulation,
          branch: semFirstMark.branch,
          program: semFirstMark.program,
        }).lean();

        let semTotal = 0, semMax = 0, semCredits = 0, semGradePoints = 0;
        const uniqueSemPapers = [...new Set(semMarks.map((m) => m.papercode))];

        uniqueSemPapers.forEach((papercode) => {
          const semPaper = semRecords.find((p) => p.papercode === papercode);
          const semMark = semMarks.find((m) => m.papercode === papercode);

          if (semPaper && semMark) {
            const obtained =
              (semMark.thobtained || 0) +
              (semMark.probtained || 0) +
              (semMark.iatobtained || 0) +
              (semMark.iapobtained || 0);
            const max =
              (semPaper.thmax || 0) +
              (semPaper.prmax || 0) +
              (semPaper.iatmax || 0) +
              (semPaper.iapmax || 0);

            semTotal += obtained;
            semMax += max;

            const semPaperCredit = calculateCredit(max);
            semCredits += semPaperCredit;

            const percentage = max > 0 ? (obtained / max) * 100 : 0;
            const gradeInfo = getUGCGrade(percentage);
            semGradePoints += gradeInfo.gradePoint * semPaperCredit;
          }
        });

        const semPercentage =
          semMax > 0
            ? parseFloat(((semTotal / semMax) * 100).toFixed(2))
            : 0;
        const semSGPA =
          semCredits > 0
            ? parseFloat((semGradePoints / semCredits).toFixed(2))
            : 0;

        allCredits += semCredits;
        allGradePoints += semGradePoints;

        // PUT IN CORRECT SEMESTER COLUMN (sem.semester is the key)
        allSemesterDataMap[sem.semester] = {
          total: semTotal,
          maxTotal: semMax,
          percentage: semPercentage,
          sgpa: semSGPA,
          result: uniqueSemPapers.length > 0 ? "Pass" : "-"
        };
      }

      // Convert to array for frontend: [sem1Data, sem2Data, ..., sem8Data]
      const allSemesterData = Array.from({ length: 8 }, (_, i) => allSemesterDataMap[i + 1]);
      const cgpa =
        allCredits > 0
          ? parseFloat((allGradePoints / allCredits).toFixed(2))
          : 0;

      studentsData.push({
        studentInfo,
        currentSemData: {
          totalObtained,
          totalMax,
          percentage,
          marks,
          sgpa,
          failedPapers:
            failedPapers.length > 0 ? failedPapers.join(", ") : "None",
          result: failedPapers.length === 0 ? "Pass" : "Fail",
        },
        summaryData: {
          cgpa,
          allSemesterData,
          currentSemesterNumber: parseInt(semester)
        },
      });
    }

    res.status(200).json({
      success: true,
      students: studentsData,
    });
  } catch (err) {
    // console.error("Error in getBulkTabulationData:", err);
    // res.status(500).json({ success: false, error: err.message });
  }
};

