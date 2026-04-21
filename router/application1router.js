const express=require('express');

const patentcontroller=require('../controllers/diskapplication');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddapplicationform1).post(patentcontroller.createapplicationform1);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;