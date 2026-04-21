const express=require('express');

const lcatcontroller=require('../controllers/classcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').post(lcatcontroller.deleteclass);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;