const express=require('express');

const patentcontroller=require('../controllers/cfilescontroller');
const aws1=require('../controllers/aws2');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




//router1.route('/:id').get(patentcontroller.getaddcfiles).post(patentcontroller.createcfiles);
router1.route('/:id').get(patentcontroller.getaddcfiles).post(aws1.upload.single('upl'), patentcontroller.createcfiles2);
//router1.route('/').get(patentcontroller.getaddcfiles).post(patentcontroller.createcfiles);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;