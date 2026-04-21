const User = require('../Models/user.js');
const ExamMarks2 = require('../Models/exammarks2ds.js');

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

// API 1: Get Student Info
exports.getStudentInfoForTabulation = async (req, res) => {
  try {
    const { colid, regno } = req.query;

    const student = await User.findOne({ colid: colid, regno });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      student: {
        regno: student.regno,
        name: student.name,
        fathername: student.fathername || '',
        mothername: student.mothername || '',
        enrollmentNo: student.regno,
        program: student.programcode,
        branch: student.department,
        semester: student.semester,
        category: student.category || '',
        gender: student.gender || '',
        admissionYear: student.admissionyear || ''
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// API 3: Get Current Semester Marks
exports.getCurrentSemesterMarks = async (req, res) => {
  try {
    const { colid, regno, semester, year, program, regulation, branch } = req.query;

    const semesterNum = parseInt(semester);
    const yearNum = parseInt(year);
    // Fetch ALL records for this semester/program
    const allRecords = await ExamMarks2.find({
      colid: colid,
      program: program,
      semester: semesterNum,
      regulation: regulation,
      branch: branch
    }).lean();

    if (allRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No data found for colid: ${colid}, program: ${program}, semester: ${semesterNum}, regulation: ${regulation}, branch: ${branch}`
      });
    }

    // Get unique paper codes
    const uniquePaperCodes = [...new Set(allRecords.map(r => r.papercode))];
    // Fetch student marks
    const studentMarks = await ExamMarks2.find({
      colid: colid,
      regno: regno,
      semester: semesterNum,
      year: yearNum
    }).lean();

    if (studentMarks.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No marks found for student ${regno} in semester ${semesterNum}`
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

    const detailedMarks = uniquePaperCodes.map(papercode => {
      const paperStructure = allRecords.find(r => r.papercode === papercode);
      const studentMark = studentMarks.find(m => m.papercode === papercode);

      if (!paperStructure || !studentMark) {
        return null;
      }

      if (!examCode) {
        examCode = studentMark.examcode || paperStructure.examcode || '';
        month = studentMark.month || paperStructure.month || '';
        yearValue = studentMark.year || paperStructure.year || '';
        status = studentMark.status || paperStructure.status || '';
      }

      const thObtained = studentMark.thobtained || 0;
      const prObtained = studentMark.probtained || 0;
      const iatObtained = studentMark.iatobtained || 0;
      const iapObtained = studentMark.iapobtained || 0;

      const seObtained = thObtained + prObtained;
      const iaObtained = iatObtained + iapObtained;
      const total = seObtained + iaObtained;

      const thMax = paperStructure.thmax || 0;
      const prMax = paperStructure.prmax || 0;
      const iatMax = paperStructure.iatmax || 0;
      const iapMax = paperStructure.iapmax || 0;

      const seMax = thMax + prMax;
      const iaMax = iatMax + iapMax;
      const maxTotal = seMax + iaMax;

      const percentage = maxTotal > 0 ? parseFloat(((total / maxTotal) * 100).toFixed(2)) : 0;
      const gradeInfo = getUGCGrade(percentage);

      const credit = paperStructure.credit || 0;
      totalCredits += credit;
      totalGradePoints += gradeInfo.gradePoint * credit;
      totalObtained += total;
      totalMax += maxTotal;

      if (gradeInfo.grade === 'F') {
        failedPapers.push(paperStructure.papercode);
      }

      return {
        paperCode: paperStructure.papercode,
        paperName: paperStructure.papername,
        type: prMax > 0 ? 'P' : 'T',
        thMax,
        thObtained,
        prMax,
        prObtained,
        seObtained,
        seMax,
        iatMax,
        iatObtained,
        iapMax,
        iapObtained,
        iaObtained,
        iaMax,
        credit,
        total,
        maxTotal,
        percentage,
        grade: gradeInfo.grade,
        gradePoint: gradeInfo.gradePoint
      };
    }).filter(m => m !== null);

    const sgpa = totalCredits > 0 ? parseFloat((totalGradePoints / totalCredits).toFixed(2)) : 0;
    const percentage = totalMax > 0 ? parseFloat(((totalObtained / totalMax) * 100).toFixed(2)) : 0;

    res.status(200).json({
      success: true,
      currentSemester: {
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
        failedPapers: failedPapers.length > 0 ? failedPapers.join(', ') : 'None',
        result: failedPapers.length === 0 ? 'Pass' : 'Fail'
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// API 4: Get All Semester Summary
exports.getAllSemesterSummary = async (req, res) => {
  try {
    const { colid, regno, program } = req.query;

    // Get all student marks
    const studentMarks = await ExamMarks2.find({
      colid: colid,
      regno: regno
    }).lean().sort({ semester: 1, year: 1 });

    if (studentMarks.length === 0) {
      return res.status(404).json({ success: false, message: 'No marks found for this student' });
    }

    // Get unique semesters
    const uniqueSems = [...new Set(studentMarks.map(m => `${m.semester}-${m.year}`))];
    const semesters = uniqueSems.map(s => {
      const [sem, year] = s.split('-');
      return { semester: parseInt(sem), year: parseInt(year) };
    }).sort((a, b) => a.year === b.year ? a.semester - b.semester : a.year - b.year);

    const semesterSummary = [];
    let allCredits = 0;
    let allGradePoints = 0;

    for (let semData of semesters) {
      const semMarks = studentMarks.filter(m => m.semester === semData.semester && m.year === semData.year);

      if (semMarks.length === 0) continue;

      const firstMark = semMarks[0];

      const allSemRecords = await ExamMarks2.find({
        colid: colid,
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

      semMarks.forEach(mark => {
        const paper = allSemRecords.find(p => p.papercode === mark.papercode);
        if (paper) {
          const obtained = (mark.thobtained || 0) + (mark.probtained || 0) +
                          (mark.iatobtained || 0) + (mark.iapobtained || 0);
          const max = (paper.thmax || 0) + (paper.prmax || 0) +
                     (paper.iatmax || 0) + (paper.iapmax || 0);

          totalObtained += obtained;
          totalMax += max;
          credits += paper.credit || 0;

          const percentage = max > 0 ? ((obtained / max) * 100) : 0;
          const gradeInfo = getUGCGrade(percentage);
          gradePoints += gradeInfo.gradePoint * (paper.credit || 0);

          if (gradeInfo.grade === 'F') failedCount++;
        }
      });

      const percentage = totalMax > 0 ? parseFloat(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
      const sgpa = credits > 0 ? parseFloat((gradePoints / credits).toFixed(2)) : 0;

      allCredits += credits;
      allGradePoints += sgpa * credits;

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
    res.status(500).json({ success: false, error: err.message });
  }
};

// API: Get Available Data
exports.getAvailableData = async (req, res) => {
  try {
    const { colid, program, branch, regulation } = req.query;
    // Query with STRING colid (as it is in database)
    const allRecords = await ExamMarks2.find({
      colid: colid,
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

    // Get unique semester-year combinations
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
    res.status(500).json({ success: false, error: err.message });
  }
};
