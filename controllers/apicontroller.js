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
const Addonc=require('./../Models/addonc');
const Vacclass=require('./../Models/vacclass');
const Vacattendance=require('./../Models/vacattendance');
const Vacenroll=require('./../Models/vacclassenr');
const Club=require('./../Models/club');
const Circular=require('./../Models/circular');
const Assignment=require('./../Models/assignment');
const Assignsubmit=require('./../Models/assignsubmit');
const Clubenr=require('./../Models/clubenr');

exports.loginstud= async (req,res) => {
    try{

        const email=req.query.email;
        const password=req.query.password;
        User.findOne({ email: email, password: password, role: 'Student' }, (err, role) => {
            if (err) {
                res.status(201).json({
                    status:'Error'
                });
            }
            if(role) {
                // res.cookie("user",String([role.email]));
                // res.cookie("name",String([role.name]));
                // res.cookie("department",String([role.department]));
                // res.cookie("colid",String([role.colid]));
                // res.cookie("role",String([role.role]));
                res.status(200).json({
                    status:'Success',
                    user: String([role.email]),
                    role: String([role.role]),
                    name: String([role.name]),
                    colid: String([role.colid]),
                    programcode: String([role.programcode]),
                    gender: String([role.gender]),
                    admissionyear: String([role.admissionyear]),
                    regno: String([role.regno]),
                    section: String([role.section]),
                    semester: String([role.semester])
                });
            } else {
                res.status(201).json({
                    status:'Invalid username or password',
                });
            }
          });
    } catch(err) {
        res.status(201).json({
            status:'Error ' + err,
        });

    }  
};

exports.getclassstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.query.colid;
        const semester=req.query.semester;
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(today.getHours() - 1 + 5);
        today.setMinutes(today.getMinutes() + 30);
        tomorrow.setHours(tomorrow.getHours() + 1 + 5);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);
        //today.setHours(0,0,0,0);  
        //tomorrow.setHours(0,0,0,0);
        //console.log(today);
        //console.log(tomorrow);      
        const lcat1233= await Class.find()
        .where('colid')
        .equals(colid)
        .where('semester')
        .equals(semester)
        .where('classdate')
        .gte(today)
        .where('classdate')
        .lte(tomorrow);
        res.status(200).json({
            status:'Success',
            data: {
                classes : lcat1233
            }
     
        });           
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getclassstudr= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.query.colid;
        const semester=req.query.semester;
        const fac=req.query.fac;
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(today.getHours() - 1 + 5);
        today.setMinutes(today.getMinutes() + 30);
        tomorrow.setHours(tomorrow.getHours() + 1 + 5);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);    
        const lcat1233= await Class.find({ name: { $regex: '.*' + fac + '.*', $options: 'i' }})  //{$regex: name, $options: 'i'} name: { $regex: '.*' + fac + '.*' }
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
        res.status(200).json({
            status:'Success',
            data: {
                classes : lcat1233
            }
     
        });           
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getenrolcourselist= async (req,res) => {
    try{
        
        const colid=req.query.colid;
        const regno=req.query.regno;
        const lcat1233= await Classenr.find()
            .where('regno')
            .equals(regno)
            .where('colid')
            .equals(colid)
            .where('status')
            .equals(1);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
         
            }); 
                       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getenrolcourselistyr= async (req,res) => {
    try{
        
        const colid=req.query.colid;
        const regno=req.query.regno;
        const year=req.query.year;
        const lcat1233= await Classenr.find()
            .where('regno')
            .equals(regno)
            .where('colid')
            .equals(colid)
            .where('academicyear')
            .equals(year)
            .where('status')
            .equals(1);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
         
            }); 
                       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.getenrolclassstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.query.colid;
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
        const lcat1233= await Class.find()
            .where('colid')
            .equals(colid)
            .where('coursecode')
            .equals(req.query.coursecode)
            .where('enrollreq')
            .equals('Yes')
            .where('user')
            .equals(req.query.email);
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
         
            }); 
                  
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getviewcfilesstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
       
        const lcat1233= await Cfiles.find()
            .where('coursecode')
            .equals(req.query.coursecode)
            .where('colid')
            .equals(req.query.colid);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
         
            }); 
                      
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getclassattended= async (req,res) => {
    try{
        const lcat1233= await Attend.distinct("coursecode")
            .where('colid')
            .equals(req.query.colid)
            .where('regno')
            .equals(req.query.regno)
            .where('coursecode')
            .ne(null);
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            });              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getexamlist= async (req,res) => {
    try{
        const dt1=new Date();
        dt1.setHours(dt1.getHours() +5);
        dt1.setMinutes(dt1.getMinutes() + 30);

        const lcat1233= await Examenr.find()
            .where('regno')
            .equals(req.query.regno)
            .where('colid')
            .equals(req.query.colid)
            .where('startdate')
            .lte(dt1)
            .where('enddate')
            .gte(dt1);
        // const lcat1233= await Exam.aggregate()
        // .lookup({
        //     from: 'examenrs',
        //     localField: '_id',
        //     forignField: 'examcode',
        //     as: 'exam_field'
        // });
        // console.log(lcat1233);
        
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getexamdetails= async (req,res) => {
    try{
        //const lcat1233= await Exam.findById(req.query.id);
        const lcat1233= await Exam.find()
        .where('_id')
        .equals(req.query.id);
        
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getquestions= async (req,res) => {
    try{

        const lcat1233= await Questions.find()
            .where('examid')
            .equals(req.query.examid)
            .where('colid')
            .equals(req.query.colid)
            .where('type')
            .equals(req.query.type);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getanswers= async (req,res) => {
    try{

        const lcat1233= await Answers.find().sort('question')
            .where('examid')
            .equals(req.query.examid)
            .where('colid')
            .equals(req.query.colid)
            .where('regno')
            .equals(req.query.regno);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.getMCQ= async (req,res) => {
    try{
        const lcat1233= await Questions.findById(req.query.id);
        //console.log(lcat1233);
        var option1="";
        //console.log(lcat1233.option);
        // lcat1233.forEach(function(data){
        //     console.log('checking');
        //     //option1=data.option;      
        //   //console.log(option1);
        // });
        var array1=lcat1233.option.split(",")
            res.status(200).json({
                status:'Success',
                data: {
                    classes : array1
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.recorddescriptive= async (req,res) => {
    try{
        const answerdate=new Date();
        // const pat1= await Answers.findOneAndUpdate({examid: req.body.examid, regno: req.body.regno, questionid: req.body.questionid},{
        //     name: req.body.name,
        //     user: req.body.user,
        //     colid: req.body.colid,
        //     coursecode: req.body.coursecode,
        //     programcode: req.body.programcode,
        //     question: req.body.question,
        //     option: req.body.option,
        //     link: req.body.link,
        //     status: 'Not started',
        //     fullmarks: req.body.fullmarks,
        //     difficulty: req.body.difficulty,
        //     questiongroup: req.body.questiongroup,
        //     co: req.body.co,
        //     po: req.body.po,
        //     pscore: req.body.pscore,
        //     type: 'Descriptive',
        //     timeinsec: req.body.timeinsec,
        //     module: req.body.module,
        //     answerdate: answerdate
        // }, {
        //     new: true,
        //     upsert: true 
        // });
        const pat1= await Answers.create({
            examid: req.body.examid,
            regno: req.body.regno,
            questionid: req.body.questionid,
            name: req.body.name,
            user: req.body.user,
            colid: req.body.colid,
            coursecode: req.body.coursecode,
            programcode: req.body.programcode,
            question: req.body.question,
            option: req.body.option,
            link: req.body.link,
            status: 'Not started',
            fullmarks: req.body.fullmarks,
            difficulty: req.body.difficulty,
            questiongroup: req.body.questiongroup,
            co: req.body.co,
            po: req.body.po,
            pscore: req.body.pscore,
            type: 'Descriptive',
            timeinsec: req.body.timeinsec,
            module: req.body.module,
            answerdate: answerdate
        });
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.recordmcq= async (req,res) => {
    try{
        const answerdate=new Date();
        const pat1= await Answers.findOneAndUpdate({examid: req.body.examid, regno: req.body.regno, questionid: req.body.questionid},{
            name: req.body.name,
            user: req.body.user,
            colid: req.body.colid,
            coursecode: req.body.coursecode,
            programcode: req.body.programcode,
            question: req.body.question,
            option: req.body.option,
            link: req.body.link,
            pscore: req.body.pscore,
            status: 'Not started',
            fullmarks: req.body.fullmarks,
            score: req.body.score,
            difficulty: req.body.difficulty,
            questiongroup: req.body.questiongroup,
            co: req.body.co,
            po: req.body.po,
            type: 'MCQ',
            timeinsec: req.body.timeinsec,
            module: req.body.module,
            answerdate: answerdate
        }, {
            new: true,
            upsert: true 
        });
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.rgetdescriptive= async (req,res) => {
    try{
        const answerdate=new Date();
        // const pat1= await Answers.findOneAndUpdate({examid: req.query.examid, regno: req.query.regno, questionid: req.query.questionid},{
        //     name: req.query.name,
        //     user: req.query.user,
        //     colid: req.query.colid,
        //     coursecode: req.query.coursecode,
        //     programcode: req.query.programcode,
        //     question: req.query.question,
        //     option: req.query.option,
        //     link: req.query.link,
        //     status: 'Not started',
        //     fullmarks: req.query.fullmarks,
        //     difficulty: req.query.difficulty,
        //     questiongroup: req.query.questiongroup,
        //     co: req.query.co,
        //     po: req.query.po,
        //     pscore: req.query.pscore,
        //     type: 'Descriptive',
        //     timeinsec: req.query.timeinsec,
        //     module: req.query.module,
        //     answerdate: answerdate
        // }, {
        //     new: true,
        //     upsert: true 
        // });
        const pat1= await Answers.create({
            examid: req.query.examid,
            regno: req.query.regno,
            questionid: req.query.questionid,
            name: req.query.name,
            user: req.query.user,
            colid: req.query.colid,
            coursecode: req.query.coursecode,
            programcode: req.query.programcode,
            question: req.query.question,
            option: req.query.option,
            link: req.query.link,
            status: 'Not started',
            fullmarks: req.query.fullmarks,
            difficulty: req.query.difficulty,
            questiongroup: req.query.questiongroup,
            co: req.query.co,
            po: req.query.po,
            pscore: req.query.pscore,
            type: 'Descriptive',
            timeinsec: req.query.timeinsec,
            module: req.query.module,
            answerdate: answerdate
        });
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.rgetmcq= async (req,res) => {
    try{
        const answerdate=new Date();
        const pat1= await Finalanswer.findOneAndUpdate({examid: req.query.examid, regno: req.query.regno, questionid: req.query.questionid},{
            name: req.query.name,
            user: req.query.user,
            colid: req.query.colid,
            coursecode: req.query.coursecode,
            programcode: req.query.programcode,
            question: req.query.question,
            option: req.query.option,
            link: req.query.link,
            pscore: req.query.pscore,
            status: 'Not started',
            fullmarks: req.query.fullmarks,
            score: req.query.score,
            difficulty: req.query.difficulty,
            questiongroup: req.query.questiongroup,
            co: req.query.co,
            po: req.query.po,
            type: 'MCQ',
            timeinsec: req.query.timeinsec,
            module: req.query.module,
            answerdate: answerdate
        }, {
            new: true,
            upsert: true 
        });
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.recorddescriptivef= async (req,res) => {
    try{
        console.log(req.body.evaluator);
        const answerdate=new Date();
        const pat1= await Finalanswer.findOneAndUpdate({examid: req.body.examid, evaluator: req.body.evaluator, regno: req.body.regno, questionid: req.body.questionid},{
            name: req.body.name,
            user: req.body.user,
            colid: req.body.colid,
            coursecode: req.body.coursecode,
            programcode: req.body.programcode,
            question: req.body.question,
            option: req.body.option,
            link: req.body.link,
            status: 'Not started',
            fullmarks: req.body.fullmarks,
            difficulty: req.body.difficulty,
            questiongroup: req.body.questiongroup,
            co: req.body.co,
            po: req.body.po,
            pscore: req.body.pscore,
            type: 'Descriptive',
            timeinsec: req.body.timeinsec,
            score: req.body.score,
            module: req.body.module,
            answerdate: answerdate
        
        }, {
            new: true,
            upsert: true 
        });
        // const pat1= await Answers.create({
        //     examid: req.body.examid,
        //     regno: req.body.regno,
        //     questionid: req.body.questionid,
        //     name: req.body.name,
        //     user: req.body.user,
        //     colid: req.body.colid,
        //     coursecode: req.body.coursecode,
        //     programcode: req.body.programcode,
        //     question: req.body.question,
        //     option: req.body.option,
        //     link: req.body.link,
        //     status: 'Not started',
        //     fullmarks: req.body.fullmarks,
        //     difficulty: req.body.difficulty,
        //     questiongroup: req.body.questiongroup,
        //     co: req.body.co,
        //     po: req.body.po,
        //     pscore: req.body.pscore,
        //     type: 'Descriptive',
        //     timeinsec: req.body.timeinsec,
        //     module: req.body.module,
        //     answerdate: answerdate
        // });
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getanswerq= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Answers.aggregate([
                { 
                    $match: {colid: colid1, examid: req.query.examid, regno: req.query.regno }
                },
                { 
                    $group: {
                        _id:['$regno','$name', '$question', '$option','$fullmarks','$score','$co','$po'], 
                        total_attendance: {$max: '$answerdate'}
                    }
                }
            ]);
            
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
           
                     
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
        
        const user1=req.query.user;
        const name=req.query.name;
        const colid=req.query.colid;
        const regno=req.query.regno;
        const semester=req.query.semester;
        const section=req.query.section;
        //const classid=req.query.id;
        const classid=req.params.id;
        //console.log(req.params.id); 
        //console.log("Starting");
        var link;
        var coursecode;
        var classdate;
        var course;   
        var cstatus=1;  
        if(user1) {
            //const lcat1233= await Pat.findById(req.params.id);
            const lcat1233= await Class.find()
            .where('colid')
            .equals(colid)
            .where('_id')
            .equals(classid);
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
                const pat1= await Attend.findOneAndUpdate({classid: classid, regno: regno},{
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
                res.status(200).json({
                    status:'Success'
                }); 

            } else {
                res.status(200).json({
                    status:'Class locked. Attendance will not be recorded.'      
                }); 

            }
        } else {
            res.status(200).json({
                status:'Error',
         
            }); 

        }               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getviewaddonc= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
         
        const lcat1233= await Addonc.find()
            .where('status')
            .equals(1)
            .where('coursetype')
            .equals(req.query.coursetype)
            .where('category')
            .equals(req.query.category);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            });             
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getviewvacclass= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const lcat1233= await Vacclass.find()
            .where('coursecode')
            .equals(req.query.id);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            });              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getvacattend= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        
        const user1=req.query.user;
        const name=req.query.name;
        const colid=req.query.colid;
        const regno=req.query.regno;
        const semester=req.query.semester;
        const section=req.query.section;
        //const classid=req.query.id;
        const classid=req.params.id;
        //console.log(req.params.id); 
        //console.log("Starting");
        var link;
        var coursecode;
        var classdate;
        var course;   
        var cstatus=1;  
        if(user1) {
            //const lcat1233= await Pat.findById(req.params.id);
            const lcat1233= await Vacclass.find()
            .where('_id')
            .equals(classid);
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
                const pat1= await Vacattendance.findOneAndUpdate({classid: classid, regno: regno},{
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
                res.status(200).json({
                    status:'Success'
                }); 

            } else {
                res.status(200).json({
                    status:'Class locked. Attendance will not be recorded.'      
                }); 

            }
        } else {
            res.status(200).json({
                status:'Error',
         
            }); 

        }               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.postlogincol= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await User.updateOne( {email: user1} ,{
            colid: req.body.colid,
            email: user1
        });
        res.cookie("colid",req.body.colid);
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Institution Code has been Updated Successfully");
       res.redirect('/dashboard');
    } catch(err) {
        req.flash("error", "Institution Code is required and must be a number" + err );
  
    res.redirect('/logincol');

    }   
};

exports.postlogincol1= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await User.updateOne( {email: user1} ,{
            colid: req.body.colid,
            semester: req.body.semester,
            password: req.body.password,
            section: req.body.section,
            regno: req.body.regno,
            role: req.body.role,
            programcode: req.body.programcode,
            admissionyear: req.body.admissionyear,
            email: user1
        });
        res.cookie("colid",req.body.colid);
        res.cookie("regno",req.body.regno);
        res.cookie("semester",req.body.semester);
        res.cookie("section",req.body.section);
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       if (req.body.role=="Student") {
        req.flash("success", "Institution Code has been Updated Successfully");
        res.redirect('/viewclassstud');

       } else {
        req.flash("success", "Institution Code has been Updated Successfully");
        res.redirect('/dashboard');

       }
       
    } catch(err) {
        req.flash("error", "Institution Code is required and must be a number" + err );
  
    res.redirect('/logincol');

    }   
};

exports.postlogincol2= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const colid1=req.body.colid.split("-");
        const colid=parseInt(colid1[0]);
        //console.log("colid " + colid);
        var sum1=0;
        var n1=0;
        var sum21=0;
        var sum22=0;
        var sum2=0;
        var n2=0;
        for (var i = 0; i < colid1[0].length; i++) {
            n1= Number(colid1[0].charAt(i));
            var n21=i+6 +1;
            if (n21 % 2 == 0) {
                sum1=sum1 + n1 + n1;
            } else {
                sum1=sum1 + n1 * n1;
            }
            
        }
        for (var i = 0; i < colid1[0].length; i++) {
            n2= Number(colid1[0].charAt(i));
            var n22=i+6+1;
            if (n22 % 2 == 0) {
                sum22=sum22 + n2;
            } else {
                sum21=sum21 + n2;
            }
            sum2=sum21*sum21 + sum22*sum22;
            
        }
        //console.log("sum1 " + sum1);
        //console.log("sum2 " + sum2);
        if (parseInt(colid1[1])==sum1 && parseInt(colid1[2])==sum2) {
            const lcat1= await User.updateOne( {email: user1} ,{
                colid: colid,
                semester: req.body.semester,
                password: req.body.password,
                section: req.body.section,
                regno: req.body.regno,
                role: req.body.role,
                programcode: req.body.programcode,
                admissionyear: req.body.admissionyear,
                email: user1
            });
            res.cookie("colid",colid);
            res.cookie("regno",req.body.regno);
            res.cookie("semester",req.body.semester);
            res.cookie("section",req.body.section);
           //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
           if (req.body.role=="Student") {
            req.flash("success", "Institution Code has been Updated Successfully");
            res.redirect('/viewclassstud');
    
           } else {
            req.flash("success", "Institution Code has been Updated Successfully");
            res.redirect('/dashboard');
    
           }
           

        } else {
            req.flash("error", "Invalid Institution Code." );
            res.redirect('/logincol');

        }

        
    } catch(err) {
        req.flash("error", "Institution Code is required and must be a number" + err );
  
    res.redirect('/logincol');

    }   
};


// exports.getallcat2= async (req,res) => {
//     res.cookie("user","Akshata");
  
//     try{
//         const lcat123= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//         res.status(200).render('viewcategory', {
//             categories: lcat123,
//             title: 'List Categories'
            
//         });
       
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

// exports.getallcat= async (req,res) => {

//     try{
//         const lcat12= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//        res.status(201).json({
//            status:'Success',
//            data: {
//                lcat12
//            }
//        });
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }   
// };

exports.getcat1= async (req,res) => {

    try{
        const lcat23= await Lcat.findById(req.body.id);
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               lcat23
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};


exports.getenrollstud= async (req,res) => {
    //res.cookie("user","Akshata");
    try{
        const newdate= new Date();
        const pat1= await Vacenroll.findOneAndUpdate({coursecode: req.query.coursecode, regno: req.query.regno, colid: req.query.colid, studentemail: req.query.email},{
            course: req.query.course,
            student: req.query.student,
            regdate: newdate,
            program: req.query.program,
            status: 0,
            academicyear: '2020-21',
            name: req.query.name,
            user: req.query.user
        }, {
            new: true,
            upsert: true 
        });    
        res.status(201).json({
            status:'Success'
        });          
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getvacenroll= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const lcat1233= await Vacenroll.find()
            .where('coursecode')
            .equals(req.query.coursecode)
            .where('regno')
            .equals(req.query.regno)
            .where('colid')
            .equals(req.query.colid);
            Vacenroll.findOne({ coursecode: req.query.coursecode, regno: req.query.regno, studentemail: req.query.email, colid: req.query.colid, status: 1 }, (err, role) => {
                if (err) {
                    res.status(201).json({
                        status:'Error'
                    });
                }
                if(role) {
                    
                    res.status(200).json({
                        status:'Success',
                    });
                } else {
                    res.status(201).json({
                        status:'Invalid',
                    });
                }
              });
            
                         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getvacclasstoday= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(today.getHours() - today.getHours());
        today.setMinutes(today.getMinutes() - today.getMinutes());
        tomorrow.setHours(tomorrow.getHours() - tomorrow.getHours() + 24);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);    
        //console.log(today + '-' + tomorrow);
        const lcat1233= await Vacclass.find()
        .where('classdate')
        .gte(today)
        .where('classdate')
        .lte(tomorrow);
        res.status(200).json({
            status:'Success',
            data: {
                classes : lcat1233
            }
     
        });           
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getviewclub= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        
        const colid=req.query.colid;
        const lcat1233= await Club.find()
            .where('colid')
            .equals(colid);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
         
            }); 
                      
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getcirculars= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        
        const colid=req.query.colid;
        const lcat1233= await Circular.find()
            .where('colid')
            .equals(colid)
            .where('status1')
            .equals('Active');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
         
            }); 
                      
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getassignmentlist= async (req,res) => {
    //res.cookie("user","Akshata");
    try{
        const user1=req.query.user;
        const lcat1233= await Assignment.find()
            .where('user')
            .equals(user1)
            .where('coursecode')
            .equals(req.query.coursecode);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getanswerstatus= async (req,res) => {
    try{

        const lcat1233= await Answers.distinct('option')
            .where('examid')
            .equals(req.query.examid)
            .where('colid')
            .equals(req.query.colid)
            .where('regno')
            .equals(req.query.regno)
            .where('questionid')
            .equals(req.query.questionid);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.deleteanswer= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        await Answers.findByIdAndDelete(req.query.answerid);
        
        res.status(200).json({
            status:'Success'
        }); 
    } catch(err) {
        res.status(200).json({
            status:'Error ' + err
        }); 
    }   
};

exports.submitassignment= async (req,res) => {
    try{
        const answerdate=new Date();
        
        const pat1= await Assignsubmit.create({
            assignmentid: req.query.assignmentid,
            regno: req.query.regno,
            name: req.query.name,
            user: req.query.user,
            colid: req.query.colid,
            coursecode: req.query.coursecode,
            assignment: req.query.assignment,
            link: req.query.link,
            classdate: answerdate,
            comments: ''
        });
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.clubenrol= async (req,res) => {
    try{
        const answerdate=new Date();
        
        const pat1= await Clubenr.findOneAndUpdate({clubcode: req.query.clubcode, regno: req.query.regno, colid: req.query.colid, user: req.query.user},{
            club: req.query.club,
            program: req.query.program,
            status: 1,
            academicyear: '2021-22',
            name: req.query.name
        }, {
            new: true,
            upsert: true 
        }); 
        res.status(200).json({
            status:'Success'
        }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getassigncomments= async (req,res) => {
    try{

        const lcat1233= await Assignsubmit.find()
            .where('assignmentid')
            .equals(req.query.assignmentid)
            .where('colid')
            .equals(req.query.colid)
            .where('regno')
            .equals(req.query.regno);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }
            }); 
               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};