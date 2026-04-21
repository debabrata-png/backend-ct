const Class = require('../Models/class');
const Attendance = require('../Models/attendance');
const User = require('../Models/user');
const LmsVideo = require('../Models/lmsvideos');

exports.getDashboardStats = async (req, res) => {
    try {
        let colid = req.query.colid;

        if (!colid || colid === 'null' || colid === 'undefined') {
            return res.status(400).json({ status: 'Failed', message: 'College ID (colid) is required. Received: ' + colid });
        }

        colid = parseInt(colid);
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        // 1. Classes Conducted Today
        const classesTodayPromise = Class.countDocuments({
            colid: colid,
            classdate: { $gte: startOfDay, $lte: endOfDay },
            status: 1 // Assuming 1 means active/conducted
        });
        const activeStaffPromise = User.countDocuments({
            colid: colid,
            role: { $in: ['Faculty', 'Admin', 'Staff'] }, // Adjust roles as needed
            lastlogin: { $gte: startOfDay }
        });

        // 3. User Reports (Total Counts)
        const userStatsPromise = User.aggregate([
            { $match: { colid: parseInt(colid) } },
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);

        // 4. LMS Reports (Total Videos/Content) - Placeholder until model confirmed
        const lmsStatsPromise = LmsVideo.countDocuments({ colid: colid });

        // 5. Student Distribution (Academic Year, Semester, Program Code)
        const studentDistributionPromise = User.aggregate([
            { $match: { colid: parseInt(colid), role: 'Student' } },
            {
                $group: {
                    _id: {
                        admissionyear: "$admissionyear",
                        semester: "$semester",
                        programcode: "$programcode"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.admissionyear": -1,
                    "_id.semester": 1,
                    "_id.programcode": 1
                }
            }
        ]);

        // 6. Department Distribution
        const departmentDistributionPromise = User.aggregate([
            { $match: { colid: parseInt(colid), role: 'Student' } },
            {
                $group: {
                    _id: "$department",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "count": -1
                }
            }
        ]);

        const [classesToday, activeStaff, userStats, lmsStats, studentDistribution, departmentDistribution] = await Promise.all([
            classesTodayPromise,
            activeStaffPromise,
            userStatsPromise,
            lmsStatsPromise,
            studentDistributionPromise,
            departmentDistributionPromise
        ]);

        // Format User Stats
        const formattedUserStats = {};
        userStats.forEach(stat => {
            formattedUserStats[stat._id] = stat.count;
        });

        res.status(200).json({
            status: 'Success',
            data: {
                classesConductedToday: classesToday,
                staffPresentToday: activeStaff,
                userDistribution: formattedUserStats,
                lmsStats: lmsStats,
                studentDistribution: studentDistribution,
                departmentDistribution: departmentDistribution
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};
