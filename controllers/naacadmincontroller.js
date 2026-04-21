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
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Addonc=require('./../Models/addonc');
const Phdguide=require('./../Models/phdguide');
const Innovation=require('./../Models/innovation');
const Syllabusrev=require('./../Models/syllabusrev');
const Employability=require('./../Models/employability');
const Explearning=require('./../Models/explearning');


const Examautomation = require('../Models/examautomation');
const Teacherawards = require('../Models/teacheraward');
const Mentees = require('../Models/mentees');
const Seedm = require('../Models/seedm');
const Teacherfellow = require('../Models/teacherfellow');
const Alumnicon = require('../Models/alumnicon');
const Consultancy = require('../Models/consultancy');
const Result=require('./../Models/result');
//const Scholarship=require('./../Models/studschsp');
const Econtent=require('./../Models/econtent');


const Incubation=require('./../Models/incubation');
const Qualityinit=require('./../Models/qualityinit');
const Fdp=require('./../Models/fdp');
const Fieldproj=require('./../Models/fieldproj');
const Sportsact=require('./../Models/sportsact');
const Explearnproj=require('./../Models/explearnproj');


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
        .where('colid')
        .equals(colid);
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

exports.getaddoncbyadmin= async (req,res) => {
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
        .where('colid')
        .equals(colid);
        const link123= await Link.find()
        .where('criteria')
        .equals('Add on course')
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
            department: department,
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
            department: req.query.department,
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
        .where('colid')
        .equals(colid);
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
            department: req.query.department,
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
            department: req.query.department,
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
        .where('colid')
        .equals(colid);
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


exports.geteventbyyear= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        // const token=req.query.token;
        // //console.log(token);
        // let jwtuser='';
        // let jwtcolid='';
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
        //const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        // const lcat1233= await Event.find()
        // .where('colid')
        // .equals(colid)
        // .where('academicyear')
        // .equals(req.query.academicyear);

        const lcat1233= await Event.aggregate([
            { 
                $match: {colid: colid1, academicyear: req.query.academicyear }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        department: '$department',
                        academicyear: '$academicyear',
                        type: '$type'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        
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

exports.geteventyearcount= async (req,res) => {
    try{
        //const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Event.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$academicyear', 
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

exports.geteventdepcount= async (req,res) => {
    try{
        //const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Event.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$department', 
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

exports.getipr= async (req,res) => {
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
        const lcat1233= await Event.find({ "type" : { $in : ['Research/IPR', 'Extension Lecture']}})
        .where('colid')
        .equals(colid);
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

exports.getextension= async (req,res) => {
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
        const eventtype=req.query.eventtype;
        const lcat1233= await Event.find({ "type" : { $in : [eventtype]}})
        .where('colid')
        .equals(colid);
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
            user: req.query.user,
            department: req.query.department,
            eventname: req.query.eventname,
            description: req.query.description,
            department: req.query.department,
            brochurelink: req.query.brochurelink,
            date: req.query.date, //req.body.classdate,
            time: req.query.time,
            coordinator: req.query.coordinator,
            type: req.query.type,
            eventlink: req.query.eventlink,
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
                user: req.query.user,
                department: req.query.department,
                eventname: req.query.eventname,
                description: req.query.description,
                department: req.query.department,
                brochurelink: req.query.brochurelink,
                date: req.query.date, //req.body.classdate,
                time: req.query.time,
                coordinator: req.query.coordinator,
                type: req.query.type,
                eventlink: req.query.eventlink,
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
        .where('colid')
        .equals(colid);
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

        const pub1= await Admisision.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
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
                department: req.query.department,
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
        .where('colid')
        .equals(colid);
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
        .where('colid')
        .equals(colid);
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
            name: req.query.name,
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
            name: req.query.name,
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
        .where('colid')
        .equals(colid);
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
        .where('colid')
        .equals(colid);
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
        .where('colid')
        .equals(colid);
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
            colid: reqq.query.colid,
            department: req.query.department,
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
                department: req.query.department,
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
        .where('colid')
        .equals(colid);
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
            department: req.query.department,
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
        .where('colid')
        .equals(colid);
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
            department: req.query.department,
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
        .where('colid')
        .equals(colid);
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
            .where('colid')
            .equals(colid);
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
            .where('colid')
            .equals(colid);
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
            department: req.query.department,
            user: reqq.query.user,
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
            .where('colid')
            .equals(colid);
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
        .where('colid')
        .equals(colid);
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
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            name: req.query.name,
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
            year: req.query.year,
            name: req.query.name,
            type: req.query.type,
            purpose: req.query.purpose,
            amount: req.query.amount,
            link: req.query.link,
            status1: req.qquery.status1,
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
        .where('colid')
        .equals(colid);
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
exports.getviewskilldev= async (req,res) => {
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
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const lcat1233= await Skilldev.find()
        .where('colid')
        .equals(colid);
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
        .where('colid')
        .equals(colid);
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
        .where('colid')
        .equals(colid);
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
            department: req.query.department,
            user: req.query.user,
            year: req.query.year,
            studentname: req.query.studentname,
            studcontactdetails: req.query.studcontactdetails,
            programname: req.query.programname,
            employername: req.query.employername,
            empcontactdetails: req.query.empcontactdetails,
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
exports.updateplacementyfac= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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
                year: req.query.year,
                studentname: req.query.studentname,
                studcontactdetails: req.query.studcontactdetails,
                programname: req.query.programname,
                employername: req.query.employername,
                empcontactdetails: req.query.empcontactdetails,
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
        .where('colid')
        .equals(colid);
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
            .where('colid')
            .equals(colid);
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
        .where('colid')
        .equals(colid);
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
                year: req.query.year,
                tname: req.query.tname,
                workshop: req.query.workshop,
                profbody: req.query.profbody,
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
            .where('colid')
            .equals(colid);
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
        .where('colid')
        .equals(colid);
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
        .where('colid')
        .equals(colid);
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

exports.getsyllabusrevadmin= async (req,res) => {
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


exports.getemployabilityadmin= async (req,res) => {
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
        const colid=req.query.colid;
        const lcat1233= await Employability.find()
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

exports.getexplearningadmin= async (req,res) => {
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



exports.viewresultbyadmin= async (req,res) => {
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
            const lcat1233= await Result.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Result Publications')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewexamautomationbyadmin= async (req,res) => {
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
            const lcat1233= await Examautomation.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Automation for Examination')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewteacherawardbyadmin= async (req,res) => {
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
            const lcat1233= await Teacherawards.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Teacher Awards/Recognitions')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewmenteesbyadmin= async (req,res) => {
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
            const lcat1233= await Mentees.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Mentor-Mentee')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewseedmbyadmin= async (req,res) => {
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
            const lcat1233= await Seedm.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Seed Money')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewecontentbyadmin= async (req,res) => {
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
            const lcat1233= await Econtent.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Econtent developed by faculty')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewteacherfellowbyadmin= async (req,res) => {
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
            const lcat1233= await Teacherfellow.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Teacher Fellowship')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewscholarshipbyadmin= async (req,res) => {
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
            const lcat1233= await Scholarship.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Student Scholarship')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewalumniconbyadmin= async (req,res) => {
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
            const lcat1233= await Alumnicon.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Alumni Contribution')
            .where('colid')
            .equals(req.query.colid);
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

exports.viewconsultancybyadmin= async (req,res) => {
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
            const lcat1233= await Consultancy.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Revenue generated from Consultancy')
            .where('colid')
            .equals(req.query.colid);
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

exports.getplacementbyall= async (req,res) => {
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
        const lcat1233= await Placement.find();
          
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
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Incubation Centre')
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


exports.getsportsactbyadmin= async (req,res) => {
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
        const lcat1233= await Sportsact.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Sports and Cultural Activities')
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


exports.getfdpbyadmin= async (req,res) => {
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
        const lcat1233= await Fdp.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('FDP')
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


exports.getfieldprojbyadmin= async (req,res) => {
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
        const lcat1233= await Fieldproj.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Field Project')
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


exports.getfundsbyadmin= async (req,res) => {
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
        .equals('Funds')
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


exports.getqualityinitbyadmin= async (req,res) => {
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
        const lcat1233= await Qualityinit.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Quality Initiative')
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

exports.getexplearnprojbyadmin= async (req,res) => {
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
        const lcat1233= await Explearnproj.find()
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