const User = require('../Models/user');
const Task = require('../Models/task1');
const Seminar = require('../Models/seminar');
const Project = require('../Models/projects');
const classnew = require('../Models/classnew');

// ==================== USER CONTROLLERS ====================

// Get faculty profile data
exports.getfacultyprofilds = async (req, res) => {
  try {
    const { email, colid } = req.query;
    const faculty = await User.findOne({ 
      email: email,
      colid: parseInt(colid)
    }).select('name email photo department phone status lastlogin role colid gender address');
    res.json(faculty);
  } catch (error) {
  }
};

// ==================== TASK CONTROLLERS ====================

// Get faculty task analytics using aggregation
exports.getfacultytaskanalyticsds = async (req, res) => {
  try {
    const { email, colid } = req.query;
    
    // Single aggregation for all task analytics
    const taskAnalytics = await Task.aggregate([
      {
        $match: {
          colid: parseInt(colid),
          $or: [
            { creatoremail: email },
            { assigneeemail: email },
            { followeremail: email }
          ]
        }
      },
      {
        $group: {
          _id: {
            role: {
              $cond: [
                { $eq: ['$creatoremail', email] }, 'creator',
                { $cond: [
                  { $eq: ['$assigneeemail', email] }, 'assignee', 'approver'
                ]}
              ]
            },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.role',
          statusCounts: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          },
          total: { $sum: '$count' }
        }
      }
    ]);

    // Initialize result structure
    const result = {
      creator: { total: 0, pending: 0, approved: 0, completed: 0 },
      assignee: { total: 0, pending: 0, approved: 0, completed: 0 },
      approver: { total: 0, pending: 0, approved: 0, completed: 0 }
    };

    // Process aggregation results
    taskAnalytics.forEach(roleData => {
      const role = roleData._id;
      result[role].total = roleData.total;
      
      roleData.statusCounts.forEach(statusCount => {
        const status = statusCount.status.toLowerCase();
        if (status === 'pending') result[role].pending = statusCount.count;
        else if (status === 'approved') result[role].approved = statusCount.count;
        else if (status === 'completed') result[role].completed = statusCount.count;
      });
    });

    res.json(result);
  } catch (error) {
  }
};

// ==================== SEMINAR CONTROLLERS ====================

// Get faculty seminar count and details using aggregation
exports.getfacultyseminaranalyticsds = async (req, res) => {
  try {
    const { email, colid } = req.query;
    
    const seminarAnalytics = await Seminar.aggregate([
      {
        $match: { 
          user: email,
          colid: parseInt(colid)
        }
      },
      {
        $facet: {
          "totalCount": [
            { $count: "count" }
          ],
          "totalAmount": [
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          "seminars": [
            { $sort: { yop: -1 } },
            {
              $project: {
                name: 1,
                title: 1,
                duration: 1,
                yop: 1,
                membership: 1,
                amount: 1,
                level: 1,
                type: 1,
                paper: 1,
                doclink: 1,
                status1: 1,
                comments: 1
              }
            }
          ],
          "yearWiseCount": [
            {
              $group: {
                _id: "$yop",
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" }
              }
            },
            { $sort: { _id: -1 } }
          ]
        }
      }
    ]);

    const result = {
      totalSeminars: seminarAnalytics[0].totalCount[0]?.count || 0,
      totalAmount: seminarAnalytics[0].totalAmount[0]?.total || 0,
      seminars: seminarAnalytics[0].seminars || [],
      yearWiseBreakdown: seminarAnalytics[0].yearWiseCount || []
    };

    res.json(result);
  } catch (error) {
  }
};

// ==================== PROJECT CONTROLLERS ====================

// Get faculty project count and details using aggregation
exports.getfacultyprojectanalyticsds = async (req, res) => {
  try {
    const { email, colid } = req.query;
    
    const projectAnalytics = await Project.aggregate([
      {
        $match: { 
          user: email,
          colid: parseInt(colid)
        }
      },
      {
        $facet: {
          "totalCount": [
            { $count: "count" }
          ],
          "totalFunds": [
            { $group: { _id: null, total: { $sum: "$funds" } } }
          ],
          "projects": [
            { $sort: { yop: -1 } },
            {
              $project: {
                name: 1,
                project: 1,
                agency: 1,
                type: 1,
                yop: 1,
                department: 1,
                funds: 1,
                duration: 1,
                level: 1,
                status1: 1,
                comments: 1
              }
            }
          ],
          "agencyWiseCount": [
            {
              $group: {
                _id: "$agency",
                count: { $sum: 1 },
                totalFunds: { $sum: "$funds" }
              }
            },
            { $sort: { totalFunds: -1 } }
          ],
          "typeWiseCount": [
            {
              $group: {
                _id: "$type",
                count: { $sum: 1 },
                totalFunds: { $sum: "$funds" }
              }
            },
            { $sort: { count: -1 } }
          ],
          "yearWiseCount": [
            {
              $group: {
                _id: "$yop",
                count: { $sum: 1 },
                totalFunds: { $sum: "$funds" }
              }
            },
            { $sort: { _id: -1 } }
          ]
        }
      }
    ]);

    const result = {
      totalProjects: projectAnalytics[0].totalCount[0]?.count || 0,
      totalFunds: projectAnalytics[0].totalFunds[0]?.total || 0,
      projects: projectAnalytics[0].projects || [],
      agencyWiseBreakdown: projectAnalytics[0].agencyWiseCount || [],
      typeWiseBreakdown: projectAnalytics[0].typeWiseCount || [],
      yearWiseBreakdown: projectAnalytics[0].yearWiseCount || []
    };

    res.json(result);
  } catch (error) {
  }
};

// ==================== CLASS CONTROLLERS ====================

// Get faculty class count and details using aggregation
exports.getfacultyclassanalyticsds = async (req, res) => {
  try {
    const { email, colid } = req.query;
    
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    const classAnalytics = await classnew.aggregate([
      {
        $match: { 
          user: email,
          colid: parseInt(colid)
        }
      },
      {
        $facet: {
          "totalCount": [
            { $count: "count" }
          ],
          "monthlyCount": [
            {
              $match: {
                classdate: { $gte: startOfMonth }
              }
            },
            { $count: "count" }
          ],
          "todayCount": [
            {
              $match: {
                classdate: { $gte: startOfDay, $lte: endOfDay }
              }
            },
            { $count: "count" }
          ],
          "classes": [
            { $sort: { classdate: -1 } },
            {
              $project: {
                name: 1,
                year: 1,
                program: 1,
                programcode: 1,
                course: 1,
                coursecode: 1,
                semester: 1,
                section: 1,
                classdate: 1,
                classtime: 1,
                topic: 1,
                module: 1,
                link: 1,
                classtype: 1,
                status1: 1,
                comments: 1
              }
            }
          ],
          "courseWiseCount": [
            {
              $group: {
                _id: {
                  course: "$course",
                  coursecode: "$coursecode"
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],
          "monthlyBreakdown": [
            {
              $group: {
                _id: {
                  year: { $year: "$classdate" },
                  month: { $month: "$classdate" }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
          ],
          "classTypeBreakdown": [
            {
              $group: {
                _id: "$classtype",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]
        }
      }
    ]);

    const result = {
      totalClasses: classAnalytics[0].totalCount[0]?.count || 0,
      classesThisMonth: classAnalytics[0].monthlyCount[0]?.count || 0,
      classesToday: classAnalytics[0].todayCount[0]?.count || 0,
      classes: classAnalytics[0].classes || [],
      courseWiseBreakdown: classAnalytics[0].courseWiseCount || [],
      monthlyBreakdown: classAnalytics[0].monthlyBreakdown || [],
      classTypeBreakdown: classAnalytics[0].classTypeBreakdown || []
    };

    res.json(result);
  } catch (error) {
  }
};
