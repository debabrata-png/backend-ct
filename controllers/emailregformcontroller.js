const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pub=require('./../Models/emailregform');
const User=require('./../Models/user');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');
// const Fees=require('./../Models/fees');
// const Scholarships=require('./../Models/scholarships');

exports.getaddemailregform= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    res.status(200).render('emailregform1', {
        title: 'Registration Form',
        colid: req.query.colid,
        source: req.query.source
    });
      
};

exports.getviewemailregform= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewemailregform', {
                categories: lcat1233,
                title: 'List '
            
        });
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.createemailregform= async (req,res) => {

    try{
        
        const colid=parseInt(req.body.colid);
        const source=req.body.source;

        const pub= await Pub.create({
            source: source,
            colid: colid,
            status: 'Applied',
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            instname:req.body.instname,
            state:req.body.state,
            time:req.body.time,
            details:req.body.details,
            applicationdate: new Date()

        });
     
       //req.flash("success", "Category has been added successfully");
       req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
       res.redirect('/emailregform?colid=' + req.body.colid + '&source=' + req.body.source);
       
          
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/emailregform?colid=' + req.body.colid + '&source=' + req.body.source);
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('application1', {
    //     title: 'Application form'
    // });
    }   
};
