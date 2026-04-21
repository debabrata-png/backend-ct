const Marksheetdatads = require('../Models/marksheetdatads');
const User = require('../Models/user');
const Attendancenew = require('../Models/attendancenew');

// Helper function to calculate grade based on marks
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

// Helper function to calculate attendance
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

// Create marksheet data (single student)
exports.createmarksheetdatads = async (req, res) => {
  try {
    const { colid, user } = req.query;
    const marksheetData = req.body;

    // Auto-calculate totals and grades
    if (marksheetData.subjects && marksheetData.subjects.length > 0) {
      marksheetData.subjects.forEach(subject => {
        // Term 1 calculations
        subject.term1Total = 
          (subject.term1PeriodicTest || 0) +
          (subject.term1Notebook || 0) +
          (subject.term1Enrichment || 0) +
          (subject.term1MidExam || 0);
        subject.term1Grade = calculateGrade(subject.term1Total, 100);

        // Term 2 calculations
        subject.term2Total = 
          (subject.term2PeriodicTest || 0) +
          (subject.term2Notebook || 0) +
          (subject.term2Enrichment || 0) +
          (subject.term2AnnualExam || 0);
        subject.term2Grade = calculateGrade(subject.term2Total, 100);
      });

      // Calculate overall totals
      marksheetData.term1TotalMarks = marksheetData.subjects.reduce((sum, s) => sum + (s.term1Total || 0), 0);
      marksheetData.term2TotalMarks = marksheetData.subjects.reduce((sum, s) => sum + (s.term2Total || 0), 0);
      marksheetData.grandTotal = marksheetData.term1TotalMarks + marksheetData.term2TotalMarks;
      
      const maxMarks = marksheetData.subjects.length * 200; // 100 per term
      marksheetData.percentage = maxMarks > 0 ? ((marksheetData.grandTotal / maxMarks) * 100).toFixed(2) : 0;
      marksheetData.overallGrade = calculateGrade(marksheetData.grandTotal, maxMarks);
    }

    const newMarksheet = new Marksheetdatads({
      ...marksheetData,
      colid: Number(colid),
      user,
      updatedAt: new Date()
    });

    await newMarksheet.save();

    res.json({
      success: true,
      message: 'Marksheet data created successfully',
      data: newMarksheet
    });
  } catch (error) {
    console.error('Error creating marksheet data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create marksheet data',
      error: error.message
    });
  }
};

// Edit marksheet data
exports.editmarksheetdatads = async (req, res) => {
  try {
    const { id } = req.query;
    const marksheetData = req.body;

    // Auto-calculate totals and grades
    if (marksheetData.subjects && marksheetData.subjects.length > 0) {
      marksheetData.subjects.forEach(subject => {
        subject.term1Total = 
          (subject.term1PeriodicTest || 0) +
          (subject.term1Notebook || 0) +
          (subject.term1Enrichment || 0) +
          (subject.term1MidExam || 0);
        subject.term1Grade = calculateGrade(subject.term1Total, 100);

        subject.term2Total = 
          (subject.term2PeriodicTest || 0) +
          (subject.term2Notebook || 0) +
          (subject.term2Enrichment || 0) +
          (subject.term2AnnualExam || 0);
        subject.term2Grade = calculateGrade(subject.term2Total, 100);
      });

      marksheetData.term1TotalMarks = marksheetData.subjects.reduce((sum, s) => sum + (s.term1Total || 0), 0);
      marksheetData.term2TotalMarks = marksheetData.subjects.reduce((sum, s) => sum + (s.term2Total || 0), 0);
      marksheetData.grandTotal = marksheetData.term1TotalMarks + marksheetData.term2TotalMarks;
      
      const maxMarks = marksheetData.subjects.length * 200;
      marksheetData.percentage = maxMarks > 0 ? ((marksheetData.grandTotal / maxMarks) * 100).toFixed(2) : 0;
      marksheetData.overallGrade = calculateGrade(marksheetData.grandTotal, maxMarks);
    }

    marksheetData.updatedAt = new Date();

    const updatedMarksheet = await Marksheetdatads.findByIdAndUpdate(
      id,
      marksheetData,
      { new: true }
    );

    if (!updatedMarksheet) {
      return res.status(404).json({
        success: false,
        message: 'Marksheet data not found'
      });
    }

    res.json({
      success: true,
      message: 'Marksheet data updated successfully',
      data: updatedMarksheet
    });
  } catch (error) {
    console.error('Error updating marksheet data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update marksheet data',
      error: error.message
    });
  }
};

// List marksheet data
exports.listmarksheetdatads = async (req, res) => {
  try {
    const { colid, user, programcode, academicyear, semester, regno } = req.query;
    
    const filter = {
      colid: Number(colid),
      user
    };

    if (programcode) filter.programcode = programcode;
    if (academicyear) filter.academicyear = academicyear;
    if (semester) filter.semester = semester;
    if (regno) filter.regno = regno;

    const marksheets = await Marksheetdatads.find(filter).sort({ regno: 1 });

    res.json({
      success: true,
      data: marksheets
    });
  } catch (error) {
    console.error('Error listing marksheet data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list marksheet data',
      error: error.message
    });
  }
};

// Delete marksheet data
exports.deletemarksheetdatads = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedMarksheet = await Marksheetdatads.findByIdAndDelete(id);

    if (!deletedMarksheet) {
      return res.status(404).json({
        success: false,
        message: 'Marksheet data not found'
      });
    }

    res.json({
      success: true,
      message: 'Marksheet data deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting marksheet data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete marksheet data',
      error: error.message
    });
  }
};

// Get complete marksheet data for PDF generation (single student)
exports.getmarksheetforpdfds = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    // Fetch marksheet data
    const marksheetData = await Marksheetdatads.findOne({
      regno,
      colid: Number(colid)
    });

    if (!marksheetData) {
      return res.status(404).json({
        success: false,
        message: 'Marksheet data not found for this student'
      });
    }

    // Fetch user data
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

    // Fetch attendance data
    const attendanceData = await calculateAttendance(
      regno,
      colid,
      marksheetData.semester,
      marksheetData.academicyear
    );

    // Combine all data for PDF generation
    const pdfData = {
      session: marksheetData.academicyear,
      classtype: marksheetData.classtype,
      profile: {
        name: userData.name || '',
        father: userData.fathername || '',
        mother: userData.mothername || '',
        address: userData.address || 'Behind Ambedkar Bhawan, Mudapar Bazar, Korba (C.G.)',
        classSection: `Class ${marksheetData.semester} - ${userData.section || 'A'}`,
        rollNo: userData.rollno || regno,
        dob: userData.dob || '01-01-2000',
        admissionNo: regno,
        contact: userData.phone || '',
        cbseRegNo: regno,
        photo: userData.photo || ''
      },
      attendance: attendanceData,
      subjects: marksheetData.subjects,
      coScholastic: marksheetData.coScholastic,
      term1TotalMarks: marksheetData.term1TotalMarks,
      term2TotalMarks: marksheetData.term2TotalMarks,
      grandTotal: marksheetData.grandTotal,
      percentage: marksheetData.percentage,
      overallGrade: marksheetData.overallGrade,
      rank: marksheetData.rank,
      remarks: marksheetData.remarks,
      promotedToClass: marksheetData.promotedToClass,
      newSessionDate: marksheetData.newSessionDate
    };

    res.json({
      success: true,
      data: pdfData
    });
  } catch (error) {
    console.error('Error getting marksheet for PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get marksheet data',
      error: error.message
    });
  }
};

// Get bulk marksheet data for PDF generation
exports.getbulkmarksheetforpdfds = async (req, res) => {
  try {
    const { programcode, academicyear, semester, colid } = req.query;

    // Fetch all marksheet data for the criteria
    const marksheetDataList = await Marksheetdatads.find({
      programcode,
      academicyear,
      semester,
      colid: Number(colid),
      status: 'finalized' // Only get finalized marksheets
    });

    if (marksheetDataList.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No finalized marksheets found for the given criteria'
      });
    }

    // Fetch user data for all students
    const regnos = marksheetDataList.map(m => m.regno);
    const userDataList = await User.find({
      regno: { $in: regnos },
      colid: Number(colid)
    });

    // Create a map for quick lookup
    const userMap = {};
    userDataList.forEach(user => {
      userMap[user.regno] = user;
    });

    // Combine data for each student
    const bulkPdfData = [];

    for (const marksheetData of marksheetDataList) {
      const userData = userMap[marksheetData.regno];
      
      if (!userData) continue;

      const attendanceData = await calculateAttendance(
        marksheetData.regno,
        colid,
        marksheetData.semester,
        marksheetData.academicyear
      );

      bulkPdfData.push({
        session: marksheetData.academicyear,
        classtype: marksheetData.classtype,
        profile: {
          name: userData.name || '',
          father: userData.fathername || '',
          mother: userData.mothername || '',
          address: userData.address || 'Behind Ambedkar Bhawan, Mudapar Bazar, Korba (C.G.)',
          classSection: `Class ${marksheetData.semester} - ${userData.section || 'A'}`,
          rollNo: userData.rollno || marksheetData.regno,
          dob: userData.dob || '01-01-2000',
          admissionNo: marksheetData.regno,
          contact: userData.phone || '',
          cbseRegNo: marksheetData.regno,
          photo: userData.photo || ''
        },
        attendance: attendanceData,
        subjects: marksheetData.subjects,
        coScholastic: marksheetData.coScholastic,
        term1TotalMarks: marksheetData.term1TotalMarks,
        term2TotalMarks: marksheetData.term2TotalMarks,
        grandTotal: marksheetData.grandTotal,
        percentage: marksheetData.percentage,
        overallGrade: marksheetData.overallGrade,
        rank: marksheetData.rank,
        remarks: marksheetData.remarks,
        promotedToClass: marksheetData.promotedToClass,
        newSessionDate: marksheetData.newSessionDate
      });
    }

    res.json({
      success: true,
      count: bulkPdfData.length,
      data: bulkPdfData
    });
  } catch (error) {
    console.error('Error getting bulk marksheet data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get bulk marksheet data',
      error: error.message
    });
  }
};
