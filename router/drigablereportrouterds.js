const express = require('express');
const drigablereportctlrds = require('../controllers/drigablereportctlrds.js');

const router = express.Router();

router.get('/getusermanagementreportds', drigablereportctlrds.getusermanagementreportds);
router.post('/getrolespecificreportds', drigablereportctlrds.getrolespecificreportds);
router.get('/getlmsreportds', drigablereportctlrds.getlmsreportds);
router.get('/getpurchasereportds', drigablereportctlrds.getpurchasereportds);

module.exports = router;
