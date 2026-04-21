const User = require('../Models/user');
const Mfaccourses = require('../Models/mfaccourses');
const Classenr1 = require('../Models/classenr1');
const Massignments = require('../Models/massignments');
// Assuming Purchase Models exist, like Purchaserequisition, Purchaseorder
// Let's check common names if they error out. 
// For now sending dummy data for purchase if models are not clear.
const Prassign = require('../Models/prassigneds');
const CashApproval = require('../Models/CashApprovalds');
const Storerequisation = require('../Models/storerequisationds');
const Storepoorder = require('../Models/storepoorderds');


// 1. User Management Report
exports.getusermanagementreportds = async (req, res) => {
    try {
        const colid = parseInt(req.query.colid1);
        if (!colid) return res.status(400).json({ status: 'error', message: 'colid1 is required' });

        // Aggregate users by role
        const roleStats = await User.aggregate([
            { $match: { colid: colid } },
            { $group: { _id: "$role", count: { $sum: 1 } } },
            { $project: { role: "$_id", count: 1, _id: 0 } }
        ]);

        const totalUsers = await User.countDocuments({ colid: colid });

        res.status(200).json({
            status: 'success',
            data: {
                totalUsers,
                roleStats
            }
        });
    } catch (error) {
        console.error("Error in getusermanagementreportds:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 2. Role Specific Report (e.g., Student by program, semester, year)
exports.getrolespecificreportds = async (req, res) => {
    try {
        const { colid1, role } = req.body;
        const colid = parseInt(colid1);

        if (!colid || !role) return res.status(400).json({ status: 'error', message: 'colid1 and role are required' });

        if (role.toLowerCase() === 'student') {
            // Aggregate by programcode
            const programStats = await User.aggregate([
                { $match: { colid: colid, role: { $regex: new RegExp(`^${role}$`, 'i') } } },
                { $group: { _id: "$programcode", count: { $sum: 1 } } }
            ]);

            // Aggregate by semester
            const semesterStats = await User.aggregate([
                { $match: { colid: colid, role: { $regex: new RegExp(`^${role}$`, 'i') } } },
                { $group: { _id: "$semester", count: { $sum: 1 } } }
            ]);

            // Aggregate by academic year
            const yearStats = await User.aggregate([
                { $match: { colid: colid, role: { $regex: new RegExp(`^${role}$`, 'i') } } },
                { $group: { _id: "$academicyear", count: { $sum: 1 } } }
            ]);

            return res.status(200).json({
                status: 'success',
                data: {
                    programStats,
                    semesterStats,
                    yearStats
                }
            });
        }

        // Generic aggregation for other roles
        const genericStats = await User.aggregate([
            { $match: { colid: colid, role: { $regex: new RegExp(`^${role}$`, 'i') } } },
            { $group: { _id: "$department", count: { $sum: 1 } } } // Example: group by department
        ]);

        res.status(200).json({
            status: 'success',
            data: { departmentStats: genericStats }
        });

    } catch (error) {
        console.error("Error in getrolespecificreportds:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 3. LMS Report
exports.getlmsreportds = async (req, res) => {
    try {
        const colid = parseInt(req.query.colid1);
        if (!colid) return res.status(400).json({ status: 'error', message: 'colid1 is required' });

        // Total Courses
        const totalCourses = await Mfaccourses.countDocuments({ colid: colid });

        // Enrollments per course
        const topCoursesEnrollment = await Classenr1.aggregate([
            { $match: { colid: colid } },
            { $group: { _id: "$course", enrollmentCount: { $sum: 1 } } },
            { $sort: { enrollmentCount: -1 } },
            { $limit: 10 },
            { $project: { courseName: "$_id", enrollmentCount: 1, _id: 0 } }
        ]);

        // Assignments per course (Monthly)
        const monthlyAssignments = await Massignments.aggregate([
            { $match: { colid: colid, duedate: { $exists: true, $ne: null } } },
            {
                $group: {
                    _id: {
                        year: { $year: "$duedate" },
                        month: { $month: "$duedate" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                totalCourses,
                topCoursesEnrollment,
                monthlyAssignments
            }
        });

    } catch (error) {
        console.error("Error in getlmsreportds:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 4. Purchase Report
exports.getpurchasereportds = async (req, res) => {
    try {
        const colid = parseInt(req.query.colid1);
        if (!colid) return res.status(400).json({ status: 'error', message: 'colid1 is required' });

        // Get count from active purchase tables
        const prCount = await Storerequisation.countDocuments({ colid: colid });
        const poCount = await Storepoorder.countDocuments({ colid: colid });

        res.status(200).json({
            status: 'success',
            data: {
                purchaseRequisitions: prCount,
                purchaseOrders: poCount,
                summary: [
                    { category: 'Requisitions', count: prCount },
                    { category: 'Purchase Orders', count: poCount }
                ]
            }
        });
    } catch (error) {
        console.error("Error in getpurchasereportds:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
