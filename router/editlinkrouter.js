const express=require('express');

const pubcontroller=require('../controllers/linkcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/:id').get(pubcontroller.geteditlink).post(pubcontroller.updatelink);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;