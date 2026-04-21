const express=require('express');

const patentcontroller=require('../controllers/meetingcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/:id').get(patentcontroller.geteditmeeting).post(patentcontroller.updatemeeting);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;