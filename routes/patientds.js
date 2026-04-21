const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientds');

// Existing routes
router.post('/registerds', patientController.registerds);
router.get('/getallds', patientController.getallds);
router.get('/getbyidds/:id', patientController.getbyidds);
router.put('/updateds/:id', patientController.updateds);
router.get('/historyds/:id', patientController.historyds);

// NEW: Search route
router.get('/searchds', patientController.searchds);

module.exports = router;
