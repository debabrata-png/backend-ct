const express=require('express');

const patentcontroller=require('../controllers/linkcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddlink).post(patentcontroller.createlink);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;