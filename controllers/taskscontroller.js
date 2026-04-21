const Pat=require('./../Models/tasks');
const Link=require('./../Models/uploadlink');
const Pat1=require('./../Models/attendance');
const Pub=require('./../Models/taskassign');


exports.getaddtasks= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addtasks', {
            title: 'Add tasks'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};



exports.getjoinclass= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('joinclasscode', {
            title: 'Join Class'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewtasks= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            // const link123= await Link.find()
            // .where('criteria')
            // .equals('346')
            // .where('colid')
            // .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewtasks', {
                categories: lcat1233,
                //link:link123,
                title: 'List tasks'
            
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

exports.getviewtasksbyid= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.findById(req.params.id);
            // const link123= await Link.find()
            // .where('criteria')
            // .equals('346')
            // .where('colid')
            // .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            //console.log(lcat1233);
            res.status(200).render('viewtasksbyid', {
                task: lcat1233.title,
                link: lcat1233.link,
                documentlink: lcat1233.documentlink,
                topic: lcat1233.topic,
                classdate: lcat1233.classdate,
                category: lcat1233.category,

                //link:link123,
                title: 'List tasks'
            
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

exports.getviewclassall= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid);
            res.status(200).render('viewclassall2', {
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


exports.getviewmeetingtoday= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        //today.setHours(today.getHours() - 1 + 5);
        today.setHours(today.getHours() - today.getHours());
        today.setMinutes(today.getMinutes() + 30);
        //tomorrow.setHours(tomorrow.getHours() + 1 + 5);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);     
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('classdate')
            .gte(today)
            .where('classdate')
            .lte(tomorrow);
            res.status(200).render('viewmeeting', {
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
        const section=req.cookies['section'];
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(today.getHours() - 1 + 5);
        today.setMinutes(today.getMinutes() + 30);
        tomorrow.setHours(tomorrow.getHours() + 1 + 5);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);   
        //console.log(today);
        //console.log(tomorrow);  
        if(user1) {
            const lcat1233= await Pat.find({ "section" : { $in : ['I', section]}})
            .where('colid')
            .equals(colid)
            .where('semester')
            .equals(semester)
            .where('enrollreq')
            .equals('No')
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


exports.getallclassstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const semester=req.cookies['semester'];
        //console.log("Starting");
 
        if(user1) {
            const lcat1233= await Pat.distinct("coursecode")
            .where('colid')
            .equals(colid)
            .where('semester')
            .equals(semester);
            // const lcat1233= await Pat.aggregate([
            //     { 
            //         $match: {colid: colid, semester: semester }
            //     },
            //     { 
            //         $group: {
            //             _id: { name: "$name", coursecode: "$coursecode", course: "$course" }
            //         }
            //     }
            // ]);
            //console.log(lcat1233);
            res.status(200).render('selectclassstud', {
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


exports.postjoinclass= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const semester=req.cookies['semester'];
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(today.getHours() - 12 + 5);
        today.setMinutes(today.getMinutes() + 30);
        tomorrow.setHours(tomorrow.getHours() + 1 + 5);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);   
        //console.log(today);
        //console.log(tomorrow);  
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('coursecode')
            .equals(req.body.coursecode)
            .where('user')
            .equals(req.body.email)
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
                const pat1= await Pat1.findOneAndUpdate({classid: req.params.id, regno: regno},{
                    name: name,
                    colid: colid,
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


exports.getedittasks= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('edittasks', {
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



exports.createtasks= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                title: req.body.title,
                documentlink: req.body.documentlink,
                link: req.body.link,
                topic: req.body.topic,
                academicyear: req.body.academicyear,
                status: req.body.status,
                category: req.body.category,
                classdate: newdate, //req.body.classdate,
                classtime: req.body.classtime,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/viewtasks');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addtasks', {
        title: 'Add tasks'
    });
    }   
};

exports.createtasksurl= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const newdate=new Date();
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                title: req.query.title,
                documentlink: 'NA',
                link: req.query.link,
                topic: req.query.topic,
                academicyear: '2021-22',
                status: 'Active',
                category: req.query.category,
                classdate: newdate, //req.body.classdate,
                classtime: '16:30',
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/viewtasks');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addtasks', {
        title: 'Add tasks'
    });
    }   
};

exports.createclassadv= async (req,res) => {

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
                
                const pat1= await Pat.create({
                    name: name,
                    colid: colid,
                    coursecode: req.body.coursecode,
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
           res.redirect('/viewclass');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addclass1', {
        title: 'Add Class'
    });
    }   
};

exports.updatetasks= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
                name: name,
                colid: colid,
                title: req.body.title,
                documentlink: req.body.documentlink,
                link: req.body.link,
                topic: req.body.topic,
                academicyear: req.body.academicyear,
                status: req.body.status,
                category: req.body.category,
                classdate: newdate, //req.body.classdate,
                classtime: req.body.classtime,
                user: user1
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewtasks');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewtasks');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletetasks= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        await Pat.findByIdAndDelete(req.body.category_id);

        await Pub.deleteMany({ colid: colid, taskid: req.body.category_id });
        
        
       
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewtasks');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewtasks');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







