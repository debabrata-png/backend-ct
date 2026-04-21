const express=require('express');

const pubcontroller=require('../controllers/jitsicontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/:id').get(pubcontroller.getviewjitsi).post(pubcontroller.postlogin2);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;