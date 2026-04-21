const Pat=require('./../Models/exam');
const Link=require('./../Models/uploadlink');
const Pat1=require('./../Models/attendance');
const Examenr=require('./../Models/examenr');


exports.getaddexam= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addexam', {
            title: 'Add Exam'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewexam= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            res.status(200).render('viewexam', {
                categories: lcat1233,
                //link:link123,
                title: 'List exam'
            
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

exports.getviewexamtoday= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);      
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1)
            .where('classdate')
            .gte(today)
            .where('classdate')
            .lte(tomorrow);
            res.status(200).render('viewexam', {
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

exports.getviewclassstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const semester=req.cookies['semester'];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);      
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('semester')
            .equals(semester)
            .where('classdate')
            .gte(today)
            .where('classdate')
            .lte(tomorrow);
            res.status(200).render('viewclassstud', {
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

exports.getattend= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const name=req.cookies['name'];
        const colid=req.cookies['colid'];
        const regno=req.cookies['regno'];
        const semester=req.cookies['semester'];
        const section=req.cookies['section'];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);
        //console.log(req.params.id); 
        var link;
        var coursecode;
        var classdate;
        var course;   
        var cstatus=1;  
        if(user1) {
            //const lcat1233= await Pat.findById(req.params.id);
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('_id')
            .equals(req.params.id);
            //console.log(lcat1233);
            lcat1233.forEach(function(data){
                //console.log(data.link);
                link=data.link;
                if(link=="NA") {
                    link="https://meet.jit.si/" + req.params.id;
                }
                coursecode=data.coursecode;
                classdate=data.classdate;
                course=data.course;
                cstatus=data.status;
                //console.log(link);

            })
            if (cstatus==1) {
                const pat1= await Pat1.findOneAndUpdate({classid: req.params.id},{
                    name: name,
                    colid: colid,
                    regno: regno,
                    coursecode: coursecode,
                    semester: semester,
                    course: course,
                    section: section,
                    status: 1,
                    classdate: classdate, //req.body.classdate,
                    user: user1
                }, {
                    new: true,
                    upsert: true 
                });
                res.redirect(link);

            } else {
                res.status(200).render('classnastud', {
                    link: link,
                    //link:link123,
                    title: 'Class Locked'            
                });

            }
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

exports.getattreport= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid1=parseInt(req.cookies['colid']);
        if(user1) {
            const lcat1233= await Pat1.aggregate([
                { 
                    $match: {colid: colid1, coursecode: req.params.id }
                },
                { 
                    $group: {
                        _id:['$regno','$name'], 
                        total_attendance: {$sum: '$status'}
                    }
                }
            ]);
            //console.log(lcat1233);
            res.status(200).render('viewcattendance', {
                categories: lcat1233,
                coursecode: req.params.id,
                title: 'Attendance Count'
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


exports.geteditexam= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editexam', {
                pub: leditcat,
                title: 'Edit'
            
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



exports.createexam= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        // var d1=req.body;
        // console.log(req.body);
        // d1.forEach(function (item) {
        //     console.log(item.id + ' ' + item.Name);
        //     //console.log(item.Name);
        // });
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const enddate=new Date(newdate);
        enddate.setMinutes ( enddate.getMinutes() + parseInt(req.body.duration) );
        if(user1) {
            const pat1= await Pat.create({
                colid: colid,
                coursecode: req.body.coursecode,
                examname: req.body.examname,
                programcode: req.body.programcode,
                proctorlink: req.body.proctorlink,
                link: req.file.location,
                semester: req.body.semester,
                course: req.body.course,
                section: req.body.section,
                status: req.body.status,
                classdate: newdate, //req.body.classdate,
                enddate: enddate,
                classtime: req.body.classtime,
                academicyear: req.body.academicyear,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewexam');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addexam', {
        title: 'Add exam'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.updateexam= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const enddate=new Date(newdate);
        enddate.setMinutes ( enddate.getMinutes() + parseInt(req.body.duration) );
        //const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            colid: colid,
            coursecode: req.body.coursecode,
            link: req.body.link,
            proctorlink: req.body.proctorlink,
            semester: req.body.semester,
            course: req.body.course,
            section: req.body.section,
            status: req.body.status,
            status: req.body.status,
            examname: req.body.examname,
            classdate: newdate, //req.body.classdate,
            enddate: enddate,
            classtime: req.body.classtime,
            academicyear: req.body.academicyear,
            user: user1
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewexam');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewexam');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteexam= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewclass');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewexam');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.getstudproctor= async (req,res) => {
    try{
        const token=req.cookies['token'];
        const regno=req.cookies['regno'];
        const colid=req.cookies['colid'];
        //console.log(colid + '-' + regno + '-' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        const dt1=new Date();
        dt1.setHours(dt1.getHours() +5);
        dt1.setMinutes(dt1.getMinutes() + 30);
        //console.log(dt1);

        const lcat1233= await Examenr.find()
            .where('regno')
            .equals(regno)
            .where('colid')
            .equals(colid)
            .where('startdate')
            .lte(dt1)
            .where('enddate')
            .gte(dt1);
            //console.log(lcat1233);

        
            res.status(200).render('viewstudproctor', {
                categories: lcat1233,
                title: 'Edit'
            
        });
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};
