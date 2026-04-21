const express = require('express');
const router = express.Router();
const labController = require('../controllers/labds');

// Test Catalog Routes
router.post('/createtestds', labController.createtestds);
router.get('/getalltestsds', labController.getalltestsds);

// Lab Order Routes
router.post('/createorderds', labController.createorderds);
router.get('/getallordersds', labController.getallordersds);
router.get('/getorderbyidds/:id', labController.getorderbyidds);
router.get('/getpendingds', labController.getpendingds);
router.get('/getbypatientds/:patientId', labController.getbypatientds);

// Sample Collection
router.put('/collectsampleds/:id', labController.collectsampleds);

// Enter Results
router.put('/enterresultsds/:id', labController.enterresultsds);

module.exports = router;
