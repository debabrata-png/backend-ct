const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');

const CBCS=require('./../Models/cbcs');
const BOS=require('./../Models/bos');
const Event=require('./../Models/event');
const Admission=require('./../Models/admission');
const Reservecat=require('./../Models/reservecat');
const Teacherdata=require('./../Models/teacherdata');
const Passexam=require('./../Models/passexam');
const Awards=require('./../Models/awards');
const Extact=require('./../Models/extact');
const Collab=require('./../Models/collab');
const Mou=require('./../Models/mou');
const Ict=require('./../Models/ict');
const Expenditure=require('./../Models/expenditure');
const Scholarship=require('./../Models/studschsp');
const Library=require('./../Models/library');
const Funds=require('./../Models/funds');
const Quality=require('./../Models/quality');
const Skilldev=require('./../Models/skilldev');
const Careercounsel=require('./../Models/careercounsel');
const Placement=require('./../Models/placement');
// const Teacherfs=require('./../Models/teacherfs');
const Egovern=require('./../Models/egovern');
const Extawards=require('./../Models/extawards');
const Result=require('./../Models/result');
const Econtent=require('./../Models/econtent');
const Seedm=require('./../Models/seedm');
const Phdguide=require('./../Models/phdguide');
const Teacheraward=require('./../Models/teacheraward');
const Examautomation=require('./../Models/examautomation');
const Teacherfellow=require('./../Models/teacherfellow');
const Researchfellow=require('./../Models/researchfellow');
const Alumnicon=require('./../Models/alumnicon');
const Mentees=require('./../Models/mentees');
const Innovation=require('./../Models/innovation');

const Incubation=require('./../Models/incubation');
const Qualityinit=require('./../Models/qualityinit');
const Fdp=require('./../Models/fdp');
const Fieldproj=require('./../Models/fieldproj');
const Sportsact=require('./../Models/sportsact');
const Explearnproj=require('./../Models/explearnproj');

exports.depcbcslist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'cbcss', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depboslist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'bos', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depeventlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'events', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depadmissionlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'studentadmissions', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depreservecatlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'reservedcategorys', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depteacherdatalist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'teacherdatas', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.deppassexamlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'studentpassingexams', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depawardslist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'studentawards', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depextactlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'extensionactivitys', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depcollablist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'collaborations', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depmoulist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'mous', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depictlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'icts', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depexpenditurelist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'infrastructures', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depscholarshiplist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'studentscholarships', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.deplibrarylist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'libraryexpenditures', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depfundslist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'funds', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depqualitylist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'qualityassurances', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depskilldevlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'skilldevelopments', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depcareercounsellist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'careercounsellings', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depplacementlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'placements', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

// exports.depteacherfslist= async (req,res) => {
//     try{
        
//         const lcat1233= await User
//             .aggregate([
//                 {
//                     $lookup: {
//                       from: 'teacherfinancialsupports', 
//                       localField: 'email', 
//                       foreignField: 'user', 
//                       as: 'courses'
//                     }
//                   }, {
//                     $match: {
//                       'department': req.query.department,
//                       'colid': parseInt(req.query.colid)
//                     }
//                   }
//                   ]); 
            
//             //console.log(lcat1233);
//             res.status(200).json({
//                 status:'Success',
//                 data: {
//                     classes : lcat1233
//                 }   
//             });            
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

exports.depegovernlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'egovernances', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depextawardslist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'institutionalawards', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depresultlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'results', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depecontentlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'econtents', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depseedmlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'seedmoneys', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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
// exports.depphdguidelist= async (req,res) => {
//     try{
        
//         const lcat1233= await User
//             .aggregate([
//                 {
//                     $lookup: {
//                       from: 'phdguides', 
//                       localField: 'email', 
//                       foreignField: 'user', 
//                       as: 'courses'
//                     }
//                   }, {
//                     $match: {
//                       'department': req.query.department,
//                       'colid': parseInt(req.query.colid)
//                     }
//                   }
//                   ]); 
            
//             //console.log(lcat1233);
//             res.status(200).json({
//                 status:'Success',
//                 data: {
//                     classes : lcat1233
//                 }   
//             });            
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

exports.depteacherawardlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'teacherawards', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depexamautomationlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'examautomations', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depteacherfellowlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'teacherfellows', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depresearchfellowlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'researchfellows', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depalumniconlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'alumnicontributions', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depmenteeslist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'mentees', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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

exports.depinnovationlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'innovations', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'courses'
                    }
                  }, {
                    $match: {
                      'department': req.query.department,
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


exports.updatecbcscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await CBCS.findByIdAndUpdate( req.query.id,{
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

exports.updateboscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await BOS.findByIdAndUpdate( req.query.id,{
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

exports.updateeventcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Event.findByIdAndUpdate( req.query.id,{
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

exports.updateadmissioncomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Admission.findByIdAndUpdate( req.query.id,{
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

exports.updatereservecatcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Reservecat.findByIdAndUpdate( req.query.id,{
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

exports.updateteacherdatacomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Teacherdata.findByIdAndUpdate( req.query.id,{
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

exports.updatepassexamcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Passexam.findByIdAndUpdate( req.query.id,{
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

exports.updateawardscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Awards.findByIdAndUpdate( req.query.id,{
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

exports.updateextactcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Extact.findByIdAndUpdate( req.query.id,{
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

exports.updatecollabcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Collab.findByIdAndUpdate( req.query.id,{
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

exports.updatemoucomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Mou.findByIdAndUpdate( req.query.id,{
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

exports.updateictcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Ict.findByIdAndUpdate( req.query.id,{
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

exports.updateexpenditurecomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Expenditure.findByIdAndUpdate( req.query.id,{
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

exports.updatescholarshipcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Scholarship.findByIdAndUpdate( req.query.id,{
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

exports.updatelibrarycomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Library.findByIdAndUpdate( req.query.id,{
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

exports.updatefundscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Funds.findByIdAndUpdate( req.query.id,{
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

exports.updatequalitycomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Quality.findByIdAndUpdate( req.query.id,{
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

exports.updateskilldevcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Skilldev.findByIdAndUpdate( req.query.id,{
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

exports.updatecareercounselcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Careercounsel.findByIdAndUpdate( req.query.id,{
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

exports.updateplacementcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Placement.findByIdAndUpdate( req.query.id,{
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

exports.updateteacherfscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Teacherfs.findByIdAndUpdate( req.query.id,{
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

exports.updateegoverncomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Egovern.findByIdAndUpdate( req.query.id,{
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

exports.updateextawardscomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Extawards.findByIdAndUpdate( req.query.id,{
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
        const lcat1= await Phdguide.findByIdAndUpdate( req.query.id,{
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

exports.updateinnovationcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Innovation.findByIdAndUpdate( req.query.id,{
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

exports.updateresultcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Result.findByIdAndUpdate( req.query.id,{
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

exports.updateecontentcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Econtent.findByIdAndUpdate( req.query.id,{
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

exports.updateseedmcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Seedm.findByIdAndUpdate( req.query.id,{
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

exports.updateteacherawardcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Teacheraward.findByIdAndUpdate( req.query.id,{
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

exports.updateexamautomationcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Examautomation.findByIdAndUpdate( req.query.id,{
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
        const lcat1= await Teacherfellow.findByIdAndUpdate( req.query.id,{
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

exports.updateresearchfellowcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Researchfellow.findByIdAndUpdate( req.query.id,{
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

exports.updatealumniconcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Alumnicon.findByIdAndUpdate( req.query.id,{
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

exports.updatementeescomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Mentees.findByIdAndUpdate( req.query.id,{
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

exports.updateincubationcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Incubation.findByIdAndUpdate( req.query.id,{
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

exports.updatequalityinitcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Qualityinit.findByIdAndUpdate( req.query.id,{
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

exports.updatefdpcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Fdp.findByIdAndUpdate( req.query.id,{
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

exports.updatefieldprojcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Fieldproj.findByIdAndUpdate( req.query.id,{
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



exports.updatesportsactcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Sportsact.findByIdAndUpdate( req.query.id,{
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

exports.updateexplearnprojcomments= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Explearnproj.findByIdAndUpdate( req.query.id,{
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