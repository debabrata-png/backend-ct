const Consultation = require('../Models/Consultation');
const Patient = require('../Models/Patient');

// Create new consultation
exports.createds = async (req, res) => {
  try {
    const consultationData = req.body;

    // Verify patient exists with same colid
    const patient = await Patient.findOne({ 
      _id: consultationData.patientId,
      colid: consultationData.colid 
    });
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const consultation = new Consultation(consultationData);
    await consultation.save();

    res.status(201).json({
      success: true,
      message: 'Consultation created successfully',
      consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating consultation',
      error: error.message
    });
  }
};

// Get all consultations by colid
exports.getallds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const consultations = await Consultation.find({ colid: colid })
      .populate('patientId', 'name mrNumber phone age gender')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: consultations.length,
      consultations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultations',
      error: error.message
    });
  }
};

// Get consultation by ID and colid
exports.getbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const consultation = await Consultation.findOne({ _id: id, colid: colid })
      .populate('patientId', 'name mrNumber phone age gender bloodGroup');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultation',
      error: error.message
    });
  }
};

// Get consultations by patient ID and colid
exports.getbypatientds = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { colid } = req.query;

    const consultations = await Consultation.find({ 
      patientId,
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
      message: 'Error fetching patient consultations',
      error: error.message
    });
  }
};

// Get today's consultations by colid
exports.todayds = async (req, res) => {
  try {
    const { colid } = req.query;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const consultations = await Consultation.find({
      colid: colid,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate('patientId', 'name mrNumber phone age gender')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: consultations.length,
      consultations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s consultations',
      error: error.message
    });
  }
};

// Update consultation
exports.updateds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, ...updateData } = req.body;

    const consultation = await Consultation.findOneAndUpdate(
      { _id: id, colid: colid },
      updateData,
      { new: true, runValidators: true }
    ).populate('patientId', 'name mrNumber phone age gender');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Consultation updated successfully',
      consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating consultation',
      error: error.message
    });
  }
};
