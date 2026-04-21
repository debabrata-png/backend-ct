const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyds');

// Drug Inventory Routes
router.post('/adddrugds', pharmacyController.adddrugds);
router.get('/getalldrugsds', pharmacyController.getalldrugsds);
router.get('/getdrugbyidds/:id', pharmacyController.getdrugbyidds);
router.get('/searchdrugsds', pharmacyController.searchdrugsds);
router.put('/updatestockds/:id', pharmacyController.updatestockds);

// Stock Alerts
router.get('/getlowstockds', pharmacyController.getlowstockds);
router.get('/getexpiredds', pharmacyController.getexpiredds);

// Pharmacy Orders (Dispensing)
router.post('/dispenseds', pharmacyController.dispenseds);
router.get('/getallordersds', pharmacyController.getallordersds);
router.get('/getorderbyidds/:id', pharmacyController.getorderbyidds);
router.get('/getbypatientds/:patientId', pharmacyController.getbypatientds);

module.exports = router;
