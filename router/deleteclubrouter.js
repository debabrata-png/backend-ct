const express=require('express');

const lcatcontroller=require('../controllers/clubcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').post(lcatcontroller.deleteclub);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;