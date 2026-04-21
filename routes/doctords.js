const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctords');

// Existing routes
router.post('/addds', doctorController.addds);
router.get('/getallds', doctorController.getallds);
router.get('/getbyidds/:id', doctorController.getbyidds);
router.put('/updateds/:id', doctorController.updateds);

// NEW: Get by specialization
router.get('/getbyspecializationds', doctorController.getbyspecializationds);

module.exports = router;
