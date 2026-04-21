const express=require('express');

const patentcontroller=require('../controllers/ruralcontroller');



const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);




router1.route('/').get(patentcontroller.getaddrural).post(patentcontroller.createrural);
//router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;