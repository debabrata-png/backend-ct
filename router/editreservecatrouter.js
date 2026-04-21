const express=require('express');

const patentcontroller=require('../controllers/reservecatcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/:id').get(patentcontroller.geteditreservecat).post(patentcontroller.updatereservecat);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;