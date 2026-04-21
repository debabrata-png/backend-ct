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

const ndepmeetings=require('./../Models/ndepmeetings');
const nmeetingtasks=require('./../Models/nmeetingtasks');


const nodemailer=require('nodemailer');

//const Supportingdocs=require('supportingdoc');

const ndepmeetingsall=require('./../Models/ndepmeetingsall');
const nmeetingtasksall=require('./../Models/nmeetingtasksall');



const nallcourses=require('./../Models/nallcourses');

const verifystatus=require('./../Models/verifystatus');
const nissuesall=require('./../Models/nissuesall');
const ntickets=require('./../Models/ntickets');

const admission=require('./../Models/admission');
const passexam=require('./../Models/passexam');
const nbaug33result=require('./../Models/nbaug33result');
const placement=require('./../Models/placement');
const writerdb=require('./../Models/writerdb');

const htmltotext=require('html-to-text');

exports.updatesyllabusrevc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Syllabusrev.updateMany( {colid: colid},{
            comment: req.query.comment
           
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

exports.updateemployabilityc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Employability.updateMany( {colid: colid},{
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

exports.updateaddonc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await AddOnCourse.updateMany( {colid: colid},{
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


exports.updateexplearning= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Explearning.updateMany( {colid: colid},{
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


exports.updateadmissionc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Demandratio.updateMany( {colid: colid},{
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

exports.updatereservcatc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Reservecat.updateMany( {colid: colid},{
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

exports.updatepassexamc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Passexam.updateMany( {colid: colid},{
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

exports.updateexamdaysc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Examdays.updateMany( {colid: colid},{
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

exports.updatehighereduc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Higheredu.updateMany( {colid: colid},{
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

exports.updatehigherexamc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Higherexam.updateMany( {colid: colid},{
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


exports.updateprojectsc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Project.updateMany( {colid: colid},{
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

exports.updatemouc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await MoU.updateMany( {colid: colid},{
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

exports.updatecollabc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Collab.updateMany( {colid: colid},{
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

exports.updateeventc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Event.updateMany( {colid: colid, user: req.query.user},{
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

exports.updatescholarshipc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Scholarship.updateMany( {colid: colid},{
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

exports.updatecareercounselc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Careercounsel.updateMany( {colid: colid},{
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


exports.updateseedmc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Seedmoney.updateMany( {colid: colid, user: req.query.user},{
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

exports.updateteacherdatac= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Teacherdata.updateMany( {colid: colid, user: req.query.user},{
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

exports.updateictc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Ict.updateMany( {colid: colid, user: req.query.user},{
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


exports.updateextactivitiesc= async (req,res) => {

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
        const colid=parseInt(req.query.colid);
        const lcat1= await Extact.updateMany( {colid: colid, user: req.query.user},{
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