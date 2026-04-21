const attendancenew = require('../Models/attendancenew');
const classenr1 = require('../Models/classenr1');

exports.getAttendanceReport = async (req, res) => {
    try {
        const { date, startDate, endDate, colid, programcode, coursecode } = req.body;

        if ((!date && (!startDate || !endDate)) || !colid) {
            return res.status(400).json({ status: 'error', message: 'Date (or Start/End Date) and College ID are required' });
        }

        let queryStartDate, queryEndDate;

        if (startDate && endDate) {
            queryStartDate = new Date(startDate);
            queryStartDate.setHours(0, 0, 0, 0);
            queryEndDate = new Date(endDate);
            queryEndDate.setHours(23, 59, 59, 999);
        } else {
            // Fallback to single date if range not provided
            const targetDate = date ? date : startDate; // If only startDate given, treat as single day
            queryStartDate = new Date(targetDate);
            queryStartDate.setHours(0, 0, 0, 0);
            queryEndDate = new Date(targetDate);
            queryEndDate.setHours(23, 59, 59, 999);
        }

        // Build query for attendancenew
        const query = {
            colid: colid,
            classdate: {
                $gte: queryStartDate,
                $lte: queryEndDate
            }
        };

        if (programcode) query.programcode = programcode;
        if (coursecode) query.coursecode = coursecode;

        // Aggregate attendance data grouped by class details
        const attendanceData = await attendancenew.aggregate([
            { $match: query },
            {
                $group: {
                    _id: {
                        program: "$program",
                        programcode: "$programcode",
                        course: "$course",
                        coursecode: "$coursecode",
                        semester: "$semester",
                        section: "$section",
                        faculty: "$name" // Changed from 'user' to 'name' as requested
                    },
                    presentCount: {
                        $sum: { $cond: [{ $eq: ["$att", 1] }, 1, 0] }
                    },
                    totalMarked: { $sum: 1 } // Number of students marked (could be useful)
                }
            }
        ]);

        // Enrich data with total enrollment count from classenr1
        const enrichedData = await Promise.all(attendanceData.map(async (item) => {
            const classQuery = {
                colid: colid,
                programcode: item._id.programcode,
                coursecode: item._id.coursecode,
                semester: item._id.semester,
                // Check if section maps to classgroup. Often they are the same.
                // If section is empty, ignore it in query or handle accordingly.
                ...(item._id.section ? { classgroup: item._id.section } : {})
            };

            const totalStudents = await classenr1.countDocuments(classQuery);

            return {
                program: item._id.program,
                programcode: item._id.programcode,
                course: item._id.course,
                coursecode: item._id.coursecode,
                semester: item._id.semester,
                section: item._id.section,
                faculty: item._id.faculty,
                presentCount: item.presentCount,
                totalStudents: totalStudents > 0 ? totalStudents : item.totalMarked // Fallback to marked count if enrollment not found 
            };
        }));

        res.status(200).json({ status: 'success', data: enrichedData });

    } catch (error) {
        console.error('Error in getAttendanceReport:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
