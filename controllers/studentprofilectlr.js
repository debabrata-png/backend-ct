const User = require('../Models/user');
const classenr1 = require('../Models/classenr1');
const classenr1advance = require('../Models/classenr1advance');
const classenr1remedial = require('../Models/classenr1remedial');
const testds1 = require('../Models/testds1');
const testsubmissionds1 = require('../Models/testsubmissionds1');
const classnew = require('../Models/classnew');
const classnewadvance = require('../Models/classnewadvance');
const classnewremedial = require('../Models/classnewremedial');

// ======================
// STUDENT PROFILE CONTROLLERS
// ======================

// Get Student Profile with Basic Info
exports.getstudentprofile = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!regno || !colid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide regno and colid'
      });
    }

    const student = await User.findOne({ regno, colid });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student profile',
      error: error.message
    });
  }
};

// Get Student Profile Stats (Enrollments, Tests, Performance)
exports.getstudentprofilestats = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!regno || !colid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide regno and colid'
      });
    }

    // Get enrollment counts
    const regularEnrollments = await classenr1.countDocuments({ 
      regno, 
      colid, 
      status1: 'Active' 
    });

    const advanceEnrollments = await classenr1advance.countDocuments({ 
      regno, 
      colid, 
      status1: 'Active' 
    });

    const remedialEnrollments = await classenr1remedial.countDocuments({ 
      regno, 
      colid, 
      status1: 'Active' 
    });

    // Get enrolled course codes
    const regularCourses = await classenr1.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const advanceCourses = await classenr1advance.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const remedialCourses = await classenr1remedial.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    // Combine all course codes
    const allCourseCodes = [...new Set([
      ...regularCourses, 
      ...advanceCourses, 
      ...remedialCourses
    ])];

    // Get test submissions
    const testSubmissions = await testsubmissionds1.find({ 
      regno, 
      colid 
    });

    const totalTests = testSubmissions.length;
    const completedTests = testSubmissions.filter(t => t.status === 'submitted').length;
    const averageScore = testSubmissions.length > 0 
      ? testSubmissions.reduce((sum, t) => sum + (t.totalscore || 0), 0) / testSubmissions.length 
      : 0;

    // Get upcoming tests (scheduled but not submitted)
    const submittedTestIds = testSubmissions.map(t => t.testid);
    const allTests = await testds1.find({ 
      colid,
      coursecode: { $in: allCourseCodes },
      status: 'active'
    });

    const upcomingTests = allTests.filter(test => {
      const testDate = new Date(test.scheduleddate);
      const now = new Date();
      return testDate >= now && !submittedTestIds.includes(test._id.toString());
    });

    res.status(200).json({
      success: true,
      data: {
        enrollments: {
          regular: regularEnrollments,
          advance: advanceEnrollments,
          remedial: remedialEnrollments,
          total: regularEnrollments + advanceEnrollments + remedialEnrollments
        },
        tests: {
          total: totalTests,
          completed: completedTests,
          pending: totalTests - completedTests,
          upcoming: upcomingTests.length,
          averageScore: Math.round(averageScore * 100) / 100
        },
        courses: {
          regular: regularCourses.length,
          advance: advanceCourses.length,
          remedial: remedialCourses.length,
          total: allCourseCodes.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching student stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student stats',
      error: error.message
    });
  }
};

// Get Student Recent Activities
exports.getstudentrecentactivities = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!regno || !colid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide regno and colid'
      });
    }

    const activities = [];

    // Get recent test submissions (last 10)
    const recentTests = await testsubmissionds1.find({ 
      regno, 
      colid 
    })
    .sort({ submittedat: -1 })
    .limit(10)
    .populate('testid');

    recentTests.forEach(test => {
      activities.push({
        type: 'test',
        action: 'submitted',
        title: test.testname || 'Test',
        coursecode: test.coursecode,
        date: test.submittedat,
        score: test.totalscore,
        percentage: test.percentage
      });
    });

    // Get recent enrollments (last 10)
    const recentEnrollments = await classenr1.find({ 
      regno, 
      colid 
    })
    .sort({ _id: -1 })
    .limit(5);

    recentEnrollments.forEach(enrollment => {
      activities.push({
        type: 'enrollment',
        action: 'enrolled',
        title: enrollment.course,
        coursecode: enrollment.coursecode,
        date: enrollment.createdAt || new Date()
      });
    });

    // Sort all activities by date
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      success: true,
      data: activities.slice(0, 20) // Return top 20 recent activities
    });
  } catch (error) {
    console.error('Error fetching student activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student activities',
      error: error.message
    });
  }
};

// Get Upcoming Assignments for Student
exports.getstudentupcomingassignments = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!regno || !colid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide regno and colid'
      });
    }

    // Get enrolled courses
    const regularCourses = await classenr1.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const advanceCourses = await classenr1advance.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const remedialCourses = await classenr1remedial.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const allCourseCodes = [...new Set([
      ...regularCourses, 
      ...advanceCourses, 
      ...remedialCourses
    ])];

    // Get today's classes from all three types
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 7); // Next 7 days

    const regularClasses = await classnew.find({
      coursecode: { $in: regularCourses },
      colid,
      classdate: { $gte: today, $lte: tomorrow }
    }).sort({ classdate: 1 });

    const advanceClasses = await classnewadvance.find({
      coursecode: { $in: advanceCourses },
      colid,
      classdate: { $gte: today, $lte: tomorrow }
    }).sort({ classdate: 1 });

    const remedialClasses = await classnewremedial.find({
      coursecode: { $in: remedialCourses },
      colid,
      classdate: { $gte: today, $lte: tomorrow }
    }).sort({ classdate: 1 });

    // Combine and format assignments (classes with topics are considered assignments)
    const assignments = [
      ...regularClasses.map(c => ({ ...c.toObject(), type: 'regular' })),
      ...advanceClasses.map(c => ({ ...c.toObject(), type: 'advance' })),
      ...remedialClasses.map(c => ({ ...c.toObject(), type: 'remedial' }))
    ].filter(c => c.topic); // Only classes with topics

    // Sort by date
    assignments.sort((a, b) => new Date(a.classdate) - new Date(b.classdate));

    res.status(200).json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.error('Error fetching upcoming assignments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming assignments',
      error: error.message
    });
  }
};

// Get Upcoming Tests for Student
exports.getstudentpcomingtests = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!regno || !colid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide regno and colid'
      });
    }

    // Get enrolled courses
    const regularCourses = await classenr1.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const advanceCourses = await classenr1advance.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const remedialCourses = await classenr1remedial.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    }).distinct('coursecode');

    const allCourseCodes = [...new Set([
      ...regularCourses, 
      ...advanceCourses, 
      ...remedialCourses
    ])];

    // Get submitted test IDs
    const submittedTests = await testsubmissionds1.find({ 
      regno, 
      colid 
    }).distinct('testid');

    // Get upcoming tests (not submitted yet)
    const now = new Date();
    const upcomingTests = await testds1.find({
      colid,
      coursecode: { $in: allCourseCodes },
      status: 'active',
      scheduleddate: { $gte: now },
      _id: { $nin: submittedTests }
    }).sort({ scheduleddate: 1 });

    res.status(200).json({
      success: true,
      data: upcomingTests
    });
  } catch (error) {
    console.error('Error fetching upcoming tests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming tests',
      error: error.message
    });
  }
};

// Get Student Enrolled Courses Details
exports.getstudentcoursesdetails = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!regno || !colid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide regno and colid'
      });
    }

    // Get regular courses
    const regularEnrollments = await classenr1.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    });

    // Get advance courses
    const advanceEnrollments = await classenr1advance.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    });

    // Get remedial courses
    const remedialEnrollments = await classenr1remedial.find({ 
      regno, 
      colid, 
      status1: 'Active' 
    });

    res.status(200).json({
      success: true,
      data: {
        regular: regularEnrollments,
        advance: advanceEnrollments,
        remedial: remedialEnrollments
      }
    });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course details',
      error: error.message
    });
  }
};