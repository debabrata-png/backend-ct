const User = require("../Models/user");
const classbreakoutroomds = require('../Models/classbreakoutroomds');
const breakoutassignmentds = require('../Models/breakoutassignmentds');
const classenr1 = require('../Models/classenr1');
const classnew = require('../Models/classnew');

// Get enrolled students with images
exports.getenrolledstudents = async (req, res) => {
    try {
        const { coursecode, year, semester, colid } = req.query;
        
        // Get enrolled students from classenr1
        const enrolledStudents = await classenr1.find({
            coursecode,
            year,
            semester,
            colid: parseInt(colid)
        });

        // Get student details with images from User model
        const studentsWithImages = await Promise.all(
            enrolledStudents.map(async (student) => {
                const userDetails = await User.findOne({ 
                    regno: student.regno,
                    colid: parseInt(colid)
                }).select('photo email phone gender department');
                
                return {
                    _id: student._id,
                    name: student.name,
                    regno: student.regno,
                    student: student.student,
                    learning: student.learning,
                    gender: student.gender,
                    classgroup: student.classgroup,
                    photo: userDetails?.photo || '',
                    email: userDetails?.email || '',
                    phone: userDetails?.phone || '',
                    department: userDetails?.department || ''
                };
            })
        );

        res.status(200).json(studentsWithImages);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching enrolled students',
            error: error.message 
        });
    }
};

// Create breakout room
exports.createbreakoutroom = async (req, res) => {
    try {
        const {
            name,
            classid,
            user,
            colid,
            coursecode,
            year,
            semester,
            maxparticipants
        } = req.body;

        const newRoom = new classbreakoutroomds({
            name,
            classid,
            user,
            colid: parseInt(colid),
            coursecode,
            year,
            semester,
            maxparticipants: maxparticipants || 6,
            assignmentlinks: [],
            documentLinks: []
        });

        const savedRoom = await newRoom.save();
        
        res.status(201).json({
            success: true,
            message: 'Breakout room created successfully',
            room: savedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating breakout room',
            error: error.message
        });
    }
};

// Get all breakout rooms for a class with assignments
exports.getbreakoutrooms = async (req, res) => {
    try {
        const { classid, colid } = req.query;
        
        const rooms = await classbreakoutroomds.find({ 
            classid, 
            isactive: true,
            colid: parseInt(colid)
        });
        
        // Get assignments for each room
        const roomsWithAssignments = await Promise.all(
            rooms.map(async (room) => {
                const assignments = await breakoutassignmentds.find({ 
                    roomid: room._id,
                    colid: parseInt(colid)
                });
                
                return {
                    ...room.toObject(),
                    assignments
                };
            })
        );

        res.status(200).json(roomsWithAssignments);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching breakout rooms',
            error: error.message
        });
    }
};

// Assign student to room
exports.assignstudenttoroom = async (req, res) => {
    try {
        const {
            roomid,
            studentid,
            studentregno,
            studentname,
            assignedby,
            colid
        } = req.body;

        // Validate required fields
        if (!roomid || !studentid || !studentregno || !studentname || !assignedby || !colid) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Get student details from User model
        const userDetails = await User.findOne({ 
            regno: studentregno,
            colid: parseInt(colid)
        });
        
        // Check if room exists
        const room = await classbreakoutroomds.findOne({
            _id: roomid,
            colid: parseInt(colid)
        });
        
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Remove student from any existing room assignment in this class
        const classRooms = await classbreakoutroomds.find({ 
            classid: room.classid,
            colid: parseInt(colid)
        }).distinct('_id');
        
        await breakoutassignmentds.deleteMany({
            studentid,
            roomid: { $in: classRooms },
            colid: parseInt(colid)
        });

        // Check room capacity
        const currentAssignments = await breakoutassignmentds.countDocuments({ 
            roomid,
            colid: parseInt(colid)
        });
        
        if (currentAssignments >= room.maxparticipants) {
            return res.status(400).json({
                success: false,
                message: 'Room is at maximum capacity'
            });
        }

        // Create new assignment
        const assignmentData = {
            roomid,
            studentid,
            studentregno,
            studentname,
            studentphoto: userDetails?.photo || '',
            studentemail: userDetails?.email || '',
            assignedby,
            colid: parseInt(colid)
        };
        
        const assignment = new breakoutassignmentds(assignmentData);
        const savedAssignment = await assignment.save();

        res.status(200).json({
            success: true,
            message: 'Student assigned to room successfully',
            assignment: savedAssignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error assigning student to room',
            error: error.message
        });
    }
};

// Remove student from room
exports.removestudentfromroom = async (req, res) => {
    try {
        const { roomid, studentid, colid } = req.query;

        const deleteResult = await breakoutassignmentds.deleteOne({ 
            roomid, 
            studentid,
            colid: parseInt(colid)
        });

        res.status(200).json({
            success: true,
            message: 'Student removed from room successfully',
            deletedCount: deleteResult.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing student from room',
            error: error.message
        });
    }
};

// Add links to room
exports.addlinktoroom = async (req, res) => {
    try {
        const { roomid, linkData, colid } = req.body;
        const { title, url, description, type } = linkData;

        const room = await classbreakoutroomds.findOne({
            _id: roomid,
            colid: parseInt(colid)
        });
        
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        const newLink = {
            title,
            url,
            description,
            addedat: new Date()
        };

        if (type === 'assignment') {
            room.assignmentlinks.push({
                title,
                url,
                description,
                addedAt: new Date()
            });
        } else {
            room.documentLinks.push(newLink);
        }

        await room.save();

        res.status(200).json({
            success: true,
            message: `${type} link added successfully`,
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding link to room',
            error: error.message
        });
    }
};

// Get student's breakout room
exports.getstudentbreakoutroom = async (req, res) => {
    try {
        const { roomid, studentUser, colid } = req.query;

        // Find student's user record
        const student = await User.findOne({ 
            email: studentUser,
            colid: parseInt(colid)
        });
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Find student's assignment
        const assignment = await breakoutassignmentds.findOne({
            roomid,
            studentregno: student.regno,
            colid: parseInt(colid)
        });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Student not assigned to this room'
            });
        }

        // Get room details
        const room = await classbreakoutroomds.findOne({
            _id: roomid,
            colid: parseInt(colid)
        });
        
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Get all classmates in the room
        const classmates = await breakoutassignmentds.find({ 
            roomid,
            colid: parseInt(colid)
        });

        res.status(200).json({
            success: true,
            room,
            classmates,
            studentAssignment: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching student breakout room',
            error: error.message
        });
    }
};

// Delete breakout room
exports.deletebreakoutroom = async (req, res) => {
    try {
        const { roomid, colid } = req.query;

        // Remove all assignments for this room
        await breakoutassignmentds.deleteMany({ 
            roomid,
            colid: parseInt(colid)
        });

        // Delete the room
        await classbreakoutroomds.findOneAndDelete({
            _id: roomid,
            colid: parseInt(colid)
        });

        res.status(200).json({
            success: true,
            message: 'Breakout room deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting breakout room',
            error: error.message
        });
    }
};

// Update breakout room
exports.updatebreakoutroom = async (req, res) => {
    try {
        const { roomid, colid } = req.query;
        const updateData = req.body;

        const room = await classbreakoutroomds.findOneAndUpdate(
            { 
                _id: roomid,
                colid: parseInt(colid)
            },
            updateData,
            { new: true }
        );

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating breakout room',
            error: error.message
        });
    }
};

// Get student's assigned room (for navigation)
exports.getstudentassignedroom = async (req, res) => {
    try {
        const { classid, studentUser, colid } = req.query;

        // Find student's user record
        const student = await User.findOne({ 
            email: studentUser,
            colid: parseInt(colid)
        });
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Find student's assignment in this class
        const rooms = await classbreakoutroomds.find({ 
            classid, 
            isactive: true,
            colid: parseInt(colid)
        });
        
        const roomIds = rooms.map(room => room._id);

        const assignment = await breakoutassignmentds.findOne({
            roomid: { $in: roomIds },
            studentregno: student.regno,
            colid: parseInt(colid)
        });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Student not assigned to any room in this class'
            });
        }

        res.status(200).json({
            success: true,
            roomid: assignment.roomid,
            assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching student assigned room',
            error: error.message
        });
    }
};

// Get all classes with filters
exports.getallclasses = async (req, res) => {
    try {
        const { colid, programcode, coursecode, year, semester, section } = req.query;
        const filter = { colid: parseInt(colid) };
        
        if (programcode) filter.programcode = programcode;
        if (coursecode) filter.coursecode = coursecode;
        if (year) filter.year = year;
        if (semester) filter.semester = semester;
        if (section) filter.section = section;
        
        const classes = await classnew.find(filter).sort({ classdate: -1 });
        res.json(classes);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching classes',
            error: error.message 
        });
    }
};

// Get classes by date range
exports.getclassesbydate = async (req, res) => {
    try {
        const { colid, startDate, endDate, programcode, coursecode, year, semester, section } = req.query;
        
        const filter = { colid: parseInt(colid) };
        
        if (programcode) filter.programcode = programcode;
        if (coursecode) filter.coursecode = coursecode;
        if (year) filter.year = year;
        if (semester) filter.semester = semester;
        if (section) filter.section = section;
        
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            
            filter.classdate = {
                $gte: start,
                $lte: end
            };
        }
        
        const classes = await classnew.find(filter).sort({ classdate: -1, classtime: 1 });
        res.json(classes);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching classes by date',
            error: error.message 
        });
    }
};

// Create new class
exports.createclass = async (req, res) => {
    try {
        const classData = await classnew.create(req.body);
        res.status(201).json({ success: true, data: classData });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error creating class',
            error: error.message 
        });
    }
};

// Update class
exports.updateclass = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const updatedClass = await classnew.findOneAndUpdate(
            { 
                _id: id,
                colid: parseInt(colid)
            },
            req.body,
            { new: true }
        );
        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating class',
            error: error.message 
        });
    }
};

// Delete class
exports.deleteclass = async (req, res) => {
    try {
        const { id, colid } = req.query;
        await classnew.findOneAndDelete({
            _id: id,
            colid: parseInt(colid)
        });
        res.json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting class',
            error: error.message 
        });
    }
};

// Get single class details
exports.getsingleclass = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const classData = await classnew.findOne({
            _id: id,
            colid: parseInt(colid)
        });
        res.json(classData);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching class details',
            error: error.message 
        });
    }
};

// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { colid, name, email: userEmail, regno, role, user: username } = user;

        return res.status(200).json({ 
            colid, 
            name, 
            email: userEmail, 
            regno, 
            role,
            user: username
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Login error',
            error: error.message 
        });
    }
};
