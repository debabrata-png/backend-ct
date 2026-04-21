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

exports.explearningdocs= async (req,res) => {
    try{
        
        const lcat1233= await Explearning
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

exports.syllabusrevdocs= async (req,res) => {
    try{
        
        const lcat1233= await Syllabusrev
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

exports.cbcsimpldocs= async (req,res) => {
    try{
        
        const lcat1233= await Syllabusrev
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

exports.employabilitydocs= async (req,res) => {
    try{
        
        const lcat1233= await Employability
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


exports.employabilitydocsdep= async (req,res) => {
  try{
      
      const lcat1233= await Employability
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
                  $lookup: {
                    from: 'users', 
                    localField: 'user', 
                    foreignField: 'email', 
                    as: 'userdetails'
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

exports.admissiondocs= async (req,res) => {
    try{
        
        const lcat1233= await Admission
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

exports.reservecatdocs= async (req,res) => {
    try{
        
        const lcat1233= await Reservecat
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

exports.seminardocs= async (req,res) => {
    try{
        
        const lcat1233= await Seminar
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

exports.publicationdocs= async (req,res) => {
    try{
        
        const lcat1233= await Publication
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

exports.patentdocs= async (req,res) => {
    try{
        
        const lcat1233= await Patent
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

exports.bookdocs= async (req,res) => {
    try{
        
        const lcat1233= await Book
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

exports.projectdoccomments= async (req,res) => {
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

exports.bookdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Book
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

exports.patentdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Patent
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

exports.pubdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Publication
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

exports.seminardoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Seminar
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

exports.admissiondoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Admission
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

exports.teacherawarddoccoms= async (req,res) => {
  try{
      
      const lcat1233= await Teacherawards
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

exports.innovationdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Innovation
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

exports.teacherfellowdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Teacherfellow
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

exports.eventdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Event
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

exports.eventdoccommentsbyuser= async (req,res) => {
  try{
      
      const lcat1233= await Event
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
                    'user':req.query.user
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

exports.seedmdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Seedmoney
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

exports.seedmdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Seedmoney
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

exports.scholarshipdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Scholarship
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

exports.careerdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Careercounsel
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

exports.skilldevdoccomments= async (req,res) => {
  try{

    const yearl=req.query.year * 1;
    const yearg=yearl+1;
      
      const lcat1233= await Skilldev
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
                    'date': {
                      $gte: new Date(`${yearl}-06-01`),
                      $lte: new Date(`${yearg}-05-31`)
                    }
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

exports.skilldevdoccommentsall= async (req,res) => {
  try{

    const yearl=req.query.year * 1;
    const yearg=yearl+1;
      
      const lcat1233= await Skilldev
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


exports.placementdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Placement
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

exports.bosdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await BOS
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

exports.ictdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await ICT
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

exports.econtentdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Econtent
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

exports.extensiondoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Extact
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

exports.extawardsdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Extensionawards
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

exports.collabdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Collab
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

exports.moudoccomments= async (req,res) => {
  try{
      
      const lcat1233= await MoU
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

exports.librarydoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Library
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

exports.fundsdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Funds
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

exports.teacherfsdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Teachersupport
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

exports.qualitydoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Quality
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

exports.addoncdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await AddOnCourse
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

exports.expendituredoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Expenditure
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

exports.teacherdatadoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Teacherdata
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

exports.passdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Passpercentage
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

exports.examdaysdoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Examdays
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

exports.consultancydoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Consultancy
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

exports.phdguidedoccomments= async (req,res) => {
  try{
      
      const lcat1233= await Phdguide
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

exports.explearnprojdocs= async (req,res) => {
  try{
      
      const lcat1233= await Explearnproj
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

exports.cbcsdocs= async (req,res) => {
  try{
      
      const lcat1233= await CBCS
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


exports.researchfellowdocs= async (req,res) => {
  try{
      
      const lcat1233= await Researchfellow
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

exports.incubationdocs= async (req,res) => {
  try{
      
      const lcat1233= await Incubation
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

exports.higheredudocs= async (req,res) => {
  try{
      
      const lcat1233= await Highereducation
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

exports.higherexamdocs= async (req,res) => {
  try{
      
      const lcat1233= await Higherexam
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

exports.justawarddocs= async (req,res) => {
  try{
      
      const lcat1233= await Justawards
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

exports.sportsactdocs= async (req,res) => {
  try{
      
      const lcat1233= await Sportsact
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

exports.fdpcol= async (req,res) => {
  try{
      
      const lcat1233= await Fdpcol
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

exports.fieldproj= async (req,res) => {
  try{
      
      const lcat1233= await Fieldproj
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