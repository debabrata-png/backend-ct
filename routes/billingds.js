const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingds');

router.post('/createds', billingController.createds);
router.get('/getallds', billingController.getallds);
router.get('/getbyidds/:id', billingController.getbyidds);
router.get('/getbypatientds/:patientId', billingController.getbypatientds);
router.put('/updatepaymentds/:id', billingController.updatepaymentds);
router.get('/getpendingds', billingController.getpendingds);

module.exports = router;
