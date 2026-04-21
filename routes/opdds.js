const express = require('express');
const router = express.Router();
const opdController = require('../controllers/opdds');

// Create new consultation
router.post('/createds', opdController.createds);

// Get all consultations
router.get('/getallds', opdController.getallds);

// Get today's consultations
router.get('/todayds', opdController.todayds);

// Get consultation by ID
router.get('/getbyidds/:id', opdController.getbyidds);

// Get consultations by patient ID
router.get('/getbypatientds/:patientId', opdController.getbypatientds);

// Update consultation
router.put('/updateds/:id', opdController.updateds);

module.exports = router;
