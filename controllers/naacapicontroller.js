const { promisify } = require('util');
const jwt=require('jsonwebtoken');
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
const Higheredu=require('./../Models/higheredu');
const Higherexam=require('./../Models/higherexam');
const Teacherfs=require('./../Models/teacherfs');
const Egovern=require('./../Models/egovern');
const Addonc=require('./../Models/addonc');
const Instawards=require('./../Models/extawards');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Phdguide=require('./../Models/phdguide');
const Innovation=require('./../Models/innovation');

const Result=require('./../Models/result');
const Econtent=require('./../Models/econtent');
const Seedm=require('./../Models/seedm');
const Consultancy=require('./../Models/consultancy');
const Syllabusrev=require('./../Models/syllabusrev');

const Explearning=require('./../Models/explearning');
const Courseemp=require('./../Models/courseemp');

const Emp=require('./../Models/employability');
const Phd=require('./../Models/phdguide');
const Teacheraward=require('./../Models/teacheraward');
const Examautomation=require('./../Models/examautomation');
const Teacherfellow=require('./../Models/teacherfellow');
const Researchfellow=require('./../Models/researchfellow');
const Alumnicon=require('./../Models/alumnicon');
const Mentees=require('./../Models/mentees');

const Incubation=require('./../Models/incubation');
const Startup=require('./../Models/startup');

const Curgap=require('./../Models/curgap');
const Depprograms=require('./../Models/depprograms');
const Deppublications=require('./../Models/deppublications');
const Studentpubs=require('./../Models/studentpubs');
const Remedial=require('./../Models/remedial');
const Poactions=require('./../Models/poactions');
const Curstructure=require('./../Models/curstructure');
const Ctraining=require('./../Models/ctraining');


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

exports.getcbcsbyfac= async (req,res) => {
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
        const lcat1233= await CBCS.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('CBCS Programs')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createcbcsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await CBCS.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            programcode: req.query.programcode,
            programname: req.query.programname,
            yearofintro: req.query.yearofintro,
            statusofimplement: req.query.statusofimplement,
            yearofimplement: req.query.yearofimplement,
            link: req.query.link,
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

exports.updatecbcsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            programcode: req.query.programcode,
            programname: req.query.programname,
            yearofintro: req.query.yearofintro,
            statusofimplement: req.query.statusofimplement,
            yearofimplement: req.query.yearofimplement,
            link: req.query.link,
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

exports.deletecbcsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await CBCS.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.getbosbyfac= async (req,res) => {
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
        const lcat1233= await BOS.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Faculty Engagement in Academic Bodies')
        .where('colid')
        .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createbosbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await BOS.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            fname: req.query.fname,
            academicbody: req.query.academicbody,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updatebosbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            fname: req.query.fname,
            academicbody: req.query.academicbody,
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

exports.deletebosbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await BOS.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.geteventbyfac= async (req,res) => {
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
        const lcat1233= await Event.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Activities')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createeventbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pat1= await Event.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            academicyear: req.query.academicyear,
            eventname: req.query.eventname,
            description: req.query.description,
            department: req.query.department,
            brochurelink: req.query.brochurelink,
            date: req.query.date, //req.body.classdate,
            time: req.query.time,
            coordinator: req.query.coordinator,
            type: req.query.type,
            eventlink: req.query.eventlink,
            noofparticipants: req.query.noofparticipants,
            noofteachers: req.query.noofteachers,
            financial: req.query.financial,
            target: req.query.target,
            fromto: req.query.fromto,
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


exports.updateeventbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                academicyear: req.query.academicyear,
                eventname: req.query.eventname,
                description: req.query.description,
                department: req.query.department,
                brochurelink: req.query.brochurelink,
                date: req.query.date, //req.body.classdate,
                time: req.query.time,
                coordinator: req.query.coordinator,
                type: req.query.type,
                eventlink: req.query.eventlink,
                noofparticipants: req.query.noofparticipants,
                noofteachers: req.query.noofteachers,
                financial: req.query.financial,
                target: req.query.target,
                fromto: req.query.fromto,
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

exports.deleteeventbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Event.findByIdAndDelete(req.query.id);
   
     res.status(200).json({
        status:'Success'

    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.getadmissionbyfac= async (req,res) => {
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
        const lcat1233= await Admission.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Student Enrollment for Admission')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createadmissionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Admission.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            programcode: req.query.programcode,
            programname: req.query.programname,
            year: req.query.year,
            sancseat: req.query.sancseat,
            studapply: req.query.studapply,
            studadmt: req.query.studadmt,
            status1: req.query.status1,  
            comments: req.query.comments
            
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

exports.updateadmissionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
                name: req.query.name,
                colid: req.querycolid,
                user: req.query.user,
                year: req.query.year,
                programname: req.query.programname,
                programcode: req.query.programcode,
                sancseat: req.query.sancseat,
                studapply: req.query.studapply,
                studadmt: req.query.studadmt,
                status1: req.query.status1,
                comments: req.query.comments
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

exports.deleteadmissionbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Admission.findByIdAndDelete(req.query.id);
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



exports.getreservecatbyfac= async (req,res) => {
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
        const lcat1233= await Reservecat.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Student Seats against Reserved Category')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createreservecatbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Reservecat.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            category: req.query.category,
            sancseat: req.query.sancseat,
            studadmt: req.query.studadmt,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updatereservecatbyfac= async (req,res) => {
    
    try{
    const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                category: req.query.category,
                sancseat: req.query.sancseat,
                studadmt: req.query.studadmt,
                status1: req.query.status1,
                comments: req.query.comments
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

exports.deletereservecatbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Reservecat.findByIdAndDelete(req.query.id);
        
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


exports.getteacherdatabyfac= async (req,res) => {
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
        const lcat1233= await Teacherdata.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Full Time Teachers')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createteacherdatabyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Teacherdata.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            fname: req.query.fname,
            department: req.query.department,
            pan: req.query.pan,
            designation: req.query.designation,
            yoa: req.query.yoa,
            type: req.query.type,
            yoe: req.query.yoe,
            status: req.query.status,
            lastyear: req.query.lastyear,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateteacherdata= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            fname: req.query.name,
            department: req.query.department,
            pan: req.query.pan,
            designation: req.query.designation,
            yoa: req.query.yoa,
            type: req.query.type,
            yoe: req.query.yoe,
            status: req.query.status,
            lastyear: req.query.lastyear,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.deleteteacherdatabyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Teacherdata.findByIdAndDelete(req.query.id);
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

exports.getpassexambyfac= async (req,res) => {
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
        const lcat1233= await Passexam.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Student Pass Percentage')
        .where('colid')
        .equals(colid);
      
//res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createpassexambyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Passexam.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            programcode: req.query.programcode,
            programname: req.query.programname,
            studappear: req.query.studappear,
            studpass: req.query.studpass,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updatepassexambyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            programcode: req.query.programcode,
            programname: req.query.programname,
            studappear: req.query.studappear,
            studpass: req.query.studpass,
            status1: req.query.status1,
                comments: req.query.comments
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


exports.deletepassexambyfac= async (req,res) => {

    try{ const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Passexam.findByIdAndDelete(req.query.id);
        
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

exports.getawardsbyfac= async (req,res) => {
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
        const lcat1233= await Awards.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Student Awards/Medals')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
    
        const pub1= await Awards.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            awardname: req.query.awardname,
            engagementtype: req.query.engagementtype,
            level: req.query.level,
            activitytype: req.query.activitytype,
            studentname: req.query.studentname,
            regno: req.query.regno,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updateawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                awardname: req.query.awardname,
                engagementtype: req.query.engagementtype,
                level: req.query.level,
                activitytype: req.query.activitytype,
                studentname: req.query.studentname,
                regno: req.query.regno,
                status1: req.query.status1,
                comments: req.query.comments
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


exports.deleteawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Awards.findByIdAndDelete(req.query.id);
        
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

exports.getextactbyfac= async (req,res) => {
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
        const lcat1233= await Extact.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Extension Activities')
        .where('colid')
        .equals(colid);
//res.status(200).send('Hello world for all the tours through db new router');
res.status(200).json({
    status:'Success',
    data: {
        classes : lcat1233,
        link: link123
    }

});           

} catch(err) {
res.status(400).json({
    status:'Failed',
    message: err
});

}  
};

exports.createextactbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Extact.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            activityname: req.query.activityname,
            orgunit: req.query.orgunit,
            scheme: req.query.scheme,
            year: req.query.year,
            noofstud: req.query.noofstud,
            status1: req.query.status1,
            comments: req.query.comments
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
     
exports.updateextactbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
                name: req.query.name,
                colid: req.query.colid,
                user: req.query.user,
                activityname: req.query.activityname,
                orgunit: req.query.orgunit,
                scheme: req.query.scheme,
                year: req.query.year,
                noofstud: req.query.noofstud,
                status1: req.query.status1,
                comments: req.query.comments
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

exports.deleteextactbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Extact.findByIdAndDelete(req.query.id);
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

exports.getcollabbyfac= async (req,res) => {
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
        const lcat1233= await Collab.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Collaboration Activities')
        .where('colid')
        .equals(colid);
    //res.status(200).send('Hello world for all the tours through db new router');
    res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createcollabbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
 
        const pub1= await Collab.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            title: req.query.title,
            agency: req.query.agency,
            participantname: req.query.participantname,
            year: req.query.year,
            duration: req.query.duration,
            activitynature: req.query.activitynature,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updatecollabbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                name: req.query.name,
                colid: req.query.colid,
                user: req.query.user,
                title: req.query.title,
                agency: req.query.agency,
                participantname: req.query.participantname,
                year: req.query.year,
                duration: req.query.duration,
                activitynature: req.query.activitynature,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deletecollabbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Collab.findByIdAndDelete(req.query.id);
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
 
exports.getmoubyfac= async (req,res) => {
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
        const lcat1233= await Mou.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('MoU Activities')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createmoubyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Mou.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            bodytype: req.query.bodytype,
            bodyname: req.query.bodyname,
            duration: req.query.duration,
            activity: req.query.activity,
            link: req.query.link,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updatemoubyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                name: req.query.name,
                colid: req.query.colid,
                user: req.query.user,
                year: req.query.year,
                bodytype: req.query.bodytype,
                bodyname: req.query.bodyname,
                duration: req.query.duration,
                activity: req.query.activity,
                link: req.query.link,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deletemoubyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Mou.findByIdAndDelete(req.query.id);
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

exports.getictbyfac= async (req,res) => {
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
        const lcat1233= await Ict.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('ICT Enabled Classrooms & Seminar Halls')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createictbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Ict.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            classroom: req.query.classroom,
            seminarhall: req.query.seminarhall,
            facitype: req.query.facitype,
            link: req.query.link,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updateictbyfac= async (req,res) => {

    try{
        const lcat1= await Ict.findByIdAndUpdate( req.query.id,{
                
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                classroom: req.query.classroom,
                seminarhall: req.query.seminarhall,
                facitype: req.query.facitype,
                link: req.query.link,
                status1: req.query.status1,
                comments: req.query.comments
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

exports.deleteictbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Ict.findByIdAndDelete(req.query.id);
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
exports.getexpenditurebyfac= async (req,res) => {
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
        const lcat1233= await Expenditure.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Infrastructure Augmentation')
            .where('colid')
            .equals(colid);  
//res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createexpenditurebyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Expenditure.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            budget: req.query.budget,
            infraexp: req.query.infraexp,
            totalexp: req.query.totalexp,
            academicexp: req.query.academicexp,
            physicalexp: req.query.physicalexp,
            status1: req.query.status1,
            comments: req.query.comments
            
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
exports.updateexpenditure= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                budget: req.query.budget,
                infraexp: req.query.infraexp,
                totalexp: req.query.totalexp,
                academicexp: req.query.academicexp,
                physicalexp: req.query.physicalexp,
                status1: req.query.status1,
                comments: req.query.comments
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

exports.deleteexpenditure= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Expenditure.findByIdAndDelete(req.query.id);
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

// exports.getstudschspbyfac= async (req,res) => {
//     //res.cookie("user","Akshata");
  
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
//         const user1=req.query.user;
//         const colid=req.query.colid;
//         const lcat1233= await Scholarship.find()
//             .where('user')
//             .equals(user1);
//             const link123= await Link.find()
//             .where('criteria')
//             .equals('Student Scholarships')
//             .where('colid')
//             .equals(colid);
//      //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success',
//         data: {
//             classes : lcat1233,
//             link: link123
//         }
 
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
// exports.createstudschspbyfac= async (req,res) => {

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

//         const pub1= await Scholarship.create({
//             name: req.query.name,
//             colid: req.query.colid,
//             department: req.query.department,
//             user: reqq.query.user,
//             year: req.query.year,
//             scheme: req.query.scheme,
//             noofgovstud: req.query.noofgovstud,
//             amountgov: req.query.amountgov,
//             noofinststud: req.query.noofinststud,
//             amountinst: req.query.amountinst,
//             status1: req.query.status1,
//             comments: req.query.comments
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
// };
// exports.updatestudschspbyfac= async (req,res) => {

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
//         const lcat1= await Scholarship.findByIdAndUpdate( req.query.id,{
//             name: req.query.name,
//             colid: req.query.colid,
//             department: req.query.department,
//             user: req.query.user,
//             year: req.query.year,
//             scheme: req.query.scheme,
//             noofgovstud: req.query.noofgovstud,
//             amountgov: req.query.amountgov,
//             noofinststud: req.query.noofinststud,
//             amountinst: req.query.amountinst,
//             status1: req.query.status1,
//             comments: req.query.comments
//         });
//       //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success'
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
// exports.deletestudschspbyfac= async (req,res) => {

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
//         const user1=req.query.user;
//         await Scholarship.findByIdAndDelete(req.query.id);
//       //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success'
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
exports.getlibrarybyfac= async (req,res) => {
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
        const lcat1233= await Library.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Library Expenditures')
            .where('colid')
            .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createlibrarybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Library.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            resource: req.query.resource,
            details: req.query.details,
            bookexp: req.query.bookexp,
            otherexp: req.query.otherexp,
            totalexp: req.query.totalexp,
            link: req.query.link,
            status1: req.query.status1,
            comments: req.query.comments
                
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
exports.updatelibrarybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            resource: req.query.resource,
            details: req.query.details,
            bookexp: req.query.bookexp,
            otherexp: req.query.otherexp,
            totalexp: req.query.totalexp,
            link: req.query.link,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deletelibrarybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Library.findByIdAndDelete(req.query.id);
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
// exports.getfundsbyfac= async (req,res) => {
//     //res.cookie("user","Akshata");
  
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
//         const user1=req.query.user;
//         const colid=req.query.colid;
//         const lcat1233= await Funds.find()
//         .where('user')
//         .equals(user1);
//         const link123= await Link.find()
//         .where('criteria')
//         .equals('Gov./Non-government Funds')
//         .where('colid')
//         .equals(colid);
//        //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success',
//         data: {
//             classes : lcat1233,
//             link: link123
//         }
 
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
// exports.createfundsbyfac= async (req,res) => {

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
    
//         const pub1= await Funds.create({
//             name: req.query.name,
//             colid: req.query.colid,
//             user: req.query.user,
//             year: req.query.year,
//             type: req.query.type,
//             purpose: req.query.purpose,
//             amount: req.query.amount,
//             link: req.query.link,
//             status1: req.query.status1,
//             comments: req.query.comments
                
//             });
//      //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success'
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
// exports.updatefundsbyfac= async (req,res) => {

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
//         const lcat1= await Funds.findByIdAndUpdate( req.query.id,{
//             name: req.query.name,
//             colid: req.query.colid,
//             department: req.query.department,
//             user: req.query.user,
//             year: req.query.year,
//             name: req.query.name,
//             type: req.query.type,
//             purpose: req.query.purpose,
//             amount: req.query.amount,
//             link: req.query.link,
//             status1: req.qquery.status1,
//             comments: req.query.comments
//         });
//       //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success'
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
// exports.deletefundsbyfac= async (req,res) => {

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
//         const user1=req.query.user;
//         await Funds.findByIdAndDelete(req.query.id);
//         //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success',
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
exports.getqualitybyfac= async (req,res) => {
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
        const lcat1233= await Quality.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Institutional Quality Initiatives')
        .where('colid')
        .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createqualitybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Quality.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            type: req.query.type,
            action: req.query.action,
            instname: req.query.instname,
            activity: req.query.activity,
            startdate: req.query.startdate,
            enddate: req.query.enddate,
            partstatus: req.query.partstatus,
            other: req.query.other,
            status1: req.query.status1,
            comments: req.query.comments
            
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
exports.updatequalitybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            type: req.query.type,
            action: req.query.action,
            instname: req.query.instname,
            activity: req.query.activity,
            startdate: req.query.startdate,
            enddate: req.query.enddate,
            partstatus: req.query.partstatus,
            other: req.query.other,
            status1: req.query.status1,
            comments: req.query.comments
        
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
exports.deletequalitybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Quality.findByIdAndDelete(req.query.id);
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
exports.getskilldevbyfac= async (req,res) => {
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
        const lcat1233= await Skilldev.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Skill Development Programs')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getskilldevbyadmin= async (req,res) => {
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
        const lcat1233= await Skilldev.find()
        .where('colid')
        .equals(colid);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('Skill Development Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createskilldevbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const pub1= await Skilldev.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            programname: req.query.programname,
            date: req.query.date,
            noofstudenr: req.query.noofstudenr,
            agency: req.query.agency,
            contactdetails: req.query.contactdetails,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updateskilldevbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            programname: req.query.programname,
            date: req.query.date,
            noofstudenr: req.query.noofstudenr,
            agency: req.query.agency,
            contactdetails: req.query.contactdetails,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deleteskilldevbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Skilldev.findByIdAndDelete(req.query.id);
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
exports.getcareercounselbyfac= async (req,res) => {
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
        const lcat1233= await Careercounsel.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Career Counselling Activities')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createcareercounselbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Careercounsel.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            activityname: req.query.activityname,
            studattd: req.query.studattd,
            studplaced: req.query.studplaced,
            status1: req.query.status1,
            comments: req.query.comments
            
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
exports.updatecareercounselbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                activityname: req.query.activityname,
                studattd: req.query.studattd,
                studplaced: req.query.studplaced,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deletecareercounselbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Careercounsel.findByIdAndDelete(req.query.id);
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
      
exports.getplacementbyfac= async (req,res) => {
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
        const lcat1233= await Placement.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Outgoing Student Placement')
        .where('colid')
        .equals(colid);    
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createplacementbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Placement.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            studentname: req.query.studentname,
            regno: req.query.regno,
            studcontactdetails: req.query.studcontactdetails,
            programname: req.query.programname,
            employername: req.query.employername,
            empcontactdetails: req.query.empcontactdetails, 
            sector: req.query.sector,
            designation: req.query.designation,
            employerid: req.query.employerid,
            jobid: req.query.jobid,
            salary: req.query.salary,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.updateplacementbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            studentname: req.query.studentname,
            regno: req.query.regno,
            studcontactdetails: req.query.studcontactdetails,
            programname: req.query.programname,
            employername: req.query.employername,
            empcontactdetails: req.query.empcontactdetails, 
            sector: req.query.sector,
            designation: req.query.designation,
            employerid: req.query.employerid,
            jobid: req.query.jobid,
            salary: req.query.salary,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deleteplacementbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Placement.findByIdAndDelete(req.query.id);
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
exports.gethigheredubyfac= async (req,res) => {
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
        const lcat1233= await Higheredu.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Student Progression to Higher Education')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createhigheredubyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Higheredu.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            studentname: req.query.studentname,
            programgrad: req.query.programgrad,
            institution: req.query.institution,
            programadm: req.query.programadm,
            status1: req.query.status1,
            comments: req.query.comments
            
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
exports.updatehigheredubyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Higheredu.findByIdAndUpdate( req.query.id,{
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                studentname: req.query.studentname,
                programgrad: req.query.programgrad,
                institution: req.query.institution,
                programadm: req.query.programadm,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deletehigheredubyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Higheredu.findByIdAndDelete(req.query.id);
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
exports.gethigherexambyfac= async (req,res) => {
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
        const lcat1233= await Higherexam.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Student Qualifying in Higher Examination')
            .where('colid')
            .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
    //res.status(200).send('Hello world for all the tours through db new router');
    res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });        
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createhigherexambyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Higherexam.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            regno: req.query.regno,
            studentname: req.query.studentname,
            examname: req.query.examname,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updatehigherexambyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Higherexam.findByIdAndUpdate( req.query.id,{
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                regno: req.query.regno,
                studentname: req.query.studentname,
                examname: req.query.examname,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deletehigherexambyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Higherexam.findByIdAndDelete(req.query.id);
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

exports.getteacherfsbyfac= async (req,res) => {
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
        const lcat1233= await Teacherfs.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Financial Support provided for Faculty')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createteacherfsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Teacherfs.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            tname: req.query.tname,
            workshop: req.query.workshop,
            profbody: req.query.profbody,
            amount: req.query.amount,
            source: req.query.source,
            status1: req.query.status1,
            comments: req.query.comments
            
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
exports.updateteacherfsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                name: req.query.name,
                colid: req.query.colid,
                department: req.query.department,
                user: req.query.user,
                year: req.query.year,
                tname: req.query.tname,
                workshop: req.query.workshop,
                profbody: req.query.profbody,
                amount: req.query.amount,
                source: req.query.source,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deleteteacherfsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Teacherfs.findByIdAndDelete(req.query.id);
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
exports.getegovernbyfac= async (req,res) => {
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
        const lcat1233= await Egovern.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Implementation of E Governance')
            .where('colid')
            .equals(colid);
    //res.status(200).send('Hello world for all the tours through db new router');
    res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });             
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createegovernbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

   
        const pub1= await Egovern.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            egovernareas: req.query.egovernareas,
            yearofimplement: req.query.yearofimplement,
            status1: req.query.status1,
            comments: req.query.comments
            
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
exports.updateegovernbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            egovernareas: req.query.egovernareas,
            yearofimplement: req.query.yearofimplement,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.deleteegovernbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Egovern.findByIdAndDelete(req.query.id);
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

exports.getaddoncbyfac= async (req,res) => {
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
        const lcat1233= await Addonc.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Value Added Courses')
        .where('colid')
        .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createaddoncbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Addonc.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
            coursetitle: req.query.coursetitle,
            coursecode: req.query.coursecode,
            coursetype: req.query.coursetype,
            offeredtimes: req.query.offeredtimes,
            duration: req.query.duration,
            studentsenrolled:req.query.studentsenrolled,
            studentscompleted:req.query.studentscompleted,
            price: req.query.price,
            imagelink: req.query.imagelink,
            status: req.query.status,
            category: req.query.category,
            status1: req.query.status1,
            comments: req.query.comments,
            department: req.query.department,
            coursehours: req.query.coursehours,
            totalstudents: req.query.totalstudents

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

exports.updateaddoncbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await Addonc.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:req.query.year,
            coursetitle: req.query.coursetitle,
            coursecode: req.query.coursecode,
            coursetype: req.query.coursetype,
            offeredtimes: req.query.offeredtimes,
            duration: req.query.duration,
            studentsenrolled:req.query.studentsenrolled,
            studentscompleted:req.query.studentscompleted,
            price: req.query.price,
            imagelink: req.query.imagelink,
            status: req.query.status,
            category: req.query.category,
            status1: req.query.status1,
            comments: req.query.comments,
            department: req.query.department,
            coursehours: req.query.coursehours,
            totalstudents: req.query.totalstudents
        });
        res.status(200).json({
            status:'Success'
        });
      
   
        
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.deleteaddoncbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Addonc.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getinstawardsbyfac= async (req,res) => {
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
        const lcat1233= await Instawards.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Institutional Awards')
        .where('colid')
        .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createinstawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Instawards.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            awardname: req.query.awardname,
            awardbody: req.query.awardbody,
            activity: req.query.activity,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateinstawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const lcat1= await Instawards.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            awardname: req.query.awardname,
            awardbody: req.query.awardbody,
            activity: req.query.activity,
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

exports.deleteinstawardsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await BOS.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
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
        const lcat1233= await Phdguide.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Research Guide')
        .where('colid')
        .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
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

        const pub1= await Phdguide.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            researchguide: req.query.researchguide,
            department: req.query.department,
            ifrecognized: req.query.ifrecognized,
            scholar:req.query.scholar,
            title:req.query.title,
            yog:req.query.yog,
            yor:req.query.yor,
            yop:req.query.yop,
            pgyear:req.query.pgyear,
            phdyear:req.query.phdyear,
            qualification:req.query.qualification,
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

        const lcat1= await Phdguide.findByIdAndUpdate( req.query.id,{
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            researchguide: req.query.researchguide,
            department: req.query.department,
            ifrecognized: req.query.ifrecognized,
            scholar:req.query.scholar,
            title:req.query.title,
            yog:req.query.yog,
            yor:req.query.yor,
            yop:req.query.yop,
            pgyear:req.query.pgyear,
            phdyear:req.query.phdyear,
            qualification:req.query.qualification,
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
        await Phdguide.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getinnovationbyfac= async (req,res) => {
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
        const lcat1233= await Innovation.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Innovations')
        .where('colid')
        .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getinnovationadmin= async (req,res) => {
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
        const lcat1233= await Innovation.find()
        .where('colid')
        .equals(colid);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('Innovations')
        // .where('colid')
        // .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createinnovationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Innovation.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            awardee: req.query.awardee,
            department: req.query.department,
            title:req.query.title,
            year:req.query.year,
            agency:req.query.agency,
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

exports.updateinnovationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            awardee: req.query.awardee,
            department: req.query.department,
            title:req.query.title,
            year:req.query.year,
            agency:req.query.agency,
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

exports.deleteinnovationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Innovation.findByIdAndDelete(req.query.id);
        
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.getresultbyfac= async (req,res) => {
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
        const lcat1233= await Result.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Result Publications')
            .where('colid')
            .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createresultbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Result.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
                programcode: req.query.programcode,
                programname: req.query.programname,
                semester: req.query.semester,
                lastdate: req.query.lastdate,
                resultdate: req.query.resultdate,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.updateresultbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
                programcode: req.query.programcode,
                programname: req.query.programname,
                semester: req.query.semester,
                lastdate: req.query.lastdate,
                resultdate: req.query.resultdate,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deleteresultbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Result.findByIdAndDelete(req.query.id);
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

exports.getecontentbyfac= async (req,res) => {
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
        const lcat1233= await Econtent.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('E-content developed by Teachers')
            .where('colid')
            .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createecontentbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Econtent.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
                fname: req.query.name,
                module: req.query.module,
                platform: req.query.platform,
                date: req.query.date,
                facility: req.query.facility,
                doclink: req.query.doclink,
                videolink: req.query.videolink,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.updateecontentbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
                fname: req.query.name,
                module: req.query.module,
                platform: req.query.platform,
                date: req.query.date,
                facility: req.query.facility,
                doclink: req.query.doclink,
                videolink: req.query.videolink,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deleteecontentbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Econtent.findByIdAndDelete(req.query.id);
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

exports.getseedmbyfac= async (req,res) => {
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
        const lcat1233= await Seedm.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Seed Money')
            .where('colid')
            .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createseedmbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Seedm.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
                fname: req.query.fname,
                amount: req.query.amount,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.updateseedmbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
                fname: req.query.fname,
                amount: req.query.amount,
                status1: req.query.status1,
                comments: req.query.comments
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
exports.deleteseedmbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Seedm.findByIdAndDelete(req.query.id);
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

exports.getconsultancybyfac= async (req,res) => {
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
        const lcat1233= await Consultancy.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Consultancy')
            .where('colid')
            .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
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

        const pub1= await Consultancy.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            role: req.query.role,
            title: req.query.title,
            consultant: req.query.consultant,
            advisor: req.query.advisor,
            agency: req.query.agency,
            contact: req.query.contact,
            revenue: req.query.revenue,
            status1: req.query.status1,
            comments: req.query.comments
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
        const lcat1= await Consultancy.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            role: req.query.role,
            title: req.query.title,
            consultant: req.query.consultant,
            advisor: req.query.advisor,
            agency: req.query.agency,
            contact: req.query.contact,
            revenue: req.query.revenue,
            status1: req.query.status1,
            comments: req.query.comments
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
        await Consultancy.findByIdAndDelete(req.query.id);
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

exports.getctrainingbyfac= async (req,res) => {
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
        const lcat1233= await Ctraining.find()
            .where('user')
            .equals(user1);
         
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getctrainingbyadmin= async (req,res) => {
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
        const lcat1233= await Ctraining.find()
            .where('colid')
            .equals(colid);
         
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createctrainingbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Ctraining.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            role: req.query.role,
            title: req.query.title,
            consultant: req.query.consultant,
            agency: req.query.agency,
            nooftrainees: req.query.nooftrainees,
            revenue: req.query.revenue,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.updatectrainingbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Ctraining.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            role: req.query.role,
            title: req.query.title,
            consultant: req.query.consultant,
            agency: req.query.agency,
            nooftrainees: req.query.nooftrainees,
            revenue: req.query.revenue,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deletectrainingbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Ctraining.findByIdAndDelete(req.query.id);
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

exports.getsyllabusrevbyfac= async (req,res) => {
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
        const lcat1233= await Syllabusrev.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Syllabus Revision')
            .where('colid')
            .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createsyllabusrevbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Syllabusrev.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            programcode: req.query.programcode,
                programname: req.query.programname,
                yearofintro: req.query.yearofintro,
                statusofimplement: req.query.statusofimplement,
                yearofimplement: req.query.yearofimplement,
                yearofrevision: req.query.yearofrevision,
                changepercent: req.query.changepercent,
                link: req.query.link,
                datastatus: req.query.datastatus,
                comment: req.query.comment
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
exports.updatesyllabusrevbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Syllabusrev.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            user: req.query.user,
            programcode: req.query.programcode,
                programname: req.query.programname,
                yearofintro: req.query.yearofintro,
                statusofimplement: req.query.statusofimplement,
                yearofimplement: req.query.yearofimplement,
                yearofrevision: req.query.yearofrevision,
                changepercent: req.query.changepercent,
                link: req.query.link,
                datastatus: req.query.datastatus,
                comment: req.query.comment
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
exports.deletesyllabusrevbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Syllabusrev.findByIdAndDelete(req.query.id);
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





exports.getfundsbyfac= async (req,res) => {
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
        const lcat1233= await Funds.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Gov./Non-government Funds')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createfundsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
    
        const pub1= await Funds.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            agency: req.query.agency,
            type: req.query.type,
            purpose: req.query.purpose,
            amount: req.query.amount,
            link: req.query.link,
            status1: req.query.status1,
            comments: req.query.comments
                
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
exports.updatefundsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            agency: req.query.agency,
            type: req.query.type,
            purpose: req.query.purpose,
            amount: req.query.amount,
            link: req.query.link,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deletefundsbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Funds.findByIdAndDelete(req.query.id);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

2.

exports.getstudschspbyfac= async (req,res) => {
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
        const lcat1233= await Scholarship.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Student Scholarships')
            .where('colid')
            .equals(colid);
     //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};
exports.createstudschspbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Scholarship.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            scheme: req.query.scheme,
            noofgovstud: req.query.noofgovstud,
            amountgov: req.query.amountgov,
            noofinststud: req.query.noofinststud,
            amountinst: req.query.amountinst,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.updatestudschspbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            scheme: req.query.scheme,
            noofgovstud: req.query.noofgovstud,
            amountgov: req.query.amountgov,
            noofinststud: req.query.noofinststud,
            amountinst: req.query.amountinst,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deletestudschspbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Scholarship.findByIdAndDelete(req.query.id);
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

exports.getexplearningbyfac= async (req,res) => {
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
        const lcat1233= await Explearning.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Experential Learning')
        .where('colid')
        .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createexplearningbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Explearning.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            department: req.query.department,
            programname: req.query.programname,
            programcode: req.query.programcode,
            type: req.query.type,
            activity: req.query.activity,
            sname: req.query.sname,
            regno: req.query.regno,
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

exports.updateexplearningbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Explearning.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            department: req.query.department,
            programname: req.query.programname,
            programcode: req.query.programcode,
            type: req.query.type,
            activity: req.query.activity,
            sname: req.query.sname,
            regno: req.query.regno,
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

exports.deleteexplearningbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Explearning.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


// pratiti nov 4

exports.getemployabilitybyfac= async (req,res) => {
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
        const lcat1233= await Emp.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Focus on Employability')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createemployabilitybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Emp.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursename: req.query.coursename,
            coursecode: req.query.coursecode,
            year: req.query.year,
            activity: req.query.activity,
            description: req.query.description,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateemployabilitybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const lcat1= await Emp.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            coursename: req.query.coursename,
            coursecode: req.query.coursecode,
            year: req.query.year,
            activity: req.query.activity,
            description: req.query.description,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deleteemployabilitybyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Emp.findByIdAndDelete(req.query.id);
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

exports.getphdguidebyfac= async (req,res) => {
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
        const lcat1233= await Phd.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Phd Guide')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

// exports.createphdguidebyfac= async (req,res) => {

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

//         const pub1= await Phd.create({
//             name: req.query.name,
//             colid: req.query.colid,
//             user: req.query.user,
//             department: req.query.department,
//             researchguide: req.query.researchguide,
//             yog: req.query.yog,
//             scholar: req.query.scholar,
//             title: req.query.title,
//             yor: req.query.yor,
//             yop: req.query.yop,
//             status1: req.query.status1,
//             comments: req.query.comments
//         });
//   //res.status(200).send('Hello world for all the tours through db new router');
//   res.status(200).json({
//     status:'Success'

// });           

// } catch(err) {
// res.status(400).json({
//     status:'Failed',
//     message: err
// });

// }  
// };

// exports.updatephdguidebyfac= async (req,res) => {

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
//         const lcat1= await Phd.findByIdAndUpdate( req.query.id,{
//             name: req.query.name,
//             colid: req.query.colid,
//             user: req.query.user,
//             department: req.query.department,
//             researchguide: req.query.researchguide,
//             yog: req.query.yog,
//             scholar: req.query.scholar,
//             title: req.query.title,
//             yor: req.query.yor,
//             yop: req.query.yop,
//             status1: req.query.status1,
//             comments: req.query.comments
//         });
//         //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success'
 
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };
// exports.deletephdguidebyfac= async (req,res) => {

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
//         const user1=req.cookies['user'];
//         await Phd.findByIdAndDelete(req.query.id);
//         //res.status(200).send('Hello world for all the tours through db new router');
//      res.status(200).json({
//         status:'Success'
//     });           
   
// } catch(err) {
//     res.status(400).json({
//         status:'Failed',
//         message: err
//     });

// }  
// };

exports.getteacherawardbyfac= async (req,res) => {
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
        const lcat1233= await Teacheraward.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Faculty Awards/Recognitions')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createteacherawardbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Teacheraward.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            tname: req.query.tname,
            pan: req.query.pan,
            designation: req.query.designation,
            award: req.query.award,
            agency: req.query.agency,
            type: req.query.type,
            amount: req.query.amount,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateteacherawardbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            tname: req.query.tname,
            pan: req.query.pan,
            designation: req.query.designation,
            award: req.query.award,
            agency: req.query.agency,
            type: req.query.type,
            amount: req.query.amount,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deleteteacherawardbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await teacheraward.findByIdAndDelete(req.query.id);
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

exports.getexamautomationbyfac= async (req,res) => {
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
        const lcat1233= await Examautomation.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Automation of Examination')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createexamautomationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Examautomation.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            type: req.query.type,
            status: req.query.status,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateexamautomationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            type: req.query.type,
            status: req.query.status,
            status1: req.query.status1,
            comments: req.query.comments
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
exports.deleteexamautomationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Examautomation.findByIdAndDelete(req.query.id);
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

exports.getteacherfellowbyfac= async (req,res) => {
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
        const lcat1233= await Teacherfellow.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Teachers receiving Fellowships')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getteacherfellowbyadmin= async (req,res) => {
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
        const lcat1233= await Teacherfellow.find()
        .where('colid')
        .equals(colid);
        
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
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

        const pub1= await Teacherfellow.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            tname: req.query.tname,
            award: req.query.award,
            agency: req.query.agency,
            status1: req.query.status1,
            comments: req.query.comments
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
        const lcat1= await Teacherfellow.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            tname: req.query.tname,
            award: req.query.award,
            agency: req.query.agency,
            status1: req.query.status1,
            comments: req.query.comments
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
        const user1=req.cookies['user'];
        await Teacherfellow.findByIdAndDelete(req.query.id);
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

exports.getresearchfellowbyfac= async (req,res) => {
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
        const lcat1233= await Researchfellow.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Research Fellows')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getresearchfellowbyadmin= async (req,res) => {
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
        const lcat1233= await Researchfellow.find()
        .where('colid')
        .equals(colid);
       
        //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createresearchfellowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Researchfellow.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            fellowname: req.query.fellowname,
            duration: req.query.duration,
            agency: req.query.agency,   
            type: req.query.type,
            exam: req.query.exam,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateresearchfellowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year: req.query.year,
            fellowname: req.query.fellowname,
            duration: req.query.duration,
            agency: req.query.agency,   
            type: req.query.type,
            exam: req.query.exam,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updateresearchfellowprojects= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
            projectid: req.query.projectid,
            project: req.query.project,
            projectuser: req.query.projectuser,
            projectfaculty: req.query.projectfaculty
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


exports.deleteresearchfellowbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Researchfellow.findByIdAndDelete(req.query.id);
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

exports.getmenteesbyfac= async (req,res) => {
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
        const lcat1233= await Mentees.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Mentor-Mentee ')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.creatementeesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Mentees.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            year: req.query.year,
            mentor: req.query.mentor,
            noofmentee: req.query.noofmentee,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.updatementeesbyfac= async (req,res) => {

    try{
        const lcat1= await Mentees.findByIdAndUpdate( req.query.id,{
                
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            year: req.query.year,
            mentor: req.query.mentor,
            noofmentee: req.query.noofmentee,
            status1: req.query.status1,
            comments: req.query.comments
            
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

exports.deletementeesbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Mentees.findByIdAndDelete(req.query.id);
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

exports.getalumniconbyfac= async (req,res) => {
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
        const lcat1233= await Alumnicon.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Alumni Contribution')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createalumniconbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Alumnicon.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            year: req.query.year,
            amount: req.query.amount,
            status1: req.query.status1,
            comments: req.query.comments
            
            
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

exports.updatealumniconbyfac= async (req,res) => {

    try{
        const lcat1= await Alumnicon.findByIdAndUpdate( req.query.id,{
                
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            year: req.query.year,
            amount: req.query.amount,
            status1: req.query.status1,
            comments: req.query.comments
            
            
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

exports.deletealumniconbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Alumnicon.findByIdAndDelete(req.query.id);
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



exports.getincubationbyfac= async (req,res) => {
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
        const lcat1233= await Incubation.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Incubation')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getincubationbyadmin= async (req,res) => {
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
        const lcat1233= await Incubation.find()
        .where('colid')
        .equals(colid);
        const link123= await Link.find()
        .where('criteria')
        .equals('Incubation')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createincubationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Incubation.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            yop: req.query.yop,
            incubationcenter: req.query.incubationcenter,
            incubationname: req.query.incubationname,
            sponsoredby:req.query.sponsoredby,
            status1: req.query.status1,
            comments: req.query.comments
            
            
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

exports.updateincubationbyfac= async (req,res) => {

    try{
        const lcat1= await Incubation.findByIdAndUpdate( req.query.id,{
                
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            yop: req.query.yop,
            incubationcenter: req.query.incubationcenter,
            incubationname: req.query.incubationname,
            sponsoredby:req.query.sponsoredby,
            status1: req.query.status1,
            comments: req.query.comments
            
            
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

exports.deleteincubationbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Incubation.findByIdAndDelete(req.query.id);
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



exports.getstartupbyfac= async (req,res) => {
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
        const lcat1233= await Startup.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Startup')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getstartupadmin= async (req,res) => {
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
        const lcat1233= await Startup.find()
        .where('colid')
        .equals(colid);
        const link123= await Link.find()
        .where('criteria')
        .equals('Startup')
        .where('colid')
        .equals(colid);
      //res.status(200).send('Hello world for all the tours through db new router');
     res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createstartupbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }

        const pub1= await Startup.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            yop: req.query.yop,
            startupname: req.query.startupname,
            description: req.query.description,
            startupdate:req.query.startupdate,
            status1: req.query.status1,
            comments: req.query.comments
            
            
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

exports.updatestartupbyfac= async (req,res) => {

    try{
        const lcat1= await Startup.findByIdAndUpdate( req.query.id,{
                
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            yop: req.query.yop,
            startupname: req.query.startupname,
            description: req.query.description,
            startupdate:req.query.startupdate,
            status1: req.query.status1,
            comments: req.query.comments
            
            
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

exports.deletestartupbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.cookies['user'];
        await Startup.findByIdAndDelete(req.query.id);
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

exports.deleteallskilldevbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Skilldev.deleteMany({ colid: req.query.colid, user: req.query.user });
        res.status(200).json({
            status:'Success',
        });
    } catch(err) {
        res.status(200).json({
            status:'Error',
            message: err
        });
    }   
};


exports.getcurgapbyfac= async (req,res) => {
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
        const lcat1233= await Curgap.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getcurgapbyadmin= async (req,res) => {
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
        const lcat1233= await Curgap.find()
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

exports.createcurgapbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Curgap.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            gap: req.query.gap,
            actiontaken: req.query.actiontaken,
            actiondate: new Date(req.query.actiondate),
            year: req.query.year,
            resource: req.query.resource,
            mode: req.query.mode,
            noofstudents: req.query.noofstudents,
            relevance: req.query.relevance,
            department:req.query.department,
            program:req.query.program,
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

exports.updatecurgapbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Curgap.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            gap: req.query.gap,
            actiontaken: req.query.actiontaken,
            actiondate: new Date(req.query.actiondate),
            year: req.query.year,
            resource: req.query.resource,
            mode: req.query.mode,
            noofstudents: req.query.noofstudents,
            relevance: req.query.relevance,
            department:req.query.department,
            program:req.query.program,
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

exports.deletecurgapbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Curgap.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getdepprogbyfac= async (req,res) => {
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
        const lcat1233= await Depprograms.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getdepprogbyadmin= async (req,res) => {
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
        const lcat1233= await Depprograms.find()
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

exports.createdepprogbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Depprograms.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            program: req.query.program,
            programcode: req.query.programcode,
            level: req.query.level,
            faculty: req.query.faculty,
            introduced: new Date(req.query.introduced),
            discontinued: new Date(req.query.discontinued),
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

exports.updatedepprogbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Depprograms.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            program: req.query.program,
            programcode: req.query.programcode,
            level: req.query.level,
            faculty: req.query.faculty,
            introduced: new Date(req.query.introduced),
            discontinued: new Date(req.query.discontinued),
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

exports.deletedepprogbyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Depprograms.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getdeppubbyfac= async (req,res) => {
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
        const lcat1233= await Deppublications.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getdeppubbyadmin= async (req,res) => {
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
        const lcat1233= await Deppublications.find()
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

exports.createdeppub= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Deppublications.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            publication: req.query.publication,
            editor: req.query.editor,
            publisher: req.query.publisher,
            status1: req.query.status1,
            comments: req.query.comments,
            type:req.query.type
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updatedeppub= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Deppublications.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            publication: req.query.publication,
            editor: req.query.editor,
            publisher: req.query.publisher,
            status1: req.query.status1,
            comments: req.query.comments,
            type:req.query.type
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.deletedeppub= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Deppublications.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getstudpubbyfac= async (req,res) => {
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
        const lcat1233= await Studentpubs.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getstudpubbyadmin= async (req,res) => {
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
        const lcat1233= await Studentpubs.find()
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

exports.createstudpub= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Studentpubs.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            publication: req.query.publication,
            student: req.query.student,
            regno: req.query.regno,
            award: req.query.award,
            agency: req.query.agency,
            status1: req.query.status1,
            comments: req.query.comments,
            academicyear:req.query.academicyear
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updatestudpub= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Studentpubs.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            publication: req.query.publication,
            student: req.query.student,
            regno: req.query.regno,
            award: req.query.award,
            agency: req.query.agency,
            status1: req.query.status1,
            comments: req.query.comments,
            academicyear:req.query.academicyear
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.deletestudpub= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Studentpubs.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getremedialbyfac= async (req,res) => {
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
        const lcat1233= await Remedial.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getremedialbyadmin= async (req,res) => {
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
        const lcat1233= await Remedial.find()
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

exports.createremedial= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Remedial.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            program: req.query.program,
            programcode: req.query.programcode,
            course: req.query.course,
            coursecode: req.query.coursecode,
            student: req.query.student,
            regno: req.query.regno,
            intervention: req.query.intervention,
            remdate: new Date(req.query.remdate),
            status1: req.query.status1,
            comments: req.query.comments,
            academicyear:req.query.academicyear,
            type:req.query.type
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updateremedial= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Remedial.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            program: req.query.program,
            programcode: req.query.programcode,
            course: req.query.course,
            coursecode: req.query.coursecode,
            student: req.query.student,
            regno: req.query.regno,
            intervention: req.query.intervention,
            remdate: new Date(req.query.remdate),
            status1: req.query.status1,
            comments: req.query.comments,
            academicyear:req.query.academicyear,
            type:req.query.type
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.deleteremedial= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Remedial.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getpoactionsbyfac= async (req,res) => {
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
        const lcat1233= await Poactions.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getpoactionsbyadmin= async (req,res) => {
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
        const lcat1233= await Poactions.find()
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

exports.createpoactions= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Poactions.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            po: req.query.po,
            target: req.query.target,
            actual: req.query.actual,
            observations: req.query.observations,
            status1: req.query.status1,
            comments: req.query.comments,
            academicyear:req.query.academicyear,
            program:req.query.program
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updatepoactions= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Poactions.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            po: req.query.po,
            target: req.query.target,
            actual: req.query.actual,
            observations: req.query.observations,
            status1: req.query.status1,
            comments: req.query.comments,
            academicyear:req.query.academicyear,
            program:req.query.program
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.deletepoactions= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Poactions.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getcurstructurebyfac= async (req,res) => {
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
        const lcat1233= await Curstructure.find()
        .where('user')
        .equals(user1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('CBCS Programs')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getcurstructurebyadmin= async (req,res) => {
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
        const lcat1233= await Curstructure.find()
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

exports.createcurstructure= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
  
        const pub1= await Curstructure.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            program: req.query.program,
            programcode: req.query.programcode,
            course: req.query.course,
            coursecode: req.query.coursecode,
            status1: req.query.status1,
            comments: req.query.comments,
            theory:req.query.theory,
            practical:req.query.practical,
            lecture:req.query.lecture,
            total:req.query.total,
            credits:req.query.credits
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updatecurstructure= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await Curstructure.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            department: req.query.department,
            program: req.query.program,
            programcode: req.query.programcode,
            course: req.query.course,
            coursecode: req.query.coursecode,
            status1: req.query.status1,
            comments: req.query.comments,
            theory:req.query.theory,
            practical:req.query.practical,
            lecture:req.query.lecture,
            total:req.query.total,
            credits:req.query.credits
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.deletecurstructure= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
        await Curstructure.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};










