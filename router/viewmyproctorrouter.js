const express=require('express');

const pubcontroller=require('../controllers/diskexamenr');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(pubcontroller.getmyproctoring);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;