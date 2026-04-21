const classnew = require('../Models/classnew');
const attendancenew = require('../Models/attendancenew');
const classenr1 = require('../Models/classenr1');
const User = require('../Models/user');
const mongoose = require('mongoose');
const testds1 = require('../Models/testds1');
const gptapikeyds = require("../Models/gptapikeyds");

// ======================
// CLASS CONTROLLERS
// ======================

// Create Class
exports.createclass = async (req, res) => {
    try {
        const {
            name, user, colid, year, program, programcode, course,
            coursecode, semester, section, classdate, classtime,
            topic, module, link, classtype, status1, comments
        } = req.body;

        const newClass = await classnew.create({
            name, user, colid, year, program, programcode, course,
            coursecode, semester, section, classdate, classtime,
            topic, module, link, classtype, status1, comments
        });

        res.status(201).json({
            success: true,
            message: 'Class created successfully',
            data: newClass
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to create class',
        //     error: error.message
        // });
    }
};

// Get Classes by User
exports.getclassesbyuser = async (req, res) => {
    try {
        const { user, colid, coursecode } = req.query;       

        let filter = { user };
        if (colid) filter.colid = parseInt(colid);
        if (coursecode) filter.coursecode = coursecode;
        const classes = await classnew.find(filter).sort({ classdate: -1, classtime: -1 });

        res.json({
            success: true,
            message: 'Classes retrieved successfully',
            data: classes
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to retrieve classes',
        //     error: error.message
        // });
    }
};

exports.getclassesbycourse = async (req, res) =>{
  try {
    const { colid, coursecode } = req.query;

    const classes = await classnew.find({
      colid: parseInt(colid),
      coursecode: coursecode
    });

    return res.json({
      success: true,
            message: 'Classes retrieved successfully',
            data: classes
    })
  } catch (error) {
    
  }
}

// ======================
// STUDENT SEARCH CONTROLLER
// ======================

// Search Users (Students)
exports.searchusers = async (req, res) => {
    try {
        const { query, colid } = req.query;

        if (!colid) {
            return res.status(400).json({
                success: false,
                message: 'colid is required'
            });
        }

        const searchRegex = new RegExp(query, 'i');

        const users = await User.find({
            colid: parseInt(colid),
            $or: [
                { name: { $regex: searchRegex } },
                { regno: { $regex: searchRegex } },
                { email: { $regex: searchRegex } }
            ],
            status: 1
        }).limit(20);

        res.json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to search users',
        //     error: error.message
        // });
    }
};

// ======================
// ENROLLMENT CONTROLLERS
// ======================

// Enroll Student to Class
exports.enrollstudent = async (req, res) => {
    try {
        const {
            name, user, colid, year, program, programcode, course,
            coursecode, student, regno, learning, gender, classgroup,
            coursetype, semester, active, status1, comments
        } = req.body;

        const existingEnrollment = await classenr1.findOne({
            colid: parseInt(colid),
            regno,
            student,
            coursecode,
            course,
            user
        });

        if (existingEnrollment) {
            return res.json({
                success: false,
                alreadyEnrolled: true,
                message: 'You are already enrolled in this course',
                enrollment: existingEnrollment
            });
        }

        const enrollment = await classenr1.create({
            name, user, colid, year, program, programcode, course,
            coursecode, student, regno, learning, gender, classgroup,
            coursetype, semester, active, status1, comments
        });

        res.status(201).json({
            success: true,
            message: 'Student enrolled successfully',
            data: enrollment
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to enroll student',
        //     error: error.message
        // });
    }
};

// Get Enrolled Students for Class
exports.getenrolledstudents = async (req, res) => {
    try {
        const { coursecode, colid } = req.query;

        const enrollments = await classenr1.find({
            coursecode,
            colid: parseInt(colid),
        }).sort({ student: 1 });

        return res.json({
            success: true,
            message: 'Enrolled students retrieved successfully',
            data: enrollments
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to retrieve enrolled students',
        //     error: error.message
        // });
    }
};

// ======================
// ATTENDANCE CONTROLLERS
// ======================

// Mark Attendance (Bulk)
exports.markattendance = async (req, res) => {
    try {
        const { attendanceRecords } = req.body;

        // Delete existing attendance for same class date
        const { classid, classdate } = attendanceRecords[0];
        await attendancenew.deleteMany({ classid, classdate });

        // Insert new attendance records
        const attendance = await attendancenew.insertMany(attendanceRecords);

        res.status(201).json({
            success: true,
            message: 'Attendance marked successfully',
            data: attendance
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to mark attendance',
        //     error: error.message
        // });
    }
};

exports.getclassreportaggregate = async (req, res) => {
    try {
        const { user, coursecode, colid, semester, section } = req.query;

        // First check if documents exist for this faculty user
        const documentCount = await attendancenew.countDocuments({
            user: user, // Faculty user filter
            coursecode: coursecode,
            colid: parseInt(colid),
            semester: semester,
            section: section
        });

        if (documentCount === 0) {
            return res.json({
                success: true,
                message: 'No attendance data found for this class',
                data: {
                    students: [],
                    summary: {
                        totalStudents: 0,
                        totalClasses: 0,
                        totalAttendanceRecords: 0,
                        totalPresent: 0,
                        overallAttendanceRate: 0
                    }
                }
            });
        }

        // Student-wise attendance aggregation for specific faculty user
        const report = await attendancenew.aggregate([
            {
                $match: {
                    user: user, // Faculty user filter
                    coursecode: coursecode,
                    colid: parseInt(colid),
                    semester: semester,
                    section: section
                }
            },
            {
                $group: {
                    _id: {
                        student: "$student",
                        regno: "$regno"
                    },
                    totalClasses: { $sum: 1 },
                    presentCount: {
                        $sum: {
                            $cond: [{ $eq: ["$att", 1] }, 1, 0]
                        }
                    },
                    absentCount: {
                        $sum: {
                            $cond: [{ $eq: ["$att", 0] }, 1, 0]
                        }
                    }
                }
            },
            {
                $addFields: {
                    attendancePercentage: {
                        $cond: [
                            { $eq: ["$totalClasses", 0] },
                            0,
                            {
                                $round: [
                                    {
                                        $multiply: [
                                            { $divide: ["$presentCount", "$totalClasses"] },
                                            100
                                        ]
                                    },
                                    2
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    student: "$_id.student",
                    regno: "$_id.regno",
                    totalClasses: 1,
                    presentCount: 1,
                    absentCount: 1,
                    attendancePercentage: 1
                }
            },
            {
                $sort: { student: 1 }
            }
        ]);

        // Calculate overall class statistics for this faculty user
        const classStats = await attendancenew.aggregate([
            {
                $match: {
                    user: user, // Faculty user filter
                    coursecode: coursecode,
                    colid: parseInt(colid),
                    semester: semester,
                    section: section
                }
            },
            {
                $group: {
                    _id: null,
                    totalStudents: { $addToSet: "$regno" },
                    totalClasses: { $addToSet: { $dateToString: { format: "%Y-%m-%d", date: "$classdate" } } },
                    totalAttendanceRecords: { $sum: 1 },
                    totalPresent: {
                        $sum: {
                            $cond: [{ $eq: ["$att", 1] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalStudents: { $size: "$totalStudents" },
                    totalClasses: { $size: "$totalClasses" },
                    totalAttendanceRecords: 1,
                    totalPresent: 1,
                    overallAttendanceRate: {
                        $cond: [
                            { $eq: ["$totalAttendanceRecords", 0] },
                            0,
                            {
                                $round: [
                                    {
                                        $multiply: [
                                            { $divide: ["$totalPresent", "$totalAttendanceRecords"] },
                                            100
                                        ]
                                    },
                                    2
                                ]
                            }
                        ]
                    }
                }
            }
        ]);

        res.json({
            success: true,
            message: 'Class report generated successfully',
            data: {
                students: report,
                summary: classStats[0] || {
                    totalStudents: 0,
                    totalClasses: 0,
                    totalAttendanceRecords: 0,
                    totalPresent: 0,
                    overallAttendanceRate: 0
                }
            }
        });
    } catch (error) {
        // console.error('Class report error:', error);
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to generate class report',
        //     error: error.message
        // });
    }
};

exports.getattendancesummarybydate = async (req, res) => {
  try {
    const { user, colid, startDate, endDate } = req.query;
    
    // Validate required parameters
    if (!user || !colid || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'user, colid, startDate, and endDate are required'
      });
    }

    const report = await attendancenew.aggregate([
      {
        $match: {
          user: user,
          colid: parseInt(colid),
          classdate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$classdate"
            }
          },
          totalStudents: { $addToSet: "$regno" },
          totalClasses: { $sum: 1 },
          totalPresent: {
            $sum: {
              $cond: [{ $eq: ["$att", 1] }, 1, 0]
            }
          },
          totalAbsent: {
            $sum: {
              $cond: [{ $eq: ["$att", 0] }, 1, 0]
            }
          },
          courses: {
            $addToSet: {
              course: "$course",
              coursecode: "$coursecode"
            }
          }
        }
      },
      {
        $addFields: {
          attendanceRate: {
            $cond: [
              { $eq: ["$totalClasses", 0] },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$totalPresent", "$totalClasses"] },
                      100
                    ]
                  },
                  2
                ]
              }
            ]
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalStudents: { $size: "$totalStudents" },
          totalCourses: { $size: "$courses" },
          totalClasses: 1,
          totalPresent: 1,
          totalAbsent: 1,
          attendanceRate: 1
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.json({
      success: true,
      message: 'Attendance summary by date generated successfully',
      data: report,
      period: {
        startDate,
        endDate
      }
    });
  } catch (error) {
    console.error('Attendance summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate attendance summary',
      error: error.message
    });
  }
};


// MODIFY your existing getstudentreportaggregate controller function
exports.getstudentreportaggregate = async (req, res) => {
    try {
        const { user, colid } = req.query;

        // Calculate last 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const report = await attendancenew.aggregate([
            {
                $match: {
                    user: user,
                    colid: parseInt(colid)
                }
            },
            {
                $group: {
                    _id: {
                        student: "$student",
                        regno: "$regno"
                    },
                    courses: {
                        $addToSet: {
                            course: "$course",
                            coursecode: "$coursecode"
                        }
                    },
                    totalClasses: { $sum: 1 },
                    totalPresent: {
                        $sum: {
                            $cond: [{ $eq: ["$att", 1] }, 1, 0]
                        }
                    },
                    // NEW: Count unique days present in last 30 days
                    lastMonthDaysPresent: {
                        $addToSet: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$att", 1] },
                                        { $gte: ["$classdate", startDate] },
                                        { $lte: ["$classdate", endDate] }
                                    ]
                                },
                                { $dateToString: { format: "%Y-%m-%d", date: "$classdate" } },
                                null
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    student: "$_id.student",
                    regno: "$_id.regno",
                    totalCourses: { $size: "$courses" },
                    totalClasses: 1,
                    totalPresent: 1,
                    // NEW: Calculate actual days count
                    lastMonthDaysPresent: {
                        $size: {
                            $filter: {
                                input: "$lastMonthDaysPresent",
                                cond: { $ne: ["$$this", null] }
                            }
                        }
                    },
                    overallAttendancePercentage: {
                        $cond: [
                            { $eq: ["$totalClasses", 0] },
                            0,
                            {
                                $round: [
                                    {
                                        $multiply: [
                                            { $divide: ["$totalPresent", "$totalClasses"] },
                                            100
                                        ]
                                    },
                                    2
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $sort: { student: 1 }
            }
        ]);

        res.json({
            success: true,
            message: 'Student report generated successfully',
            data: {
                students: report,
                summary: {
                    totalStudents: report.length,
                    reportPeriod: "Last 30 days"
                }
            }
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to generate student report',
        //     error: error.message
        // });
    }
};

// Add this NEW controller function
exports.getsinglestudentrport = async (req, res) => {
    try {
        const { user, colid, coursecode, regno } = req.query;

        // Calculate last 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        // Get detailed attendance for this specific student
        const studentReport = await attendancenew.aggregate([
            {
                $match: {
                    user: user, // Faculty user
                    colid: parseInt(colid),
                    coursecode: coursecode,
                    regno: regno, // Specific student
                    classdate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        student: "$student",
                        regno: "$regno",
                        course: "$course",
                        coursecode: "$coursecode"
                    },
                    // Count unique days present
                    uniqueDaysPresent: {
                        $addToSet: {
                            $cond: [
                                { $eq: ["$att", 1] },
                                { $dateToString: { format: "%Y-%m-%d", date: "$classdate" } },
                                null
                            ]
                        }
                    },
                    totalClasses: { $sum: 1 },
                    totalPresent: {
                        $sum: {
                            $cond: [{ $eq: ["$att", 1] }, 1, 0]
                        }
                    },
                    totalAbsent: {
                        $sum: {
                            $cond: [{ $eq: ["$att", 0] }, 1, 0]
                        }
                    },
                    // Daily attendance details
                    dailyAttendance: {
                        $push: {
                            date: { $dateToString: { format: "%Y-%m-%d", date: "$classdate" } },
                            attendance: {
                                $cond: [{ $eq: ["$att", 1] }, "Present", "Absent"]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    student: "$_id.student",
                    regno: "$_id.regno",
                    course: "$_id.course",
                    coursecode: "$_id.coursecode",
                    totalClasses: 1,
                    totalPresent: 1,
                    totalAbsent: 1,
                    // Count days present (filter out null values)
                    daysPresent: {
                        $size: {
                            $filter: {
                                input: "$uniqueDaysPresent",
                                cond: { $ne: ["$$this", null] }
                            }
                        }
                    },
                    attendancePercentage: {
                        $round: [
                            {
                                $multiply: [
                                    { $divide: ["$totalPresent", "$totalClasses"] },
                                    100
                                ]
                            },
                            2
                        ]
                    },
                    dailyAttendance: 1
                }
            }
        ]);

        if (studentReport.length === 0) {
            return res.json({
                success: false,
                message: 'No attendance data found for this student in the specified course and time period'
            });
        }

        res.json({
            success: true,
            message: 'Single student report generated successfully',
            data: {
                student: studentReport[0],
                period: {
                    startDate: startDate.toLocaleDateString(),
                    endDate: endDate.toLocaleDateString()
                }
            }
        });
    } catch (error) {
        // console.error('Single student report error:', error);
        // res.status(500).json({
        //     success: false,
        //     message: 'Failed to generate single student report',
        //     error: error.message
        // });
    }
};


exports.getenrollments = async (req, res) => {
    try {
        const { colid, coursecode, year, user, status } = req.query;
        if (!colid || !coursecode || !year) {
            return res.status(400).json({ success: false, message: 'colid, coursecode, year are required' });
        }

        const match = {
            colid: Number(colid),
            coursecode,
            year
        };
        if (user) match.user = user;

        if (status === 'active') match.active = 'Yes';
        if (status === 'pending') match.active = { $ne: 'Yes' };

        const list = await classenr1.find(match).sort({ _id: -1 }).lean();
        return res.json({ success: true, data: list });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Failed to fetch enrollments', error: e.message });
    }
};

// PUT /api/v2/update-enrollment-status/:id
// Body: { active: 'yes' | 'no', status1?: 'Active' | 'Pending' | 'Rejected' | string }
exports.updateenrollmentstatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { active, status1 } = req.body;

        const update = {};
        if (typeof active !== 'undefined') update.active = active;
        if (typeof status1 !== 'undefined') update.status1 = status1;

        if (Object.keys(update).length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }

        await classenr1.findByIdAndUpdate(id, update);
        return res.json({ success: true, message: 'Enrollment updated' });
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Failed to update enrollment', error: e.message });
    }
};

// ✅ NEW: Update Class Controller
exports.updateclass = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, colid, ...updateData } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid class ID format'
      });
    }

    // Update class with authorization check
    const updatedClass = await classnew.findOneAndUpdate(
      { 
        _id: id, 
        user: user, 
        colid: parseInt(colid) 
      },
      { 
        ...updateData,
        updatedat: new Date() 
      },
      { 
        new: true,  // Return updated document
        runValidators: true  // Run schema validations
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found or access denied'
      });
    }

    res.json({
      success: true,
      message: 'Class updated successfully',
      data: updatedClass
    });

  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update class',
      error: error.message
    });
  }
};

// ✅ NEW: Delete Class Controller
exports.deleteclass = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, colid } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid class ID format'
      });
    }

    // Delete class with authorization check
    const deletedClass = await classnew.findOneAndDelete({
      _id: id,
      user: user,
      colid: parseInt(colid)
    });

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found or access denied'
      });
    }

    // Optional: Also delete related attendance records
    // await attendanceds.deleteMany({ classid: id });

    res.json({
      success: true,
      message: 'Class deleted successfully',
      data: {
        deletedClass: {
          id: deletedClass._id,
          topic: deletedClass.topic,
          course: deletedClass.course
        }
      }
    });

  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete class',
      error: error.message
    });
  }
};

// ✅ UPDATED: Class Report by Course (not individual classes)
exports.getclassreportbycourse = async (req, res) => {
  try {
    const { user, coursecode, colid, startDate, endDate } = req.query;
    
    // Validate required parameters
    if (!user || !coursecode || !colid) {
      return res.status(400).json({
        success: false,
        message: 'user, coursecode, and colid are required'
      });
    }

    // Build match criteria
    const matchCriteria = {
      user: user,
      coursecode: coursecode,
      colid: parseInt(colid)
    };

    // Add date range if provided
    if (startDate && endDate) {
      matchCriteria.classdate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // First check if documents exist
    const documentCount = await attendancenew.countDocuments(matchCriteria);

    if (documentCount === 0) {
      return res.json({
        success: true,
        message: 'No attendance data found for this course',
        data: {
          students: [],
          summary: {
            totalStudents: 0,
            totalClasses: 0,
            totalAttendanceRecords: 0,
            totalPresent: 0,
            overallAttendanceRate: 0
          },
          courseInfo: {
            coursecode,
            course: '',
            totalDaysWithClasses: 0
          }
        }
      });
    }

    // Get course info
    const courseInfo = await attendancenew.findOne(matchCriteria).select('course coursecode semester section program');

    // Student-wise attendance aggregation
    const report = await attendancenew.aggregate([
      {
        $match: matchCriteria
      },
      {
        $group: {
          _id: {
            student: "$student",
            regno: "$regno"
          },
          totalClasses: { $sum: 1 },
          presentCount: {
            $sum: {
              $cond: [{ $eq: ["$att", 1] }, 1, 0]
            }
          },
          absentCount: {
            $sum: {
              $cond: [{ $eq: ["$att", 0] }, 1, 0]
            }
          }
        }
      },
      {
        $addFields: {
          attendancePercentage: {
            $cond: [
              { $eq: ["$totalClasses", 0] },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$presentCount", "$totalClasses"] },
                      100
                    ]
                  },
                  2
                ]
              }
            ]
          }
        }
      },
      {
        $project: {
          _id: 0,
          student: "$_id.student",
          regno: "$_id.regno",
          totalClasses: 1,
          presentCount: 1,
          absentCount: 1,
          attendancePercentage: 1
        }
      },
      {
        $sort: { student: 1 }
      }
    ]);

    // Calculate overall statistics
    const classStats = await attendancenew.aggregate([
      {
        $match: matchCriteria
      },
      {
        $group: {
          _id: null,
          totalStudents: { $addToSet: "$regno" },
          totalClasses: { $addToSet: { $dateToString: { format: "%Y-%m-%d", date: "$classdate" } } },
          totalAttendanceRecords: { $sum: 1 },
          totalPresent: {
            $sum: {
              $cond: [{ $eq: ["$att", 1] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalStudents: { $size: "$totalStudents" },
          totalClasses: { $size: "$totalClasses" },
          totalAttendanceRecords: 1,
          totalPresent: 1,
          overallAttendanceRate: {
            $cond: [
              { $eq: ["$totalAttendanceRecords", 0] },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$totalPresent", "$totalAttendanceRecords"] },
                      100
                    ]
                  },
                  2
                ]
              }
            ]
          }
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Course report generated successfully',
      data: {
        students: report,
        summary: classStats[0] || {
          totalStudents: 0,
          totalClasses: 0,
          totalAttendanceRecords: 0,
          totalPresent: 0,
          overallAttendanceRate: 0
        },
        courseInfo: {
          coursecode: coursecode,
          course: courseInfo?.course || '',
          semester: courseInfo?.semester || '',
          section: courseInfo?.section || '',
          program: courseInfo?.program || '',
          totalDaysWithClasses: classStats[0]?.totalClasses || 0
        }
      }
    });
  } catch (error) {
    console.error('Course report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate course report',
      error: error.message
    });
  }
};

// ✅ NEW: Get Faculty Courses (for course selection)
exports.getfacultycourses = async (req, res) => {
  try {
    const { user, colid } = req.query;
    
    if (!user || !colid) {
      return res.status(400).json({
        success: false,
        message: 'user and colid are required'
      });
    }

    // Get unique courses taught by this faculty
    const courses = await attendancenew.aggregate([
      {
        $match: {
          user: user,
          colid: parseInt(colid)
        }
      },
      {
        $group: {
          _id: {
            coursecode: "$coursecode",
            course: "$course"
          },
          semester: { $first: "$semester" },
          section: { $first: "$section" },
          program: { $first: "$program" },
          lastClassDate: { $max: "$classdate" },
          totalClasses: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          coursecode: "$_id.coursecode",
          course: "$_id.course",
          semester: 1,
          section: 1,
          program: 1,
          lastClassDate: 1,
          totalClasses: 1
        }
      },
      {
        $sort: { lastClassDate: -1 }
      }
    ]);

    res.json({
      success: true,
      message: 'Faculty courses retrieved successfully',
      data: courses
    });
  } catch (error) {
    console.error('Get faculty courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get faculty courses',
      error: error.message
    });
  }
};