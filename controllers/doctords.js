const Doctor = require('../Models/Doctor');
const User = require('../Models/user');

// Add new doctor
exports.addds = async (req, res) => {
  try {
    const doctorData = req.body;

    // Check if email already exists in User table
    const existingUser = await User.findOne({ 
      email: doctorData.email,
      colid: doctorData.colid 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in the system'
      });
    }

    // Create Doctor
    const doctor = new Doctor(doctorData);
    await doctor.save();

    // Create User account for doctor login (no bcrypt, plain password)
    const userData = {
      email: doctorData.email,
      name: doctorData.doctor,  // Use 'doctor' field as name
      phone: doctorData.phone,
      password: doctorData.password,  // Store plain password as-is
      role: 'Doctor',
      regno: doctor.doctorId,  // Use auto-generated doctorId as regno
      programcode: doctor._id.toString(),
      admissionyear: new Date().getFullYear().toString(),
      semester: 'N/A',
      section: 'N/A',
      gender: doctorData.gender || 'Not Specified',
      department: doctorData.specialization,
      user: doctorData.email,  // Store Doctor's ObjectId in user field
      addedby: doctorData.name,
      colid: parseInt(doctorData.colid),
      status: 1
    };

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Doctor and user account created successfully',
      doctor,
      userCreated: true
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error adding doctor',
      error: error.message
    });
  }
};

// Get all doctors
exports.getallds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const doctors = await Doctor.find({ colid, isActive: true })
      .sort({ doctor: 1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

// Get doctor by ID
exports.getbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const doctor = await Doctor.findOne({ _id: id, colid });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
};

// Get doctors by specialization
exports.getbyspecializationds = async (req, res) => {
  try {
    const { specialization, colid } = req.query;
    
    const doctors = await Doctor.find({ 
      specialization, 
      colid,
      isActive: true 
    }).sort({ doctor: 1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

// Update doctor
exports.updateds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, ...updateData } = req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { _id: id, colid },
      updateData,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Update corresponding User account
    const userUpdateData = {
      name: updateData.doctor || doctor.doctor,
      phone: updateData.phone || doctor.phone,
      department: updateData.specialization || doctor.specialization
    };

    if (updateData.email) {
      userUpdateData.email = updateData.email;
    }

    await User.findOneAndUpdate(
      { user: doctor._id.toString(), colid },
      userUpdateData
    );

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating doctor',
      error: error.message
    });
  }
};

// Delete/Deactivate doctor
exports.deleteds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { _id: id, colid },
      { isActive: false },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Deactivate corresponding User account
    await User.findOneAndUpdate(
      { user: doctor._id.toString(), colid },
      { status: 0 }
    );

    res.status(200).json({
      success: true,
      message: 'Doctor deactivated successfully',
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deactivating doctor',
      error: error.message
    });
  }
};
