const express=require('express');

const patentcontroller=require('../controllers/automationcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/:id').get(patentcontroller.geteditautomation).post(patentcontroller.updateautomation);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;