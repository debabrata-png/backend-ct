const express=require('express');

const patentcontroller=require('../controllers/assignmentsubcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddassignmentsub).post(patentcontroller.createassignmentsub);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;