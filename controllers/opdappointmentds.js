const OPDAppointment = require('../Models/OPDAppointment');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');

// Create OPD Appointment
exports.createds = async (req, res) => {
  try {
    const appointmentData = req.body;

    // Verify doctor exists
    const doctor = await Doctor.findOne({ 
      _id: appointmentData.doctorId,
      colid: appointmentData.colid 
    });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check slot availability
    const existingAppointments = await OPDAppointment.countDocuments({
      doctorId: appointmentData.doctorId,
      appointmentDate: appointmentData.appointmentDate,
      timeSlot: appointmentData.timeSlot,
      status: { $in: ['Scheduled', 'In Progress'] },
      colid: appointmentData.colid
    });

    const dayName = new Date(appointmentData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long' });
    const schedule = doctor.schedule.find(s => s.day === dayName);
    const maxPatients = schedule?.maxPatientsPerSlot || 1;

    if (existingAppointments >= maxPatients) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is fully booked'
      });
    }

    const appointment = new OPDAppointment(appointmentData);
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'OPD appointment booked successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

// Get appointments by doctor with date filter
exports.getbydoctords = async (req, res) => {
  try {
    const { doctorId, colid, filter, date } = req.query;
    
    let dateQuery = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filter === 'current') {
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      dateQuery = { 
        appointmentDate: { 
          $gte: today, 
          $lte: endOfDay 
        } 
      };
    } else if (filter === 'previous') {
      if (date) {
        // Filter by specific date
        const filterDate = new Date(date);
        filterDate.setHours(0, 0, 0, 0);
        const endOfFilterDate = new Date(filterDate);
        endOfFilterDate.setHours(23, 59, 59, 999);
        dateQuery = { 
          appointmentDate: { 
            $gte: filterDate, 
            $lte: endOfFilterDate 
          } 
        };
      } else {
        // All previous
        dateQuery = { appointmentDate: { $lt: today } };
      }
    } else if (filter === 'upcoming') {
      if (date) {
        // Filter by specific date
        const filterDate = new Date(date);
        filterDate.setHours(0, 0, 0, 0);
        const endOfFilterDate = new Date(filterDate);
        endOfFilterDate.setHours(23, 59, 59, 999);
        dateQuery = { 
          appointmentDate: { 
            $gte: filterDate, 
            $lte: endOfFilterDate 
          } 
        };
      } else {
        // All upcoming
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateQuery = { appointmentDate: { $gte: tomorrow } };
      }
    }

    const appointments = await OPDAppointment.find({
      doctorId,
      colid,
      ...dateQuery
    })
    .populate('patientId', 'patient mrNumber phone age gender')
    .sort({ appointmentDate: filter === 'previous' ? -1 : 1, timeSlot: 1 })
    .limit(100);

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// Get available slots
exports.getavailableslotsds = async (req, res) => {
  try {
    const { doctorId, date, colid } = req.query;

    const doctor = await Doctor.findOne({ _id: doctorId, colid });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const schedule = doctor.schedule.find(s => s.day === dayName);

    if (!schedule) {
      return res.status(200).json({
        success: true,
        slots: [],
        message: 'Doctor not available on this day'
      });
    }

    // Generate time slots
    const slots = [];
    const start = new Date(`2000-01-01 ${schedule.startTime}`);
    const end = new Date(`2000-01-01 ${schedule.endTime}`);
    const duration = schedule.slotDuration || 15;
    const maxPatients = schedule.maxPatientsPerSlot || 1;

    while (start < end) {
      const timeSlot = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      
      // Check how many appointments already exist
      const bookedCount = await OPDAppointment.countDocuments({
        doctorId,
        appointmentDate: new Date(date),
        timeSlot,
        status: { $in: ['Scheduled', 'In Progress'] },
        colid
      });

      slots.push({
        time: timeSlot,
        available: bookedCount < maxPatients,
        booked: bookedCount,
        total: maxPatients
      });

      start.setMinutes(start.getMinutes() + duration);
    }

    res.status(200).json({
      success: true,
      slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available slots',
      error: error.message
    });
  }
};

// Start check
exports.startcheckds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.body;

    const appointment = await OPDAppointment.findOneAndUpdate(
      { _id: id, colid },
      { 
        status: 'In Progress',
        checkInTime: new Date()
      },
      { new: true }
    ).populate('patientId', 'patient mrNumber phone age gender bloodGroup');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Check started successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting check',
      error: error.message
    });
  }
};

// Update payment
exports.updatepaymentds = async (req, res) => {
  try {
    const { id } = req.params;
    const { paidAmount, paymentMethod, colid } = req.body;

    const appointment = await OPDAppointment.findOne({ _id: id, colid });
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    appointment.paidAmount = paidAmount;
    appointment.paymentMethod = paymentMethod;
    appointment.balanceAmount = appointment.consultationFee - paidAmount;

    if (paidAmount === 0) {
      appointment.paymentStatus = 'Pending';
    } else if (paidAmount < appointment.consultationFee) {
      appointment.paymentStatus = 'Partial';
    } else {
      appointment.paymentStatus = 'Paid';
    }

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating payment',
      error: error.message
    });
  }
};

// Get all appointments
exports.getallds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const appointments = await OPDAppointment.find({ colid })
      .populate('patientId', 'patient mrNumber phone age gender')
      .populate('doctorId', 'doctor specialization')
      .sort({ appointmentDate: -1, timeSlot: -1 })
      .limit(200);

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// Add this function to controllers/opdappointmentds.js

// Get appointment by ID
exports.getbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const appointment = await OPDAppointment.findOne({ _id: id, colid })
      .populate('patientId', 'patient mrNumber phone age gender bloodGroup')
      .populate('doctorId', 'doctor specialization consultationFee');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
};

