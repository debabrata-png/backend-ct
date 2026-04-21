const express = require('express');
const router = express.Router();
const opdAppointmentController = require('../controllers/opdappointmentds');

// Create OPD appointment
router.post('/createds', opdAppointmentController.createds);

// Get all appointments
router.get('/getallds', opdAppointmentController.getallds);

// Get appointments by doctor
router.get('/getbydoctords', opdAppointmentController.getbydoctords);

// Get available slots
router.get('/getavailableslotsds', opdAppointmentController.getavailableslotsds);

// Start check (doctor)
router.put('/startcheckds/:id', opdAppointmentController.startcheckds);

// Update payment
router.put('/updatepaymentds/:id', opdAppointmentController.updatepaymentds);

// Get appointment by ID
router.get('/getbyidds/:id', opdAppointmentController.getbyidds);

module.exports = router;
