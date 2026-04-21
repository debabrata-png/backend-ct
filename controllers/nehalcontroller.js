const AddonC = require("../Models/addonc");
const nallcourses=require('./../Models/nallcourses');
const Reserve = require("../Models/reservecat");
const Faculty = require("../Models/nufacultydata");
const Phd = require("../Models/phdface");
const Teacher = require ("../Models/teacherdata");
const Result = require ("../Models/result");
const Grievance = require("../Models/nugrievance");
const TeacherFellow = require ("../Models/teacherfellow");
const Research = require ("../Models/researchfellow");
const Innovation = require ("../Models/innovationnew");
const Patent = require ("../Models/patents");
const PhdGuide = require ("../Models/phdguide");
const Book = require ("../Models/book");
const Consultant = require ("../Models/consultancy");

const Mou = require("../Models/mou");
const Expenditure = require("../Models/expenditurenew");
const ScholarshipAdmin = require("../Models/ustudschsp");
const PlacedStudent = require("../Models/placement");
const Higher = require("../Models/higherexam");
const Award = require("../Models/awardsnew");
const Teacherfs = require("../Models/teacherfs");
const Event = require("../Models/event");
const Fund = require("../Models/funds");

const nuexplearning=require('./../Models/nuexplearning');

const amastudnew=require('./../Models/amastudnew');
const user=require('./../Models/user');
const Institutions=require('./../Models/institutions');

//const nallcourses=require('./../Models/nallcourses');

const Seminar=require('./../Models/seminar');
const Projects=require('./../Models/projects');
const Publication=require('./../Models/publications');
const Patents=require('./../Models/patents');
//const Book=require('./../Models/book');



exports.allcourset= async (req,res) => {
                 
    try{
        const colid1 = parseInt(req.query.colid);
        const lcat1233= await nallcourses.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        program: '$program',
                        course:'$course',
                        ifnew:"$discontinueyear"
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


exports.addonCTemplate= async (req,res) => {
                 
    try{
        const colid1 = parseInt(req.query.colid);
        const lcat1233= await AddonC.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        courseTitle: '$coursetitle',
                        courseCode:'$coursecode',
                        year:"$year",
                        offeredtimes:"$offeredtimes",
                        duration:"$duration",
                        studentsenrolled:"$studentsenrolled",
                        studentscompleted:"$studentscompleted"
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


exports.createinstitution= async (req,res) => {
    try{
        //const colid=req.query.colid;
        const lcat1233= await user.findOne().sort('-colid');
        //var maxcolid=1;
        //console.log(lcat1233);
        // lcat1233.forEach(async function(data){
        //     //maxcolid=data.colid;
        //     onsole.log(data);
            
        // })
        var maxcolid1=lcat1233.colid;
        var newcolid=maxcolid1+1;


        const pub12= await Institutions.create({
            name: 'system',
            colid: newcolid,
            user: 'system',
            institutionname:req.query.institutionname,
institutioncode:newcolid,
address:'NA',
state:'NA',
district:'NA',
type:req.query.type,
logo:'NA',
status:'Ok',
admincolid:req.query.admincolid,
status1: 'Submitted',
            comments: 'NA'
        });


        const pub1= await user.create({
            name: 'system',
            colid: newcolid,
            user: req.query.email,
            email:req.query.email,
phone:'123',
password:'Password@123',
role:'Admin',
regno:'NA',
programcode:'NA',
admissionyear:'NA',
semester:'NA',
section:'NA',
gender:'NA',
department:'Admin',
category:'NA',
status:1,
status1: 'Submitted',
            comments: 'NA'
        });


            res.status(200).json({
                status:'Success',
                //maxcolid:maxcolid,
                maxcolid1:maxcolid1,
                data: {
                    inst : pub12,
                    user:pub1
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.createinstitutionself= async (req,res) => {
    try{
        //const colid=req.query.colid;
        const lcat1233= await user.findOne().sort('-colid');
        //var maxcolid=1;
        //console.log(lcat1233);
        // lcat1233.forEach(async function(data){
        //     //maxcolid=data.colid;
        //     onsole.log(data);
            
        // })
        var maxcolid1=lcat1233.colid;
        var newcolid=maxcolid1+1;


        const pub12= await Institutions.create({
            name: 'system',
            colid: newcolid,
            user: 'system',
            institutionname:req.query.institutionname,
institutioncode:newcolid,
address:'NA',
state:'NA',
district:'NA',
type:req.query.type,
logo:'NA',
status:'Ok',
admincolid:newcolid,
status1: 'Submitted',
            comments: 'NA'
        });


        const pub1= await user.create({
            name: 'system',
            colid: newcolid,
            user: req.query.email,
            email:req.query.email,
phone:'123',
password:'Password@123',
role:'Admin',
regno:'NA',
programcode:'NA',
admissionyear:'NA',
semester:'NA',
section:'NA',
gender:'NA',
department:'Admin',
category:'NA',
status:1,
status1: 'Submitted',
            comments: 'NA'
        });


            res.status(200).json({
                status:'Success',
                //maxcolid:maxcolid,
                maxcolid1:maxcolid1,
                data: {
                    inst : pub12,
                    user:pub1
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.updatephone= async (req,res) => {

    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
      
        const lcat1= await user.findOneAndUpdate( {email: req.query.user},{
            phone: req.query.phone,
            gender:req.query.gender,
            address: req.query.address
           
        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};


exports.addonCTemplate1= async (req,res) => {
                 
    try{
        const colid1 = parseInt(req.query.colid);
        const lcat1233= await AddonC.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        courseCode:'$coursecode'
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


exports.addoncdoccommentsd1= async (req,res) => {
    try{
        
        const lcat1233= await AddonC
            .aggregate([
               
                  {
                    $lookup: {
                      from: 'nallcourses', 
                      localField: 'coursecode', 
                      foreignField: 'coursecode', 
                      as: 'syllabus'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'coursecode': {$ne: 'NA'}

                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.addoncdoccommentsd2= async (req,res) => {
    try{
        
        const lcat1233= await AddonC
            .aggregate([
               
                  {
                    $lookup: {
                      from: 'nallcourses', 
                      let: {
                        colidnew: "$colid",
                        coursecodenew: "$coursecode"
                     },
                     pipeline: [
                        {
                           $match: {
                              $expr: {
                                 $and: [
                                    {
                                       $eq: [
                                          '$colid',
                                          '$$colidnew'
                                       ]
                                    },
                                    {
                                       $eq: [
                                          '$coursecode',
                                          '$$coursecodenew'
                                       ]
                                    }
                                 ]
                              }
                           }
                        }
                     ],
                      as: 'syllabus'
                    }
                  },
                  {
                    $match: {
                      'colid': parseInt(req.query.colid),
                      'coursecode': {$ne: 'NA'}

                    }
                  }
                  ]);
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });            
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };


  
exports.amastudnewgroup= async (req,res) => {
                 
    try{
        const univid = parseInt(req.query.univid);
        const lcat1233= await amastudnew.aggregate([
            { 
                $match: {univid: univid }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        programcode: '$programcode',
                        program:'$program'
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

exports.amastudnewgroup1= async (req,res) => {
                 
    try{
        const univid = parseInt(req.query.univid);
        const lcat1233= await amastudnew.aggregate([
            { 
                $match: {univid: univid }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        programcode: '$programcode',
                        program:'$program'
                    },
                    total_attendance: {$sum: 1}
                }
            },
            {
                $lookup: {
                  from: 'institutions', 
                  localField: '_id.colid', 
                  foreignField: 'colid', 
                  as: 'seminars'
                }
              }
            
        ]);
       
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.amastudnewduplicate= async (req,res) => {
                 
    try{
        const univid = parseInt(req.query.univid);
        const lcat1233= await amastudnew.aggregate([
            { 
                $match: {colid: parseInt(req.query.colid) }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        regno: '$regno'
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

exports.amastudnewduplicateu= async (req,res) => {
                 
    try{
        const univid = parseInt(req.query.univid);
        const lcat1233= await amastudnew.aggregate([
            { 
                $match: {univid: parseInt(req.query.univid) }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        regno: '$regno'
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


exports.amastudnewsummary1= async (req,res) => {
                 
    try{
        const colid = parseInt(req.query.colid);
        const lcat1233= await amastudnew.aggregate([
            { 
                $match: {colid: colid }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        programcode: '$programcode',
                        program:'$program',
                        diffabtype:'$diffabtype'
                    },
                    total_attendance: {$sum: 1}
                }
            },
            {
                $lookup: {
                  from: 'institutions', 
                  localField: '_id.colid', 
                  foreignField: 'colid', 
                  as: 'seminars'
                }
              }
            
        ]);
       
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.amastudnewsummary1all= async (req,res) => {
                 
    try{
        const colid = parseInt(req.query.colid);
        const lcat1233= await amastudnew.aggregate([
            
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        programcode: '$programcode',
                        program:'$program',
                        diffabtype:'$diffabtype'
                    },
                    total_attendance: {$sum: 1}
                }
            },
            {
                $lookup: {
                  from: 'institutions', 
                  localField: '_id.colid', 
                  foreignField: 'colid', 
                  as: 'seminars'
                }
              }
            
        ]);
       
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.amastudnewsummarypb= async (req,res) => {
                 
    try{
        const colid = parseInt(req.query.colid);
        const lcat1233= await amastudnew.aggregate([
            { 
                $match: {colid: colid }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        colid:'$colid',
                        programcode: '$programcode',
                        program:'$program',
                        diffabtype:'$diffabtype',
                        hscboard:'$hscboard'
                    },
                    total_attendance: {$sum: 1}
                }
            },
            {
                $lookup: {
                  from: 'institutions', 
                  localField: '_id.colid', 
                  foreignField: 'colid', 
                  as: 'seminars'
                }
              }
            
        ]);
       
            
            //console.log(lcat1233);
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233
                }   
            });         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getseminarcounta= async (req,res) => {
    try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Seminar.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$yop', 
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


exports.getbookcounta= async (req,res) => {
    try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Book.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$yop', 
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

exports.getprojectscounta= async (req,res) => {
    try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Projects.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$yop', 
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

exports.getpatentsscounta= async (req,res) => {
    try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Patents.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$yop', 
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

exports.getpublicationscounta= async (req,res) => {
    try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        
            const lcat1233= await Publication.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id:'$yop', 
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



  exports.explearnewmatch= async (req,res) => {
    try{
        
        const lcat1233= await nuexplearning
            .aggregate([
               
                  {
                    $lookup: {
                      from: 'nallcourses', 
                      let: {
                        colidnew: "$colid",
                        programnew: "$programname",
                        coursecodenew: "$coursecode"
                     },
                     pipeline: [
                        {
                           $match: {
                              $expr: {
                                 $and: [
                                    {
                                       $eq: [
                                          '$colid',
                                          '$$colidnew'
                                       ]
                                    },
                                    {
                                       $eq: [
                                          '$program',
                                          '$$programnew'
                                       ]
                                    },
                                    {
                                        $eq: [
                                           '$coursecode',
                                           '$$coursecodenew'
                                        ]
                                     }
                                 ]
                              }
                           }
                        }
                     ],
                      as: 'syllabus'
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



exports.dupallcourse= async (req,res) => {
                 
    try{
        const colid1 = parseInt(req.query.colid);
        const lcat1233= await nallcourses.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        
                        courseCode:'$coursecode'
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



exports.reserveCat= async (req,res) => {
    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Reserve.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        programname:'$programname',
                        sancseat: '$sancseat',
                        studadmt:'$studadmt'
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




exports.facultyData= async (req,res) => {  
    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Faculty.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        sancfacultystrength: '$sancfacultystrength',
                        appointedfacultystrength:'$appointedfacultystrength'
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


exports.phdFaces= async (req,res) => {
       
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Phd.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        name:'$name',
                        joinyear: '$joinyear',
                        isphd:'$isphd'
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



exports.teacherData= async (req,res) => {
        
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Teacher.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        fname:'$fname',
                        yoa: '$yoa',
                        yoe:'$yoe'
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


exports.result= async (req,res) => {
          
      try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Result.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        lastdate: '$lastdate',
                        resultdate:'$resultdate',
                        noofdays:"$noofdays"
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



exports.newGrievance= async (req,res) => {    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Grievance.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        studentname:'$studentname',
                        typeofgrievance: '$typeofgrievance'
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


exports.teacherFellow= async (req,res) => {      
    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await TeacherFellow.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        tname:'$tname',
                        award: '$award',
                        agency:'$agency',
                        advanced:'$advanced',
                        year:'$year'
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


exports.researchFellow= async (req,res) => {
   
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Research.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        duration: '$duration',
                        fellowname:'$fellowname',
                        type:'$type',
                        agency:'$agency'
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


exports.newInnovation= async (req,res) => {           
    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Innovation.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        awardee:'$awardee',
                        name: '$name',
                        agency:'$agency',
                        category:'$category'
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




exports.patent= async (req,res) => {  
    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Patent.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        name:'$name',
                        patentnumber: '$patentnumber',
                        doa:'$doa',
                        agency:'$agency'
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


exports.phdGuide= async (req,res) => {    
    
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await PhdGuide.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        scholar:'$scholar',
                        researchguide: '$researchguide',
                        yor:'$yor',
                        yop:'$yop'
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


exports.book= async (req,res) => {
      
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Book.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        name:'$name',
                        booktitle: '$booktitle',
                        papertitle:'$papertitle',
                        proceeding:'$proceeding',
                        yop:'$yop',
                        issn:'$issn',
                        publisher:'$publisher'
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



exports.consultancy= async (req,res) => {
          
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Consultant.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        consultant:'$consultant',
                        deaprtment: '$department',
                        year:'$year',
                        revenue:'$revenue'
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


exports.mouAdmin= async (req,res) => {
         
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Mou.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        bodyname: '$bodyname',
                        duration:'$duration',
                        purpose:'$purpose',
                        activity:'$activity'
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


exports.expenditureNewAdmin= async (req,res) => {
      
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Expenditure.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        totalexp: '$totalexp',
                        infraexp:'$infraexp',
                        physicalexp:'$physicalexp',
                        academicexp:'$academicexp'
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



// exports.newStudentScholarshipAdmin= async (req,res) => {
//     try{
//         const user1=req.cookies['user'];
//         const colid1=parseInt(req.cookies['colid']);
//         if(user1) {
//             const lcat1233= await ScholarshipAdmin.aggregate([
//                 { 
//                     $match: {colid: colid1 }
//                 },
//                 { 
//                     $group: {
//                         // _id:['$regno','$name'], 
//                         _id: {
//                             year:'$year',
//                             title: '$title',
//                             sname:'$sname',
//                             amount:'$amount',
//                             type:'$type',
//                         },
//                         total_attendance: {$sum: 1}
//                     }
//                 }
//             ]);
//             //console.log(lcat1233);
//             res.status(200).render('viewcattendance1', {
//                 categories: lcat1233,
//                 coursecode: req.params.id,
//                 title: 'Attendance Count'
//             });
//         } else {
//             req.flash("error", "You have been logged out. Please login to continue.");
//             res.redirect('/login');
//         }               
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };



exports.getnscholarshiptemp= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        //console.log(colid1);
        const lcat1233= await ScholarshipAdmin.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        title: '$title',
                        sname:'$sname',
                        amount:'$amount',
                        type:'$type',
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



  exports.placedstud= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await PlacedStudent.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        studentname:'$studentname',
                        sector: '$sector',
                        salary:'$salary'
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


  exports.higherexam= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Higher.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        studentname:'$studentname',
                        level: '$level',
                        examname:'$examname'
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



  exports.newaward= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Award.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        awarddate:'$awarddate',
                        studentname: '$studentname',
                        level:'$level',
                        eventname:'$eventname',
                        position:'$position'
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


  exports.teacherfs= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Teacherfs.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        tname: '$tname',
                        workshop:'$workshop',
                        profbody:'$profbody',
                        amount:'$amount'
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



  exports.event= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Event.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        tname: '$tname',
                        workshop:'$workshop',
                        profbody:'$profbody',
                        amount:'$amount'
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


  exports.funds= async (req,res) => {
    try{
        const colid1 = parseInt(req.cookies['colid']);
        
        const lcat1233= await Fund.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'], 
                    _id: {
                        year:'$year',
                        name: '$name',
                        purpose:'$purpose',
                        amount:'$amount',
                        link:'$link'
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




















