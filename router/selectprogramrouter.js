const express=require('express');

const patentcontroller=require('../controllers/selectprogramcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getselectprogram).post(patentcontroller.postselectprogram);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;