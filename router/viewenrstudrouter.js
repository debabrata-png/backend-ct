const express=require('express');

const aws1=require('../controllers/diskenrstud');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(aws1.getenrolcourselist);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;