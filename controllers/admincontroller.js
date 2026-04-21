const User=require('./../Models/user');
const Class=require('./../Models/class');
const Attend=require('./../Models/attendance');
const Classenr=require('./../Models/classenr');
const Cfiles=require('./../Models/coursefiles');
const Examenr=require('./../Models/examenr');
const Questions=require('./../Models/questions');
const Answers=require('./../Models/answers');
const Exam=require('./../Models/exam');
const Finalanswer=require('./../Models/finalanswer');





exports.getfacultyclass= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.params.id;
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Class.find()
            .where('user')
            .equals(user1);
            res.status(200).render('viewclass', {
                categories: lcat1233,
                //link:link123,
                title: 'List class'
            
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

exports.getviewclassbycourse= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Class.find()
            .where('user')
            .equals(user1)
            .where('coursecode')
            .equals(req.params.id);
            res.status(200).render('viewclassbycourse', {
                categories: lcat1233,
                //link:link123,
                title: 'List class',
                coursecode: req.params.id
            
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

exports.getaddclassbycourse= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addclassbycourse', {
            title: 'Add Class',
            coursecode: req.params.id
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.createclassbycourse= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const weeks=parseInt(req.body.weeks) + 1;
        
        if(user1) {
            var i;
            const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
            var dt1=new Date(newdate);
            for (i = 0; i < weeks; i++) { 
                
                const pat1= await Class.create({
                    name: name,
                    colid: colid,
                    coursecode: req.params.id,
                    link: req.body.link,
                    semester: req.body.semester,
                    program: req.body.program,
                    module: req.body.module,
                    topic: req.body.topic,
                    course: req.body.course,
                    section: req.body.section,
                    status: req.body.status,
                    enrollreq: req.body.enrollreq,
                    classdate: dt1, //req.body.classdate,
                    classtime: req.body.classtime,
                    user: user1
                });
                dt1.setDate(dt1.getDate() + 7);
            
            }
            
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/viewclassbycourse/' + req.params.id);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.redirect('/addclassbycourse/' + req.params.id);
    //    res.status(200).render('addclassbycourse/' + req.params.id, {
    //     title: 'Add Class'
    // });
    }   
};



