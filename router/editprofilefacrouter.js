const express=require('express');

const patentcontroller=require('../controllers/profilecontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.geteditprofilefac).post(patentcontroller.updateprofilefac);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;