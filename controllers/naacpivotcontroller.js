const Pat=require('./../Models/class');
const Link=require('./../Models/uploadlink');
const Attend=require('./../Models/attendance');
const Finalanswers=require('./../Models/finalanswer');
const Users=require('./../Models/user');


exports.filterclassdata= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const date1=new Date();
        const date2=new Date();
        const dt=req.body.dt;
        date2.setDate(date2.getDate() - parseInt(dt));
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('classdate')
            .gte(date2);
            res.status(200).render('viewclassall1', {
                categories: lcat1233,
                //link:link123,
                title: 'List class by all faculties'   
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

exports.viewnaacpivot= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid);
            res.status(200).render('viewnaacpivot', {
                categories: lcat1233,
                //link:link123,
                title: 'DVV workbench'   
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

exports.filterattendance= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const date1=new Date(req.body.dt1);
        const date2=new Date(req.body.dt2);
        
        if(user1) {
            const lcat1233= await Attend.find()
            .where('colid')
            .equals(colid)
            .where('classdate')
            .gte(date1)
            .where('classdate')
            .lte(date2);
            res.status(200).render('pivotattall1', {
                categories: lcat1233,
                //link:link123,
                title: 'Attendance Record of All Students'   
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

exports.getallattendance= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const date1=new Date();
        const date2=new Date();
        date1.setDate(date1.getDate() - 30);
        
        if(user1) {
            const lcat1233= await Attend.find()
            .where('colid')
            .equals(colid)
            .where('classdate')
            .gte(date1)
            .where('classdate')
            .lte(date2);
            res.status(200).render('pivotattall1', {
                categories: lcat1233,
                //link:link123,
                title: 'Attendance Record of All Students'   
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

exports.getallfinalanswers= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const examid=req.query.examid;
        if(user1) {
            const lcat1233= await Finalanswers.find().sort('name question')
            .where('examid')
            .equals(examid)
            .where('colid')
            .equals(colid);
            //console.log(lcat1233);

            res.status(200).render('pivotexamscore', {
                categories: lcat1233,
                //link:link123,
                title: 'List Exam Score'
            
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

exports.getmyfinalanswers= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const examid=req.query.examid;
        if(user1) {
            const lcat1233= await Finalanswers.find().sort('regno question')
            .where('examid')
            .equals(examid)
            .where('evaluator')
            .equals(user1)
            .where('colid')
            .equals(colid);
            //console.log(lcat1233);

            res.status(200).render('pivotexamscore', {
                categories: lcat1233,
                //link:link123,
                title: 'List Exam Score'
            
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

exports.generateotp= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {

            res.status(200).render('generateotp', {
                //categories: lcat1233,
                //link:link123,
                user: user1,
                title: 'Generate OTP'   
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


exports.getco= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        //const examid=req.query.examid;
        if(user1) {
            const lcat1233= await Finalanswers.find()
            .where('colid')
            .equals(colid);
            //console.log(lcat1233);

            res.status(200).render('getcoattainment', {
                categories: lcat1233,
                //link:link123,
                title: 'CO Attainment'
            
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

exports.getstudcount= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid1=parseInt(req.cookies['colid']);
        if(user1) {
            const lcat1233= await Users.aggregate([
                { 
                    $match: {role: 'Student'}
                },
                { 
                    $group: {
                        _id:['$colid'], 
                        total_count: {$sum: '$status'}
                    }
                }
            ]);
            //console.log(lcat1233);
            res.status(200).render('viewstudcount', {
                categories: lcat1233,
                coursecode: req.params.id,
                title: 'Student Count'
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

exports.getcourseattendance= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Attend.find()
            .where('colid')
            .equals(colid)
            .where('coursecode')
            .equals(req.params.id);
            res.status(200).render('pivotattendance', {
                categories: lcat1233,
                //link:link123,
                title: 'Attendance Record of All Students'   
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