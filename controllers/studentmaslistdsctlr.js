const User = require('../Models/user');

// ==================== Controller 1: Get Student Master List ====================
exports.studentMasterListds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    const students = await User.find({ 
      colid: parseInt(colid), 
      role: 'Student' 
    }).select('-password');

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 2: Search Students ====================
exports.searchStudentsds = async (req, res) => {
  try {
    const { colid, query } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    const searchFilter = {
      colid: parseInt(colid),
      role: 'Student'
    };

    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { regno: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ];
    }

    const students = await User.find(searchFilter).select('-password');

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 3: Create Student ====================
exports.createStudentds = async (req, res) => {
  try {
    const {
      email,
      name,
      phone,
      password,
      regno,
      programcode,
      admissionyear,
      semester,
      section,
      gender,
      department,
      photo,
      category,
      address,
      quota,
      addedby,
      colid,
      status,
      comments,
      status1,
    } = req.body;

    if (!email || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email, name, and phone are required fields'
      });
    }

    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }

    const student = await User.create({
      email,
      name,
      phone,
      password: password || 'P@123',
      role: 'Student',
      regno: regno || '',
      programcode: programcode || '',
      admissionyear: admissionyear || '',
      semester: semester || '',
      section: section || '',
      gender: gender || '',
      department: department || '',
      photo: photo || '',
      category: category || '',
      address: address || '',
      quota: quota || '',
      user: addedby,
      addedby: addedby || '',
      colid: parseInt(colid),
      status: status || 1,
      comments: comments || '',
      status1: status1 || ''
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        _id: student._id,
        email: student.email,
        name: student.name,
        regno: student.regno,
        role: student.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 4: Update Student ====================
exports.updateStudentds = async (req, res) => {
  try {
    const { id } = req.query;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    delete updateData.password;
    delete updateData.role;

    const existingStudent = await User.findOne({ _id: id, role: 'Student' });
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const student = await User.findOneAndUpdate(
      { _id: id, role: 'Student' },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 5: Delete Student ====================
exports.deleteStudentds = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    const student = await User.findOneAndDelete({ _id: id, role: 'Student' });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: {
        _id: student._id,
        name: student.name,
        email: student.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 6: Bulk Semester Update ====================
exports.bulkSemesterUpdateds = async (req, res) => {
  try {
    const { 
      year, 
      programcode, 
      colid, 
      currentSemester, 
      newSemester 
    } = req.body;

    if (!year || !programcode || !colid || !currentSemester || !newSemester) {
      return res.status(400).json({
        success: false,
        message: 'All filter fields (year, programcode, colid, currentSemester, newSemester) are required'
      });
    }

    const filter = {
      role: 'Student',
      admissionyear: year,
      programcode: programcode,
      colid: parseInt(colid),
      semester: currentSemester
    };

    const matchingStudents = await User.find(filter).select('name regno semester');

    if (matchingStudents.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found matching the filter criteria'
      });
    }

    const result = await User.updateMany(
      filter,
      { $set: { semester: newSemester } }
    );

    res.status(200).json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} students from semester ${currentSemester} to ${newSemester}`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        filter: {
          year,
          programcode,
          colid,
          currentSemester,
          newSemester
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 7: Get Students by Filter ====================
exports.getStudentsByFilterds = async (req, res) => {
  try {
    const { colid, year, programcode, semester, section, department } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    const filter = {
      colid: parseInt(colid),
      role: 'Student'
    };

    if (year) filter.admissionyear = year;
    if (programcode) filter.programcode = programcode;
    if (semester) filter.semester = semester;
    if (section) filter.section = section;
    if (department) filter.department = department;

    const students = await User.find(filter).select('-password');

    res.status(200).json({
      success: true,
      count: students.length,
      filter: filter,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 8: Get Student Details by ID ====================
exports.getStudentByIdds = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    const student = await User.findOne({ _id: id, role: 'Student' }).select('-password');

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
      message: error.message
    });
  }
};

// ==================== Controller 9: Update Student Password ====================
exports.updateStudentPasswordds = async (req, res) => {
  try {
    const { id, newPassword } = req.body;

    if (!id || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and new password are required'
      });
    }

    const student = await User.findOne({ _id: id, role: 'Student' });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    student.password = newPassword;
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==================== Controller 10: Get Student Statistics ====================
exports.getStudentStatsds = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    const totalStudents = await User.countDocuments({ 
      colid: parseInt(colid), 
      role: 'Student' 
    });

    const bySemester = await User.aggregate([
      { $match: { colid: parseInt(colid), role: 'Student' } },
      { $group: { _id: '$semester', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const byProgram = await User.aggregate([
      { $match: { colid: parseInt(colid), role: 'Student' } },
      { $group: { _id: '$programcode', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const byYear = await User.aggregate([
      { $match: { colid: parseInt(colid), role: 'Student' } },
      { $group: { _id: '$admissionyear', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const byGender = await User.aggregate([
      { $match: { colid: parseInt(colid), role: 'Student' } },
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        bySemester,
        byProgram,
        byYear,
        byGender
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
