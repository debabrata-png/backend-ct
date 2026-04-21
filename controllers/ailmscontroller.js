const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Kpi=require('./../Models/kpi');
const Demandratio=require('./../Models/admission');
const Reservedcat=require('./../Models/reservecat');
const Fulltimeteacher=require('./../Models/teacherdata');
const Passpercentage=require('./../Models/passexam');
const Examdays=require('./../Models/result');
const Facultyaward=require('./../Models/teacheraward');
const Examautomation=require('./../Models/examautomation');
const Mentor=require('./../Models/mentees');
const Extensionawards=require('./../Models/extawards');
const Extension=require('./../Models/extact');
const Extensionstudents=require('./../Models/extact');
const Collaboration=require('./../Models/collab');
const MOU=require('./../Models/mou');
const Econtent=require('./../Models/econtent');
const Seedmoney=require('./../Models/seedm');
const Teacherfellow=require('./../Models/teacherfellow');
const Researchfellow=require('./../Models/researchfellow');
const Incubation=require('./../Models/incubation');
const IPR=require('./../Models/event');
const Researchawards=require('./../Models/innovation');
const Awards=require('./../Models/teacheraward');
const Consultancy=require('./../Models/consultancy');
const Librarybooks=require('./../Models/library');
const Libraryexp=require('./../Models/library');
const ICT=require('./../Models/ict');
const Econtentresource=require('./../Models/econtent');
const Expenditure=require('./../Models/expenditure');
const Infrastructure=require('./../Models/expenditure');
const Scholarship=require('./../Models/studschsp');
const Careercounsel=require('./../Models/careercounsel');
const Skilldevelopment=require('./../Models/skilldev');
const Higherexam=require('./../Models/higherexam');
const Placement=require('./../Models/placement');
const Highereducation=require('./../Models/higheredu');
const Studentawards=require('./../Models/awards');
const Sportscultural=require('./../Models/event');
const Alumnicontribution=require('./../Models/alumnicon');
const Egovernance=require('./../Models/egovern');
const Teachersupport=require('./../Models/teacherfs');
const Training=require('./../Models/event');
const TFDP=require('./../Models/event');
const FDP=require('./../Models/event');
const GFunds=require('./../Models/funds');
const NGFunds=require('./../Models/funds');
const Qualityinit=require('./../Models/quality');
const Supportingdoc=require('./../Models/supportingdoc');
const Taskassign=require('./../Models/taskassign');
const Project = require('./../Models/projects');
const Patent = require('./../Models/patents');
//const Consultancy=require('./../Models/consultancy');
const Explearning=require('./../Models/explearning');
const Explearnproj=require('./../Models/explearnproj');
const Employability=require('./../Models/employability');
const Accrcomments=require('./../Models/accrcomments');
const Syllabusrev=require('./../Models/syllabusrev');
const Seminar=require('./../Models/seminar');
const Projects=require('./../Models/projects');
const Publication=require('./../Models/publications');
const Patents=require('./../Models/patents');
const Fieldproj=require('./../Models/fieldproj');

const CBCS=require('./../Models/cbcs');
const BOS=require('./../Models/bos');
const Event=require('./../Models/event');
const Admission=require('./../Models/admission');
const Reservecat=require('./../Models/reservecat');
const Teacherdata=require('./../Models/teacherdata');
const Passexam=require('./../Models/passexam');
const Extact=require('./../Models/extact');
const Collab=require('./../Models/collab');
const Mou=require('./../Models/mou');
const Ict=require('./../Models/ict');
const Library=require('./../Models/library');
const Funds=require('./../Models/funds');
const Quality=require('./../Models/quality');
const Skilldev=require('./../Models/skilldev');
const Higheredu=require('./../Models/higheredu');
const Teacherfs=require('./../Models/teacherfs');
const Egovern=require('./../Models/egovern');

const Book=require('./../Models/book');
const Teacherawards = require('./../Models/teacheraward');
const Innovation = require('./../Models/innovation');
const MoU = require('./../Models/mou');
const AddOnCourse = require('../Models/addonc');
const Phdguide=require('./../Models/phdguide');
const Justawards=require('./../Models/awards');
const Sportsact=require('./../Models/sportsact');
const Fdpcol=require('./../Models/fdp');
const hnewprog=require('./../Models/hnewprog');
const ntimesheet=require('./../Models/ntimesheet');
const nsop=require('./../Models/nsop');
const nacademic=require('./../Models/nacademic');
const nworkbook=require('./../Models/nworkbook');
const nenrollment=require('./../Models/nenrollment');
const ncourseplan=require('./../Models/ncourseplan');
const ninter=require('./../Models/ninter');
const nclinicskills=require('./../Models/nclinicskills');
const nhlearner=require('./../Models/nhlearner');
const notherstud=require('./../Models/notherstud');
const nreval=require('./../Models/nreval');
const nfacilities=require('./../Models/nfacilities');
const ndepfunding=require('./../Models/ndepfunding');
const nprogcourse=require('./../Models/nprogcourse');
const nnvacstud=require('./../Models/nnvacstud');
const nnursinginter=require('./../Models/nnursinginter');
const nnexp=require('./../Models/nnexp');
const nnexam=require('./../Models/nnexam');
const nnratio=require('./../Models/nnratio');
const nnmentor=require('./../Models/nnmentor');

const necourse=require('./../Models/necourse');
const nnextension=require('./../Models/nnextension');
const nncollab=require('./../Models/nncollab');
const nnmou=require('./../Models/nnmou');
const nnpatients=require('./../Models/nnpatients');
const nnexposure=require('./../Models/nnexposure');


const nclient=require('./../Models/nclient');
const nmilestone=require('./../Models/nmilestone');
const ninvoice=require('./../Models/ninvoice');
const ngstgain=require('./../Models/ngstgain');
const nvendor=require('./../Models/nvendor');
const nvworkorder=require('./../Models/nvworkorder');
const nvinvoice=require('./../Models/nvinvoice');
const ntrialbalance=require('./../Models/ntrialbalance');

const nbudget=require('./../Models/nbudget');
const nledger=require('./../Models/nledger');
const naccounts=require('./../Models/naccounts');

const nseedmoney=require('./../Models/nseedmoney');
const nbudgetreq=require('./../Models/nbudgetreq');
const noodreq=require('./../Models/noodreq');
const neventreq=require('./../Models/neventreq');
const nassistantreq=require('./../Models/nassistantreq');
const nhousingreq=require('./../Models/nhousingreq');
const ntravelsupport=require('./../Models/ntravelsupport');

const ncompanies=require('./../Models/ncompanies');
const njobs=require('./../Models/njobs');
const njobstudents=require('./../Models/njobstudents');
const nhighereducation=require('./../Models/nhighereducation');

const noffcampus=require('./../Models/noffcampus');
const njobsapply=require('./../Models/njobsapply');
const nhigheredurep=require('./../Models/nhigheredurep');
const noffawards=require('./../Models/noffawards');
const noffscholarship=require('./../Models/noffscholarship');
const noffextension=require('./../Models/noffextension');
const noffcourses=require('./../Models/noffcourses');

const ncommittees=require('./../Models/ncommittees');
const ncommembers=require('./../Models/ncommembers');
const ncomminutes=require('./../Models/ncomminutes');
const ncomtasks=require('./../Models/ncomtasks');

const workload=require('./../Models/workload');
const lessonplan=require('./../Models/lessonplan');

const Class=require('./../Models/class');
const coursefiles=require('./../Models/coursefiles');

const co=require('./../Models/co');
const lannouncement=require('./../Models/lannouncement');
const lsyllabus=require('./../Models/lsyllabus');
const lcalendar=require('./../Models/lcalendar');

const user=require('./../Models/user');

const currenyear=require('./../Models/currenyear');
const studparents=require('./../Models/studparents');

const projectledger=require('./../Models/projectledger');
const projectcentral=require('./../Models/projectcentral');
const maintenance=require('./../Models/maintenance');
const otherincome=require('./../Models/otherincome');

const feedback=require('./../Models/feedback');

const naccountheads=require('./../Models/naccountheads');
const ntransactions=require('./../Models/ntransactions');
const ntledger=require('./../Models/ntledger');


const nnursing812=require('./../Models/nnursing812');
const nnursing814=require('./../Models/nnursing814');
const nnursing815=require('./../Models/nnursing815');
const nnursing818=require('./../Models/nnursing818');
const nnursing424=require('./../Models/nnursing424');
const ncompetitive=require('./../Models/ncompetitive');
const nnursing515=require('./../Models/nnursing515');







exports.getworkloadbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await workload.find()
        .where('user')
        .equals(user1);
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


exports.getworkloadbyfacyr= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const year=req.query.year;
        const colid=req.query.colid;
        const lcat1233= await workload.find()
        .where('user')
        .equals(user1)
        .where('year')
        .equals(year);
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

exports.getworkloadbyfaca= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const year=req.query.year;
        const colid=req.query.colid;
        const lcat1233= await workload.find()
        .where('user')
        .equals(user1)
        .where('status1')
        .equals('Accepted')
        .where('year')
        .equals(year);
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




exports.workloaddocs= async (req,res) => {
  try{
      
      const lcat1233= await workload
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.workloadlinks= async (req,res) => {
  try{
      
      const lcat1233= await workload
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createworkloadbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await workload.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursecode:req.query.coursecode,
semester:req.query.semester,
section:req.query.section,
course:req.query.course,
program:req.query.program,
type:req.query.type,
module:req.query.module,
hours:req.query.hours,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updateworkloadbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await workload.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursecode:req.query.coursecode,
semester:req.query.semester,
section:req.query.section,
course:req.query.course,
program:req.query.program,
type:req.query.type,
module:req.query.module,
hours:req.query.hours,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
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


exports.updateworkloadcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await workload.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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


exports.updateworkloadcommentsfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const colid1=parseInt(req.query.colid);


        // const lcat1= await workload.findByIdAndUpdate( req.query.id,{
        //     status1: req.query.status1,
        //     comments: req.query.comments
           
        // });

        const lcat1=await workload.updateMany( {user: req.query.user, year: req.query.year, colid: colid1},{
            status1: req.query.status1,
            comments: req.query.comments
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

exports.deleteworkloadbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await workload.findByIdAndDelete(req.query.id);
        
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


exports.deleteworkloadbycoursefac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        //await workload.findByIdAndDelete(req.query.id);

        await workload.deleteMany({ colid: parseInt(req.query.colid), user: req.query.user, coursecode: req.query.coursecode });
        res.status(200).json({
            status:'Success',
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


exports.deleteworkloadbyprogramcode= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        //await workload.findByIdAndDelete(req.query.id);

        await workload.deleteMany({ colid: parseInt(req.query.colid), programcode: req.query.programcode });
        res.status(200).json({
            status:'Success',
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

exports.getlessonplanbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await lessonplan.find()
        .where('user')
        .equals(user1);
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


exports.getlessonplanbyfacd= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const dt1=new Date(req.query.dt1);
        const dt2=new Date(req.query.dt2);
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await lessonplan.find()
        .where('user')
        .equals(user1)
        .where('actualdate')
        .gte(dt1)
        .where('actualdate')
        .lte(dt2);
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


exports.lessonplandocs= async (req,res) => {
  try{
      
      const lcat1233= await lessonplan
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.lessonplanlinks= async (req,res) => {
  try{
      
      const lcat1233= await lessonplan
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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





exports.updatelessonplancomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lessonplan.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletelessonplanbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await lessonplan.findByIdAndDelete(req.query.id);
        
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



exports.getClassbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await Class.find()
        .where('user')
        .equals(user1);
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



exports.Classdocs= async (req,res) => {
  try{
      
      const lcat1233= await Class
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.Classlinks= async (req,res) => {
  try{
      
      const lcat1233= await Class
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createClassbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const newdate=new Date(req.query.classdate + ' ' + req.query.classtime);

        const pub1= await Class.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
semester:req.query.semester,
section:req.query.section,
classdate:newdate,
classtime:req.query.classtime,
link:req.query.link,
topic:req.query.topic,
module:req.query.module,
enrollreq:req.query.enrollreq,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.createClassbyfacweeks= async (req,res) => {

    try{
        const token=req.query.token;
        const weeks=parseInt(req.query.weeks) + 1;
        //const newdate=new Date(req.query.classdate + ' ' + req.query.classtime);
            //var dt1=new Date(newdate);
        var dt1=new Date(req.query.classdate);
        var ar=req.query.classtime.split(":");
        dt1.setHours(dt1.getHours() - dt1.getHours() + 24 + parseInt(ar[0]));
        dt1.setMinutes(dt1.getMinutes() - dt1.getMinutes() + parseInt(ar[1]));
        dt1.setDate(dt1.getDate() -1);
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        for (i = 0; i < weeks; i++) { 

            const pub1= await Class.create({
                name: req.query.name,
                colid: req.query.colid,
                user: req.query.user,
                year:req.query.year,
    program:req.query.program,
    programcode:req.query.programcode,
    course:req.query.course,
    coursecode:req.query.coursecode,
    semester:req.query.semester,
    section:req.query.section,
    classdate:dt1,
    classtime:req.query.classtime,
    link:req.query.link,
    topic:req.query.topic,
    module:req.query.module,
    enrollreq:req.query.enrollreq,
    status:req.query.status,
    status1: 'Submitted',
                comments: 'NA'
            });

            dt1.setDate(dt1.getDate() + 7);

        }

        

    //res.status(200).send('Hello world for all the tours through db new router');
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

exports.updateClassbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await Class.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
semester:req.query.semester,
section:req.query.section,
classdate:req.query.classdate,
classtime:req.query.classtime,
link:req.query.link,
topic:req.query.topic,
module:req.query.module,
enrollreq:req.query.enrollreq,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
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


exports.updateClasscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Class.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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


exports.updateClassdate= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Class.findByIdAndUpdate( req.query.id,{
            classdate: new Date(req.query.classdate),
            classtime: req.query.classtime
           
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


exports.deleteClassbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await Class.findByIdAndDelete(req.query.id);
        
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

exports.getClassbyfacd= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        var dt1=new Date();
        var dt2=new Date();
        dt2.setDate(dt2.getDate() + 7);
        dt1.setDate(dt1.getDate() -1);
        const lcat1233= await Class.find()
        .where('user')
        .equals(user1)
        .where('classdate')
        .gte(dt1)
        .where('classdate')
        .lte(dt2);
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


exports.getClassbyprogd= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const programcode=req.query.programcode;
        const semester=req.query.semester;
        const section=req.query.section;
        const year=req.query.year;
        var dt1=new Date();
        var dt2=new Date();
        dt2.setDate(dt2.getDate() + 7);
        dt1.setDate(dt1.getDate() -1);
        const lcat1233= await Class.find()
        .where('programcode')
        .equals(programcode)
        .where('semester')
        .equals(semester)
        .where('section')
        .equals(section)
        .where('year')
        .equals(year)
        .where('classdate')
        .gte(dt1)
        .where('classdate')
        .lte(dt2);
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


exports.getcoursefilesbyfacc= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid=req.query.colid;
        const lcat1233= await coursefiles.find()
        .where('user')
        .equals(user1)
        .where('coursecode')
        .equals(coursecode);
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

exports.getcoursefilesbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid=req.query.colid;
        const lcat1233= await coursefiles.find()
        .where('user')
        .equals(user1);
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



exports.coursefilesdocs= async (req,res) => {
  try{
      
      const lcat1233= await coursefiles
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.coursefileslinks= async (req,res) => {
  try{
      
      const lcat1233= await coursefiles
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createcoursefilesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await coursefiles.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursecode:req.query.coursecode,
filename:req.query.filename,
link:req.query.link,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatecoursefilesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await coursefiles.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursecode:req.query.coursecode,
filename:req.query.filename,
link:req.query.link,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatecoursefilescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await coursefiles.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletecoursefilesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await coursefiles.findByIdAndDelete(req.query.id);
        
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

exports.getcobyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid=req.query.colid;
        const lcat1233= await co.find()
        .where('user')
        .equals(user1)
        .where('coursecode')
        .equals(coursecode);
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



exports.codocs= async (req,res) => {
  try{
      
      const lcat1233= await co
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.colinks= async (req,res) => {
  try{
      
      const lcat1233= await co
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createcobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await co.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursecode:req.query.coursecode,
coursename:req.query.coursename,
co:req.query.co,
cocode:req.query.cocode,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatecobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await co.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursecode:req.query.coursecode,
coursename:req.query.coursename,
co:req.query.co,
cocode:req.query.cocode,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatecocomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await co.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletecobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await co.findByIdAndDelete(req.query.id);
        
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

exports.getlannouncementbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid=req.query.colid;
        const lcat1233= await lannouncement.find()
        .where('user')
        .equals(user1)
        .where('coursecode')
        .equals(coursecode);
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



exports.lannouncementdocs= async (req,res) => {
  try{
      
      const lcat1233= await lannouncement
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.lannouncementlinks= async (req,res) => {
  try{
      
      const lcat1233= await lannouncement
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createlannouncementbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lannouncement.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursecode:req.query.coursecode,
coursename:req.query.coursename,
announcement:req.query.announcement,
dateposted:new Date(req.query.dateposted),
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatelannouncementbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lannouncement.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursecode:req.query.coursecode,
coursename:req.query.coursename,
announcement:req.query.announcement,
dateposted:new Date(req.query.dateposted),
status1: 'Submitted',
            comments: 'NA'
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


exports.updatelannouncementcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lannouncement.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletelannouncementbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await lannouncement.findByIdAndDelete(req.query.id);
        
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

exports.getlsyllabusbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid=req.query.colid;
        const lcat1233= await lsyllabus.find()
        .where('user')
        .equals(user1)
        .where('coursecode')
        .equals(coursecode);
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



exports.lsyllabusdocs= async (req,res) => {
  try{
      
      const lcat1233= await lsyllabus
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.lsyllabuslinks= async (req,res) => {
  try{
      
      const lcat1233= await lsyllabus
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createlsyllabusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lsyllabus.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department:req.query.department,
year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
module:req.query.module,
description:req.query.description,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatelsyllabusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lsyllabus.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department:req.query.department,
year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
module:req.query.module,
description:req.query.description,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatelsyllabuscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lsyllabus.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletelsyllabusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await lsyllabus.findByIdAndDelete(req.query.id);
        
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

exports.getlcalendarbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid=req.query.colid;
        const lcat1233= await lcalendar.find()
        .where('user')
        .equals(user1)
        .where('coursecode')
        .equals(coursecode);
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



exports.lcalendardocs= async (req,res) => {
  try{
      
      const lcat1233= await lcalendar
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.lcalendarlinks= async (req,res) => {
  try{
      
      const lcat1233= await lcalendar
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createlcalendarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lcalendar.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department:req.query.department,
coursecode:req.query.coursecode,
course:req.query.course,
year:req.query.year,
activity:req.query.activity,
description:req.query.description,
planneddate:new Date(req.query.planneddate),
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatelcalendarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lcalendar.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department:req.query.department,
coursecode:req.query.coursecode,
course:req.query.course,
year:req.query.year,
activity:req.query.activity,
description:req.query.description,
planneddate:new Date(req.query.planneddate),
status1: 'Submitted',
            comments: 'NA'
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


exports.updatelcalendarcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lcalendar.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletelcalendarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await lcalendar.findByIdAndDelete(req.query.id);
        
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

exports.getuserbyrole= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const role=req.query.role;
        const colid=parseInt(req.query.colid);
        const lcat1233= await user.find()
        .where('role')
        .equals(role)
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


exports.getuserbydep= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const dep=req.query.dep;
        const colid=parseInt(req.query.colid);
        const lcat1233= await user.find()
        .where('department')
        .equals(dep)
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

exports.getuserdetails= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        // try {
        //     const verified = jwt.verify(
        //         token,
        //         process.env.JWT_SECRET,
        //         (err123, verified) => {
        //           if (err123) {
        //             return res.status(401).json({
        //                 status: 'Unauthorized',
        //                 error: err123
        //             });
        //           }
        //           jwtuser=verified.user;
        //           jwtcolid=verified.colid;
        //           return verified;
        //         }
        //       );
        // } catch(err1234) {
        //     //console.log(err1234);
        // }
        const user1=req.query.user;
        const colid=parseInt(req.query.colid);
        const lcat1233= await user.find()
        .where('email')
        .equals(user1);
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    // res.status(400).json({
    //     status:'Failed',
    //     message: err
    // });
    console.log(err);

}  
};



exports.userdocs= async (req,res) => {
  try{
      
      const lcat1233= await user
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.userlinks= async (req,res) => {
  try{
      
      const lcat1233= await user
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createstudents= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await user.create({
            addedby: req.query.addedby,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
email:req.query.email,
phone:req.query.phone,
password:req.query.password,
role:req.query.role,
programcode:req.query.programcode,
regno:req.query.regno,
admissionyear:req.query.admissionyear,
gender:req.query.gender,
semester:req.query.semester,
section:req.query.section,
department:req.query.department,
category:req.query.category,
address:req.query.address,
quota:req.query.quota,
status:1,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.createothers= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await user.create({
            addedby: req.query.addedby,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
email:req.query.email,
phone:req.query.phone,
password:req.query.password,
role:req.query.role,
programcode:req.query.programcode,
regno:req.query.regno,
admissionyear:req.query.admissionyear,
gender:req.query.gender,
semester:'NA',
section:'NA',
department:req.query.department,
category:req.query.category,
address:req.query.address,
quota:req.query.quota,
status:1,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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

exports.updatestudents= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await user.findByIdAndUpdate( req.query.id,{
            
            addedby: req.query.addedby,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
email:req.query.email,
phone:req.query.phone,
password:req.query.password,
role:req.query.role,
programcode:req.query.programcode,
regno:req.query.regno,
admissionyear:req.query.admissionyear,
gender:req.query.gender,
semester:req.query.semester,
section:req.query.section,
department:req.query.department,
category:req.query.category,
address:req.query.address,
quota:req.query.quota,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
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

exports.updateothers= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await user.findByIdAndUpdate( req.query.id,{
            
            addedby: req.query.addedby,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
email:req.query.email,
phone:req.query.phone,
password:req.query.password,
role:req.query.role,
programcode:req.query.programcode,
regno:req.query.regno,
admissionyear:req.query.admissionyear,
gender:req.query.gender,
semester:'NA',
section:'NA',
department:req.query.department,
category:req.query.category,
address:req.query.address,
quota:req.query.quota,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
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

exports.updateuserphoto= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        // const lcat1= await user.findByIdAndUpdate( req.query.id,{
        //     status1: req.query.status1,
        //     comments: req.query.comments
           
        // });

        const lcat1=await user.updateMany( {email: req.query.user},{
            photo: req.query.photo
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



exports.updateusercomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await user.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deleteuserbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await user.findByIdAndDelete(req.query.id);
        
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


exports.getcurrenyearbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await currenyear.find()
        .where('user')
        .equals(user1);
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


exports.getcurrentyearbyprg= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=parseInt(req.query.colid);
        const programcode=req.query.programcode;
        const semester=req.query.semester;
        const section=req.query.section;
        const lcat1233= await currenyear.find()
        .where('colid')
        .equals(colid)
        .where('programcode')
        .equals(programcode)
        .where('semester')
        .equals(semester)
        .where('section')
        .equals(section);
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

exports.currenyeardocs= async (req,res) => {
  try{
      
      const lcat1233= await currenyear
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.currenyearlinks= async (req,res) => {
  try{
      
      const lcat1233= await currenyear
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createcurrenyearbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await currenyear.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            program:req.query.program,
programcode:req.query.programcode,
semester:req.query.semester,
section:req.query.section,
year:req.query.year,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatecurrenyearbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await currenyear.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            program:req.query.program,
programcode:req.query.programcode,
semester:req.query.semester,
section:req.query.section,
year:req.query.year,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatecurrenyearcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await currenyear.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletecurrenyearbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await currenyear.findByIdAndDelete(req.query.id);
        
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

exports.getstudparentsbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await studparents.find()
        .where('user')
        .equals(user1);
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


exports.getparentphone= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const regno=req.query.regno;
        const colid=parseInt(req.query.colid);
        const lcat1233= await studparents.find()
        .where('regno')
        .equals(regno)
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


exports.studparentsdocs= async (req,res) => {
  try{
      
      const lcat1233= await studparents
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.studparentslinks= async (req,res) => {
  try{
      
      const lcat1233= await studparents
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createstudparentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await studparents.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            student:req.query.student,
regno:req.query.regno,
parent:req.query.parent,
email:req.query.email,
phone:req.query.phone,
username:req.query.username,
password:req.query.password,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatestudparentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await studparents.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            student:req.query.student,
regno:req.query.regno,
parent:req.query.parent,
email:req.query.email,
phone:req.query.phone,
username:req.query.username,
password:req.query.password,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatestudparentscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await studparents.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletestudparentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await studparents.findByIdAndDelete(req.query.id);
        
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


exports.deleteclassbyfacyr= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        //await workload.findByIdAndDelete(req.query.id);

        await Class.deleteMany({ colid: parseInt(req.query.colid), user: req.query.user, year: req.query.year });
        res.status(200).json({
            status:'Success',
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


exports.getprojectledgerbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await projectledger.find()
        .where('user')
        .equals(user1);
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



exports.projectledgerdocs= async (req,res) => {
  try{
      
      const lcat1233= await projectledger
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.projectledgerlinks= async (req,res) => {
  try{
      
      const lcat1233= await projectledger
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createprojectledgerbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await projectledger.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
department:req.query.department,
project:req.query.project,
faculty:req.query.faculty,
fundingagency:req.query.fundingagency,
transaction:req.query.transaction,
account:req.query.account,
amountreceived:req.query.amountreceived,
amountspent:req.query.amountspent,
transactiondate:req.query.transactiondate,
category:req.query.category,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updateprojectledgerbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await projectledger.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
department:req.query.department,
project:req.query.project,
faculty:req.query.faculty,
fundingagency:req.query.fundingagency,
transaction:req.query.transaction,
account:req.query.account,
amountreceived:req.query.amountreceived,
amountspent:req.query.amountspent,
transactiondate:req.query.transactiondate,
category:req.query.category,
status1: 'Submitted',
            comments: 'NA'
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


exports.updateprojectledgercomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await projectledger.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deleteprojectledgerbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await projectledger.findByIdAndDelete(req.query.id);
        
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

exports.getprojectcentralbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await projectcentral.find()
        .where('user')
        .equals(user1);
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



exports.projectcentraldocs= async (req,res) => {
  try{
      
      const lcat1233= await projectcentral
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.projectcentrallinks= async (req,res) => {
  try{
      
      const lcat1233= await projectcentral
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createprojectcentralbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await projectcentral.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
department:req.query.department,
project:req.query.project,
faculty:req.query.faculty,
fundingagency:req.query.fundingagency,
transaction:req.query.transaction,
account:req.query.account,
amountreceived:req.query.amountreceived,
amountspent:req.query.amountspent,
transactiondate:req.query.transactiondate,
category:req.query.category,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updateprojectcentralbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await projectcentral.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
department:req.query.department,
project:req.query.project,
faculty:req.query.faculty,
fundingagency:req.query.fundingagency,
transaction:req.query.transaction,
account:req.query.account,
amountreceived:req.query.amountreceived,
amountspent:req.query.amountspent,
transactiondate:req.query.transactiondate,
category:req.query.category,
status1: 'Submitted',
            comments: 'NA'
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


exports.updateprojectcentralcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await projectcentral.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deleteprojectcentralbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await projectcentral.findByIdAndDelete(req.query.id);
        
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

exports.getmaintenancebyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await maintenance.find()
        .where('user')
        .equals(user1);
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



exports.maintenancedocs= async (req,res) => {
  try{
      
      const lcat1233= await maintenance
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.maintenancelinks= async (req,res) => {
  try{
      
      const lcat1233= await maintenance
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createmaintenancebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await maintenance.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
account:req.query.account,
transaction:req.query.transaction,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
type:req.query.type,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatemaintenancebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await maintenance.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
account:req.query.account,
transaction:req.query.transaction,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
type:req.query.type,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatemaintenancecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await maintenance.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletemaintenancebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await maintenance.findByIdAndDelete(req.query.id);
        
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

exports.getotherincomebyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await otherincome.find()
        .where('user')
        .equals(user1);
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



exports.otherincomedocs= async (req,res) => {
  try{
      
      const lcat1233= await otherincome
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.otherincomelinks= async (req,res) => {
  try{
      
      const lcat1233= await otherincome
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createotherincomebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await otherincome.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
account:req.query.account,
agency:req.query.agency,
transaction:req.query.transaction,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
type:req.query.type,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updateotherincomebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await otherincome.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
account:req.query.account,
agency:req.query.agency,
transaction:req.query.transaction,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
type:req.query.type,
status1: 'Submitted',
            comments: 'NA'
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


exports.updateotherincomecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await otherincome.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deleteotherincomebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await otherincome.findByIdAndDelete(req.query.id);
        
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


exports.getfeedbackbycolid= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        //const user1=req.query.user;
        const colid=parseInt(req.query.colid);
        const lcat1233= await feedback.find()
        .where('colid')
        .equals(colid)
        .where('type')
        .equals('Faculty')
        .where('facultyemail')
        .equals(req.query.facultyemail);
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



exports.getnaccountheadsbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await naccountheads.find()
        .where('user')
        .equals(user1);
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

exports.getallnaccounts= async (req,res) => {
    try{
        const colid=parseInt(req.query.colid);
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            
        }
        // const lcat1233= await naccountheads.distinct('account')
        //     .where('colid')
        //     .equals(colid);
        const lcat1233= await naccountheads.find()
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



exports.naccountheadsdocs= async (req,res) => {
  try{
      
      const lcat1233= await naccountheads
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.naccountheadslinks= async (req,res) => {
  try{
      
      const lcat1233= await naccountheads
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createnaccountheadsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await naccountheads.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            account:req.query.account,
acccode:req.query.acccode,
description:req.query.description,
region:req.query.region,
type:req.query.type,
category:req.query.category,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatenaccountheadsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await naccountheads.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            account:req.query.account,
acccode:req.query.acccode,
description:req.query.description,
region:req.query.region,
type:req.query.type,
category:req.query.category,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatenaccountheadscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await naccountheads.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletenaccountheadsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await naccountheads.findByIdAndDelete(req.query.id);
        
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

exports.getntransactionsbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await ntransactions.find()
        .where('user')
        .equals(user1);
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



exports.ntransactionsdocs= async (req,res) => {
  try{
      
      const lcat1233= await ntransactions
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.ntransactionsdocsacc= async (req,res) => {
    try{
        
        const lcat1233= await ntransactions
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'ntledgers', 
                      localField: 'userId', 
                      foreignField: 'transactionid', 
                      as: 'ledgers'
                    }
                  },
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ]);
            
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


exports.ntransactionslinks= async (req,res) => {
  try{
      
      const lcat1233= await ntransactions
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createntransactionsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await ntransactions.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
transaction:req.query.transaction,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
bank:req.query.bank,
party:req.query.party,
type:req.query.type,
status1: 'Submitted',
            comments: 'NA'
        });

        //console.log(pub1);

    //res.status(200).send('Hello world for all the tours through db new router');
    res.status(200).json({
        status:'Success',
        data: {
            classes : pub1
        } 
    });
  
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.updatentransactionsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await ntransactions.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
transaction:req.query.transaction,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
bank:req.query.bank,
party:req.query.party,
type:req.query.type,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatentransactionscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await ntransactions.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletentransactionsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await ntransactions.findByIdAndDelete(req.query.id);
        
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

exports.getntledgerbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await ntledger.find()
        .where('user')
        .equals(user1);
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

exports.getnledgersummarybydate= async (req,res) => {
    try{
        //const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        const date1=new Date(req.query.date1);
        const date2=new Date(req.query.date2);
        //date2.setDate(date1.getDate() + 1);
        //date1.setDate(date1.getDate() - 180);
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await ntledger.aggregate([
            { 
                $match: {
                    colid: colid1, 
                    year:req.query.year,
                    transactiondate: {
                        $gte: date1,
                        $lte: date2
                    }

                }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        account: '$account',
                        type: '$type'
                    },
                    total_attendance: {$sum: '$amount'},
                    total_entries: {$sum: 1}
                }
            }
        ]);
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



exports.ntledgerdocs= async (req,res) => {
  try{
      
      const lcat1233= await ntledger
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.ntledgerlinks= async (req,res) => {
  try{
      
      const lcat1233= await ntledger
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createntledgerbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await ntledger.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
account:req.query.account,
transaction:req.query.transaction,
amount:req.query.amount,
type:req.query.type,
transactiondate:req.query.transactiondate,
transactionid:req.query.transactionid,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatentledgerbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await ntledger.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
account:req.query.account,
transaction:req.query.transaction,
amount:req.query.amount,
type:req.query.type,
transactiondate:req.query.transactiondate,
transactionid:req.query.transactionid,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatentledgercomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await ntledger.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletentledgerbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await ntledger.findByIdAndDelete(req.query.id);
        
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

exports.getsuperusers= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await User.find();
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



exports.getnnursing812byfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nnursing812.find()
        .where('user')
        .equals(user1);
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



exports.nnursing812docs= async (req,res) => {
  try{
      
      const lcat1233= await nnursing812
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.nnursing812links= async (req,res) => {
  try{
      
      const lcat1233= await nnursing812
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.creatennursing812byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await nnursing812.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            teacher:req.query.teacher,
degreeyear:req.query.degreeyear,
institution:req.query.institution,
yearofjoining:req.query.yearofjoining,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatennursing812byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await nnursing812.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            teacher:req.query.teacher,
degreeyear:req.query.degreeyear,
institution:req.query.institution,
yearofjoining:req.query.yearofjoining,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatennursing812comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await nnursing812.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletennursing812byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await nnursing812.findByIdAndDelete(req.query.id);
        
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

exports.getnnursing814byfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nnursing814.find()
        .where('user')
        .equals(user1);
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



exports.nnursing814docs= async (req,res) => {
  try{
      
      const lcat1233= await nnursing814
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.nnursing814links= async (req,res) => {
  try{
      
      const lcat1233= await nnursing814
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.creatennursing814byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await nnursing814.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
studentsadmitted:req.query.studentsadmitted,
immunizedno:req.query.immunizedno,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatennursing814byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await nnursing814.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
studentsadmitted:req.query.studentsadmitted,
immunizedno:req.query.immunizedno,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatennursing814comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await nnursing814.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletennursing814byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await nnursing814.findByIdAndDelete(req.query.id);
        
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

exports.getnnursing815byfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nnursing815.find()
        .where('user')
        .equals(user1);
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



exports.nnursing815docs= async (req,res) => {
  try{
      
      const lcat1233= await nnursing815
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.nnursing815links= async (req,res) => {
  try{
      
      const lcat1233= await nnursing815
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.creatennursing815byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await nnursing815.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            accreditation:req.query.accreditation,
status:req.query.status,
year:req.query.year,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatennursing815byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await nnursing815.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            accreditation:req.query.accreditation,
status:req.query.status,
year:req.query.year,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatennursing815comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await nnursing815.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletennursing815byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await nnursing815.findByIdAndDelete(req.query.id);
        
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

exports.getnnursing818byfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nnursing818.find()
        .where('user')
        .equals(user1);
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



exports.nnursing818docs= async (req,res) => {
  try{
      
      const lcat1233= await nnursing818
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.nnursing818links= async (req,res) => {
  try{
      
      const lcat1233= await nnursing818
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.creatennursing818byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await nnursing818.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
faculty:req.query.faculty,
committee:req.query.committee,
tenure:req.query.tenure,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatennursing818byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await nnursing818.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
faculty:req.query.faculty,
committee:req.query.committee,
tenure:req.query.tenure,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatennursing818comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await nnursing818.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletennursing818byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await nnursing818.findByIdAndDelete(req.query.id);
        
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

exports.getnnursing424byfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nnursing424.find()
        .where('user')
        .equals(user1);
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



exports.nnursing424docs= async (req,res) => {
  try{
      
      const lcat1233= await nnursing424
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.nnursing424links= async (req,res) => {
  try{
      
      const lcat1233= await nnursing424
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.creatennursing424byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await nnursing424.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            facility:req.query.facility,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatennursing424byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await nnursing424.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            facility:req.query.facility,
status:req.query.status,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatennursing424comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await nnursing424.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletennursing424byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await nnursing424.findByIdAndDelete(req.query.id);
        
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

exports.getncompetitivebyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await ncompetitive.find()
        .where('user')
        .equals(user1);
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



exports.ncompetitivedocs= async (req,res) => {
  try{
      
      const lcat1233= await ncompetitive
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.ncompetitivelinks= async (req,res) => {
  try{
      
      const lcat1233= await ncompetitive
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.createncompetitivebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await ncompetitive.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
scheme:req.query.scheme,
studentsparticipated:req.query.studentsparticipated,
totalstudents:req.query.totalstudents,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatencompetitivebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await ncompetitive.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
scheme:req.query.scheme,
studentsparticipated:req.query.studentsparticipated,
totalstudents:req.query.totalstudents,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatencompetitivecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await ncompetitive.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletencompetitivebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await ncompetitive.findByIdAndDelete(req.query.id);
        
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

exports.getnnursing515byfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nnursing515.find()
        .where('user')
        .equals(user1);
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



exports.nnursing515docs= async (req,res) => {
  try{
      
      const lcat1233= await nnursing515
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid)
                  }
                }
                ]);
          
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

exports.nnursing515links= async (req,res) => {
  try{
      
      const lcat1233= await nnursing515
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
                    from: 'accrcomments', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'allcomments'
                  }
                },
                {
                  $match: {
                    'colid': parseInt(req.query.colid),
                    'status1' : {$ne : req.query.status1}
                  }
                }
                ]);
          
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



exports.creatennursing515byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await nnursing515.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type:req.query.type,
guidelines:req.query.guidelines,
committee:req.query.committee,
meetings:req.query.meetings,
actiontaken:req.query.actiontaken,
status1: 'Submitted',
            comments: 'NA'
        });

    //res.status(200).send('Hello world for all the tours through db new router');
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


exports.updatennursing515byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await nnursing515.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type:req.query.type,
guidelines:req.query.guidelines,
committee:req.query.committee,
meetings:req.query.meetings,
actiontaken:req.query.actiontaken,
status1: 'Submitted',
            comments: 'NA'
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


exports.updatennursing515comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await nnursing515.findByIdAndUpdate( req.query.id,{
            status1: req.query.status1,
            comments: req.query.comments
           
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

exports.deletennursing515byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
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
        } catch(err1234) {
            //console.log(err1234);
        }

        const user1=req.query.user;
        await nnursing515.findByIdAndDelete(req.query.id);
        
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

