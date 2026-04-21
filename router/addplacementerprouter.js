const express=require('express');

const patentcontroller=require('../controllers/placementnewcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddplacement).post(patentcontroller.createplacement);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;