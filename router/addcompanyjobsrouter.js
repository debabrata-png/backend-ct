const express=require('express');

const patentcontroller=require('../controllers/companyjobscontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddcompanyjobs).post(patentcontroller.createcompanyjobs);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;