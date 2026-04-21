const Pub=require('./../Models/admission');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');



exports.getselectprogram= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        //const user1=req.cookies['user'];
        //const colid=req.cookies['colid'];
        const lcat1233= await Pub.find()
            .where('colid')
            .equals(req.query.colid);

            res.cookie("instname",req.query.instname);
            res.cookie("inststate",req.query.inststate);
            res.cookie("instdistrict",req.query.instdistrict);
          
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('selectprogram1', {
                categories: lcat1233,
                title: 'Select program',
                source: req.query.source,
                colid: req.query.colid,
                destination: req.query.destination
        });
                  
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.postselectprogram= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        res.redirect('/' + req.body.destination + '?colid=' + req.body.colid + '&source=' + req.body.source + '&programcode=' + req.body.programs)
          
          
                  
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};