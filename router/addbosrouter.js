const express=require('express');

const patentcontroller=require('../controllers/boscontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddbos).post(patentcontroller.createbos);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;