const express=require('express');

const patentcontroller=require('../controllers/clubcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddclub).post(patentcontroller.createclub);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;