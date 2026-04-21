const express=require('express');

const pubcontroller=require('../controllers/passexamcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(pubcontroller.getviewpassexam);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;