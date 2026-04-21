const classnew = require('../Models/classnew');
const classenr1 = require('../Models/classenr1');
const attendancenew = require('../Models/attendancenew');

exports.getattendancetimereport = async (req, res) => {
    try {
        const { colid, startDate, endDate, startTime, endTime, programcode, coursecode } = req.body;

        if (!colid || !startDate || !endDate) {
            return res.status(400).json({ status: 'error', message: 'College ID and Date Range are required' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        // 1. Fetch Classes (Step 1)
        let query = {
            colid: colid,
            classdate: { $gte: start, $lte: end }
        };

        if (programcode) query.programcode = programcode;
        if (coursecode) query.coursecode = coursecode;

        let classes = await classnew.find(query).lean();

        // Filter by Time Range JS side (safe since dataset is likely filtered by date already)
        if (startTime && endTime) {
            classes = classes.filter(cls => {
                if (!cls.classtime) return false;
                return isTimeAuth(cls.classtime, startTime, endTime);
            });
        }

        console.log(`Found ${classes.length} classes.`);

        if (classes.length === 0) {
            return res.status(200).json({ status: 'success', data: [] });
        }

        // Extract Keys for subsequent queries
        const classIds = classes.map(c => String(c._id)); // Ensure string for matching if referenced as string
        const uniqueCourseCodes = [...new Set(classes.map(c => c.coursecode))].filter(Boolean);

        // 2. Fetch Attendance Counts (Step 2)
        // Group by classid
        const attendanceCounts = await attendancenew.aggregate([
            {
                $match: {
                    colid: colid,
                    classid: { $in: classIds }, // Matching classnew IDs
                    att: 1
                }
            },
            {
                $group: {
                    _id: "$classid",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Map for fast lookup: classid -> count
        const attendanceMap = {};
        attendanceCounts.forEach(item => {
            attendanceMap[item._id] = item.count;
        });

        // 3. Fetch Enrollment Counts (Step 3)
        // Group by coursecode + classgroup (section)
        const enrollmentCounts = await classenr1.aggregate([
            {
                $match: {
                    colid: colid,
                    coursecode: { $in: uniqueCourseCodes }
                }
            },
            {
                $group: {
                    _id: {
                        code: "$coursecode",
                        group: "$classgroup"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Map for fast lookup: "coursecode|section" -> count
        // Also keep a generic coursecode fallback
        const enrollmentMap = {};
        const enrollmentCourseOnlyMap = {};

        enrollmentCounts.forEach(item => {
            if (item._id.group) {
                enrollmentMap[`${item._id.code}|${item._id.group}`] = item.count;
            }
            // Aggregate total for course just in case
            if (!enrollmentCourseOnlyMap[item._id.code]) enrollmentCourseOnlyMap[item._id.code] = 0;
            enrollmentCourseOnlyMap[item._id.code] += item.count;
        });

        // 4. Merge Data (Step 4 - In-Memory Join)
        const reportData = classes.map(cls => {
            const clsId = String(cls._id);
            const present = attendanceMap[clsId] || 0;

            // Try specific section match first, then generic course match
            // enrollmentMap uses "coursecode|section"
            // If class has no section, maybe use generic?
            let enrolled = 0;
            if (cls.section && enrollmentMap[`${cls.coursecode}|${cls.section}`]) {
                enrolled = enrollmentMap[`${cls.coursecode}|${cls.section}`];
            } else {
                enrolled = enrollmentCourseOnlyMap[cls.coursecode] || 0;
            }

            return {
                _id: cls._id,
                program: cls.program,
                programcode: cls.programcode,
                course: cls.course,
                coursecode: cls.coursecode,
                section: cls.section,
                semester: cls.semester,
                classdate: cls.classdate,
                classtime: cls.classtime,
                faculty: cls.name || cls.user, // Use name if available, else user
                enrolled: enrolled,
                present: present
            };
        });

        res.status(200).json({ status: 'success', data: reportData });

    } catch (error) {
        console.error('Error in getattendancetimereport:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Helper: Check if targetTime is between start and end
function isTimeAuth(target, start, end) {
    try {
        const t = parseTime(target);
        const s = parseTime(start);
        const e = parseTime(end);
        return t >= s && t <= e;
    } catch (err) {
        return true;
    }
}

function parseTime(timeStr) {
    if (!timeStr) return 0;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}
