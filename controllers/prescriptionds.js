const Prescription = require('../Models/Prescription');
const OPDAppointment = require('../Models/OPDAppointment');
const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');

// Create Prescription
exports.createds = async (req, res) => {
  try {
    const prescriptionData = req.body;

    // Verify appointment exists
    const appointment = await OPDAppointment.findOne({ 
      _id: prescriptionData.opdAppointmentId,
      colid: prescriptionData.colid 
    }).populate('patientId');
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'OPD Appointment not found'
      });
    }

    // Get doctor details
    const doctor = await Doctor.findOne({ 
      _id: prescriptionData.doctorId,
      colid: prescriptionData.colid 
    });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Get patient details (from DB or manual entry)
    let patientDetails = {};
    if (appointment.patientId) {
      const patient = appointment.patientId;
      patientDetails = {
        name: patient.patient,  // Correct field name
        age: patient.age,
        gender: patient.gender,
        phone: patient.phone,
        mrNumber: patient.mrNumber
      };
    } else if (appointment.patientDetails) {
      patientDetails = appointment.patientDetails;
    }

    // Set doctor details
    prescriptionData.doctorDetails = {
      name: doctor.doctor,  // Correct field name
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      phone: doctor.phone,
      email: doctor.email
    };
    prescriptionData.patientDetails = patientDetails;

    const prescription = new Prescription(prescriptionData);
    await prescription.save();

    // Update appointment
    appointment.prescriptionCreated = true;
    appointment.prescriptionId = prescription._id;
    appointment.status = 'Completed';
    appointment.checkOutTime = new Date();
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating prescription',
      error: error.message
    });
  }
};

// Get prescription by ID
exports.getbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const prescription = await Prescription.findOne({ _id: id, colid })
      .populate('patientId', 'patient mrNumber phone age gender')
      .populate('doctorId', 'doctor specialization qualification')
      .populate('opdAppointmentId');

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    res.status(200).json({
      success: true,
      prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prescription',
      error: error.message
    });
  }
};

// Get patient history (previous prescriptions)
exports.getbypatientds = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { colid } = req.query;

    const prescriptions = await Prescription.find({ 
      patientId,
      colid 
    })
    .populate('doctorId', 'doctor specialization')
    .sort({ createdAt: -1 })
    .limit(10);

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient prescriptions',
      error: error.message
    });
  }
};

// Get all prescriptions
exports.getallds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const prescriptions = await Prescription.find({ colid })
      .populate('patientId', 'patient mrNumber phone')
      .populate('doctorId', 'doctor specialization')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prescriptions',
      error: error.message
    });
  }
};

// Get prescriptions by doctor
exports.getbydoctords = async (req, res) => {
  try {
    const { doctorId, colid, date } = req.query;
    
    const query = {
      doctorId,
      colid
    };

    // If date filter provided
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query.createdAt = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const prescriptions = await Prescription.find(query)
      .populate('patientId', 'patient mrNumber phone age gender')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prescriptions',
      error: error.message
    });
  }
};
