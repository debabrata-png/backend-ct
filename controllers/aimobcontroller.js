const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Kpi=require('./../Models/kpi');

const myEmitter = require('./eventEmitter');

const seminar=require('./../Models/seminar');

const projects=require('./../Models/projects');
const publications=require('./../Models/publications');
const patents=require('./../Models/patents');
const teacherfellow=require('./../Models/teacherfellow');
const consultancy=require('./../Models/consultancy');
const phdguide=require('./../Models/phdguide');


const aauc1=require('./../Models/aauc1');
const aauc2=require('./../Models/aauc2');
const aaucother=require('./../Models/aaucother');
const aaucfees=require('./../Models/aaucfees');





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
  
  // Aug 24 2023


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
            project:req.query.project,
agency:req.query.agency,
type:req.query.type,
yop:req.query.yop,
department:req.query.department,
funds:req.query.funds,
level:req.query.level,
duration:req.query.duration,
status1: 'Submitted',
            comments: 'NA'
        });

        const colid1=req.query.colid;
        const project=req.query.project;
        // const agency=req.query.agency;
        // const yop=req.query.yop;
        // const type=req.query.type;
        // const funds=req.query.funds;
        // const duration=req.query.duration;

        // const userData = { colid1, project, agency, yop, type, funds, duration };

        const userData={ colid1, project};
        

        myEmitter.emit('iqac_project', userData);



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
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            project:req.query.project,
agency:req.query.agency,
type:req.query.type,
yop:req.query.yop,
department:req.query.department,
funds:req.query.funds,
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
            department:req.query.department,
title:req.query.title,
journal:req.query.journal,
yop:req.query.yop,
issn:req.query.issn,
articlelink:req.query.articlelink,
journallink:req.query.journallink,
hindex:req.query.hindex,
citation:req.query.citation,
level:req.query.level,
citationindex:req.query.citationindex,
ugclisted:req.query.ugclisted,
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
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department:req.query.department,
title:req.query.title,
journal:req.query.journal,
yop:req.query.yop,
issn:req.query.issn,
articlelink:req.query.articlelink,
journallink:req.query.journallink,
hindex:req.query.hindex,
citation:req.query.citation,
level:req.query.level,
citationindex:req.query.citationindex,
ugclisted:req.query.ugclisted,
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
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            title:req.query.title,
patentnumber:req.query.patentnumber,
doa:req.query.doa,
agency:req.query.agency,
yop:req.query.yop,
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

// Dec 14 2023


exports.getaauc1byfac= async (req,res) => {
  try{
      
      const lcat1233= await aauc1
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aauc1bydep= async (req,res) => {
  try{
      
      const lcat1233= await aauc1
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aauc1byprog= async (req,res) => {
  try{
      
      const lcat1233= await aauc1
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aauc1docs= async (req,res) => {
  try{
      
      const lcat1233= await aauc1
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
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

exports.aauc1links= async (req,res) => {
  try{
      
      const lcat1233= await aauc1
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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



exports.createaauc1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await aauc1.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            institution:req.query.institution,
address:req.query.address,
pincode:req.query.pincode,
phone:req.query.phone,
fax:req.query.fax,
website:req.query.website,
email:req.query.email,
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


exports.updateaauc1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await aauc1.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            institution:req.query.institution,
address:req.query.address,
pincode:req.query.pincode,
phone:req.query.phone,
fax:req.query.fax,
website:req.query.website,
email:req.query.email,
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


exports.updateaauc1comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await aauc1.findByIdAndUpdate( req.query.id,{
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

exports.deleteaauc1byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await aauc1.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getaauc2byfac= async (req,res) => {
  try{
      
      const lcat1233= await aauc2
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aauc2bydep= async (req,res) => {
  try{
      
      const lcat1233= await aauc2
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aauc2byprog= async (req,res) => {
  try{
      
      const lcat1233= await aauc2
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aauc2docs= async (req,res) => {
  try{
      
      const lcat1233= await aauc2
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
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

exports.aauc2links= async (req,res) => {
  try{
      
      const lcat1233= await aauc2
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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



exports.createaauc2byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await aauc2.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            affiliation:req.query.affiliation,
program:req.query.program,
type:req.query.type,
year:req.query.year,
sanction:req.query.sanction,
requested:req.query.requested,
commno:req.query.commno,
apptype:req.query.apptype,
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


exports.updateaauc2byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await aauc2.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            affiliation:req.query.affiliation,
program:req.query.program,
type:req.query.type,
year:req.query.year,
sanction:req.query.sanction,
requested:req.query.requested,
commno:req.query.commno,
apptype:req.query.apptype,
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


exports.updateaauc2comments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await aauc2.findByIdAndUpdate( req.query.id,{
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

exports.deleteaauc2byfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await aauc2.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getaaucotherbyfac= async (req,res) => {
  try{
      
      const lcat1233= await aaucother
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aaucotherbydep= async (req,res) => {
  try{
      
      const lcat1233= await aaucother
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aaucotherbyprog= async (req,res) => {
  try{
      
      const lcat1233= await aaucother
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aaucotherdocs= async (req,res) => {
  try{
      
      const lcat1233= await aaucother
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
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

exports.aaucotherlinks= async (req,res) => {
  try{
      
      const lcat1233= await aaucother
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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



exports.createaaucotherbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await aaucother.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            anybreak:req.query.anybreak,
permanent:req.query.permanent,
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


exports.updateaaucotherbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await aaucother.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            anybreak:req.query.anybreak,
permanent:req.query.permanent,
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


exports.updateaaucothercomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await aaucother.findByIdAndUpdate( req.query.id,{
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

exports.deleteaaucotherbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await aaucother.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getaaucfeesbyfac= async (req,res) => {
  try{
      
      const lcat1233= await aaucfees
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aaucfeesbydep= async (req,res) => {
  try{
      
      const lcat1233= await aaucfees
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aaucfeesbyprog= async (req,res) => {
  try{
      
      const lcat1233= await aaucfees
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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


exports.aaucfeesdocs= async (req,res) => {
  try{
      
      const lcat1233= await aaucfees
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
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

exports.aaucfeeslinks= async (req,res) => {
  try{
      
      const lcat1233= await aaucfees
          .aggregate([
              { $addFields: { 'userId': { $toString: '$_id' }}},
              {
                  $lookup: {
                    from: 'supportingdocs', 
                    localField: 'userId', 
                    foreignField: 'field1', 
                    as: 'seminars'
                  }
                },
                {
                  $lookup: {
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



exports.createaaucfeesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await aaucfees.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
draftno:req.query.draftno,
draftdate:req.query.draftdate,
bank:req.query.bank,
purpose:req.query.purpose,
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


exports.updateaaucfeesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await aaucfees.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
draftno:req.query.draftno,
draftdate:req.query.draftdate,
bank:req.query.bank,
purpose:req.query.purpose,
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


exports.updateaaucfeescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await aaucfees.findByIdAndUpdate( req.query.id,{
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

exports.deleteaaucfeesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await aaucfees.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

