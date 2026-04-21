const studalloc1 = require("../Models/studalloc1");

// Report 1: Courses with Faculty Assigned Count
exports.getcoursefacultyassignedds = async (req, res) => {
  try {
    const { colid } = req.query;

    const report = await studalloc1.aggregate([
      {
        $match: {
          colid: parseInt(colid),
          faculty: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            courseCode: "$courseCode",
            course: "$course",
          },
          totalAssignments: { $sum: 1 },
          uniqueFaculties: { $addToSet: "$faculty" },
          uniqueStudents: { $addToSet: "$student" },
        },
      },
      {
        $project: {
          _id: 0,
          courseCode: "$_id.courseCode",
          course: "$_id.course",
          totalAssignments: 1,
          facultyCount: { $size: "$uniqueFaculties" },
          studentCount: { $size: "$uniqueStudents" },
        },
      },
      {
        $sort: { courseCode: 1 },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// Report 2: Faculty-wise Course Assignment Details
exports.getfacultycoursesummaryds = async (req, res) => {
  try {
    const { colid } = req.query;

    const report = await studalloc1.aggregate([
      {
        $match: {
          colid: parseInt(colid),
          faculty: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            faculty: "$faculty",
            facultyid: "$facultyid",
            courseCode: "$courseCode",
            course: "$course",
          },
          totalAssigned: { $sum: 1 },
          completedCount: {
            $sum: {
              $cond: [
                { $ne: ["$checkeddate", null] },
                1,
                0,
              ],
            },
          },
          students: { $addToSet: "$student" },
        },
      },
      {
        $project: {
          _id: 0,
          faculty: "$_id.faculty",
          facultyid: "$_id.facultyid",
          courseCode: "$_id.courseCode",
          course: "$_id.course",
          totalAssigned: 1,
          completedCount: 1,
          pendingCount: { $subtract: ["$totalAssigned", "$completedCount"] },
          studentCount: { $size: "$students" },
          completionRate: {
            $multiply: [
              { $divide: ["$completedCount", "$totalAssigned"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { faculty: 1, courseCode: 1 },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// Report 3: Overall Faculty Summary
exports.getfacultyoverallsummaryds = async (req, res) => {
  try {
    const { colid } = req.query;

    const report = await studalloc1.aggregate([
      {
        $match: {
          colid: parseInt(colid),
          faculty: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            faculty: "$faculty",
            facultyid: "$facultyid",
          },
          totalAssigned: { $sum: 1 },
          completedCount: {
            $sum: {
              $cond: [{ $ne: ["$checkeddate", null] }, 1, 0],
            },
          },
          uniqueCourses: { $addToSet: "$courseCode" },
          uniqueStudents: { $addToSet: "$student" },
        },
      },
      {
        $project: {
          _id: 0,
          faculty: "$_id.faculty",
          facultyid: "$_id.facultyid",
          totalAssigned: 1,
          completedCount: 1,
          pendingCount: { $subtract: ["$totalAssigned", "$completedCount"] },
          courseCount: { $size: "$uniqueCourses" },
          studentCount: { $size: "$uniqueStudents" },
          completionRate: {
            $multiply: [
              { $divide: ["$completedCount", "$totalAssigned"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { completionRate: -1, faculty: 1 },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// Report 4: Course Completion Status
exports.getcoursecompletionstatusds = async (req, res) => {
  try {
    const { colid } = req.query;

    const report = await studalloc1.aggregate([
      {
        $match: {
          colid: parseInt(colid),
          faculty: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            courseCode: "$courseCode",
            course: "$course",
          },
          totalAssigned: { $sum: 1 },
          completedCount: {
            $sum: {
              $cond: [{ $ne: ["$checkeddate", null] }, 1, 0],
            },
          },
          faculties: { $addToSet: "$faculty" },
        },
      },
      {
        $project: {
          _id: 0,
          courseCode: "$_id.courseCode",
          course: "$_id.course",
          totalAssigned: 1,
          completedCount: 1,
          pendingCount: { $subtract: ["$totalAssigned", "$completedCount"] },
          facultyCount: { $size: "$faculties" },
          completionRate: {
            $multiply: [
              { $divide: ["$completedCount", "$totalAssigned"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { completionRate: 1, courseCode: 1 },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// Report 5: Faculty-Course Detailed Breakdown
exports.getfacultycoursestudentdetailsds = async (req, res) => {
  try {
    const { colid, faculty, courseCode } = req.query;

    const match = {
      colid: parseInt(colid),
      faculty: { $ne: "" },
    };

    if (faculty) match.faculty = faculty;
    if (courseCode) match.courseCode = courseCode;

    const report = await studalloc1.aggregate([
      { $match: match },
      {
        $project: {
          _id: 0,
          faculty: 1,
          facultyid: 1,
          courseCode: 1,
          course: 1,
          student: 1,
          regno: 1,
          component: 1,
          marks: 1,
          checkstatus: 1,
          checkeddate: 1,
          isCompleted: {
            $cond: [{ $ne: ["$checkeddate", null] }, "Yes", "No"],
          },
        },
      },
      {
        $sort: { faculty: 1, courseCode: 1, student: 1 },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// Report 6: Dashboard Summary
exports.getdashboardsummaryds = async (req, res) => {
  try {
    const { colid } = req.query;

    const summary = await studalloc1.aggregate([
      {
        $match: {
          colid: parseInt(colid),
        },
      },
      {
        $facet: {
          overall: [
            {
              $group: {
                _id: null,
                totalRecords: { $sum: 1 },
                assignedRecords: {
                  $sum: {
                    $cond: [{ $ne: ["$faculty", ""] }, 1, 0],
                  },
                },
                unassignedRecords: {
                  $sum: {
                    $cond: [{ $eq: ["$faculty", ""] }, 1, 0],
                  },
                },
                completedRecords: {
                  $sum: {
                    $cond: [{ $ne: ["$checkeddate", null] }, 1, 0],
                  },
                },
              },
            },
          ],
          facultyCount: [
            {
              $match: { faculty: { $ne: "" } },
            },
            {
              $group: {
                _id: "$faculty",
              },
            },
            {
              $count: "count",
            },
          ],
          courseCount: [
            {
              $match: { faculty: { $ne: "" } },
            },
            {
              $group: {
                _id: "$courseCode",
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          totalRecords: { $arrayElemAt: ["$overall.totalRecords", 0] },
          assignedRecords: { $arrayElemAt: ["$overall.assignedRecords", 0] },
          unassignedRecords: { $arrayElemAt: ["$overall.unassignedRecords", 0] },
          completedRecords: { $arrayElemAt: ["$overall.completedRecords", 0] },
          uniqueFaculties: { $arrayElemAt: ["$facultyCount.count", 0] },
          uniqueCourses: { $arrayElemAt: ["$courseCount.count", 0] },
          assignmentRate: {
            $multiply: [
              {
                $divide: [
                  { $arrayElemAt: ["$overall.assignedRecords", 0] },
                  { $arrayElemAt: ["$overall.totalRecords", 0] },
                ],
              },
              100,
            ],
          },
          completionRate: {
            $multiply: [
              {
                $divide: [
                  { $arrayElemAt: ["$overall.completedRecords", 0] },
                  { $arrayElemAt: ["$overall.assignedRecords", 0] },
                ],
              },
              100,
            ],
          },
        },
      },
    ]);

    res.status(200).json(summary[0] || {});
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};
