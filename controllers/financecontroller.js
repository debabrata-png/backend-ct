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





exports.projectyrdocs= async (req,res) => {
    try{
        
        const lcat1233= await Projects
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'status1' : {$ne : req.query.status1},
                      'year' : req.query.year

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

exports.getnclientbyfac= async (req,res) => {
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
        const lcat1233= await nclient.find()
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

exports.getnclientbyid= async (req,res) => {
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
        const colid=req.query.colid;
        const lcat1233= await nclient.find()
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



exports.nclientdocs= async (req,res) => {
  try{
      
      const lcat1233= await nclient
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

exports.nclientlinks= async (req,res) => {
  try{
      
      const lcat1233= await nclient
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



exports.createnclientbyfac= async (req,res) => {

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

        const pub1= await nclient.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
address:req.query.address,
state:req.query.state,
country:req.query.country,
gst:req.query.gst,
pan:req.query.pan,
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


exports.updatenclientbyfac= async (req,res) => {

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

        const lcat1= await nclient.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
address:req.query.address,
state:req.query.state,
country:req.query.country,
gst:req.query.gst,
pan:req.query.pan,
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


exports.updatenclientcomments= async (req,res) => {

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
        const lcat1= await nclient.findByIdAndUpdate( req.query.id,{
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

exports.deletenclientbyfac= async (req,res) => {

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
        await nclient.findByIdAndDelete(req.query.id);
        
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

exports.getnmilestonebyfac= async (req,res) => {
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
        const lcat1233= await nmilestone.find()
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



exports.nmilestonedocs= async (req,res) => {
  try{
      
      const lcat1233= await nmilestone
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

exports.nmilestonelinks= async (req,res) => {
  try{
      
      const lcat1233= await nmilestone
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



exports.createnmilestonebyfac= async (req,res) => {

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

        const pub1= await nmilestone.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            client:req.query.client,
clientid:req.query.clientid,
milestone:req.query.milestone,
duedate:new Date(req.query.duedate),
amount:req.query.amount,
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


exports.updatenmilestonebyfac= async (req,res) => {

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

        const lcat1= await nmilestone.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            client:req.query.client,
clientid:req.query.clientid,
milestone:req.query.milestone,
duedate:new Date(req.query.duedate),
amount:req.query.amount,
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


exports.updatenmilestonecomments= async (req,res) => {

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
        const lcat1= await nmilestone.findByIdAndUpdate( req.query.id,{
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

exports.deletenmilestonebyfac= async (req,res) => {

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
        await nmilestone.findByIdAndDelete(req.query.id);
        
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

exports.getninvoicebyfac= async (req,res) => {
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
        const lcat1233= await ninvoice.find()
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



exports.ninvoicedocs= async (req,res) => {
  try{
      
      const lcat1233= await ninvoice
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

exports.ninvoicelinks= async (req,res) => {
  try{
      
      const lcat1233= await ninvoice
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



exports.createninvoicebyfac= async (req,res) => {

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

        const pub1= await ninvoice.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
client:req.query.client,
milestone:req.query.milestone,
amount:req.query.amount,
gst:req.query.gst,
total:req.query.total,
invoiceid:req.query.invoiceid,
duedate:new Date(req.query.duedate),
actualdate:new Date(req.query.actualdate),
paidamount:req.query.paidamount,
bank:req.query.bank,
refno:req.query.refno,
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


exports.updateninvoicebyfac= async (req,res) => {

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

        const lcat1= await ninvoice.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
client:req.query.client,
milestone:req.query.milestone,
amount:req.query.amount,
gst:req.query.gst,
total:req.query.total,
invoiceid:req.query.invoiceid,
duedate:new Date(req.query.duedate),
actualdate:new Date(req.query.actualdate),
paidamount:req.query.paidamount,
bank:req.query.bank,
refno:req.query.refno,
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


exports.updateninvoicecomments= async (req,res) => {

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
        const lcat1= await ninvoice.findByIdAndUpdate( req.query.id,{
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

exports.deleteninvoicebyfac= async (req,res) => {

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
        await ninvoice.findByIdAndDelete(req.query.id);
        
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

exports.getngstgainbyfac= async (req,res) => {
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
        const lcat1233= await ngstgain.find()
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



exports.ngstgaindocs= async (req,res) => {
  try{
      
      const lcat1233= await ngstgain
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

exports.ngstgainlinks= async (req,res) => {
  try{
      
      const lcat1233= await ngstgain
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



exports.createngstgainbyfac= async (req,res) => {

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

        const pub1= await ngstgain.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
client:req.query.client,
amount:req.query.amount,
gst:req.query.gst,
total:req.query.total,
paydate:new Date(req.query.paydate),
bank:req.query.bank,
refno:req.query.refno,
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


exports.updatengstgainbyfac= async (req,res) => {

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

        const lcat1= await ngstgain.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
client:req.query.client,
amount:req.query.amount,
gst:req.query.gst,
total:req.query.total,
paydate:new Date(req.query.paydate),
bank:req.query.bank,
refno:req.query.refno,
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


exports.updatengstgaincomments= async (req,res) => {

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
        const lcat1= await ngstgain.findByIdAndUpdate( req.query.id,{
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

exports.deletengstgainbyfac= async (req,res) => {

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
        await ngstgain.findByIdAndDelete(req.query.id);
        
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

exports.getnvendorbyfac= async (req,res) => {
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
        const lcat1233= await nvendor.find()
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



exports.nvendordocs= async (req,res) => {
  try{
      
      const lcat1233= await nvendor
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

exports.nvendorlinks= async (req,res) => {
  try{
      
      const lcat1233= await nvendor
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



exports.createnvendorbyfac= async (req,res) => {

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

        const pub1= await nvendor.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
address:req.query.address,
state:req.query.state,
country:req.query.country,
gst:req.query.gst,
pan:req.query.pan,
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


exports.updatenvendorbyfac= async (req,res) => {

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

        const lcat1= await nvendor.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
address:req.query.address,
state:req.query.state,
country:req.query.country,
gst:req.query.gst,
pan:req.query.pan,
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


exports.updatenvendorcomments= async (req,res) => {

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
        const lcat1= await nvendor.findByIdAndUpdate( req.query.id,{
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

exports.deletenvendorbyfac= async (req,res) => {

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
        await nvendor.findByIdAndDelete(req.query.id);
        
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

exports.getnvworkorderbyfac= async (req,res) => {
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
        const lcat1233= await nvworkorder.find()
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



exports.nvworkorderdocs= async (req,res) => {
  try{
      
      const lcat1233= await nvworkorder
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

exports.nvworkorderlinks= async (req,res) => {
  try{
      
      const lcat1233= await nvworkorder
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



exports.createnvworkorderbyfac= async (req,res) => {

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

        const pub1= await nvworkorder.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            vendor:req.query.vendor,
workorder:req.query.workorder,
workorderid:req.query.workorderid,
details:req.query.details,
duedate:new Date(req.query.duedate),
amount:req.query.amount,
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


exports.updatenvworkorderbyfac= async (req,res) => {

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

        const lcat1= await nvworkorder.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            vendor:req.query.vendor,
workorder:req.query.workorder,
workorderid:req.query.workorderid,
details:req.query.details,
duedate:new Date(req.query.duedate),
amount:req.query.amount,
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


exports.updatenvworkordercomments= async (req,res) => {

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
        const lcat1= await nvworkorder.findByIdAndUpdate( req.query.id,{
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

exports.deletenvworkorderbyfac= async (req,res) => {

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
        await nvworkorder.findByIdAndDelete(req.query.id);
        
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

exports.getnvinvoicebyfac= async (req,res) => {
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
        const lcat1233= await nvinvoice.find()
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



exports.nvinvoicedocs= async (req,res) => {
  try{
      
      const lcat1233= await nvinvoice
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

exports.nvinvoicelinks= async (req,res) => {
  try{
      
      const lcat1233= await nvinvoice
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



exports.createnvinvoicebyfac= async (req,res) => {

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

        const pub1= await nvinvoice.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
vendor:req.query.vendor,
workorder:req.query.workorder,
workorderid:req.query.workorderid,
amount:req.query.amount,
gst:req.query.gst,
total:req.query.total,
invoiceid:req.query.invoiceid,
duedate:new Date(req.query.duedate),
actualdate:new Date(req.query.actualdate),
paidamount:req.query.paidamount,
bank:req.query.bank,
refno:req.query.refno,
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


exports.updatenvinvoicebyfac= async (req,res) => {

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

        const lcat1= await nvinvoice.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
vendor:req.query.vendor,
workorder:req.query.workorder,
workorderid:req.query.workorderid,
amount:req.query.amount,
gst:req.query.gst,
total:req.query.total,
invoiceid:req.query.invoiceid,
duedate:new Date(req.query.duedate),
actualdate:new Date(req.query.actualdate),
paidamount:req.query.paidamount,
bank:req.query.bank,
refno:req.query.refno,
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


exports.updatenvinvoicecomments= async (req,res) => {

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
        const lcat1= await nvinvoice.findByIdAndUpdate( req.query.id,{
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

exports.deletenvinvoicebyfac= async (req,res) => {

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
        await nvinvoice.findByIdAndDelete(req.query.id);
        
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

exports.getntrialbalancebyfac= async (req,res) => {
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
        const lcat1233= await ntrialbalance.find()
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



exports.ntrialbalancedocs= async (req,res) => {
  try{
      
      const lcat1233= await ntrialbalance
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

exports.ntrialbalancelinks= async (req,res) => {
  try{
      
      const lcat1233= await ntrialbalance
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



exports.createntrialbalancebyfac= async (req,res) => {

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

        const pub1= await ntrialbalance.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
acccode:req.query.acccode,
account:req.query.account,
transaction:req.query.transaction,
category:req.query.category,
group:req.query.group,
debit:req.query.debit,
credit:req.query.credit,
transactiondate:new Date(req.query.transactiondate),
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


exports.updatentrialbalancebyfac= async (req,res) => {

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

        const lcat1= await ntrialbalance.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
acccode:req.query.acccode,
account:req.query.account,
transaction:req.query.transaction,
category:req.query.category,
group:req.query.group,
debit:req.query.debit,
credit:req.query.credit,
transactiondate:new Date(req.query.transactiondate),
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


exports.updatentrialbalancecomments= async (req,res) => {

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
        const lcat1= await ntrialbalance.findByIdAndUpdate( req.query.id,{
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

exports.deletentrialbalancebyfac= async (req,res) => {

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
        await ntrialbalance.findByIdAndDelete(req.query.id);
        
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



exports.getnbudgetbyfac= async (req,res) => {
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
        const lcat1233= await nbudget.find()
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



exports.nbudgetdocs= async (req,res) => {
  try{
      
      const lcat1233= await nbudget
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

exports.nbudgetlinks= async (req,res) => {
  try{
      
      const lcat1233= await nbudget
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



exports.createnbudgetbyfac= async (req,res) => {

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

        const pub1= await nbudget.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
acccode:req.query.acccode,
account:req.query.account,
transaction:req.query.transaction,
category:req.query.category,
group:req.query.group,
debit:req.query.debit,
credit:req.query.credit,
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


exports.updatenbudgetbyfac= async (req,res) => {

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

        const lcat1= await nbudget.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
acccode:req.query.acccode,
account:req.query.account,
transaction:req.query.transaction,
category:req.query.category,
group:req.query.group,
debit:req.query.debit,
credit:req.query.credit,
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


exports.updatenbudgetcomments= async (req,res) => {

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
        const lcat1= await nbudget.findByIdAndUpdate( req.query.id,{
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

exports.deletenbudgetbyfac= async (req,res) => {

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
        await nbudget.findByIdAndDelete(req.query.id);
        
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

exports.getnledgerbyfac= async (req,res) => {
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
        const lcat1233= await nledger.find()
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



exports.nledgerdocs= async (req,res) => {
  try{
      
      const lcat1233= await nledger
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

exports.nledgerlinks= async (req,res) => {
  try{
      
      const lcat1233= await nledger
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



exports.createnledgerbyfac= async (req,res) => {

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

        const pub1= await nledger.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
acccode:req.query.acccode,
account:req.query.account,
transaction:req.query.transaction,
category:req.query.category,
group:req.query.group,
debit:req.query.debit,
credit:req.query.credit,
transactiondate:req.query.transactiondate,
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


exports.updatenledgerbyfac= async (req,res) => {

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

        const lcat1= await nledger.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
acccode:req.query.acccode,
account:req.query.account,
transaction:req.query.transaction,
category:req.query.category,
group:req.query.group,
debit:req.query.debit,
credit:req.query.credit,
transactiondate:req.query.transactiondate,
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


exports.updatenledgercomments= async (req,res) => {

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
        const lcat1= await nledger.findByIdAndUpdate( req.query.id,{
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

exports.deletenledgerbyfac= async (req,res) => {

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
        await nledger.findByIdAndDelete(req.query.id);
        
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

exports.getnaccountsbyfac= async (req,res) => {
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
        const lcat1233= await naccounts.find()
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



exports.naccountsdocs= async (req,res) => {
  try{
      
      const lcat1233= await naccounts
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

exports.naccountslinks= async (req,res) => {
  try{
      
      const lcat1233= await naccounts
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



exports.createnaccountsbyfac= async (req,res) => {

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

        const pub1= await naccounts.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            acccode:req.query.acccode,
account:req.query.account,
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


exports.updatenaccountsbyfac= async (req,res) => {

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

        const lcat1= await naccounts.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            acccode:req.query.acccode,
account:req.query.account,
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


exports.updatenaccountscomments= async (req,res) => {

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
        const lcat1= await naccounts.findByIdAndUpdate( req.query.id,{
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

exports.deletenaccountsbyfac= async (req,res) => {

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
        await naccounts.findByIdAndDelete(req.query.id);
        
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


exports.getnseedmoneybyfac= async (req,res) => {
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
        const lcat1233= await nseedmoney.find()
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



exports.nseedmoneydocs= async (req,res) => {
  try{
      
      const lcat1233= await nseedmoney
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

exports.nseedmoneylinks= async (req,res) => {
  try{
      
      const lcat1233= await nseedmoney
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



exports.createnseedmoneybyfac= async (req,res) => {

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

        const pub1= await nseedmoney.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
project:req.query.project,
description:req.query.description,
amount:req.query.amount,
copi:req.query.copi,
department:req.query.department,
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


exports.updatenseedmoneybyfac= async (req,res) => {

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

        const lcat1= await nseedmoney.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
project:req.query.project,
description:req.query.description,
amount:req.query.amount,
copi:req.query.copi,
department:req.query.department,
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


exports.updatenseedmoneycomments= async (req,res) => {

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
        const lcat1= await nseedmoney.findByIdAndUpdate( req.query.id,{
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

exports.deletenseedmoneybyfac= async (req,res) => {

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
        await nseedmoney.findByIdAndDelete(req.query.id);
        
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

exports.getnbudgetreqbyfac= async (req,res) => {
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
        const lcat1233= await nbudgetreq.find()
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



exports.nbudgetreqdocs= async (req,res) => {
  try{
      
      const lcat1233= await nbudgetreq
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

exports.nbudgetreqlinks= async (req,res) => {
  try{
      
      const lcat1233= await nbudgetreq
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



exports.createnbudgetreqbyfac= async (req,res) => {

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

        const pub1= await nbudgetreq.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
department:req.query.department,
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


exports.updatenbudgetreqbyfac= async (req,res) => {

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

        const lcat1= await nbudgetreq.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
department:req.query.department,
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


exports.updatenbudgetreqcomments= async (req,res) => {

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
        const lcat1= await nbudgetreq.findByIdAndUpdate( req.query.id,{
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

exports.deletenbudgetreqbyfac= async (req,res) => {

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
        await nbudgetreq.findByIdAndDelete(req.query.id);
        
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

exports.getnoodreqbyfac= async (req,res) => {
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
        const lcat1233= await noodreq.find()
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



exports.noodreqdocs= async (req,res) => {
  try{
      
      const lcat1233= await noodreq
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

exports.noodreqlinks= async (req,res) => {
  try{
      
      const lcat1233= await noodreq
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



exports.createnoodreqbyfac= async (req,res) => {

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

        const pub1= await noodreq.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
task:req.query.task,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
department:req.query.department,
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


exports.updatenoodreqbyfac= async (req,res) => {

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

        const lcat1= await noodreq.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
task:req.query.task,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
department:req.query.department,
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


exports.updatenoodreqcomments= async (req,res) => {

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
        const lcat1= await noodreq.findByIdAndUpdate( req.query.id,{
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

exports.deletenoodreqbyfac= async (req,res) => {

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
        await noodreq.findByIdAndDelete(req.query.id);
        
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

exports.getneventreqbyfac= async (req,res) => {
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
        const lcat1233= await neventreq.find()
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



exports.neventreqdocs= async (req,res) => {
  try{
      
      const lcat1233= await neventreq
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

exports.neventreqlinks= async (req,res) => {
  try{
      
      const lcat1233= await neventreq
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



exports.createneventreqbyfac= async (req,res) => {

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

        const pub1= await neventreq.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
event:req.query.event,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
department:req.query.department,
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


exports.updateneventreqbyfac= async (req,res) => {

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

        const lcat1= await neventreq.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
event:req.query.event,
description:req.query.description,
amount:req.query.amount,
transactiondate:req.query.transactiondate,
department:req.query.department,
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


exports.updateneventreqcomments= async (req,res) => {

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
        const lcat1= await neventreq.findByIdAndUpdate( req.query.id,{
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

exports.deleteneventreqbyfac= async (req,res) => {

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
        await neventreq.findByIdAndDelete(req.query.id);
        
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

exports.getnassistantreqbyfac= async (req,res) => {
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
        const lcat1233= await nassistantreq.find()
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



exports.nassistantreqdocs= async (req,res) => {
  try{
      
      const lcat1233= await nassistantreq
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

exports.nassistantreqlinks= async (req,res) => {
  try{
      
      const lcat1233= await nassistantreq
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



exports.createnassistantreqbyfac= async (req,res) => {

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

        const pub1= await nassistantreq.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
noofpeople:req.query.noofpeople,
amount:req.query.amount,
startdate:req.query.startdate,
enddate:req.query.enddate,
department:req.query.department,
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


exports.updatenassistantreqbyfac= async (req,res) => {

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

        const lcat1= await nassistantreq.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
noofpeople:req.query.noofpeople,
amount:req.query.amount,
startdate:req.query.startdate,
enddate:req.query.enddate,
department:req.query.department,
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


exports.updatenassistantreqcomments= async (req,res) => {

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
        const lcat1= await nassistantreq.findByIdAndUpdate( req.query.id,{
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

exports.deletenassistantreqbyfac= async (req,res) => {

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
        await nassistantreq.findByIdAndDelete(req.query.id);
        
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

exports.getnhousingreqbyfac= async (req,res) => {
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
        const lcat1233= await nhousingreq.find()
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



exports.nhousingreqdocs= async (req,res) => {
  try{
      
      const lcat1233= await nhousingreq
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

exports.nhousingreqlinks= async (req,res) => {
  try{
      
      const lcat1233= await nhousingreq
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



exports.createnhousingreqbyfac= async (req,res) => {

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

        const pub1= await nhousingreq.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
noofpeople:req.query.noofpeople,
amount:req.query.amount,
startdate:req.query.startdate,
enddate:req.query.enddate,
department:req.query.department,
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


exports.updatenhousingreqbyfac= async (req,res) => {

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

        const lcat1= await nhousingreq.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
noofpeople:req.query.noofpeople,
amount:req.query.amount,
startdate:req.query.startdate,
enddate:req.query.enddate,
department:req.query.department,
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


exports.updatenhousingreqcomments= async (req,res) => {

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
        const lcat1= await nhousingreq.findByIdAndUpdate( req.query.id,{
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

exports.deletenhousingreqbyfac= async (req,res) => {

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
        await nhousingreq.findByIdAndDelete(req.query.id);
        
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

exports.getntravelsupportbyfac= async (req,res) => {
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
        const lcat1233= await ntravelsupport.find()
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



exports.ntravelsupportdocs= async (req,res) => {
  try{
      
      const lcat1233= await ntravelsupport
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

exports.ntravelsupportlinks= async (req,res) => {
  try{
      
      const lcat1233= await ntravelsupport
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



exports.createntravelsupportbyfac= async (req,res) => {

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

        const pub1= await ntravelsupport.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
seminar:req.query.seminar,
role:req.query.role,
type:req.query.type,
amount:req.query.amount,
startdate:req.query.startdate,
enddate:req.query.enddate,
department:req.query.department,
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


exports.updatentravelsupportbyfac= async (req,res) => {

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

        const lcat1= await ntravelsupport.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
item:req.query.item,
description:req.query.description,
seminar:req.query.seminar,
role:req.query.role,
type:req.query.type,
amount:req.query.amount,
startdate:req.query.startdate,
enddate:req.query.enddate,
department:req.query.department,
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


exports.updatentravelsupportcomments= async (req,res) => {

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
        const lcat1= await ntravelsupport.findByIdAndUpdate( req.query.id,{
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

exports.deletentravelsupportbyfac= async (req,res) => {

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
        await ntravelsupport.findByIdAndDelete(req.query.id);
        
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


exports.getncompaniesbyfac= async (req,res) => {
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
        const lcat1233= await ncompanies.find()
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



exports.ncompaniesdocs= async (req,res) => {
  try{
      
      const lcat1233= await ncompanies
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

exports.ncompanieslinks= async (req,res) => {
  try{
      
      const lcat1233= await ncompanies
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



exports.createncompaniesbyfac= async (req,res) => {

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

        const pub1= await ncompanies.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            companyname:req.query.companyname,
address:req.query.address,
country:req.query.country,
hrname:req.query.hrname,
hremail:req.query.hremail,
hrphone:req.query.hrphone,
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


exports.updatencompaniesbyfac= async (req,res) => {

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

        const lcat1= await ncompanies.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            companyname:req.query.companyname,
address:req.query.address,
country:req.query.country,
hrname:req.query.hrname,
hremail:req.query.hremail,
hrphone:req.query.hrphone,
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


exports.updatencompaniescomments= async (req,res) => {

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
        const lcat1= await ncompanies.findByIdAndUpdate( req.query.id,{
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

exports.deletencompaniesbyfac= async (req,res) => {

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
        await ncompanies.findByIdAndDelete(req.query.id);
        
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

exports.getnjobsbyfac= async (req,res) => {
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
        const lcat1233= await njobs.find()
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


exports.getnjobsbydate= async (req,res) => {
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
        const dt1=new Date();
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await njobs.find()
        .where('colid')
        .equals(req.query.colid)
        .where('lastapplydate')
        .gte(dt1);
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


exports.njobsdocs= async (req,res) => {
  try{
      
      const lcat1233= await njobs
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

exports.njobslinks= async (req,res) => {
  try{
      
      const lcat1233= await njobs
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



exports.createnjobsbyfac= async (req,res) => {

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

        const pub1= await njobs.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
jobtitle:req.query.jobtitle,
jobdescription:req.query.jobdescription,
lastapplydate:req.query.lastapplydate,
eligibility:req.query.eligibility,
salary:req.query.salary,
domain:req.query.domain,
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


exports.updatenjobsbyfac= async (req,res) => {

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

        const lcat1= await njobs.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
jobtitle:req.query.jobtitle,
jobdescription:req.query.jobdescription,
lastapplydate:req.query.lastapplydate,
eligibility:req.query.eligibility,
salary:req.query.salary,
domain:req.query.domain,
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


exports.updatenjobscomments= async (req,res) => {

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
        const lcat1= await njobs.findByIdAndUpdate( req.query.id,{
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

exports.deletenjobsbyfac= async (req,res) => {

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
        await njobs.findByIdAndDelete(req.query.id);
        
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

exports.getnjobstudentsbyfac= async (req,res) => {
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
        const lcat1233= await njobstudents.find()
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


exports.njobstudentsstat= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid1=parseInt(req.cookies['colid']);
       
            const lcat1233= await njobstudents.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        // _id:['$regno','$name'], 
                        _id: {
                            year: '$year',
                            program: '$program'
                        },
                        total_attendance: {$sum: 1}
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


exports.njobstudentsdocs= async (req,res) => {
  try{
      
      const lcat1233= await njobstudents
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

exports.njobstudentslinks= async (req,res) => {
  try{
      
      const lcat1233= await njobstudents
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



exports.createnjobstudentsbyfac= async (req,res) => {

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

        const pub1= await njobstudents.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
jobid:req.query.jobid,
salary:req.query.salary,
program:req.query.program,
student:req.query.student,
department:req.query.department,
regno:req.query.regno,
studentcontact:req.query.studentcontact,
selectiondate:req.query.selectiondate,
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


exports.updatenjobstudentsbyfac= async (req,res) => {

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

        const lcat1= await njobstudents.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
jobid:req.query.jobid,
salary:req.query.salary,
program:req.query.program,
student:req.query.student,
department:req.query.department,
regno:req.query.regno,
studentcontact:req.query.studentcontact,
selectiondate:req.query.selectiondate,
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


exports.updatenjobstudentscomments= async (req,res) => {

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
        const lcat1= await njobstudents.findByIdAndUpdate( req.query.id,{
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

exports.deletenjobstudentsbyfac= async (req,res) => {

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
        await njobstudents.findByIdAndDelete(req.query.id);
        
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

exports.getnhighereducationbyfac= async (req,res) => {
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
        const lcat1233= await nhighereducation.find()
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



exports.nhighereducationdocs= async (req,res) => {
  try{
      
      const lcat1233= await nhighereducation
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

exports.nhighereducationlinks= async (req,res) => {
  try{
      
      const lcat1233= await nhighereducation
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



exports.createnhighereducationbyfac= async (req,res) => {

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

        const pub1= await nhighereducation.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institute:req.query.institute,
targetprogram:req.query.targetprogram,
program:req.query.program,
student:req.query.student,
department:req.query.department,
regno:req.query.regno,
studentcontact:req.query.studentcontact,
selectiondate:req.query.selectiondate,
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


exports.updatenhighereducationbyfac= async (req,res) => {

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

        const lcat1= await nhighereducation.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institute:req.query.institute,
targetprogram:req.query.targetprogram,
program:req.query.program,
student:req.query.student,
department:req.query.department,
regno:req.query.regno,
studentcontact:req.query.studentcontact,
selectiondate:req.query.selectiondate,
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


exports.updatenhighereducationcomments= async (req,res) => {

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
        const lcat1= await nhighereducation.findByIdAndUpdate( req.query.id,{
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

exports.deletenhighereducationbyfac= async (req,res) => {

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
        await nhighereducation.findByIdAndDelete(req.query.id);
        
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


exports.getnoffcampusbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
      
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await noffcampus.find()
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



exports.noffcampusdocs= async (req,res) => {
  try{
      
      const lcat1233= await noffcampus
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

exports.noffcampuslinks= async (req,res) => {
  try{
      
      const lcat1233= await noffcampus
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



exports.createnoffcampusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
      

        const pub1= await noffcampus.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
job:req.query.job,
salary:req.query.salary,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffcampusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
      

        const lcat1= await noffcampus.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
job:req.query.job,
salary:req.query.salary,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffcampuscomments= async (req,res) => {

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
        const lcat1= await noffcampus.findByIdAndUpdate( req.query.id,{
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

exports.deletenoffcampusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const user1=req.query.user;
        await noffcampus.findByIdAndDelete(req.query.id);
        
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

exports.getnjobsapplybyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
     
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await njobsapply.find()
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



exports.njobsapplydocs= async (req,res) => {
  try{
      
      const lcat1233= await njobsapply
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

exports.njobsapplylinks= async (req,res) => {
  try{
      
      const lcat1233= await njobsapply
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



exports.createnjobsapplybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const pub1= await njobsapply.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
jobid:req.query.jobid,
job:req.query.job,
salary:req.query.salary,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenjobsapplybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const lcat1= await njobsapply.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
company:req.query.company,
jobid:req.query.jobid,
job:req.query.job,
salary:req.query.salary,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenjobsapplycomments= async (req,res) => {

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
        const lcat1= await njobsapply.findByIdAndUpdate( req.query.id,{
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

exports.deletenjobsapplybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
     

        const user1=req.query.user;
        await njobsapply.findByIdAndDelete(req.query.id);
        
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

exports.getnhigheredurepbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await nhigheredurep.find()
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



exports.nhigheredurepdocs= async (req,res) => {
  try{
      
      const lcat1233= await nhigheredurep
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

exports.nhigheredureplinks= async (req,res) => {
  try{
      
      const lcat1233= await nhigheredurep
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



exports.createnhigheredurepbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
      

        const pub1= await nhigheredurep.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institute:req.query.institute,
targetprogram:req.query.targetprogram,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenhigheredurepbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
     

        const lcat1= await nhigheredurep.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institute:req.query.institute,
targetprogram:req.query.targetprogram,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenhigheredurepcomments= async (req,res) => {

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
        const lcat1= await nhigheredurep.findByIdAndUpdate( req.query.id,{
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

exports.deletenhigheredurepbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
    

        const user1=req.query.user;
        await nhigheredurep.findByIdAndDelete(req.query.id);
        
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

exports.getnoffawardsbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
     
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await noffawards.find()
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



exports.noffawardsdocs= async (req,res) => {
  try{
      
      const lcat1233= await noffawards
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

exports.noffawardslinks= async (req,res) => {
  try{
      
      const lcat1233= await noffawards
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



exports.createnoffawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const pub1= await noffawards.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
event:req.query.event,
award:req.query.award,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const lcat1= await noffawards.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
event:req.query.event,
award:req.query.award,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffawardscomments= async (req,res) => {

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
        const lcat1= await noffawards.findByIdAndUpdate( req.query.id,{
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

exports.deletenoffawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const user1=req.query.user;
        await noffawards.findByIdAndDelete(req.query.id);
        
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

exports.getnoffscholarshipbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await noffscholarship.find()
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



exports.noffscholarshipdocs= async (req,res) => {
  try{
      
      const lcat1233= await noffscholarship
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

exports.noffscholarshiplinks= async (req,res) => {
  try{
      
      const lcat1233= await noffscholarship
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



exports.createnoffscholarshipbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const pub1= await noffscholarship.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
agency:req.query.agency,
scholarship:req.query.scholarship,
amount:req.query.amount,
type:req.query.type,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffscholarshipbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const lcat1= await noffscholarship.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
agency:req.query.agency,
scholarship:req.query.scholarship,
amount:req.query.amount,
type:req.query.type,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffscholarshipcomments= async (req,res) => {

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
        const lcat1= await noffscholarship.findByIdAndUpdate( req.query.id,{
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

exports.deletenoffscholarshipbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       

        const user1=req.query.user;
        await noffscholarship.findByIdAndDelete(req.query.id);
        
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

exports.getnoffextensionbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await noffextension.find()
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



exports.noffextensiondocs= async (req,res) => {
  try{
      
      const lcat1233= await noffextension
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

exports.noffextensionlinks= async (req,res) => {
  try{
      
      const lcat1233= await noffextension
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



exports.createnoffextensionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const pub1= await noffextension.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
event:req.query.event,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
eventdate:new Date(req.query.eventdate),
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


exports.updatenoffextensionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const lcat1= await noffextension.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
event:req.query.event,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
eventdate:new Date(req.query.eventdate),
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


exports.updatenoffextensioncomments= async (req,res) => {

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
        const lcat1= await noffextension.findByIdAndUpdate( req.query.id,{
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

exports.deletenoffextensionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const user1=req.query.user;
        await noffextension.findByIdAndDelete(req.query.id);
        
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

exports.getnoffcoursesbyfac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        const user1=req.query.user;
        const colid=req.query.colid;
        const lcat1233= await noffcourses.find()
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



exports.noffcoursesdocs= async (req,res) => {
  try{
      
      const lcat1233= await noffcourses
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

exports.noffcourseslinks= async (req,res) => {
  try{
      
      const lcat1233= await noffcourses
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



exports.createnoffcoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const pub1= await noffcourses.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
course:req.query.course,
hours:req.query.hours,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffcoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const lcat1= await noffcourses.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
course:req.query.course,
hours:req.query.hours,
currentprogram:req.query.currentprogram,
student:req.query.student,
department:req.query.department,
studentregno:req.query.studentregno,
studentcontact:req.query.studentcontact,
selectiondate:new Date(req.query.selectiondate),
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


exports.updatenoffcoursescomments= async (req,res) => {

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
        const lcat1= await noffcourses.findByIdAndUpdate( req.query.id,{
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

exports.deletenoffcoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        

        const user1=req.query.user;
        await noffcourses.findByIdAndDelete(req.query.id);
        
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


exports.getncommitteesbyfac= async (req,res) => {
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
        const lcat1233= await ncommittees.find()
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



exports.ncommitteesdocs= async (req,res) => {
  try{
      
      const lcat1233= await ncommittees
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

exports.ncommitteeslinks= async (req,res) => {
  try{
      
      const lcat1233= await ncommittees
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



exports.createncommitteesbyfac= async (req,res) => {

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

        const pub1= await ncommittees.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            fromyear:req.query.fromyear,
committee:req.query.committee,
description:req.query.description,
members:req.query.members,
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


exports.updatencommitteesbyfac= async (req,res) => {

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

        const lcat1= await ncommittees.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            fromyear:req.query.fromyear,
committee:req.query.committee,
description:req.query.description,
members:req.query.members,
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


exports.updatencommitteescomments= async (req,res) => {

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
        const lcat1= await ncommittees.findByIdAndUpdate( req.query.id,{
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

exports.deletencommitteesbyfac= async (req,res) => {

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
        await ncommittees.findByIdAndDelete(req.query.id);
        
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

exports.getncommembersbyfac= async (req,res) => {
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
        const lcat1233= await ncommembers.find()
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



exports.ncommembersdocs= async (req,res) => {
  try{
      
      const lcat1233= await ncommembers
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

exports.ncommemberslinks= async (req,res) => {
  try{
      
      const lcat1233= await ncommembers
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



exports.createncommembersbyfac= async (req,res) => {

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

        const pub1= await ncommembers.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            committee:req.query.committee,
committeeid:req.query.committeeid,
member:req.query.member,
username:req.query.username,
memberfrom:new Date(req.query.memberfrom),
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


exports.updatencommembersbyfac= async (req,res) => {

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

        const lcat1= await ncommembers.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            committee:req.query.committee,
committeeid:req.query.committeeid,
member:req.query.member,
username:req.query.username,
memberfrom:new Date(req.query.memberfrom),
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


exports.updatencommemberscomments= async (req,res) => {

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
        const lcat1= await ncommembers.findByIdAndUpdate( req.query.id,{
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

exports.deletencommembersbyfac= async (req,res) => {

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
        await ncommembers.findByIdAndDelete(req.query.id);
        
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

exports.getncomminutesbyfac= async (req,res) => {
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
        const lcat1233= await ncomminutes.find()
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



exports.ncomminutesdocs= async (req,res) => {
  try{
      
      const lcat1233= await ncomminutes
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

exports.ncomminuteslinks= async (req,res) => {
  try{
      
      const lcat1233= await ncomminutes
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



exports.createncomminutesbyfac= async (req,res) => {

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

        const pub1= await ncomminutes.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
committee:req.query.committee,
committeeid:req.query.committeeid,
agenda:req.query.agenda,
meetingdate:new Date(req.query.meetingdate),
type:req.query.type,
discussion:req.query.discussion,
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


exports.updatencomminutesbyfac= async (req,res) => {

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

        const lcat1= await ncomminutes.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
committee:req.query.committee,
committeeid:req.query.committeeid,
agenda:req.query.agenda,
meetingdate:new Date(req.query.meetingdate),
type:req.query.type,
discussion:req.query.discussion,
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


exports.updatencomminutescomments= async (req,res) => {

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
        const lcat1= await ncomminutes.findByIdAndUpdate( req.query.id,{
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

exports.deletencomminutesbyfac= async (req,res) => {

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
        await ncomminutes.findByIdAndDelete(req.query.id);
        
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

exports.getncomtasksbyfac= async (req,res) => {
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
        const lcat1233= await ncomtasks.find()
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



exports.ncomtasksdocs= async (req,res) => {
  try{
      
      const lcat1233= await ncomtasks
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

exports.ncomtaskslinks= async (req,res) => {
  try{
      
      const lcat1233= await ncomtasks
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



exports.createncomtasksbyfac= async (req,res) => {

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

        const pub1= await ncomtasks.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
task:req.query.task,
description:req.query.description,
startdate:new Date(req.query.startdate),
targetdate:new Date(req.query.targetdate),
enddate:new Date(req.query.enddate),
status:req.query.status,
owner:req.query.owner,
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


exports.updatencomtasksbyfac= async (req,res) => {

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

        const lcat1= await ncomtasks.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
task:req.query.task,
description:req.query.description,
startdate:new Date(req.query.startdate),
targetdate:new Date(req.query.targetdate),
enddate:new Date(req.query.enddate),
status:req.query.status,
owner:req.query.owner,
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


exports.updatencomtaskscomments= async (req,res) => {

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
        const lcat1= await ncomtasks.findByIdAndUpdate( req.query.id,{
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

exports.deletencomtasksbyfac= async (req,res) => {

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
        await ncomtasks.findByIdAndDelete(req.query.id);
        
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

// committees
