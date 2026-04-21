const Student = require('../Models/studentmeritds');

// Create single student
exports.createds = async (req, res) => {
    try {
        const studentData = req.body;
        const colid = req.body.colid;

        const existingStudent = await Student.findOne({ enrollmentNumber: studentData.enrollmentNumber, colid });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Student with this enrollment number already exists'
            });
        }

        const student = await Student.create(studentData);

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating student',
            error: error.message
        });
    }
};

// Bulk create students
exports.bulkCreateds = async (req, res) => {
    try {
        const { students, colid } = req.body;

        if (!students || !Array.isArray(students) || students.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of students'
            });
        }

        const studentsWithColid = students.map(s => ({ ...s, colid }));

        const createdStudents = await Student.insertMany(studentsWithColid, { ordered: false });

        res.status(201).json({
            success: true,
            message: `Successfully created ${createdStudents.length} students`,
            count: createdStudents.length,
            data: createdStudents
        });
    } catch (error) {
        // Handle duplicate key errors
        if (error.code === 11000) {
            const insertedCount = error.result?.nInserted || 0;
            return res.status(207).json({
                success: true,
                message: `Inserted ${insertedCount} students, some duplicates were skipped`,
                count: insertedCount
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error bulk creating students',
            error: error.message
        });
    }
};

// Get all students with filters
exports.getAllds = async (req, res) => {
    try {
        const { programmeCode, division, minCGPA, maxCGPA, search, isActive, colid } = req.query;

        const filter = {};
        if (colid) filter.colid = parseInt(colid);

        if (programmeCode) filter.programmeCode = programmeCode;
        if (division) filter.division = division;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        if (minCGPA || maxCGPA) {
            filter.cgpa = {};
            if (minCGPA) filter.cgpa.$gte = parseFloat(minCGPA);
            if (maxCGPA) filter.cgpa.$lte = parseFloat(maxCGPA);
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { enrollmentNumber: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const students = await Student.find(filter).sort({ cgpa: -1, formTimestamp: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};

// Get single student
exports.getOneds = async (req, res) => {
    try {
        const { enrollmentNumber, colid } = req.body;

        const student = await Student.findOne({ enrollmentNumber, colid });

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
        res.status(500).json({
            success: false,
            message: 'Error fetching student',
            error: error.message
        });
    }
};

// Update student
exports.updateds = async (req, res) => {
    try {
        const { enrollmentNumber, updates, colid } = req.body;

        const student = await Student.findOneAndUpdate(
            { enrollmentNumber, colid },
            updates,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating student',
            error: error.message
        });
    }
};

// Delete student
exports.deleteOneds = async (req, res) => {
    try {
        const { enrollmentNumber, colid } = req.query;

        const student = await Student.findOneAndDelete({ enrollmentNumber, colid });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting student',
            error: error.message
        });
    }
};

// Get students by programme
exports.getByProgrammeds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const students = await Student.find({ programmeCode, colid, isActive: true })
            .sort({ cgpa: -1, formTimestamp: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};

// Get merit list
exports.getMeritListds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const students = await Student.find({ programmeCode, colid, isActive: true })
            .sort({ cgpa: -1, formTimestamp: 1 });

        // Assign merit ranks
        const studentsWithRank = students.map((student, index) => {
            return {
                ...student.toObject(),
                meritRank: index + 1
            };
        });

        res.status(200).json({
            success: true,
            count: studentsWithRank.length,
            data: studentsWithRank
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating merit list',
            error: error.message
        });
    }
};

// Get student count
exports.getCountds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.query;
        const filter = {};
        if (colid) filter.colid = parseInt(colid);

        if (programmeCode) filter.programmeCode = programmeCode;

        const count = await Student.countDocuments(filter);

        res.status(200).json({
            success: true,
            count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error counting students',
            error: error.message
        });
    }
};

// Check duplicate enrollment number
exports.checkDuplicateds = async (req, res) => {
    try {
        const { enrollmentNumber, colid } = req.body;

        const student = await Student.findOne({ enrollmentNumber, colid });

        res.status(200).json({
            success: true,
            exists: !!student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking duplicate',
            error: error.message
        });
    }
};
