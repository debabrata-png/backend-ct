const Patient = require('../Models/Patient');
const Consultation = require('../Models/Consultation');

// Register new patient
exports.registerds = async (req, res) => {
  try {
    const patientData = req.body;
    
    // Check if patient already exists by phone and colid
    const existingPatient = await Patient.findOne({
      phone: patientData.phone,
      colid: patientData.colid
    });
    
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient with this phone number already exists',
        patient: existingPatient
      });
    }
    
    const patient = new Patient(patientData);
    await patient.save();
    
    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering patient',
      error: error.message
    });
  }
};

// REMOVE THE FIRST searchds - KEEP ONLY THIS ONE
// Advanced search by name, MR number, or phone
exports.searchds = async (req, res) => {
  try {
    const { query, colid } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    // Search across multiple fields
    const patients = await Patient.find({
      colid: parseInt(colid),
      $or: [
        { patient: { $regex: query, $options: 'i' } },  // Correct field name
        { mrNumber: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ],
      isActive: true
    })
    .select('patient mrNumber phone age gender bloodGroup')  // Fixed: 'patient' instead of 'name'
    .limit(10)
    .sort({ patient: 1 });  // Fixed: sort by 'patient' instead of 'name'
    
    res.status(200).json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching patients',
      error: error.message
    });
  }
};

// Get patient by ID and colid
exports.getbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const patient = await Patient.findOne({ _id: id, colid: colid });
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient',
      error: error.message
    });
  }
};

// Get all patients by colid
exports.getallds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const patients = await Patient.find({ colid: colid, isActive: true })
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.status(200).json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patients',
      error: error.message
    });
  }
};

// Update patient
exports.updateds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, ...updateData } = req.body;
    
    const patient = await Patient.findOneAndUpdate(
      { _id: id, colid: colid },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating patient',
      error: error.message
    });
  }
};

// Get patient history by colid
exports.historyds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const consultations = await Consultation.find({
      patientId: id,
      colid: colid
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: consultations.length,
      consultations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient history',
      error: error.message
    });
  }
};
