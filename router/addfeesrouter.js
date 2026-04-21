const express=require('express');

const patentcontroller=require('../controllers/fileimportcontroller');
const aws1=require('../controllers/diskfees');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




//router1.route('/:id').get(patentcontroller.getaddcfiles).post(patentcontroller.createcfiles);
//router1.route('/:id').get(patentcontroller.getaddifiles).post(aws1.upload.single('upl'), patentcontroller.createifiles2);
router1.route('/').get(aws1.getaddfees).post(aws1.uploadAvatar);
//router1.route('/').get(patentcontroller.getaddcfiles).post(patentcontroller.createcfiles);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;