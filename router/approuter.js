const express=require('express');

const empcontroller=require('../controllers/empcontroller');

// const getalltours=(req,res) => {
//     res.status(200).send('Hello world for all the tours through db router');
   
// };

// const gettour = (req,res) => {
//     console.log(req.params);
//     res.status(200).send('Hello world for the new get param tours through db router');

// };

const router1=express.Router();

//router1.route('/').get(empcontroller.getalltours);
router1.route('/').get(empcontroller.getalltours2).post(empcontroller.createemp);
router1.route('/:id/:x').get(empcontroller.gettour1);

module.exports = router1;