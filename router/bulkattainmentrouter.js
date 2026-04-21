const express=require('express');

const patentcontroller=require('../controllers/cocalcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getcoursecodeattainment).post(patentcontroller.postcoursecodeattainment);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;