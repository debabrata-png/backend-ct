const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionds');

// Create prescription
router.post('/createds', prescriptionController.createds);

// Get all prescriptions
router.get('/getallds', prescriptionController.getallds);

// Get prescription by ID
router.get('/getbyidds/:id', prescriptionController.getbyidds);

// Get prescriptions by patient (patient history)
router.get('/getbypatientds/:patientId', prescriptionController.getbypatientds);
router.get('/getbydoctords', prescriptionController.getbydoctords); // ADD THIS


module.exports = router;
