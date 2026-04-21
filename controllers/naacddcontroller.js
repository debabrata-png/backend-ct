const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Fieldproj=require('./../Models/fieldproj');
const Examautomation=require('./../Models/examautomation');
const Teacherguide=require('./../Models/teacherguide');
const Incubation=require('./../Models/incubation');
const Alumnicon=require('./../Models/alumnicon');
const Egov=require('./../Models/egov');
const Egovern=require('./../Models/egovern');
const Teacherfs=require('./../Models/teacherfs');
const Funds=require('./../Models/funds');
const Qualityinit=require('./../Models/qualityinit');
const Quality=require('./../Models/quality');
const Result=require('./../Models/result');
const Econtent=require('./../Models/econtent');
const Consultancy=require('./../Models/consultancy');
const Extawards=require('./../Models/extawards');
const Extact=require('./../Models/extact');
const Expenditure=require('./../Models/expenditure');
const Library=require('./../Models/library');
const Higheredu=require('./../Models/higheredu');
const Higherexam=require('./../Models/higherexam');

exports.loginapi= async (req,res) => {
    try{

        const email=req.query.email;
        const password=req.query.password;
        User.findOne({ email: email, password: password  }, (err, role) => {
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
                const token=jwt.sign({ user: email, colid: String([role.colid]) }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                res.status(200).json({
                    status:'Success',
                    user: String([role.email]),
                    role: String([role.role]),
                    name: String([role.name]),
                    colid: String([role.colid]),
                    regno: String([role.regno]),
                    section: String([role.section]),
                    semester: String([role.semester]),
                    token: token
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.examautomation= async (req,res) => {
    try{
        
        const lcat1233= await Examautomation
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.teacherguide= async (req,res) => {
    try{
        
        const lcat1233= await Teacherguide
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.incubation= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'yop': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.alumnicon= async (req,res) => {
    try{
        
        const lcat1233= await Alumnicon
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.egov= async (req,res) => {
    try{
        
        const lcat1233= await Egov
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'yearofimplement': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.egovern= async (req,res) => {
    try{
        
        const lcat1233= await Egovern
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'yearofimplement': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.teacherfs= async (req,res) => {
    try{
        
        const lcat1233= await Teacherfs
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.funds= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.quality= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.qualityinit= async (req,res) => {
    try{
        
        const lcat1233= await Qualityinit
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

exports.qualityinit= async (req,res) => {
    try{
        
        const lcat1233= await Qualityinit
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
};

exports.result= async (req,res) => {
    try{
        
        const lcat1233= await Result
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.econtent= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.consultancy= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.extawards= async (req,res) => {
    try{
        
        const lcat1233= await Extawards
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.extact= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.expenditure= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.library= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.higherexam= async (req,res) => {
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
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.higheredu= async (req,res) => {
    try{
        
        const lcat1233= await Higheredu
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  },
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'year': req.query.year.toString()
                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };


