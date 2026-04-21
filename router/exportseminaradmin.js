const express=require('express');

const lcatcontroller=require('../controllers/adminexportcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(lcatcontroller.getexportseminar).post(lcatcontroller.getexportseminar);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;