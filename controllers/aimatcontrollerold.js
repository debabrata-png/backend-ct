const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Kpi=require('./../Models/kpi');

const projects=require('./../Models/projects');
const publications=require('./../Models/publications');
const patents=require('./../Models/patents');
const teacherfellow=require('./../Models/teacherfellow');
const consultancy=require('./../Models/consultancy');
const phdguide=require('./../Models/phdguide');
const seminar=require('./../Models/seminar');
const book=require('./../Models/book');


const examschedule=require('./../Models/examschedule');
const examroom=require('./../Models/examroom');

const mprograms=require('./../Models/mprograms');
const mcourses=require('./../Models/mcourses');
const mstudents=require('./../Models/mstudents');
const examtimetable=require('./../Models/examtimetable');

const mfaccourses=require('./../Models/mfaccourses');
const mfaccoursesatt=require('./../Models/mfaccoursesatt');

const mattcalc=require('./../Models/mattcalc');

const mcolevels=require('./../Models/mcolevels');

const mcourseslist=require('./../Models/mcourseslist');

const mstudents1=require('./../Models/mstudents1');

const madmapplys=require('./../Models/madmapplys');
const madmapplya=require('./../Models/madmapplya');

const classenr1=require('./../Models/classenr1');

const msyllabus=require('./../Models/msyllabus');

const massignments=require('./../Models/massignments');
const manouncements=require('./../Models/manouncements');
const mcourseco=require('./../Models/mcourseco');
const mcalendar=require('./../Models/mcalendar');
const mcoursematerial=require('./../Models/mcoursematerial');

const massignsubmit=require('./../Models/massignsubmit');
const mdiscussion=require('./../Models/mdiscussion');


const quotanew=require('./../Models/quotanew');

const classnew=require('./../Models/classnew');
const attendancenew=require('./../Models/attendancenew');

const scholnew=require('./../Models/scholnew');
const studawardsnew=require('./../Models/studawardsnew');


const slideshow=require('./../Models/slideshow');

const eventsnew1=require('./../Models/eventsnew1');

const testnew=require('./../Models/testnew');
const testq=require('./../Models/testq');
const testo=require('./../Models/testo');

const testscores=require('./../Models/testscores');

const lmsvideos=require('./../Models/lmsvideos');
const lmsvideosc=require('./../Models/lmsvideosc');

const mvac=require('./../Models/mvac');


const lpublications=require('./../Models/lpublications');
const lpubeditions=require('./../Models/lpubeditions');
const lpubarticles=require('./../Models/lpubarticles');
const lpubreviews=require('./../Models/lpubreviews');












exports.getprojectsbyfac= async (req,res) => {
    try{
        
        const lcat1233= await projects
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
  
  
  exports.projectsbydep= async (req,res) => {
    try{
        
        const lcat1233= await projects
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
                      'department':req.query.department
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
  
  
  exports.projectsbyprog= async (req,res) => {
    try{
        
        const lcat1233= await projects
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
                      'programcode':req.query.programcode
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
  
  
  exports.projectsdocs= async (req,res) => {
    try{
        
        const lcat1233= await projects
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
  
  exports.projectslinks= async (req,res) => {
    try{
        
        const lcat1233= await projects
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
  
  
  
  exports.createprojectsbyfac= async (req,res) => {
  
      try{
          const token=req.query.token;
          //console.log(token);
          let jwtuser='';
          let jwtcolid='';
          try {
              const verified = jwt.verify(
                  token,
                  process.env.JWT_SECRET,
                  (err123, verified) => {
                    if (err123) {
                      return res.status(401).json({
                          status: 'Unauthorized',
                          error: err123
                      });
                    }
                    jwtuser=verified.user;
                    jwtcolid=verified.colid;
                    return verified;
                  }
                );
          } catch(err1234) {
              //console.log(err1234);
          }
  
          const pub1= await projects.create({
              name: req.query.name,
              colid: req.query.colid,
              user: req.query.user,
              name:req.query.name,
  user:req.query.user,
  project:req.query.project,
  agency:req.query.agency,
  type:req.query.type,
  yop:req.query.yop,
  department:req.query.department,
  funds:req.query.funds,
  colid:req.query.colid,
  level:req.query.level,
  duration:req.query.duration,
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
  
  
  exports.updateprojectsbyfac= async (req,res) => {
  
      try{
          const token=req.query.token;
          //console.log(token);
          let jwtuser='';
          let jwtcolid='';
          try {
              const verified = jwt.verify(
                  token,
                  process.env.JWT_SECRET,
                  (err123, verified) => {
                    if (err123) {
                      return res.status(401).json({
                          status: 'Unauthorized',
                          error: err123
                      });
                    }
                    jwtuser=verified.user;
                    jwtcolid=verified.colid;
                    return verified;
                  }
                );
          } catch(err1234) {
              //console.log(err1234);
          }
  
          const lcat1= await projects.findByIdAndUpdate( req.query.id,{
              
              
              name:req.query.name,
  user:req.query.user,
  project:req.query.project,
  agency:req.query.agency,
  type:req.query.type,
  yop:req.query.yop,
  department:req.query.department,
  funds:req.query.funds,
  colid:req.query.colid,
  level:req.query.level,
  duration:req.query.duration,
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
  
  
  exports.updateprojectscomments= async (req,res) => {
  
      try{
          const token=req.query.token;
          //console.log(token);
          let jwtuser='';
          let jwtcolid='';
          try {
              const verified = jwt.verify(
                  token,
                  process.env.JWT_SECRET,
                  (err123, verified) => {
                    if (err123) {
                      return res.status(401).json({
                          status: 'Unauthorized',
                          error: err123
                      });
                    }
                    jwtuser=verified.user;
                    jwtcolid=verified.colid;
                    return verified;
                  }
                );
          } catch(err1234) {
              //console.log(err1234);
          }
          const lcat1= await projects.findByIdAndUpdate( req.query.id,{
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
  
  exports.deleteprojectsbyfac= async (req,res) => {
  
      try{
          const token=req.query.token;
          //console.log(token);
          let jwtuser='';
          let jwtcolid='';
          try {
              const verified = jwt.verify(
                  token,
                  process.env.JWT_SECRET,
                  (err123, verified) => {
                    if (err123) {
                      return res.status(401).json({
                          status: 'Unauthorized',
                          error: err123
                      });
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
          await projects.findByIdAndDelete(req.query.id);
          
          res.status(200).json({
              status:'Success'
          });
                 
         
      } catch(err) {
          res.status(400).json({
              status:'Failed',
              message: err
          });
  
      }  
  };


  exports.getprojectscount= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await projects.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$yop', 
    total_attendance: {$sum : 1}
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
  
  
    exports.getprojectssecond= async (req,res) => {
      try{
      //const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await projects.aggregate([
      { 
      $match: {colid: colid1 }
      },
      { 
      $group: {
      _id:'$yop', 
      total_attendance: {$sum : '$funds'}
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
  
  
  
      exports.getprojectscountbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await projects.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$yop', 
        total_attendance: {$sum : 1}
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
      
      
        exports.getprojectssecondbyfac= async (req,res) => {
          try{
          const user1=req.query.user;
          const colid1=parseInt(req.query.colid);
          const lcat1233= await projects.aggregate([
          { 
          $match: {colid: colid1, user: user1 }
          },
          { 
          $group: {
          _id:'$yop', 
          total_attendance: {$sum : '$funds'}
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
  
  
  // jun 8 2024


exports.getpublicationsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await publications
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


exports.publicationsbydep= async (req,res) => {
  try{
      
      const lcat1233= await publications
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
                    'department':req.query.department
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


exports.publicationsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await publications
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
                    'programcode':req.query.programcode
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


exports.publicationsdocs= async (req,res) => {
  try{
      
      const lcat1233= await publications
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

exports.publicationslinks= async (req,res) => {
  try{
      
      const lcat1233= await publications
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



exports.createpublicationsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await publications.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            name:req.query.name,
user:req.query.user,
department:req.query.department,
title:req.query.title,
journal:req.query.journal,
yop:req.query.yop,
colid:req.query.colid,
issn:req.query.issn,
articlelink:req.query.articlelink,
journallink:req.query.journallink,
hindex:req.query.hindex,
citation:req.query.citation,
level:req.query.level,
citationindex:req.query.citationindex,
ugclisted:req.query.ugclisted,
doclink:req.query.doclink,
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


exports.updatepublicationsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await publications.findByIdAndUpdate( req.query.id,{
            
            
            name:req.query.name,
user:req.query.user,
department:req.query.department,
title:req.query.title,
journal:req.query.journal,
yop:req.query.yop,
colid:req.query.colid,
issn:req.query.issn,
articlelink:req.query.articlelink,
journallink:req.query.journallink,
hindex:req.query.hindex,
citation:req.query.citation,
level:req.query.level,
citationindex:req.query.citationindex,
ugclisted:req.query.ugclisted,
doclink:req.query.doclink,
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


exports.updatepublicationscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await publications.findByIdAndUpdate( req.query.id,{
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

exports.deletepublicationsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await publications.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getpatentsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await patents
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


exports.patentsbydep= async (req,res) => {
  try{
      
      const lcat1233= await patents
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
                    'department':req.query.department
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


exports.patentsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await patents
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
                    'programcode':req.query.programcode
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


exports.patentsdocs= async (req,res) => {
  try{
      
      const lcat1233= await patents
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

exports.patentslinks= async (req,res) => {
  try{
      
      const lcat1233= await patents
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



exports.createpatentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await patents.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            title:req.query.title,
patentnumber:req.query.patentnumber,
doa:req.query.doa,
agency:req.query.agency,
yop:req.query.yop,
doclink:req.query.doclink,
patentstatus:req.query.patentstatus,
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


exports.updatepatentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await patents.findByIdAndUpdate( req.query.id,{
            
            
            title:req.query.title,
patentnumber:req.query.patentnumber,
doa:req.query.doa,
agency:req.query.agency,
yop:req.query.yop,
doclink:req.query.doclink,
patentstatus:req.query.patentstatus,
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


exports.updatepatentscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await patents.findByIdAndUpdate( req.query.id,{
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

exports.deletepatentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await patents.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getteacherfellowbyfac= async (req,res) => {
  try{
      
      const lcat1233= await teacherfellow
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


exports.teacherfellowbydep= async (req,res) => {
  try{
      
      const lcat1233= await teacherfellow
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
                    'department':req.query.department
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


exports.teacherfellowbyprog= async (req,res) => {
  try{
      
      const lcat1233= await teacherfellow
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
                    'programcode':req.query.programcode
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


exports.teacherfellowdocs= async (req,res) => {
  try{
      
      const lcat1233= await teacherfellow
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

exports.teacherfellowlinks= async (req,res) => {
  try{
      
      const lcat1233= await teacherfellow
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



exports.createteacherfellowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await teacherfellow.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
tname:req.query.tname,
level:req.query.level,
award:req.query.award,
agency:req.query.agency,
advanced:req.query.advanced,
duration:req.query.duration,
amount:req.query.amount,
doclink:req.query.doclink,
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


exports.updateteacherfellowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await teacherfellow.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
tname:req.query.tname,
level:req.query.level,
award:req.query.award,
agency:req.query.agency,
advanced:req.query.advanced,
duration:req.query.duration,
amount:req.query.amount,
doclink:req.query.doclink,
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


exports.updateteacherfellowcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await teacherfellow.findByIdAndUpdate( req.query.id,{
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

exports.deleteteacherfellowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await teacherfellow.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getconsultancybyfac= async (req,res) => {
  try{
      
      const lcat1233= await consultancy
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


exports.consultancybydep= async (req,res) => {
  try{
      
      const lcat1233= await consultancy
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
                    'department':req.query.department
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


exports.consultancybyprog= async (req,res) => {
  try{
      
      const lcat1233= await consultancy
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
                    'programcode':req.query.programcode
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


exports.consultancydocs= async (req,res) => {
  try{
      
      const lcat1233= await consultancy
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

exports.consultancylinks= async (req,res) => {
  try{
      
      const lcat1233= await consultancy
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



exports.createconsultancybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await consultancy.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            consultant:req.query.consultant,
title:req.query.title,
agency:req.query.agency,
year:req.query.year,
revenue:req.query.revenue,
trainees:req.query.trainees,
advisor:req.query.advisor,
department:req.query.department,
role:req.query.role,
contact:req.query.contact,
duration:req.query.duration,
doclink:req.query.doclink,
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


exports.updateconsultancybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await consultancy.findByIdAndUpdate( req.query.id,{
            
            
            consultant:req.query.consultant,
title:req.query.title,
agency:req.query.agency,
year:req.query.year,
revenue:req.query.revenue,
trainees:req.query.trainees,
advisor:req.query.advisor,
department:req.query.department,
role:req.query.role,
contact:req.query.contact,
duration:req.query.duration,
doclink:req.query.doclink,
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


exports.updateconsultancycomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await consultancy.findByIdAndUpdate( req.query.id,{
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

exports.deleteconsultancybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await consultancy.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getphdguidebyfac= async (req,res) => {
  try{
      
      const lcat1233= await phdguide
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


exports.phdguidebydep= async (req,res) => {
  try{
      
      const lcat1233= await phdguide
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
                    'department':req.query.department
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


exports.phdguidebyprog= async (req,res) => {
  try{
      
      const lcat1233= await phdguide
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
                    'programcode':req.query.programcode
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


exports.phdguidedocs= async (req,res) => {
  try{
      
      const lcat1233= await phdguide
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

exports.phdguidelinks= async (req,res) => {
  try{
      
      const lcat1233= await phdguide
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



exports.createphdguidebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await phdguide.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department:req.query.department,
researchguide:req.query.researchguide,
yog:req.query.yog,
scholar:req.query.scholar,
title:req.query.title,
yor:req.query.yor,
yop:req.query.yop,
doclink:req.query.doclink,
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


exports.updatephdguidebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await phdguide.findByIdAndUpdate( req.query.id,{
            
            
            department:req.query.department,
researchguide:req.query.researchguide,
yog:req.query.yog,
scholar:req.query.scholar,
title:req.query.title,
yor:req.query.yor,
yop:req.query.yop,
doclink:req.query.doclink,
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


exports.updatephdguidecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await phdguide.findByIdAndUpdate( req.query.id,{
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

exports.deletephdguidebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await phdguide.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getseminarbyfac= async (req,res) => {
  try{
      
      const lcat1233= await seminar
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


exports.seminarbydep= async (req,res) => {
  try{
      
      const lcat1233= await seminar
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
                    'department':req.query.department
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


exports.seminarbyprog= async (req,res) => {
  try{
      
      const lcat1233= await seminar
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
                    'programcode':req.query.programcode
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
      
      const lcat1233= await seminar
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

exports.seminarlinks= async (req,res) => {
  try{
      
      const lcat1233= await seminar
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



exports.createseminarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await seminar.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            title:req.query.title,
duration:req.query.duration,
yop:req.query.yop,
membership:req.query.membership,
amount:req.query.amount,
role:req.query.role,
paper:req.query.paper,
level:req.query.level,
type:req.query.type,
doclink:req.query.doclink,
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


exports.updateseminarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await seminar.findByIdAndUpdate( req.query.id,{
            
            
            title:req.query.title,
duration:req.query.duration,
yop:req.query.yop,
membership:req.query.membership,
amount:req.query.amount,
role:req.query.role,
paper:req.query.paper,
level:req.query.level,
type:req.query.type,
doclink:req.query.doclink,
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


exports.updateseminarcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await seminar.findByIdAndUpdate( req.query.id,{
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

exports.deleteseminarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await seminar.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getbookbyfac= async (req,res) => {
  try{
      
      const lcat1233= await book
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


exports.bookbydep= async (req,res) => {
  try{
      
      const lcat1233= await book
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
                    'department':req.query.department
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


exports.bookbyprog= async (req,res) => {
  try{
      
      const lcat1233= await book
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
                    'programcode':req.query.programcode
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
      
      const lcat1233= await book
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

exports.booklinks= async (req,res) => {
  try{
      
      const lcat1233= await book
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



exports.createbookbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await book.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            booktitle:req.query.booktitle,
papertitle:req.query.papertitle,
proceeding:req.query.proceeding,
yop:req.query.yop,
issn:req.query.issn,
publisher:req.query.publisher,
conferencename:req.query.conferencename,
level:req.query.level,
affiliated:req.query.affiliated,
type:req.query.type,
doclink:req.query.doclink,
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


exports.updatebookbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await book.findByIdAndUpdate( req.query.id,{
            
            
            booktitle:req.query.booktitle,
papertitle:req.query.papertitle,
proceeding:req.query.proceeding,
yop:req.query.yop,
issn:req.query.issn,
publisher:req.query.publisher,
conferencename:req.query.conferencename,
level:req.query.level,
affiliated:req.query.affiliated,
type:req.query.type,
doclink:req.query.doclink,
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


exports.updatebookcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await book.findByIdAndUpdate( req.query.id,{
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

exports.deletebookbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await book.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



// jun 8 2024 graph api

exports.getpublicationscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await publications.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$yop', 
  total_attendance: {$sum : 1}
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


  exports.getpublicationssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await publications.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$ugclisted', 
    total_attendance: {$sum : 1}
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



    exports.getpublicationscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await publications.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$yop', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getpublicationssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await publications.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$ugclisted', 
        total_attendance: {$sum : 1}
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




exports.getpatentscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await patents.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$yop', 
  total_attendance: {$sum : 1}
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


  exports.getpatentssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await patents.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$patentstatus', 
    total_attendance: {$sum : 1}
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



    exports.getpatentscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await patents.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$yop', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getpatentssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await patents.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$patentstatus', 
        total_attendance: {$sum : 1}
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




exports.getteacherfellowcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await teacherfellow.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getteacherfellowsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await teacherfellow.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum : '$amount'}
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



    exports.getteacherfellowcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await teacherfellow.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getteacherfellowsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await teacherfellow.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$year', 
        total_attendance: {$sum : '$amount'}
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




exports.getconsultancycount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await consultancy.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getconsultancysecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await consultancy.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum : '$revenue'}
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



    exports.getconsultancycountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await consultancy.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getconsultancysecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await consultancy.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$year', 
        total_attendance: {$sum : '$revenue'}
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




exports.getphdguidecount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await phdguide.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$yor', 
  total_attendance: {$sum : 1}
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


  exports.getphdguidesecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await phdguide.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$yop', 
    total_attendance: {$sum : 1}
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



    exports.getphdguidecountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await phdguide.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$yor', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getphdguidesecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await phdguide.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$yop', 
        total_attendance: {$sum : 1}
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




exports.getseminarcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await seminar.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$yop', 
  total_attendance: {$sum : 1}
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


  exports.getseminarsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await seminar.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : '$amount'}
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



    exports.getseminarcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await seminar.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$yop', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getseminarsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await seminar.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : '$amount'}
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




exports.getbookcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await book.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$yop', 
  total_attendance: {$sum : 1}
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


  exports.getbooksecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await book.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$level', 
    total_attendance: {$sum : 1}
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



    exports.getbookcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await book.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$yop', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getbooksecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await book.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$level', 
        total_attendance: {$sum : 1}
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


        // jun 9 2024


  
exports.getexamschedulebyfac= async (req,res) => {
  try{
      
      const lcat1233= await examschedule
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


exports.examschedulebydep= async (req,res) => {
  try{
      
      const lcat1233= await examschedule
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
                    'department':req.query.department
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


exports.examschedulebyprog= async (req,res) => {
  try{
      
      const lcat1233= await examschedule
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
                    'programcode':req.query.programcode
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


exports.examscheduledocs= async (req,res) => {
  try{
      
      const lcat1233= await examschedule
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

exports.examschedulelinks= async (req,res) => {
  try{
      
      const lcat1233= await examschedule
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



exports.createexamschedulebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await examschedule.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
exam:req.query.exam,
examcode:req.query.examcode,
fromdate:req.query.fromdate,
todate:req.query.todate,
semester:req.query.semester,
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


exports.updateexamschedulebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await examschedule.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
exam:req.query.exam,
examcode:req.query.examcode,
fromdate:req.query.fromdate,
todate:req.query.todate,
semester:req.query.semester,
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


exports.updateexamschedulecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await examschedule.findByIdAndUpdate( req.query.id,{
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

exports.deleteexamschedulebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await examschedule.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getexamroombyfac= async (req,res) => {
  try{
      
      const lcat1233= await examroom
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


exports.examroombydep= async (req,res) => {
  try{
      
      const lcat1233= await examroom
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
                    'department':req.query.department
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


exports.examroombyprog= async (req,res) => {
  try{
      
      const lcat1233= await examroom
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
                    'programcode':req.query.programcode
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


exports.examroomdocs= async (req,res) => {
  try{
      
      const lcat1233= await examroom
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

exports.examroomlinks= async (req,res) => {
  try{
      
      const lcat1233= await examroom
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



exports.createexamroombyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await examroom.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
examcode:req.query.examcode,
seatno:req.query.seatno,
roomno:req.query.roomno,
roomseatno:req.query.roomseatno,
programcode:req.query.programcode,
coursecode:req.query.coursecode,
examdate:req.query.examdate,
student:req.query.student,
regno:req.query.regno,
photo:req.query.photo,
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


exports.updateexamroombyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await examroom.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
examcode:req.query.examcode,
seatno:req.query.seatno,
roomno:req.query.roomno,
roomseatno:req.query.roomseatno,
programcode:req.query.programcode,
coursecode:req.query.coursecode,
examdate:req.query.examdate,
student:req.query.student,
regno:req.query.regno,
photo:req.query.photo,
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


exports.updateexamroomcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await examroom.findByIdAndUpdate( req.query.id,{
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

exports.deleteexamroombyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await examroom.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getexamschedulecount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await examschedule.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getexamschedulesecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await examschedule.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$semester', 
    total_attendance: {$sum : 1}
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



    exports.getexamschedulecountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await examschedule.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getexamschedulesecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await examschedule.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$semester', 
        total_attendance: {$sum : 1}
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




exports.getexamroomcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await examroom.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getexamroomsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await examroom.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$programcode', 
    total_attendance: {$sum : 1}
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



    exports.getexamroomcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await examroom.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getexamroomsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await examroom.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$programcode', 
        total_attendance: {$sum : 1}
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

// jun 16 2024


exports.getmprogramsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mprograms
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

exports.getmprogramsbyyear= async (req,res) => {
  try{
      
      const lcat1233= await mprograms
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
                    'year':req.query.year
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


exports.mprogramsbydep= async (req,res) => {
  try{
      
      const lcat1233= await mprograms
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
                    'department':req.query.department
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


exports.mprogramsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mprograms
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
                    'programcode':req.query.programcode
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


exports.mprogramsdocs= async (req,res) => {
  try{
      
      const lcat1233= await mprograms
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

exports.mprogramslinks= async (req,res) => {
  try{
      
      const lcat1233= await mprograms
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



exports.createmprogramsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mprograms.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
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


exports.updatemprogramsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mprograms.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
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


exports.updatemprogramscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mprograms.findByIdAndUpdate( req.query.id,{
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

exports.deletemprogramsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mprograms.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmcoursesbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mcourses
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

exports.getmcoursesbyyear= async (req,res) => {
  try{
      
      const lcat1233= await mcourses
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
                    'year':req.query.year
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


exports.mcoursesbydep= async (req,res) => {
  try{
      
      const lcat1233= await mcourses
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
                    'department':req.query.department
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


exports.mcoursesbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mcourses
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
                    'programcode':req.query.programcode
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


exports.mcoursesdocs= async (req,res) => {
  try{
      
      const lcat1233= await mcourses
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

exports.mcourseslinks= async (req,res) => {
  try{
      
      const lcat1233= await mcourses
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



exports.createmcoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mcourses.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
type:req.query.type,
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


exports.updatemcoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mcourses.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
type:req.query.type,
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


exports.updatemcoursescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mcourses.findByIdAndUpdate( req.query.id,{
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

exports.deletemcoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mcourses.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmstudentsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mstudents
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


exports.mstudentsbydep= async (req,res) => {
  try{
      
      const lcat1233= await mstudents
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
                    'department':req.query.department
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


exports.mstudentsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mstudents
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
                    'programcode':req.query.programcode
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


exports.mstudentsdocs= async (req,res) => {
  try{
      
      const lcat1233= await mstudents
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

exports.mstudentslinks= async (req,res) => {
  try{
      
      const lcat1233= await mstudents
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



exports.createmstudentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mstudents.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            student:req.query.student,
regno:req.query.regno,
rollno:req.query.rollno,
program:req.query.program,
programcode:req.query.programcode,
batch:req.query.batch,
year:req.query.year,
gender:req.query.gender,
category:req.query.category,
pwd:req.query.pwd,
minority:req.query.minority,
username:req.query.username,
password:req.query.password,
enabled:req.query.enabled,
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


exports.updatemstudentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mstudents.findByIdAndUpdate( req.query.id,{
            
            
            student:req.query.student,
regno:req.query.regno,
rollno:req.query.rollno,
program:req.query.program,
programcode:req.query.programcode,
batch:req.query.batch,
year:req.query.year,
gender:req.query.gender,
category:req.query.category,
pwd:req.query.pwd,
minority:req.query.minority,
username:req.query.username,
password:req.query.password,
enabled:req.query.enabled,
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


exports.updatemstudentscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mstudents.findByIdAndUpdate( req.query.id,{
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

exports.deletemstudentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mstudents.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getexamtimetablebyfac= async (req,res) => {
  try{
      
      const lcat1233= await examtimetable
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


exports.examtimetablebydep= async (req,res) => {
  try{
      
      const lcat1233= await examtimetable
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
                    'department':req.query.department
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


exports.examtimetablebyprog= async (req,res) => {
  try{
      
      const lcat1233= await examtimetable
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
                    'programcode':req.query.programcode
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


exports.examtimetabledocs= async (req,res) => {
  try{
      
      const lcat1233= await examtimetable
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

exports.examtimetablelinks= async (req,res) => {
  try{
      
      const lcat1233= await examtimetable
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



exports.createexamtimetablebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await examtimetable.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
examcode:req.query.examcode,
examdate:req.query.examdate,
examslot:req.query.examslot,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
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


exports.updateexamtimetablebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await examtimetable.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
examcode:req.query.examcode,
examdate:req.query.examdate,
examslot:req.query.examslot,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
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


exports.updateexamtimetablecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await examtimetable.findByIdAndUpdate( req.query.id,{
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

exports.deleteexamtimetablebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await examtimetable.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


// jun 16 graph

exports.getmprogramscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mprograms.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmprogramssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mprograms.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmprogramscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mprograms.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmprogramssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mprograms.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmcoursescount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mcourses.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmcoursessecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mcourses.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmcoursescountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mcourses.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmcoursessecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mcourses.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmstudentscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mstudents.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmstudentssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mstudents.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$category', 
    total_attendance: {$sum : 1}
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



    exports.getmstudentscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mstudents.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmstudentssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mstudents.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$category', 
        total_attendance: {$sum : 1}
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




exports.getexamtimetablecount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await examtimetable.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getexamtimetablesecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await examtimetable.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getexamtimetablecountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await examtimetable.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getexamtimetablesecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await examtimetable.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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

// June 19 2024


exports.getmfaccoursesbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mfaccourses
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


exports.mfaccoursesbydep= async (req,res) => {
  try{
      
      const lcat1233= await mfaccourses
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
                    'department':req.query.department
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


exports.mfaccoursesbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mfaccourses
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
                    'programcode':req.query.programcode
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


exports.mfaccoursesdocs= async (req,res) => {
  try{
      
      const lcat1233= await mfaccourses
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

exports.mfaccourseslinks= async (req,res) => {
  try{
      
      const lcat1233= await mfaccourses
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



exports.createmfaccoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mfaccourses.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
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


exports.updatemfaccoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mfaccourses.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
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


exports.updatemfaccoursescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mfaccourses.findByIdAndUpdate( req.query.id,{
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

exports.deletemfaccoursesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mfaccourses.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmfaccoursesattbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mfaccoursesatt
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

exports.getmfaccoursesattbyfac1= async (req,res) => {
  try{
      
      const lcat1233= await mfaccoursesatt
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
                    'user':req.query.user,
                    'coursename':req.query.coursename,
                    'coursecode':req.query.coursecode
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


exports.mfaccoursesattbydep= async (req,res) => {
  try{
      
      const lcat1233= await mfaccoursesatt
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
                    'department':req.query.department
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


exports.mfaccoursesattbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mfaccoursesatt
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
                    'programcode':req.query.programcode
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


exports.mfaccoursesattdocs= async (req,res) => {
  try{
      
      const lcat1233= await mfaccoursesatt
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

exports.mfaccoursesattlinks= async (req,res) => {
  try{
      
      const lcat1233= await mfaccoursesatt
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



exports.createmfaccoursesattbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mfaccoursesatt.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
co:req.query.co,
component:req.query.component,
student:req.query.student,
regno:req.query.regno,
marks:req.query.marks,
weightage:req.query.weightage,
totalmarks:req.query.totalmarks,
percentage:req.query.percentage,
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


exports.updatemfaccoursesattbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mfaccoursesatt.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
co:req.query.co,
component:req.query.component,
student:req.query.student,
regno:req.query.regno,
marks:req.query.marks,
weightage:req.query.weightage,
totalmarks:req.query.totalmarks,
percentage:req.query.percentage,
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


exports.updatemfaccoursesattcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mfaccoursesatt.findByIdAndUpdate( req.query.id,{
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

exports.deletemfaccoursesattbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mfaccoursesatt.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// june 19 2024 graph

exports.getmfaccoursescount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mfaccourses.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmfaccoursessecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mfaccourses.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmfaccoursescountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mfaccourses.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmfaccoursessecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mfaccourses.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmfaccoursesattcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mfaccoursesatt.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmfaccoursesattsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mfaccoursesatt.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$co', 
    total_attendance: {$avg : '$percentage'}
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



    exports.getmfaccoursesattcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const coursecode=req.query.coursecode;
      const coursename=req.query.coursename;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mfaccoursesatt.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursename: coursename, coursecode: coursecode }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmfaccoursesattsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const coursecode=req.query.coursecode;
      const coursename=req.query.coursename;
        const lcat1233= await mfaccoursesatt.aggregate([
        { 
        $match: {colid: colid1, user: user1,  coursename: coursename, coursecode: coursecode }
        },
        { 
        $group: {
        _id:'$component', 
        total_attendance: {$sum : 1}
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


// Jun 19n 2024 1


exports.getmattcalcbyfac= async (req,res) => {
  try{

    const coursecode=req.query.coursecode;
    const coursename=req.query.coursename;
      
      const lcat1233= await mattcalc
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
                    'user':req.query.user,
                    'coursename':req.query.coursename,
                    'coursecode':req.query.coursecode
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


exports.mattcalcbydep= async (req,res) => {
  try{
      
      const lcat1233= await mattcalc
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
                    'department':req.query.department
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


exports.mattcalcbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mattcalc
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
                    'programcode':req.query.programcode
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


exports.mattcalcdocs= async (req,res) => {
  try{
      
      const lcat1233= await mattcalc
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

exports.mattcalclinks= async (req,res) => {
  try{
      
      const lcat1233= await mattcalc
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



exports.createmattcalcbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mattcalc.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
faculty:req.query.faculty,
co:req.query.co,
component:req.query.component,
marksp:req.query.marksp,
weightage:req.query.weightage,
percentage:req.query.percentage,
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


exports.updatemattcalcbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mattcalc.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
faculty:req.query.faculty,
co:req.query.co,
component:req.query.component,
marksp:req.query.marksp,
weightage:req.query.weightage,
percentage:req.query.percentage,
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


exports.updatemattcalccomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mattcalc.findByIdAndUpdate( req.query.id,{
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

exports.deletemattcalcbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mattcalc.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getmattcalccount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mattcalc.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmattcalcsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mattcalc.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$co', 
    total_attendance: {$avg : '$percentage'}
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



    exports.getmattcalccountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const coursecode=req.query.coursecode;
      const coursename=req.query.coursename;
      const lcat1233= await mattcalc.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursename: coursename, coursecode: coursecode }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmattcalcsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const coursecode=req.query.coursecode;
        const coursename=req.query.coursename;

        const lcat1233= await mattcalc.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursename: coursename, coursecode: coursecode }
        },
        { 
        $group: {
        _id:'$co', 
        total_attendance: {$sum : '$percentage'}
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



        exports.addcoattainmentv= async (req,res) => {
          try{
          const colid1=parseInt(req.query.colid);
          const coursecode=req.query.coursecode;
          const coursename=req.query.coursename;
          var cbcscount=0;
          const d1=await mattcalc.deleteMany( { colid : req.query.colid, coursename: req.query.coursename, coursecode: req.query.coursecode, user: req.query.user } );
          const lcat1233= await mfaccoursesatt.aggregate([
          { 
          $match: {colid: colid1, coursename: coursename, coursecode: coursecode }
          },
          { 
          $group: {
          // _id:['$regno','$name'],
          // _id:['$regno','$name'], 
          _id: {
          co: '$co',
          component: '$component',
          year: '$year'
          },
          total_attendance: {$avg: '$percentage'}
          }
          }
          ]);
          lcat1233.forEach(async function(data){
          //console.log(data.link);
          //cbcscount=data.total_attendance;
          var percentage=parseFloat(data.total_attendance) * 0.3;
          const pub1= await mattcalc.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            
            year:data._id.year,
coursename:req.query.coursename,
coursecode:req.query.coursecode,
faculty:req.query.user,
co:data._id.co,
component:data._id.component,
marksp:data.total_attendance,
weightage:0.3,
percentage:percentage,
status1: 'Submitted',
            comments: 'NA'
        });
          })
          // const lcat1=await Kpi.findOneAndUpdate( {metric: '1.2.2', colid: colid1, type: 'University'},{
          // currentvalue: cbcscount
          // });
          // const lcat2=await Kpi.findOneAndUpdate( {metric: '1.2.1', colid: colid1, type: 'Affiliated'},{
          //     currentvalue: cbcscount
          // });
          // const lcat3=await Kpi.findOneAndUpdate( {metric: '1.2.2', colid: colid1, type: 'Autonomous'},{
          //     currentvalue: cbcscount
          // });
          
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
      

    // jun 20 2024


exports.getmcolevelsbyfac= async (req,res) => {
  try{

 
      
      const lcat1233= await mcolevels
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
                    'user':req.query.user,
                    'coursename':req.query.coursename,
                    'coursecode':req.query.coursecode
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


exports.mcolevelsbydep= async (req,res) => {
  try{
      
      const lcat1233= await mcolevels
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
                    'department':req.query.department
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


exports.mcolevelsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mcolevels
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
                    'programcode':req.query.programcode
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


exports.mcolevelsdocs= async (req,res) => {
  try{
      
      const lcat1233= await mcolevels
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

exports.mcolevelslinks= async (req,res) => {
  try{
      
      const lcat1233= await mcolevels
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



exports.createmcolevelsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mcolevels.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursename:req.query.coursename,
coursecode:req.query.coursecode,
co:req.query.co,
level:req.query.level,
minvalue:req.query.minvalue,
maxvalue:req.query.maxvalue,
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


exports.updatemcolevelsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mcolevels.findByIdAndUpdate( req.query.id,{
            
            
            coursename:req.query.coursename,
coursecode:req.query.coursecode,
co:req.query.co,
level:req.query.level,
minvalue:req.query.minvalue,
maxvalue:req.query.maxvalue,
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


exports.updatemcolevelscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mcolevels.findByIdAndUpdate( req.query.id,{
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

exports.deletemcolevelsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mcolevels.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getmcolevelscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mcolevels.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$level', 
  total_attendance: {$sum : 1}
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


  exports.getmcolevelssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mcolevels.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$co', 
    total_attendance: {$sum : 1}
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



    exports.getmcolevelscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const coursecode=req.query.coursecode;
      const coursename=req.query.coursename;
      const lcat1233= await mcolevels.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursename: coursename, coursecode: coursecode }
      },
      { 
      $group: {
      _id:'$level', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmcolevelssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const coursecode=req.query.coursecode;
        const coursename=req.query.coursename;
        const lcat1233= await mcolevels.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursename: coursename, coursecode: coursecode }
        },
        { 
        $group: {
        _id:'$co', 
        total_attendance: {$sum : 1}
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


// Jun 23 2024


exports.getmcourseslistbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mcourseslist
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


exports.mcourseslistbydep= async (req,res) => {
  try{
      
      const lcat1233= await mcourseslist
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
                    'department':req.query.department
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


exports.mcourseslistbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mcourseslist
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
                    'programcode':req.query.programcode
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


exports.mcourseslistdocs= async (req,res) => {
  try{
      
      const lcat1233= await mcourseslist
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

exports.mcourseslistlinks= async (req,res) => {
  try{
      
      const lcat1233= await mcourseslist
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



exports.createmcourseslistbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mcourseslist.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
type:req.query.type,
semester:req.query.semester,
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


exports.updatemcourseslistbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mcourseslist.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
type:req.query.type,
semester:req.query.semester,
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


exports.updatemcourseslistcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mcourseslist.findByIdAndUpdate( req.query.id,{
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

exports.deletemcourseslistbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mcourseslist.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// jun 23 2024 graph

exports.getmcourseslistcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mcourseslist.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmcourseslistsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mcourseslist.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmcourseslistcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mcourseslist.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmcourseslistsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mcourseslist.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// jun 28 2024


exports.getmstudents1byfac= async (req,res) => {
  try{
      
      const lcat1233= await mstudents1
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


exports.mstudents1bydep= async (req,res) => {
  try{
      
      const lcat1233= await mstudents1
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
                    'department':req.query.department
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


exports.mstudents1byprog= async (req,res) => {
  try{
      
      const lcat1233= await mstudents1
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
                    'programcode':req.query.programcode
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


exports.mstudents1docs= async (req,res) => {
  try{
      
      const lcat1233= await mstudents1
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

exports.mstudents1links= async (req,res) => {
  try{
      
      const lcat1233= await mstudents1
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



exports.createmstudents1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mstudents1.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            student:req.query.student,
regno:req.query.regno,
rollno:req.query.rollno,
program:req.query.program,
programcode:req.query.programcode,
batch:req.query.batch,
year:req.query.year,
gender:req.query.gender,
category:req.query.category,
pwd:req.query.pwd,
minority:req.query.minority,
currentyear:req.query.currentyear,
currentsem:req.query.currentsem,
username:req.query.username,
password:req.query.password,
enabled:req.query.enabled,
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


exports.updatemstudents1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mstudents1.findByIdAndUpdate( req.query.id,{
            
            
            student:req.query.student,
regno:req.query.regno,
rollno:req.query.rollno,
program:req.query.program,
programcode:req.query.programcode,
batch:req.query.batch,
year:req.query.year,
gender:req.query.gender,
category:req.query.category,
pwd:req.query.pwd,
minority:req.query.minority,
currentyear:req.query.currentyear,
currentsem:req.query.currentsem,
username:req.query.username,
password:req.query.password,
enabled:req.query.enabled,
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


exports.updatemstudents1comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mstudents1.findByIdAndUpdate( req.query.id,{
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

exports.deletemstudents1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mstudents1.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// jun 28 2024 graph

exports.getmstudents1count= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mstudents1.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmstudents1second= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mstudents1.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$category', 
    total_attendance: {$sum : 1}
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



    exports.getmstudents1countbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mstudents1.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmstudents1secondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mstudents1.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$category', 
        total_attendance: {$sum : 1}
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


// jul 4 2024


// jul 6 2024


exports.getclassenr1byfac= async (req,res) => {
  try{
      
      const lcat1233= await classenr1
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
                    'user':req.query.user,
                    'coursecode':req.query.coursecode,
                    'year':req.query.year
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


exports.classenr1bydep= async (req,res) => {
  try{
      
      const lcat1233= await classenr1
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
                    'department':req.query.department
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


exports.classenr1byprog= async (req,res) => {
  try{
      
      const lcat1233= await classenr1
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
                    'programcode':req.query.programcode
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


exports.classenr1docs= async (req,res) => {
  try{
      
      const lcat1233= await classenr1
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

exports.classenr1links= async (req,res) => {
  try{
      
      const lcat1233= await classenr1
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



exports.createclassenr1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await classenr1.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
student:req.query.student,
regno:req.query.regno,
learning:req.query.learning,
gender:req.query.gender,
classgroup:req.query.classgroup,
coursetype:req.query.coursetype,
semester:req.query.semester,
active:req.query.active,
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


exports.updateclassenr1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await classenr1.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
student:req.query.student,
regno:req.query.regno,
learning:req.query.learning,
gender:req.query.gender,
classgroup:req.query.classgroup,
coursetype:req.query.coursetype,
semester:req.query.semester,
active:req.query.active,
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


exports.updateclassenr1comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await classenr1.findByIdAndUpdate( req.query.id,{
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

exports.deleteclassenr1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await classenr1.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// jul 6 graph

exports.getclassenr1count= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await classenr1.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$gender', 
  total_attendance: {$sum : 1}
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


  exports.getclassenr1second= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await classenr1.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$learning', 
    total_attendance: {$sum : 1}
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



    exports.getclassenr1countbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await classenr1.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
      },
      { 
      $group: {
      _id:'$gender', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getclassenr1secondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await classenr1.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
        },
        { 
        $group: {
        _id:'$learning', 
        total_attendance: {$sum : 1}
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




// jul 6 stud


exports.getclassenr1studbyfac= async (req,res) => {
  try{
      
      const lcat1233= await classenr1
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
                    'regno':req.query.regno
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

// jul 6 graph stud




exports.getclassenr1countbystud= async (req,res) => {
  try{
  const regno=req.query.regno;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await classenr1.aggregate([
  { 
  $match: {colid: colid1, regno: regno }
  },
  { 
  $group: {
  _id:'$coursetype', 
  total_attendance: {$sum : 1}
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


  exports.getclassenr1secondbystud= async (req,res) => {
    try{
    const regno=req.query.regno;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await classenr1.aggregate([
    { 
    $match: {colid: colid1, regno: regno }
    },
    { 
    $group: {
    _id:'$semester', 
    total_attendance: {$sum : 1}
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


// jul 7 2024


exports.getmsyllabusbyfac= async (req,res) => {
  try{
      
      const lcat1233= await msyllabus
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
                    'coursecode':req.query.coursecode,
                    'year':req.query.year,
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

exports.getmsyllabusbycoursecode= async (req,res) => {
  try{
      
      const lcat1233= await msyllabus
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
                    'coursecode':req.query.coursecode,
                    'year':req.query.year,
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


exports.msyllabusbydep= async (req,res) => {
  try{
      
      const lcat1233= await msyllabus
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
                    'department':req.query.department
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


exports.msyllabusbyprog= async (req,res) => {
  try{
      
      const lcat1233= await msyllabus
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
                    'programcode':req.query.programcode
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


exports.msyllabusdocs= async (req,res) => {
  try{
      
      const lcat1233= await msyllabus
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

exports.msyllabuslinks= async (req,res) => {
  try{
      
      const lcat1233= await msyllabus
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



exports.createmsyllabusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await msyllabus.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
module:req.query.module,
description:req.query.description,
credits:req.query.credits,
courselink:req.query.courselink,
type:req.query.type,
completed:req.query.completed,
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


exports.updatemsyllabusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await msyllabus.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
module:req.query.module,
description:req.query.description,
credits:req.query.credits,
courselink:req.query.courselink,
type:req.query.type,
completed:req.query.completed,
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


exports.updatemsyllabuscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await msyllabus.findByIdAndUpdate( req.query.id,{
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

exports.deletemsyllabusbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await msyllabus.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// jul 7 graph

exports.getmsyllabuscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await msyllabus.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$completed', 
  total_attendance: {$sum : 1}
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


  exports.getmsyllabussecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await msyllabus.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmsyllabuscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await msyllabus.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
      },
      { 
      $group: {
      _id:'$completed', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmsyllabussecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await msyllabus.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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





    exports.getmsyllabuscountbycoursecode= async (req,res) => {
      try{
      //const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await msyllabus.aggregate([
      { 
      $match: {colid: colid1, coursecode: req.query.coursecode, year: req.query.year }
      },
      { 
      $group: {
      _id:'$completed', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmsyllabussecondbycoursecode= async (req,res) => {
        try{
        //const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await msyllabus.aggregate([
        { 
        $match: {colid: colid1, coursecode: req.query.coursecode, year: req.query.year }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// jul 8 2024


exports.getmassignmentsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await massignments
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
                    'user':req.query.user,
                    'coursecode':req.query.coursecode
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


exports.massignmentsbydep= async (req,res) => {
  try{
      
      const lcat1233= await massignments
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
                    'department':req.query.department
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


exports.massignmentsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await massignments
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
                    'programcode':req.query.programcode
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


exports.massignmentsdocs= async (req,res) => {
  try{
      
      const lcat1233= await massignments
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

exports.massignmentslinks= async (req,res) => {
  try{
      
      const lcat1233= await massignments
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



exports.createmassignmentsbyfac= async (req,res) => {

  const pub1= await massignments.create({
    name: req.query.name,
    colid: req.query.colid,
    user: req.query.user,
    year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
assignment:req.query.assignment,
description:req.query.description,
duedate:req.query.duedate,
type:req.query.type,
methodology:req.query.methodology,
learning:req.query.learning,
doclink:req.query.doclink,
status1: 'Submitted',
    comments: 'NA'
});

//res.status(200).send('Hello world for all the tours through db new router');
res.status(200).json({
status:'Success'
});

//     try{
//         const token=req.query.token;
//         //console.log(token);
//         let jwtuser='';
//         let jwtcolid='';
//         try {
//             const verified = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET,
//                 (err123, verified) => {
//                   if (err123) {
//                     return res.status(401).json({
//                         status: 'Unauthorized',
//                         error: err123
//                     });
//                   }
//                   jwtuser=verified.user;
//                   jwtcolid=verified.colid;
//                   return verified;
//                 }
//               );
//         } catch(err1234) {
//             //console.log(err1234);
//         }

//         const pub1= await massignments.create({
//             name: req.query.name,
//             colid: req.query.colid,
//             user: req.query.user,
//             year:req.query.year,
// course:req.query.course,
// coursecode:req.query.coursecode,
// assignment:req.query.assignment,
// description:req.query.description,
// duedate:req.query.duedate,
// type:req.query.type,
// methodology:req.query.methodology,
// learning:req.query.learning,
// doclink:req.query.doclink,
// status1: 'Submitted',
//             comments: 'NA'
//         });

//     //res.status(200).send('Hello world for all the tours through db new router');
//     res.status(200).json({
//         status:'Success'
//     });
  
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
};


exports.updatemassignmentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await massignments.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
assignment:req.query.assignment,
description:req.query.description,
duedate:req.query.duedate,
type:req.query.type,
methodology:req.query.methodology,
learning:req.query.learning,
doclink:req.query.doclink,
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


exports.updatemassignmentscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await massignments.findByIdAndUpdate( req.query.id,{
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

exports.deletemassignmentsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await massignments.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmanouncementsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await manouncements
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
                    'user':req.query.user,
                    'coursecode':req.query.coursecode
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


exports.manouncementsbydep= async (req,res) => {
  try{
      
      const lcat1233= await manouncements
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
                    'department':req.query.department
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


exports.manouncementsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await manouncements
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
                    'programcode':req.query.programcode
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


exports.manouncementsdocs= async (req,res) => {
  try{
      
      const lcat1233= await manouncements
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

exports.manouncementslinks= async (req,res) => {
  try{
      
      const lcat1233= await manouncements
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



exports.createmanouncementsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await manouncements.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
announcement:req.query.announcement,
submitdate:req.query.submitdate,
type:req.query.type,
target:req.query.target,
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


exports.updatemanouncementsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await manouncements.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
announcement:req.query.announcement,
submitdate:req.query.submitdate,
type:req.query.type,
target:req.query.target,
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


exports.updatemanouncementscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await manouncements.findByIdAndUpdate( req.query.id,{
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

exports.deletemanouncementsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await manouncements.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmcoursecobyfac= async (req,res) => {
  try{
      
      const lcat1233= await mcourseco
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
                    'user':req.query.user,
                    'coursecode':req.query.coursecode
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


exports.mcoursecobydep= async (req,res) => {
  try{
      
      const lcat1233= await mcourseco
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
                    'department':req.query.department
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


exports.mcoursecobyprog= async (req,res) => {
  try{
      
      const lcat1233= await mcourseco
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
                    'programcode':req.query.programcode
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


exports.mcoursecodocs= async (req,res) => {
  try{
      
      const lcat1233= await mcourseco
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

exports.mcoursecolinks= async (req,res) => {
  try{
      
      const lcat1233= await mcourseco
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



exports.createmcoursecobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mcourseco.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
cocode:req.query.cocode,
co:req.query.co,
type:req.query.type,
targetlevel:req.query.targetlevel,
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


exports.updatemcoursecobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mcourseco.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
cocode:req.query.cocode,
co:req.query.co,
type:req.query.type,
targetlevel:req.query.targetlevel,
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


exports.updatemcoursecocomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mcourseco.findByIdAndUpdate( req.query.id,{
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

exports.deletemcoursecobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mcourseco.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmcalendarbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mcalendar
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
                    'user':req.query.user,
                    'coursecode':req.query.coursecode
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


exports.mcalendarbydep= async (req,res) => {
  try{
      
      const lcat1233= await mcalendar
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
                    'department':req.query.department
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


exports.mcalendarbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mcalendar
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
                    'programcode':req.query.programcode
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


exports.mcalendardocs= async (req,res) => {
  try{
      
      const lcat1233= await mcalendar
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

exports.mcalendarlinks= async (req,res) => {
  try{
      
      const lcat1233= await mcalendar
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



exports.createmcalendarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mcalendar.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
title:req.query.title,
eventdate:req.query.eventdate,
type:req.query.type,
location:req.query.location,
duration:req.query.duration,
monthofyear:req.query.monthofyear,
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


exports.updatemcalendarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mcalendar.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
title:req.query.title,
eventdate:req.query.eventdate,
type:req.query.type,
location:req.query.location,
duration:req.query.duration,
monthofyear:req.query.monthofyear,
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


exports.updatemcalendarcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mcalendar.findByIdAndUpdate( req.query.id,{
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

exports.deletemcalendarbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mcalendar.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmcoursematerialbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mcoursematerial
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
                    'user':req.query.user,
                    'coursecode':req.query.coursecode
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


exports.mcoursematerialbydep= async (req,res) => {
  try{
      
      const lcat1233= await mcoursematerial
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
                    'department':req.query.department
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


exports.mcoursematerialbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mcoursematerial
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
                    'programcode':req.query.programcode
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


exports.mcoursematerialdocs= async (req,res) => {
  try{
      
      const lcat1233= await mcoursematerial
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

exports.mcoursemateriallinks= async (req,res) => {
  try{
      
      const lcat1233= await mcoursematerial
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



exports.createmcoursematerialbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mcoursematerial.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
slideno:req.query.slideno,
title:req.query.title,
description:req.query.description,
imagelink:req.query.imagelink,
voicetext:req.query.voicetext,
doclink:req.query.doclink,
type:req.query.type,
mode:req.query.mode,
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


exports.updatemcoursematerialbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mcoursematerial.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
slideno:req.query.slideno,
title:req.query.title,
description:req.query.description,
imagelink:req.query.imagelink,
voicetext:req.query.voicetext,
doclink:req.query.doclink,
type:req.query.type,
mode:req.query.mode,
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


exports.updatemcoursematerialcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mcoursematerial.findByIdAndUpdate( req.query.id,{
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

exports.deletemcoursematerialbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mcoursematerial.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// jul 8 2024 graph

exports.getmassignmentscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await massignments.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$learning', 
  total_attendance: {$sum : 1}
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


  exports.getmassignmentssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await massignments.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmassignmentscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await massignments.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursecode: req.query.coursecode }
      },
      { 
      $group: {
      _id:'$learning', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmassignmentssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const coursecode=req.query.coursecode;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await massignments.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursecode: coursecode }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmanouncementscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await manouncements.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$target', 
  total_attendance: {$sum : 1}
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


  exports.getmanouncementssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await manouncements.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmanouncementscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await manouncements.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
      },
      { 
      $group: {
      _id:'$target', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmanouncementssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await manouncements.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmcoursecocount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mcourseco.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$targetlevel', 
  total_attendance: {$sum : 1}
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


  exports.getmcoursecosecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mcourseco.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmcoursecocountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mcourseco.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursecode: req.query.coursecode }
      },
      { 
      $group: {
      _id:'$targetlevel', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmcoursecosecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mcourseco.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursecode: req.query.coursecode }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmcalendarcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mcalendar.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$monthofyear', 
  total_attendance: {$sum : 1}
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


  exports.getmcalendarsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mcalendar.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmcalendarcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mcalendar.aggregate([
      { 
      $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
      },
      { 
      $group: {
      _id:'$monthofyear', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmcalendarsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mcalendar.aggregate([
        { 
        $match: {colid: colid1, user: user1, coursecode: req.query.coursecode, year: req.query.year }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getmcoursematerialcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mcoursematerial.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$mode', 
  total_attendance: {$sum : 1}
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


  exports.getmcoursematerialsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mcoursematerial.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmcoursematerialcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mcoursematerial.aggregate([
      { 
      $match: {colid: colid1, user: user1,coursecode: req.query.coursecode }
      },
      { 
      $group: {
      _id:'$mode', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmcoursematerialsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mcoursematerial.aggregate([
        { 
        $match: {colid: colid1, user: user1,coursecode: req.query.coursecode }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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



// jul 20 2024


exports.getmassignsubmitbyfac= async (req,res) => {
  try{
      
      const lcat1233= await massignsubmit
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
                    'user':req.query.user,
                    'assignmentid':req.query.assignmentid
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

exports.getmassignsubmitbyass= async (req,res) => {
  try{
      
      const lcat1233= await massignsubmit
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
                    'assignmentid':req.query.assignmentid
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


exports.massignsubmitbydep= async (req,res) => {
  try{
      
      const lcat1233= await massignsubmit
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
                    'department':req.query.department
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


exports.massignsubmitbyprog= async (req,res) => {
  try{
      
      const lcat1233= await massignsubmit
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
                    'programcode':req.query.programcode
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


exports.massignsubmitdocs= async (req,res) => {
  try{
      
      const lcat1233= await massignsubmit
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

exports.massignsubmitlinks= async (req,res) => {
  try{
      
      const lcat1233= await massignsubmit
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



exports.createmassignsubmitbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await massignsubmit.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
assignment:req.query.assignment,
assignmentid:req.query.assignmentid,
student:req.query.student,
regno:req.query.regno,
description:req.query.description,
submitdate:req.query.submitdate,
doclink:req.query.doclink,
ascomments:req.query.ascomments,
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


exports.updatemassignsubmitbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await massignsubmit.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
assignment:req.query.assignment,
assignmentid:req.query.assignmentid,
student:req.query.student,
regno:req.query.regno,
description:req.query.description,
submitdate:req.query.submitdate,
doclink:req.query.doclink,
ascomments:req.query.ascomments,
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


exports.updatemassignsubmitcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await massignsubmit.findByIdAndUpdate( req.query.id,{
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

exports.deletemassignsubmitbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await massignsubmit.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getmdiscussionbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mdiscussion
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

exports.getmdiscussionbycode= async (req,res) => {
  try{
      
      const lcat1233= await mdiscussion
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
                    'coursecode':req.query.coursecode
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


exports.mdiscussionbydep= async (req,res) => {
  try{
      
      const lcat1233= await mdiscussion
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
                    'department':req.query.department
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


exports.mdiscussionbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mdiscussion
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
                    'programcode':req.query.programcode
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


exports.mdiscussiondocs= async (req,res) => {
  try{
      
      const lcat1233= await mdiscussion
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

exports.mdiscussionlinks= async (req,res) => {
  try{
      
      const lcat1233= await mdiscussion
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



exports.createmdiscussionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mdiscussion.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
title:req.query.title,
submitdate:req.query.submitdate,
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


exports.updatemdiscussionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mdiscussion.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
title:req.query.title,
submitdate:req.query.submitdate,
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


exports.updatemdiscussioncomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mdiscussion.findByIdAndUpdate( req.query.id,{
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

exports.deletemdiscussionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mdiscussion.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


// aug 2 2024


exports.getquotanewbyfac= async (req,res) => {
  try{
      
      const lcat1233= await quotanew
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


exports.quotanewbydep= async (req,res) => {
  try{
      
      const lcat1233= await quotanew
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
                    'department':req.query.department
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


exports.quotanewbyprog= async (req,res) => {
  try{
      
      const lcat1233= await quotanew
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
                    'programcode':req.query.programcode
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


exports.quotanewdocs= async (req,res) => {
  try{
      
      const lcat1233= await quotanew
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

exports.quotanewlinks= async (req,res) => {
  try{
      
      const lcat1233= await quotanew
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



exports.createquotanewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await quotanew.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type:req.query.type,
subscription:req.query.subscription,
limit:req.query.limit,
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


exports.updatequotanewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await quotanew.findByIdAndUpdate( req.query.id,{
            
            
            type:req.query.type,
subscription:req.query.subscription,
limit:req.query.limit,
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


exports.updatequotanewcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await quotanew.findByIdAndUpdate( req.query.id,{
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

exports.deletequotanewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await quotanew.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// aug 2 2024 graph

exports.getquotanewcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await quotanew.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$subscription', 
  total_attendance: {$sum : 1}
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


  exports.getquotanewsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await quotanew.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getquotanewcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await quotanew.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$subscription', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getquotanewsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await quotanew.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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



// aug 4 2024


exports.getclassnewbyfac= async (req,res) => {
  try{
      
      const lcat1233= await classnew
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


exports.classnewbydep= async (req,res) => {
  try{
      
      const lcat1233= await classnew
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
                    'department':req.query.department
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


exports.classnewbyprog= async (req,res) => {
  try{
      
      const lcat1233= await classnew
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
                    'programcode':req.query.programcode
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


exports.classnewdocs= async (req,res) => {
  try{
      
      const lcat1233= await classnew
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

exports.classnewlinks= async (req,res) => {
  try{
      
      const lcat1233= await classnew
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



exports.createclassnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await classnew.create({
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
topic:req.query.topic,
module:req.query.module,
link:req.query.link,
classtype:req.query.classtype,
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


exports.updateclassnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await classnew.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
program:req.query.program,
programcode:req.query.programcode,
course:req.query.course,
coursecode:req.query.coursecode,
semester:req.query.semester,
section:req.query.section,
classdate:req.query.classdate,
classtime:req.query.classtime,
topic:req.query.topic,
module:req.query.module,
link:req.query.link,
classtype:req.query.classtype,
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


exports.updateclassnewcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await classnew.findByIdAndUpdate( req.query.id,{
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

exports.deleteclassnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await classnew.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getattendancenewbyfac= async (req,res) => {
  try{
      
      const lcat1233= await attendancenew
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
                    'user':req.query.user,
                    'classid':req.query.classid
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


exports.attendancenewbydep= async (req,res) => {
  try{
      
      const lcat1233= await attendancenew
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
                    'department':req.query.department
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


exports.attendancenewbyprog= async (req,res) => {
  try{
      
      const lcat1233= await attendancenew
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
                    'programcode':req.query.programcode
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


exports.attendancenewdocs= async (req,res) => {
  try{
      
      const lcat1233= await attendancenew
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

exports.attendancenewlinks= async (req,res) => {
  try{
      
      const lcat1233= await attendancenew
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



exports.createattendancenewbyfac2= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await attendancenew.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
classid:req.query.classid,
programcode:req.query.programcode,
program:req.query.program,
course:req.query.course,
coursecode:req.query.coursecode,
student:req.query.student,
regno:req.query.regno,
att:req.query.att,
classdate:req.query.classdate,
semester:req.query.semester,
section:req.query.section,
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


exports.createattendancenewbyfac= async (req,res) => {

  try{
      const token=req.query.token;
      //console.log(token);
      let jwtuser='';
      let jwtcolid='';
      try {
          const verified = jwt.verify(
              token,
              process.env.JWT_SECRET,
              (err123, verified) => {
                if (err123) {
                  return res.status(401).json({
                      status: 'Unauthorized',
                      error: err123
                  });
                }
                jwtuser=verified.user;
                jwtcolid=verified.colid;
                return verified;
              }
            );
      } catch(err1234) {
          //console.log(err1234);
      }

//       const pub1= await attendancenew.create({
//           name: req.query.name,
//           colid: req.query.colid,
//           user: req.query.user,
//           year:req.query.year,
// classid:req.query.classid,
// programcode:req.query.programcode,
// program:req.query.program,
// course:req.query.course,
// coursecode:req.query.coursecode,
// student:req.query.student,
// regno:req.query.regno,
// att:req.query.att,
// classdate:req.query.classdate,
// semester:req.query.semester,
// section:req.query.section,
// status1: 'Submitted',
//           comments: 'NA'
//       });

      const pat1= await attendancenew.findOneAndUpdate({classid: req.query.classid, regno: req.query.regno, student: req.query.student},{
        name: req.query.name,
        colid: req.query.colid,
        user: req.query.user,
        year:req.query.year,
programcode:req.query.programcode,
program:req.query.program,
course:req.query.course,
coursecode:req.query.coursecode,
att:req.query.att,
classdate:req.query.classdate,
semester:req.query.semester,
section:req.query.section,
status1: 'Submitted',
        comments: 'NA'
    }, {
        new: true,
        upsert: true 
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


exports.updateattendancenewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await attendancenew.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
classid:req.query.classid,
programcode:req.query.programcode,
program:req.query.program,
course:req.query.course,
coursecode:req.query.coursecode,
student:req.query.student,
regno:req.query.regno,
att:req.query.att,
classdate:req.query.classdate,
semester:req.query.semester,
section:req.query.section,
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


exports.updateattendancenewcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await attendancenew.findByIdAndUpdate( req.query.id,{
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

exports.deleteattendancenewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await attendancenew.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


// aug 4 2024 graph

exports.getclassnewcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await classnew.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$semester', 
  total_attendance: {$sum : 1}
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


  exports.getclassnewsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await classnew.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$coursecode', 
    total_attendance: {$sum : 1}
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



    exports.getclassnewcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await classnew.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$semester', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getclassnewsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await classnew.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$coursecode', 
        total_attendance: {$sum : 1}
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




exports.getattendancenewcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await attendancenew.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$semester', 
  total_attendance: {$sum : 1}
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


  exports.getattendancenewsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await attendancenew.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$coursecode', 
    total_attendance: {$avg : '$att'}
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



    exports.getattendancenewcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await attendancenew.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$semester', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getattendancenewsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await attendancenew.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$coursecode', 
        total_attendance: {$avg : '$att'}
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



// aug 9 2024

exports.getattsummarybyccode= async (req,res) => {
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
      const lcat1233= await attendancenew.aggregate([
          { 
              $match: {
                  colid: colid1, 
                  year:req.query.year,
                  coursecode:req.query.coursecode,
                  classdate: {
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
                      coursecode: '$coursecode',
                      student: '$student',
                      regno: '$regno'
                  },
                  total_attendance: {$avg: '$att'}
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


exports.getattbypcodesem= async (req,res) => {
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
      const lcat1233= await attendancenew.aggregate([
          { 
              $match: {
                  colid: colid1, 
                  year:req.query.year,
                  semester:req.query.semester,
                  programcode:req.query.programcode,
                  classdate: {
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
                      coursecode: '$coursecode',
                      student: '$student',
                      regno: '$regno'
                  },
                  total_attendance: {$avg: '$att'}
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

// aug 10 2024

exports.getclassnewbyfacdate= async (req,res) => {
  try{
    const date1=new Date(req.query.date1);
      const date2=new Date(req.query.date2);
      
      const lcat1233= await classnew
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
                    'user':req.query.user,
                    classdate: {
                      $gte: date1,
                      $lte: date2
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


exports.getclassnewbypyss= async (req,res) => {
  try{
    const date1=new Date(req.query.date1);
      const date2=new Date(req.query.date2);
      
      const lcat1233= await classnew
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
                    'programcode':req.query.programcode,
                    'year':req.query.year,
                    'semester':req.query.semester,
                    'section':req.query.section,
                    classdate: {
                      $gte: date1,
                      $lte: date2
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

// aug 12 2024


exports.getscholnewbyfac= async (req,res) => {
  try{
      
      const lcat1233= await scholnew
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


exports.scholnewbydep= async (req,res) => {
  try{
      
      const lcat1233= await scholnew
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
                    'department':req.query.department
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


exports.scholnewbyprog= async (req,res) => {
  try{
      
      const lcat1233= await scholnew
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
                    'programcode':req.query.programcode
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


exports.scholnewdocs= async (req,res) => {
  try{
      
      const lcat1233= await scholnew
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

exports.scholnewlinks= async (req,res) => {
  try{
      
      const lcat1233= await scholnew
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



exports.createscholnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await scholnew.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
scholarship:req.query.scholarship,
type:req.query.type,
student:req.query.student,
regno:req.query.regno,
amount:req.query.amount,
doclink:req.query.doclink,
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


exports.updatescholnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await scholnew.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
scholarship:req.query.scholarship,
type:req.query.type,
student:req.query.student,
regno:req.query.regno,
amount:req.query.amount,
doclink:req.query.doclink,
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


exports.updatescholnewcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await scholnew.findByIdAndUpdate( req.query.id,{
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

exports.deletescholnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await scholnew.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getstudawardsnewbyfac= async (req,res) => {
  try{
      
      const lcat1233= await studawardsnew
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


exports.studawardsnewbydep= async (req,res) => {
  try{
      
      const lcat1233= await studawardsnew
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
                    'department':req.query.department
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


exports.studawardsnewbyprog= async (req,res) => {
  try{
      
      const lcat1233= await studawardsnew
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
                    'programcode':req.query.programcode
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


exports.studawardsnewdocs= async (req,res) => {
  try{
      
      const lcat1233= await studawardsnew
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

exports.studawardsnewlinks= async (req,res) => {
  try{
      
      const lcat1233= await studawardsnew
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



exports.createstudawardsnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await studawardsnew.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
event:req.query.event,
type:req.query.type,
student:req.query.student,
regno:req.query.regno,
award:req.query.award,
amount:req.query.amount,
doclink:req.query.doclink,
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


exports.updatestudawardsnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await studawardsnew.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
event:req.query.event,
type:req.query.type,
student:req.query.student,
regno:req.query.regno,
award:req.query.award,
amount:req.query.amount,
doclink:req.query.doclink,
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


exports.updatestudawardsnewcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await studawardsnew.findByIdAndUpdate( req.query.id,{
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

exports.deletestudawardsnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await studawardsnew.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// aug 12 2024 graph

exports.getscholnewcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await scholnew.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : '$amount'}
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


  exports.getscholnewsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await scholnew.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getscholnewcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await scholnew.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : '$amount'}
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
    
    
      exports.getscholnewsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await scholnew.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getstudawardsnewcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await studawardsnew.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getstudawardsnewsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await studawardsnew.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getstudawardsnewcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await studawardsnew.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getstudawardsnewsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await studawardsnew.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// aug 12 2024 stud


exports.getscholnewstudbyfac= async (req,res) => {
  try{
      
      const lcat1233= await scholnew
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
                    'regno':req.query.regno
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


exports.getstudawardsnewstudbyfac= async (req,res) => {
  try{
      
      const lcat1233= await studawardsnew
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
                    'regno':req.query.regno
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

// aug 12 2024 stud graph



exports.getscholnewcountbystud= async (req,res) => {
  try{
  const regno=req.query.regno;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await scholnew.aggregate([
  { 
  $match: {colid: colid1, regno: regno }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : '$amount'}
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


  exports.getscholnewsecondbystud= async (req,res) => {
    try{
    const regno=req.query.regno;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await scholnew.aggregate([
    { 
    $match: {colid: colid1, regno: regno }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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






exports.getstudawardsnewcountbystud= async (req,res) => {
  try{
  const regno=req.query.regno;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await studawardsnew.aggregate([
  { 
  $match: {colid: colid1, regno: regno }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getstudawardsnewsecondbystud= async (req,res) => {
    try{
    const regno=req.query.regno;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await studawardsnew.aggregate([
    { 
    $match: {colid: colid1, regno: regno }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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


// aug 12 2024

exports.getslideshowbymoduleid= async (req,res) => {
  try{
      
      const lcat1233= await slideshow
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
                    'moduleid': req.query.moduleid
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


exports.getslideshowbyfac= async (req,res) => {
  try{
      
      const lcat1233= await slideshow
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
                    'user':req.query.user,
                    'moduleid': req.query.moduleid
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




exports.slideshowbydep= async (req,res) => {
  try{
      
      const lcat1233= await slideshow
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
                    'department':req.query.department
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


exports.slideshowbyprog= async (req,res) => {
  try{
      
      const lcat1233= await slideshow
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
                    'programcode':req.query.programcode
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


exports.slideshowdocs= async (req,res) => {
  try{
      
      const lcat1233= await slideshow
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

exports.slideshowlinks= async (req,res) => {
  try{
      
      const lcat1233= await slideshow
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



exports.createslideshowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await slideshow.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            moduleid:req.query.moduleid,
description:req.query.description,
imagelink:req.query.imagelink,
type:req.query.type,
slideno:req.query.slideno,
ctype:req.query.ctype,
duration:req.query.duration,
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


exports.updateslideshowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await slideshow.findByIdAndUpdate( req.query.id,{
            
            
            moduleid:req.query.moduleid,
description:req.query.description,
imagelink:req.query.imagelink,
type:req.query.type,
slideno:req.query.slideno,
ctype:req.query.ctype,
duration:req.query.duration,
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


exports.updateslideshowcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await slideshow.findByIdAndUpdate( req.query.id,{
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

exports.deleteslideshowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await slideshow.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// graph

exports.getslideshowcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await slideshow.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$ctype', 
  total_attendance: {$sum : 1}
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


  exports.getslideshowsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await slideshow.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getslideshowcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await slideshow.aggregate([
      { 
      $match: {colid: colid1, user: user1, moduleid: req.query.moduleid   }
      },
      { 
      $group: {
      _id:'$ctype', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getslideshowsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await slideshow.aggregate([
        { 
        $match: {colid: colid1, user: user1, moduleid: req.query.moduleid }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// aug 16 2024


exports.geteventsnew1byfac= async (req,res) => {
  try{
      
      const lcat1233= await eventsnew1
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


exports.eventsnew1bydep= async (req,res) => {
  try{
      
      const lcat1233= await eventsnew1
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
                    'department':req.query.department
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


exports.eventsnew1byprog= async (req,res) => {
  try{
      
      const lcat1233= await eventsnew1
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
                    'programcode':req.query.programcode
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


exports.eventsnew1docs= async (req,res) => {
  try{
      
      const lcat1233= await eventsnew1
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

exports.eventsnew1links= async (req,res) => {
  try{
      
      const lcat1233= await eventsnew1
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



exports.createeventsnew1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await eventsnew1.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
event:req.query.event,
department:req.query.department,
startdate:req.query.startdate,
description:req.query.description,
brochurelink:req.query.brochurelink,
reportlink:req.query.reportlink,
coordinator:req.query.coordinator,
type:req.query.type,
level:req.query.level,
collab:req.query.collab,
moulink:req.query.moulink,
participants:req.query.participants,
duration:req.query.duration,
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


exports.updateeventsnew1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await eventsnew1.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
event:req.query.event,
department:req.query.department,
startdate:req.query.startdate,
description:req.query.description,
brochurelink:req.query.brochurelink,
reportlink:req.query.reportlink,
coordinator:req.query.coordinator,
type:req.query.type,
level:req.query.level,
collab:req.query.collab,
moulink:req.query.moulink,
participants:req.query.participants,
duration:req.query.duration,
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


exports.updateeventsnew1comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await eventsnew1.findByIdAndUpdate( req.query.id,{
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

exports.deleteeventsnew1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await eventsnew1.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.geteventsnew1count= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await eventsnew1.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.geteventsnew1second= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await eventsnew1.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.geteventsnew1countbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await eventsnew1.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.geteventsnew1secondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await eventsnew1.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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



// aug 18 2024


exports.gettestnewbyfac= async (req,res) => {
  try{
      
      const lcat1233= await testnew
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
                    'user':req.query.user,
                    'coursecode': req.query.coursecode,
                    'year': req.query.year
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

exports.gettestnewbyccode= async (req,res) => {
  try{
      
      const lcat1233= await testnew
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
                    'coursecode': req.query.coursecode,
                    'year': req.query.year
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


exports.testnewbydep= async (req,res) => {
  try{
      
      const lcat1233= await testnew
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
                    'department':req.query.department
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


exports.testnewbyprog= async (req,res) => {
  try{
      
      const lcat1233= await testnew
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
                    'programcode':req.query.programcode
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


exports.testnewdocs= async (req,res) => {
  try{
      
      const lcat1233= await testnew
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

exports.testnewlinks= async (req,res) => {
  try{
      
      const lcat1233= await testnew
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



exports.createtestnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await testnew.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursecode:req.query.coursecode,
title:req.query.title,
description:req.query.description,
starttime:req.query.starttime,
endtime:req.query.endtime,
duration:req.query.duration,
weightage:req.query.weightage,
type:req.query.type,
level:req.query.level,
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


exports.updatetestnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await testnew.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
coursecode:req.query.coursecode,
title:req.query.title,
description:req.query.description,
starttime:req.query.starttime,
endtime:req.query.endtime,
duration:req.query.duration,
weightage:req.query.weightage,
type:req.query.type,
level:req.query.level,
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


exports.updatetestnewcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await testnew.findByIdAndUpdate( req.query.id,{
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

exports.deletetestnewbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await testnew.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.gettestqbyfac= async (req,res) => {
  try{
      
      const lcat1233= await testq
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
                    'testid': req.query.testid
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


exports.testqbydep= async (req,res) => {
  try{
      
      const lcat1233= await testq
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
                    'department':req.query.department
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


exports.testqbyprog= async (req,res) => {
  try{
      
      const lcat1233= await testq
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
                    'programcode':req.query.programcode
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


exports.testqdocs= async (req,res) => {
  try{
      
      const lcat1233= await testq
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

exports.testqlinks= async (req,res) => {
  try{
      
      const lcat1233= await testq
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



exports.createtestqbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await testq.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            testid:req.query.testid,
question:req.query.question,
type:req.query.type,
imagelink:req.query.imagelink,
videolink:req.query.videolink,
doclink:req.query.doclink,
co:req.query.co,
po:req.query.po,
module:req.query.module,
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


exports.updatetestqbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await testq.findByIdAndUpdate( req.query.id,{
            
            
            testid:req.query.testid,
question:req.query.question,
type:req.query.type,
imagelink:req.query.imagelink,
videolink:req.query.videolink,
doclink:req.query.doclink,
co:req.query.co,
po:req.query.po,
module:req.query.module,
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


exports.updatetestqcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await testq.findByIdAndUpdate( req.query.id,{
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

exports.deletetestqbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await testq.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.gettestobyfac= async (req,res) => {
  try{
      
      const lcat1233= await testo
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
                    'questionid':req.query.questionid,
                    'testid': req.query.testid
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


exports.testobydep= async (req,res) => {
  try{
      
      const lcat1233= await testo
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
                    'department':req.query.department
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


exports.testobyprog= async (req,res) => {
  try{
      
      const lcat1233= await testo
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
                    'programcode':req.query.programcode
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


exports.testodocs= async (req,res) => {
  try{
      
      const lcat1233= await testo
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

exports.testolinks= async (req,res) => {
  try{
      
      const lcat1233= await testo
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



exports.createtestobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await testo.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            testid:req.query.testid,
questionid:req.query.questionid,
option:req.query.option,
score:req.query.score,
imagelink:req.query.imagelink,
videolink:req.query.videolink,
doclink:req.query.doclink,
type:req.query.type,
difficulty:req.query.difficulty,
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


exports.updatetestobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await testo.findByIdAndUpdate( req.query.id,{
            
            
            testid:req.query.testid,
questionid:req.query.questionid,
option:req.query.option,
score:req.query.score,
imagelink:req.query.imagelink,
videolink:req.query.videolink,
doclink:req.query.doclink,
type:req.query.type,
difficulty:req.query.difficulty,
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


exports.updatetestocomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await testo.findByIdAndUpdate( req.query.id,{
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

exports.deletetestobyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await testo.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// graph

exports.gettestnewcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await testnew.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$level', 
  total_attendance: {$sum : 1}
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


  exports.gettestnewsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await testnew.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.gettestnewcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await testnew.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$level', 
      total_attendance: {$sum : 1}
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

      exports.gettestnewcountbyccode= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await testnew.aggregate([
        { 
        $match: {colid: colid1, coursecode: req.query.coursecode }
        },
        { 
        $group: {
        _id:'$level', 
        total_attendance: {$sum : 1}
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
    
    
      exports.gettestnewsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await testnew.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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

        exports.gettestnewsecondbyccode= async (req,res) => {
          try{
          const user1=req.query.user;
          const colid1=parseInt(req.query.colid);
          const lcat1233= await testnew.aggregate([
          { 
          $match: {colid: colid1, coursecode: req.query.coursecode }
          },
          { 
          $group: {
          _id:'$type', 
          total_attendance: {$sum : 1}
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




exports.gettestqcount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await testq.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$module', 
  total_attendance: {$sum : 1}
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


  exports.gettestqsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await testq.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$co', 
    total_attendance: {$sum : 1}
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



    exports.gettestqcountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await testq.aggregate([
      { 
      $match: {colid: colid1, user: user1, testid: req.query.testid }
      },
      { 
      $group: {
      _id:'$module', 
      total_attendance: {$sum : 1}
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
    
    
      exports.gettestqsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await testq.aggregate([
        { 
        $match: {colid: colid1, user: user1, testid: req.query.testid }
        },
        { 
        $group: {
        _id:'$co', 
        total_attendance: {$sum : 1}
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




exports.gettestocount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await testo.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$difficulty', 
  total_attendance: {$sum : 1}
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


  exports.gettestosecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await testo.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.gettestocountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await testo.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$difficulty', 
      total_attendance: {$sum : 1}
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
    
    
      exports.gettestosecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await testo.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// aug 21 2024


exports.gettestscoresbyfac= async (req,res) => {
  try{
      
      const lcat1233= await testscores
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


exports.testscoresbydep= async (req,res) => {
  try{
      
      const lcat1233= await testscores
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
                    'department':req.query.department
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


exports.testscoresbyprog= async (req,res) => {
  try{
      
      const lcat1233= await testscores
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
                    'programcode':req.query.programcode
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


exports.testscoresdocs= async (req,res) => {
  try{
      
      const lcat1233= await testscores
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

exports.testscoreslinks= async (req,res) => {
  try{
      
      const lcat1233= await testscores
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



exports.createtestscoresbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

//         const pub1= await testscores.create({
//             name: req.query.name,
//             colid: req.query.colid,
//             user: req.query.user,
//             year:req.query.year,
// coursecode:req.query.coursecode,
// module:req.query.module,
// difficulty:req.query.difficulty,
// testid:req.query.testid,
// student:req.query.student,
// regno:req.query.regno,
// questionid:req.query.questionid,
// question:req.query.question,
// option:req.query.option,
// score:req.query.score,
// status1: 'Submitted',
//             comments: 'NA'
//         });


        const pat1= await testscores.findOneAndUpdate({testid: req.query.testid, questionid: req.query.questionid,regno: req.query.regno, student: req.query.student},{
          name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
coursecode:req.query.coursecode,
module:req.query.module,
difficulty:req.query.difficulty,
question:req.query.question,
option:req.query.option,
score:req.query.score,
status1: 'Submitted',
            comments: 'NA'
      }, {
          new: true,
          upsert: true 
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


exports.updatetestscoresbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await testscores.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
coursecode:req.query.coursecode,
module:req.query.module,
difficulty:req.query.difficulty,
testid:req.query.testid,
student:req.query.student,
regno:req.query.regno,
questionid:req.query.questionid,
question:req.query.question,
option:req.query.option,
score:req.query.score,
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


exports.updatetestscorescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await testscores.findByIdAndUpdate( req.query.id,{
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

exports.deletetestscoresbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await testscores.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.gettestscoresstudbyfac= async (req,res) => {
  try{
      
      const lcat1233= await testscores
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
                    'regno':req.query.regno,
                    'testid': req.query.testid
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

exports.gettestscoresummary= async (req,res) => {
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
      const lcat1233= await testscores.aggregate([
          { 
              $match: {
                  colid: colid1, 
                  testid:req.query.testid

              }
          },
          { 
              $group: {
                  // _id:['$regno','$name'],
                  // _id:['$regno','$name'], 
                  _id: {
                     
                      student: '$student',
                      regno: '$regno'
                  },
                  total_attendance: {$sum: '$score'}
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

// graph

exports.gettestscorescount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await testscores.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$module', 
  total_attendance: {$sum : 1}
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


  exports.gettestscoressecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await testscores.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$question', 
    total_attendance: {$avg : '$score'}
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



    exports.gettestscorescountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await testscores.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$module', 
      total_attendance: {$sum : 1}
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
    
    
      exports.gettestscoressecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await testscores.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$question', 
        total_attendance: {$avg : '$score'}
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






        exports.gettestscorescountbystud= async (req,res) => {
          try{
          const regno=req.query.regno;
          const colid1=parseInt(req.query.colid);
          const lcat1233= await testscores.aggregate([
          { 
          $match: {colid: colid1, regno: regno }
          },
          { 
          $group: {
          _id:'$module', 
          total_attendance: {$sum : 1}
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
        
        
          exports.gettestscoressecondbystud= async (req,res) => {
            try{
            const regno=req.query.regno;
            const colid1=parseInt(req.query.colid);
            const lcat1233= await testscores.aggregate([
            { 
            $match: {colid: colid1, regno: regno }
            },
            { 
            $group: {
            _id:'$difficulty', 
            total_attendance: {$sum : 1}
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
    
    
    
// ag 30 test

exports.createtestscoresbyfac2= async (req,res) => {

  try{
      const token=req.query.token;
      //console.log(token);
      let jwtuser='';
      let jwtcolid='';
      try {
          const verified = jwt.verify(
              token,
              process.env.JWT_SECRET,
              (err123, verified) => {
                if (err123) {
                  return res.status(401).json({
                      status: 'Unauthorized',
                      error: err123
                  });
                }
                jwtuser=verified.user;
                jwtcolid=verified.colid;
                return verified;
              }
            );
      } catch(err1234) {
          //console.log(err1234);
      }

      const pub1= await testscores.create({
          name: req.query.name,
          colid: req.query.colid,
          user: req.query.user,
          year:req.query.year,
coursecode:req.query.coursecode,
module:req.query.module,
difficulty:req.query.difficulty,
testid:req.query.testid,
student:req.query.student,
regno:req.query.regno,
questionid:req.query.questionid,
question:req.query.question,
option:req.query.option,
score:req.query.score,
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
    
// sep 7 2024


exports.getlmsvideosbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideos
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

exports.getlmsvideosbycoursecode= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideos
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
                    'coursecode':req.query.coursecode
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


exports.lmsvideosbydep= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideos
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
                    'department':req.query.department
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


exports.lmsvideosbyprog= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideos
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
                    'programcode':req.query.programcode
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


exports.lmsvideosdocs= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideos
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

exports.lmsvideoslinks= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideos
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



exports.createlmsvideosbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lmsvideos.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursecode:req.query.coursecode,
title:req.query.title,
description:req.query.description,
module:req.query.module,
type:req.query.type,
target:req.query.target,
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


exports.updatelmsvideosbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lmsvideos.findByIdAndUpdate( req.query.id,{
            
            
            coursecode:req.query.coursecode,
title:req.query.title,
description:req.query.description,
module:req.query.module,
type:req.query.type,
target:req.query.target,
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


exports.updatelmsvideoscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lmsvideos.findByIdAndUpdate( req.query.id,{
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

exports.deletelmsvideosbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await lmsvideos.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getlmsvideoscbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideosc
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
                    'videoid':req.query.videoid
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

exports.getlmsvideoscsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideosc
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
                    
                    'videoid':req.query.videoid
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

exports.lmsvideoscbydep= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideosc
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
                    'department':req.query.department
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


exports.lmsvideoscbyprog= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideosc
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
                    'programcode':req.query.programcode
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


exports.lmsvideoscdocs= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideosc
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

exports.lmsvideosclinks= async (req,res) => {
  try{
      
      const lcat1233= await lmsvideosc
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



exports.createlmsvideoscbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lmsvideosc.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            videoid:req.query.videoid,
coursecode:req.query.coursecode,
video:req.query.video,
title:req.query.title,
image:req.query.image,
voicetext:req.query.voicetext,
duration:req.query.duration,
type:req.query.type,
language:req.query.language,
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


exports.updatelmsvideoscbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lmsvideosc.findByIdAndUpdate( req.query.id,{
            
            
            videoid:req.query.videoid,
coursecode:req.query.coursecode,
video:req.query.video,
title:req.query.title,
image:req.query.image,
voicetext:req.query.voicetext,
duration:req.query.duration,
type:req.query.type,
language:req.query.language,
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


exports.updatelmsvideosccomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lmsvideosc.findByIdAndUpdate( req.query.id,{
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

exports.deletelmsvideoscbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await lmsvideosc.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// sep 7 graph

exports.getlmsvideoscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await lmsvideos.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$target', 
  total_attendance: {$sum : 1}
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


  exports.getlmsvideossecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await lmsvideos.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getlmsvideoscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await lmsvideos.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$target', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getlmsvideossecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await lmsvideos.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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




exports.getlmsvideosccount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await lmsvideosc.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$language', 
  total_attendance: {$sum : 1}
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


  exports.getlmsvideoscsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await lmsvideosc.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getlmsvideosccountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await lmsvideosc.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$language', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getlmsvideoscsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await lmsvideosc.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// sep 12 2024

exports.createuserbyfac= async (req,res) => {

  try{
      //const token=req.query.token;
      //console.log(token);
      let jwtuser='';
      let jwtcolid='';
 
      const pub1= await User.create({
          name: req.query.name,
          colid: 111356,
          user: req.query.email,
          email:req.query.email,
phone:req.query.phone,
password:req.query.password,
role:'Faculty',
regno:'NA',
programcode:'NA',
admissionyear:'NA',
semester:'NA',
section:'NA',
gender:'NA',
department:req.query.department,
category:'NA',
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



exports.createquotanewbyfac1= async (req,res) => {

  try{
      //const token=req.query.token;
      //console.log(token);
      let jwtuser='';
      let jwtcolid='';
     

      const pub1= await quotanew.create({
          name: req.query.name,
          colid: 111356,
          user: req.query.user,
          type:req.query.type,
subscription:req.query.subscription,
limit:req.query.limit,
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

// sep 13 2024


exports.getmvacbyfac= async (req,res) => {
  try{
      
      const lcat1233= await mvac
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


exports.mvacbydep= async (req,res) => {
  try{
      
      const lcat1233= await mvac
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
                    'department':req.query.department
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


exports.mvacbyprog= async (req,res) => {
  try{
      
      const lcat1233= await mvac
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
                    'programcode':req.query.programcode
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


exports.mvacdocs= async (req,res) => {
  try{
      
      const lcat1233= await mvac
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

exports.mvaclinks= async (req,res) => {
  try{
      
      const lcat1233= await mvac
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



exports.createmvacbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await mvac.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
startdate:req.query.startdate,
enddate:req.query.enddate,
duration:req.query.duration,
studenroll:req.query.studenroll,
studcomplete:req.query.studcomplete,
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


exports.updatemvacbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await mvac.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
course:req.query.course,
coursecode:req.query.coursecode,
startdate:req.query.startdate,
enddate:req.query.enddate,
duration:req.query.duration,
studenroll:req.query.studenroll,
studcomplete:req.query.studcomplete,
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


exports.updatemvaccomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await mvac.findByIdAndUpdate( req.query.id,{
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

exports.deletemvacbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await mvac.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

// graph

exports.getmvaccount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await mvac.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$year', 
  total_attendance: {$sum : 1}
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


  exports.getmvacsecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await mvac.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$type', 
    total_attendance: {$sum : 1}
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



    exports.getmvaccountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await mvac.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$year', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getmvacsecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await mvac.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$type', 
        total_attendance: {$sum : 1}
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


// sep 19 2024


exports.updatepasswordbyfac= async (req,res) => {

  try{
      const token=req.query.token;
      //console.log(token);
      let jwtuser='';
      let jwtcolid='';
      try {
          const verified = jwt.verify(
              token,
              process.env.JWT_SECRET,
              (err123, verified) => {
                if (err123) {
                  return res.status(401).json({
                      status: 'Unauthorized',
                      error: err123
                  });
                }
                jwtuser=verified.user;
                jwtcolid=verified.colid;
                return verified;
              }
            );
      } catch(err1234) {
          //console.log(err1234);
      }

      const lcat1= await User.findOneAndUpdate( {email: req.query.user},{
        password: req.query.password
       
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


// sep 19 2024


exports.getlpublicationsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lpublications
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

exports.getlpublicationspublic= async (req,res) => {
  try{
      
      const lcat1233= await lpublications
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
                    
                    'type':'Public'
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


exports.lpublicationsbydep= async (req,res) => {
  try{
      
      const lcat1233= await lpublications
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
                    'department':req.query.department
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


exports.lpublicationsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await lpublications
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
                    'programcode':req.query.programcode
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


exports.lpublicationsdocs= async (req,res) => {
  try{
      
      const lcat1233= await lpublications
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

exports.lpublicationslinks= async (req,res) => {
  try{
      
      const lcat1233= await lpublications
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



exports.createlpublicationsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lpublications.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
institution:req.query.institution,
publication:req.query.publication,
issn:req.query.issn,
editor:req.query.editor,
frequency:req.query.frequency,
publisher:req.query.publisher,
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


exports.updatelpublicationsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lpublications.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
institution:req.query.institution,
publication:req.query.publication,
issn:req.query.issn,
editor:req.query.editor,
frequency:req.query.frequency,
publisher:req.query.publisher,
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


exports.updatelpublicationscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lpublications.findByIdAndUpdate( req.query.id,{
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

exports.deletelpublicationsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await lpublications.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getlpubeditionsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lpubeditions
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
                    'pubid':req.query.pubid
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


exports.lpubeditionsbydep= async (req,res) => {
  try{
      
      const lcat1233= await lpubeditions
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
                    'department':req.query.department
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


exports.lpubeditionsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await lpubeditions
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
                    'programcode':req.query.programcode
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


exports.lpubeditionsdocs= async (req,res) => {
  try{
      
      const lcat1233= await lpubeditions
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

exports.lpubeditionslinks= async (req,res) => {
  try{
      
      const lcat1233= await lpubeditions
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



exports.createlpubeditionsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lpubeditions.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
pubid:req.query.pubid,
publication:req.query.publication,
edition:req.query.edition,
pubmonth:req.query.pubmonth,
pubstatus:req.query.pubstatus,
mode:req.query.mode,
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


exports.updatelpubeditionsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lpubeditions.findByIdAndUpdate( req.query.id,{
            
            
            year:req.query.year,
pubid:req.query.pubid,
publication:req.query.publication,
edition:req.query.edition,
pubmonth:req.query.pubmonth,
pubstatus:req.query.pubstatus,
mode:req.query.mode,
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


exports.updatelpubeditionscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lpubeditions.findByIdAndUpdate( req.query.id,{
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

exports.deletelpubeditionsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await lpubeditions.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getlpubarticlesbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lpubarticles
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
                    
                    'editionid':req.query.editionid
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


exports.lpubarticlesbydep= async (req,res) => {
  try{
      
      const lcat1233= await lpubarticles
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
                    'department':req.query.department
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


exports.lpubarticlesbyprog= async (req,res) => {
  try{
      
      const lcat1233= await lpubarticles
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
                    'programcode':req.query.programcode
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


exports.lpubarticlesdocs= async (req,res) => {
  try{
      
      const lcat1233= await lpubarticles
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

exports.lpubarticleslinks= async (req,res) => {
  try{
      
      const lcat1233= await lpubarticles
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



exports.createlpubarticlesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lpubarticles.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            editionid:req.query.editionid,
author:req.query.author,
institution:req.query.institution,
article:req.query.article,
description:req.query.description,
abstractlink:req.query.abstractlink,
articlelink:req.query.articlelink,
pubstatus:req.query.pubstatus,
authortype:req.query.authortype,
submitdate:req.query.submitdate,
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


exports.updatelpubarticlesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lpubarticles.findByIdAndUpdate( req.query.id,{
            
            
            editionid:req.query.editionid,
author:req.query.author,
institution:req.query.institution,
article:req.query.article,
description:req.query.description,
abstractlink:req.query.abstractlink,
articlelink:req.query.articlelink,
pubstatus:req.query.pubstatus,
authortype:req.query.authortype,
submitdate:req.query.submitdate,
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


exports.updatelpubarticlescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lpubarticles.findByIdAndUpdate( req.query.id,{
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

exports.deletelpubarticlesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await lpubarticles.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getlpubreviewsbyfac= async (req,res) => {
  try{
      
      const lcat1233= await lpubreviews
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
                    
                    'articleid':req.query.articleid
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


exports.lpubreviewsbydep= async (req,res) => {
  try{
      
      const lcat1233= await lpubreviews
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
                    'department':req.query.department
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


exports.lpubreviewsbyprog= async (req,res) => {
  try{
      
      const lcat1233= await lpubreviews
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
                    'programcode':req.query.programcode
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


exports.lpubreviewsdocs= async (req,res) => {
  try{
      
      const lcat1233= await lpubreviews
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

exports.lpubreviewslinks= async (req,res) => {
  try{
      
      const lcat1233= await lpubreviews
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



exports.createlpubreviewsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await lpubreviews.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            articleid:req.query.articleid,
peer:req.query.peer,
designation:req.query.designation,
rcomments:req.query.rcomments,
submitdate:req.query.submitdate,
peertye:req.query.peertye,
commenttype:req.query.commenttype,
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


exports.updatelpubreviewsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await lpubreviews.findByIdAndUpdate( req.query.id,{
            
            
            articleid:req.query.articleid,
peer:req.query.peer,
designation:req.query.designation,
rcomments:req.query.rcomments,
submitdate:req.query.submitdate,
peertye:req.query.peertye,
commenttype:req.query.commenttype,
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


exports.updatelpubreviewscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await lpubreviews.findByIdAndUpdate( req.query.id,{
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

exports.deletelpubreviewsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await lpubreviews.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getlpublicationscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await lpublications.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$type', 
  total_attendance: {$sum : 1}
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


  exports.getlpublicationssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await lpublications.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$frequency', 
    total_attendance: {$sum : 1}
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



    exports.getlpublicationscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await lpublications.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$type', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getlpublicationssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await lpublications.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$frequency', 
        total_attendance: {$sum : 1}
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




exports.getlpubeditionscount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await lpubeditions.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$mode', 
  total_attendance: {$sum : 1}
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


  exports.getlpubeditionssecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await lpubeditions.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$pubstatus', 
    total_attendance: {$sum : 1}
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



    exports.getlpubeditionscountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await lpubeditions.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$mode', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getlpubeditionssecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await lpubeditions.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$pubstatus', 
        total_attendance: {$sum : 1}
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




exports.getlpubarticlescount= async (req,res) => {
  try{
  //const user1=req.query.user;
  const colid1=parseInt(req.query.colid);
  const lcat1233= await lpubarticles.aggregate([
  { 
  $match: {colid: colid1 }
  },
  { 
  $group: {
  _id:'$authortype', 
  total_attendance: {$sum : 1}
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


  exports.getlpubarticlessecond= async (req,res) => {
    try{
    //const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await lpubarticles.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$pubstatus', 
    total_attendance: {$sum : 1}
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



    exports.getlpubarticlescountbyfac= async (req,res) => {
      try{
      const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await lpubarticles.aggregate([
      { 
      $match: {colid: colid1, user: user1 }
      },
      { 
      $group: {
      _id:'$authortype', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getlpubarticlessecondbyfac= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await lpubarticles.aggregate([
        { 
        $match: {colid: colid1, user: user1 }
        },
        { 
        $group: {
        _id:'$pubstatus', 
        total_attendance: {$sum : 1}
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




// exports.getlpubeditionscount= async (req,res) => {
//   try{
//   //const user1=req.query.user;
//   const colid1=parseInt(req.query.colid);
//   const lcat1233= await lpubeditions.aggregate([
//   { 
//   $match: {colid: colid1 }
//   },
//   { 
//   $group: {
//   _id:'$peertype', 
//   total_attendance: {$sum : 1}
//   }
//   }
//   ]);
//   //console.log(lcat1233);
//   res.status(200).json({
//   status:'Success',
//   data: {
//   classes : lcat1233
//   }
//   }); 
//   } catch(err) {
//   res.status(400).json({
//   status:'Failed',
//   message: err
//   });
              
//   } 
//   };  


//   exports.getlpubeditionssecond= async (req,res) => {
//     try{
//     //const user1=req.query.user;
//     const colid1=parseInt(req.query.colid);
//     const lcat1233= await lpubeditions.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id:'$commenttype', 
//     total_attendance: {$sum : 1}
//     }
//     }
//     ]);
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     classes : lcat1233
//     }
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
                
//     } 
//     };  



    // exports.getlpubeditionscountbyfac= async (req,res) => {
    //   try{
    //   const user1=req.query.user;
    //   const colid1=parseInt(req.query.colid);
    //   const lcat1233= await lpubeditions.aggregate([
    //   { 
    //   $match: {colid: colid1, user: user1 }
    //   },
    //   { 
    //   $group: {
    //   _id:'$peertype', 
    //   total_attendance: {$sum : 1}
    //   }
    //   }
    //   ]);
    //   //console.log(lcat1233);
    //   res.status(200).json({
    //   status:'Success',
    //   data: {
    //   classes : lcat1233
    //   }
    //   }); 
    //   } catch(err) {
    //   res.status(400).json({
    //   status:'Failed',
    //   message: err
    //   });
                  
    //   } 
    //   };  
    
    
    //   exports.getlpubeditionssecondbyfac= async (req,res) => {
    //     try{
    //     const user1=req.query.user;
    //     const colid1=parseInt(req.query.colid);
    //     const lcat1233= await lpubeditions.aggregate([
    //     { 
    //     $match: {colid: colid1, user: user1 }
    //     },
    //     { 
    //     $group: {
    //     _id:'$commenttype', 
    //     total_attendance: {$sum : 1}
    //     }
    //     }
    //     ]);
    //     //console.log(lcat1233);
    //     res.status(200).json({
    //     status:'Success',
    //     data: {
    //     classes : lcat1233
    //     }
    //     }); 
    //     } catch(err) {
    //     res.status(400).json({
    //     status:'Failed',
    //     message: err
    //     });
                    
    //     } 
    //     };  


    exports.getlpubreviewscount= async (req,res) => {
      try{
      //const user1=req.query.user;
      const colid1=parseInt(req.query.colid);
      const lcat1233= await lpubreviews.aggregate([
      { 
      $match: {colid: colid1 }
      },
      { 
      $group: {
      _id:'$peertype', 
      total_attendance: {$sum : 1}
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
    
    
      exports.getlpubreviewssecond= async (req,res) => {
        try{
        //const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await lpubreviews.aggregate([
        { 
        $match: {colid: colid1 }
        },
        { 
        $group: {
        _id:'$commenttype', 
        total_attendance: {$sum : 1}
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
    
    
    
        exports.getlpubreviewscountbyfac= async (req,res) => {
          try{
          const user1=req.query.user;
          const colid1=parseInt(req.query.colid);
          const lcat1233= await lpubreviews.aggregate([
          { 
          $match: {colid: colid1, user: user1 }
          },
          { 
          $group: {
          _id:'$peertype', 
          total_attendance: {$sum : 1}
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
        
        
          exports.getlpubreviewssecondbyfac= async (req,res) => {
            try{
            const user1=req.query.user;
            const colid1=parseInt(req.query.colid);
            const lcat1233= await lpubreviews.aggregate([
            { 
            $match: {colid: colid1, user: user1 }
            },
            { 
            $group: {
            _id:'$commenttype', 
            total_attendance: {$sum : 1}
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
    
    
    
    
    
















































  
  
  
  
  