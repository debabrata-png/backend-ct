const CoScholasticActivity9ds = require('../Models/CoScholasticActivity9ds');
const CoScholasticGrade9ds = require('../Models/CoScholasticGrade9ds');
const User = require('../Models/user'); // Assuming User model for student list

// ==================== ACTIVITIES (CONFIG) ====================

// Get all activities
exports.getActivities = async (req, res) => {
    try {
        const { colid, semester, academicyear } = req.query;
        const activities = await CoScholasticActivity9ds.find({
            colid: Number(colid),
            semester,
            academicyear,
            isactive: true
        }).sort({ createdat: 1 });

        res.json({ success: true, data: activities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new activity
exports.createActivity = async (req, res) => {
    try {
        const { colid, code, activityname, description, semester, academicyear } = req.body;

        const existing = await CoScholasticActivity9ds.findOne({ colid, activityname, semester, academicyear });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Activity already exists for this semester/year' });
        }

        const newActivity = new CoScholasticActivity9ds({
            colid,
            code,
            activityname,
            description,
            semester,
            academicyear
        });

        await newActivity.save();
        res.json({ success: true, message: 'Activity created successfully', data: newActivity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update activity
exports.updateActivity = async (req, res) => {
    try {
        const { id, code, activityname, description, semester, academicyear } = req.body;

        const updatedActivity = await CoScholasticActivity9ds.findByIdAndUpdate(
            id,
            { code, activityname, description, semester, academicyear },
            { new: true }
        );

        if (!updatedActivity) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }

        res.json({ success: true, message: 'Activity updated successfully', data: updatedActivity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete activity
exports.deleteActivity = async (req, res) => {
    try {
        const { id } = req.body;
        await CoScholasticActivity9ds.findByIdAndDelete(id);
        // Optional: Delete associated grades? keeping for history might be better, or cascade delete
        res.json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== GRADES ====================

// Get students with their grades for entry form
exports.getStudentsForGradeEntry = async (req, res) => {
    try {
        const { colid, semester, academicyear, section } = req.query;

        // 1. Get Students
        const studentQuery = {
            colid: Number(colid),
            semester: semester
        };

        if (section) {
            studentQuery.section = section;
        }

        // Adjust query based on how User model works (semester vs classname)
        const students = await User.find(studentQuery).select('regno name rollno').sort({ rollno: 1, name: 1 });

        // 2. Get Activities
        const activityQuery = {
            colid: Number(colid),
            semester,
            academicyear,
            isactive: true
        };

        const activities = await CoScholasticActivity9ds.find(activityQuery);

        // 3. Get Existing Grades
        const grades = await CoScholasticGrade9ds.find({
            colid: Number(colid),
            semester: semester,
            academicyear: academicyear
        });

        // Map grades for easy frontend consumption
        // Structure: { regno: { activityId: { term1: 'A', term2: 'B' } } }
        const gradeMap = {};
        grades.forEach(g => {
            if (!gradeMap[g.regno]) gradeMap[g.regno] = {};
            gradeMap[g.regno][g.activityid] = {
                term1: g.term1grade,
                term2: g.term2grade
            };
        });

        res.json({
            success: true,
            students,
            activities,
            gradeMap
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Save Grades (Bulk)
exports.saveGrades = async (req, res) => {
    try {
        const { colid, semester, academicyear, gradesData } = req.body;
        // gradesData: Array of { regno, activityId, term1, term2 }

        const operations = gradesData.map(item => ({
            updateOne: {
                filter: {
                    colid: Number(colid),
                    regno: item.regno,
                    academicyear: academicyear,
                    semester: semester,
                    activityid: item.activityId
                },
                update: {
                    $set: {
                        term1grade: item.term1,
                        term2grade: item.term2,
                        updatedat: new Date()
                    }
                },
                upsert: true
            }
        }));

        if (operations.length > 0) {
            await CoScholasticGrade9ds.bulkWrite(operations);
        }

        res.json({ success: true, message: 'Grades saved successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
