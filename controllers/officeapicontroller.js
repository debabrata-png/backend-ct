const { promisify } = require('util');
const jwt=require('jsonwebtoken');
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
const Workload=require('./../Models/workload');
const Period=require('./../Models/period');
const Feedback=require('./../Models/feedback');
const Assignment=require('./../Models/assignment');
const Coursefiles=require('./../Models/coursefiles');
const Assignsubmit=require('./../Models/assignsubmit');
const Libbooks=require('./../Models/libbooks');
const Libassign=require('./../Models/libassign');
const Seminar=require('./../Models/seminar');
const Projects=require('./../Models/projects');
const Publication=require('./../Models/publications');
const Patents=require('./../Models/patents');
const Book=require('./../Models/book');
const Cocal=require('./../Models/cocal');
const Employer=require('./../Models/employerfeedback');
const Parent=require('./../Models/parentfeedback');
const Alumni=require('./../Models/alumnifeedback');
const Mou=require('./../Models/mou');
const Kpi=require('./../Models/kpi');
const Meeting=require('./../Models/meeting');
const nodemailer=require('nodemailer');
const Mlink=require('./../Models/mlink');
const htmltotext=require('html-to-text');
const Department=require('./../Models/department');
const Awsconfig=require('./../Models/awsconfig');
const Circularfac=require('./../Models/circularfac');
const Institutions=require('./../Models/institutions');
const Supportingdoc=require('./../Models/supportingdoc');
const Taskassign=require('./../Models/taskassign');
const Metricrules=require('./../Models/metricrules');
const Explearning=require('./../Models/explearning');
const Employability=require('./../Models/employability');
const Accrcomments=require('./../Models/accrcomments');
const Syllabusrev=require('./../Models/syllabusrev');
const Higheredu=require('./../Models/higheredu');
const Higherexam=require('./../Models/higherexam');
const Qspeer=require('./../Models/qspeers');
const Qsemployers=require('./../Models/qsemployers');
const Project = require('./../Models/projects');
const Patent = require('./../Models/patents');
const Consultancy=require('./../Models/consultancy');
const Leavebalance=require('./../Models/leavebalance');
const Leaveapply=require('./../Models/leaveapply');
const Projectbalance=require('./../Models/projectbalance');



exports.getleavebalancebyfac= async (req,res) => {
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
        const lcat1233= await Leavebalance.find()
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


exports.getleavebalancebyfactype= async (req,res) => {
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
        const lcat1233= await Leavebalance.find()
        .where('user')
        .equals(user1)
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


exports.createleavebalance= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Leavebalance.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type: req.query.type,
            year: req.query.year,
            total: req.query.balance,
            approved: 0,
            final: req.query.balance
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updateleavebalance= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Leavebalance.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type: req.query.type,
            year: req.query.year,
            total: req.query.balance,
            approved: req.query.approved,
            final: req.query.balance
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.approveleavebalance= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Leavebalance.findByIdAndUpdate( req.query.id,{
            approved: req.query.approved,
            final: req.query.final
        });
        res.status(200).json({
            status:'Success'
        });           
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};


exports.approvalleavebalance= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        var colid1=parseInt(req.query.colid);
        const lcat1=await Leavebalance.updateMany( {type: req.query.type, user: req.query.user, colid: colid1},{
            approved: req.query.approved,
            final: req.query.final
        });
        res.status(200).json({
            status:'Success'
        });           
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};


exports.deleteleavebalance= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user=req.query.user;
        await Leavebalance.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getleaveapplybyfac= async (req,res) => {
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
        const lcat1233= await Leaveapply.find()
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

exports.getleaveapplybyadmin= async (req,res) => {
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
        const lcat1233= await Leaveapply.find()
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

exports.getpendingleavelist= async (req,res) => {
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
        const lcat1233= await Leaveapply.find()
        .where('user')
        .equals(user1)
        .where('status')
        .equals('Pending');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getpendingleavesumbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        const lcat1233= await Leaveapply.aggregate([
            { 
                $match: {colid: colid1, type: req.query.type, user: req.query.user, status: 'Pending' }
            },
            { 
                $group: {
                    _id: {                        
                        type: '$type'
                    },
                    total_attendance: {$sum: '$noofdays'}
                }
            }
        ]);
        var applied=0;
        lcat1233.forEach(async function(data2){
            //console.log(data.link);
            //moucount=data.total_attendance;
            applied=applied+data2.total_attendance;
            
        })
        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
                applied: applied,
                classes : lcat1233
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.getleaveapplyforhod= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        const lcat1233= await Leaveapply.find()
        .where('department')
        .equals(req.query.department)
        .where('hod')
        .equals('Pending')
        .where('status')
        .equals('Pending');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
    });            
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });
}  
};

exports.getleaveapplyforprincipal= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        const lcat1233= await Leaveapply.find()
        .where('hod')
        .equals('Yes')
        .where('principal')
        .equals('Pending')
        .where('status')
        .equals('Pending');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
    });            
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });
}  
};


exports.createleaveapply= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Leaveapply.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            role: req.query.role,
            department: req.query.department,
            level: req.query.level,
            startdate: req.query.startdate,
            enddate: req.query.enddate,
            noofdays: req.query.noofdays,
            type: req.query.type,
            hod: 'Pending',
            principal: 'Pending',
            status: 'Pending'
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updateleaveapply= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Leaveapply.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            role: req.query.role,
            department: req.query.department,
            level: req.query.level,
            startdate: req.query.startdate,
            enddate: req.query.enddate,
            noofdays: req.query.noofdays,
            type: req.query.type,
            status: req.query.status
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updateleavestatus= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Leaveapply.findByIdAndUpdate( req.query.id,{
            status: req.query.status
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};


exports.approvebyhod= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Leaveapply.findByIdAndUpdate( req.query.id,{
            status: 'Pending',
            hod: 'Yes'
        });
        
        res.status(200).json({
            status:'Success'
        });          
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.approvebyprincipal= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Leaveapply.findByIdAndUpdate( req.query.id,{
            status: 'Approved',
            principal: 'Yes'
        });
        
        res.status(200).json({
            status:'Success'
        });          
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};




exports.deleteleaveapply= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user=req.query.user;
        await Leaveapply.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


/// projectbalance

exports.getprojectbalancebyfac= async (req,res) => {
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
        const lcat1233= await Projectbalance.find()
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


exports.getprojectbalancebyproject= async (req,res) => {
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
        const lcat1233= await Projectbalance.find()
        .where('projectid')
        .equals(req.query.projectid);
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createprojectbalance= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Projectbalance.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type: req.query.type,
            department: req.query.department,
            role:req.query.role,
            amount:req.query.amount,
            datereceived: new Date(req.query.datereceived),
            year: req.query.year,
            receivedin: req.query.receivedin,
            comments: req.query.comments,
            projectid: req.query.projectid,
            project: req.query.project

            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updateprojectbalance= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Projectbalance.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            type: req.query.type,
            department: req.query.department,
            role:req.query.role,
            amount:req.query.amount,
            datereceived: new Date(req.query.datereceived),
            year: req.query.year,
            receivedin: req.query.receivedin,
            comments: req.query.comments,
            projectid: req.query.projectid,
            project: req.query.project
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};



exports.deleteprojectbalance= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user=req.query.user;
        await Projectbalance.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};
