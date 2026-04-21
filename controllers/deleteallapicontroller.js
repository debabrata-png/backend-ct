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

const Publications=require('./../Models/publications');

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

const Book=require('./../Models/book');

const nugrievance=require('./../Models/nugrievance');

const phdface=require('./../Models/phdface');

const Feedback=require('./../Models/feedback');

const nallcourses=require('./../Models/nallcourses');

const Seminar=require('./../Models/seminar');

const workload=require('./../Models/workload');

const examschedule=require('./../Models/examschedule');



// exports.deleteallinnovation= async (req,res) => {
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
//         await Innovation.deleteMany({ colid: req.query.colid });
//         res.status(200).json({
//             status:'Success',
//         });
//     } catch(err) {
//         res.status(200).json({
//             status:'Error',
//             message: err
//         });
//     }   
// };

// exports.deleteallplacement= async (req,res) => {
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
//         await Placement.deleteMany({ colid: req.query.colid });
//         res.status(200).json({
//             status:'Success',
//         });
//     } catch(err) {
//         res.status(200).json({
//             status:'Error',
//             message: err
//         });
//     }   
// };

exports.deleteallexamschedule= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        await examschedule.deleteMany({ colid: req.query.colid });
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

exports.deleteallnallcourses= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await nallcourses.deleteMany({ colid: req.query.colid });
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


exports.deleteallphdface= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await phdface.deleteMany({ colid: req.query.colid });
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




exports.deleteallnugrievance= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await nugrievance.deleteMany({ colid: req.query.colid });
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


exports.deleteallfeedback= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Feedback.deleteMany({ colid: req.query.colid, type: req.query.type });
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




exports.deleteallteacherdatabyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacherdata.deleteMany({ colid: req.query.colid });
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

exports.deleteallcbcsbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await CBCS.deleteMany({ colid: req.query.colid });
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

exports.deleteallbosbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await BOS.deleteMany({ colid: req.query.colid });
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

exports.deletealleventbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Event.deleteMany({ colid: req.query.colid });
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

exports.deletealladmissionbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Admission.deleteMany({ colid: req.query.colid });
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

exports.deleteallreservecatbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Reservecat.deleteMany({ colid: req.query.colid });
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

exports.deleteallpassexambyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Passexam.deleteMany({ colid: req.query.colid });
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

exports.deleteallawardsbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Awards.deleteMany({ colid: req.query.colid });
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

exports.deleteallextactbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Extact.deleteMany({ colid: req.query.colid });
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

exports.deleteallcollabbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Collab.deleteMany({ colid: req.query.colid });
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

exports.deleteallmoubyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Mou.deleteMany({ colid: req.query.colid });
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

exports.deleteallictbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Ict.deleteMany({ colid: req.query.colid });
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

exports.deleteallexpenditurebyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Expenditure.deleteMany({ colid: req.query.colid });
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

exports.deleteallscholarshipbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Scholarship.deleteMany({ colid: req.query.colid });
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

exports.deletealllibrarybyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Library.deleteMany({ colid: req.query.colid });
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

exports.deleteallfundsbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Funds.deleteMany({ colid: req.query.colid });
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

exports.deleteallqualitybyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Quality.deleteMany({ colid: req.query.colid });
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
        await Skilldev.deleteMany({ colid: req.query.colid });
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

exports.deleteallcareercounselbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Careercounsel.deleteMany({ colid: req.query.colid });
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

exports.deleteallplacementbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Placement.deleteMany({ colid: req.query.colid });
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

exports.deleteallhigheredubyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Higheredu.deleteMany({ colid: req.query.colid });
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

exports.deleteallhigherexambyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Higherexam.deleteMany({ colid: req.query.colid });
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

exports.deleteallteacherfsbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacherfs.deleteMany({ colid: req.query.colid });
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

exports.deleteallegovernbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Egovern.deleteMany({ colid: req.query.colid });
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

exports.deletealladdoncbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Addonc.deleteMany({ colid: req.query.colid });
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

exports.deleteallextawardsbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Instawards.deleteMany({ colid: req.query.colid });
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

exports.deleteallresultbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Result.deleteMany({ colid: req.query.colid });
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

exports.deleteallecontentbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Econtent.deleteMany({ colid: req.query.colid });
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

exports.deleteallseedmbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Seedm.deleteMany({ colid: req.query.colid });
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

exports.deleteallconsultancybyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Consultancy.deleteMany({ colid: req.query.colid });
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

exports.deleteallsyllabusrevbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Syllabusrev.deleteMany({ colid: req.query.colid });
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

exports.deleteallexplearningbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Explearning.deleteMany({ colid: req.query.colid });
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

exports.deleteallemployabilitybyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Emp.deleteMany({ colid: req.query.colid });
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

exports.deleteallphdbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Phd.deleteMany({ colid: req.query.colid });
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

exports.deleteallteacherawardbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacheraward.deleteMany({ colid: req.query.colid });
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

exports.deleteallexamautomationbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Examautomation.deleteMany({ colid: req.query.colid });
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

exports.deleteallteacherfellowbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacherfellow.deleteMany({ colid: req.query.colid });
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

exports.deleteallresearchfellowbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Researchfellow.deleteMany({ colid: req.query.colid });
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

exports.deleteallalumniconbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Alumnicon.deleteMany({ colid: req.query.colid });
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

exports.deleteallmenteesbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Mentees.deleteMany({ colid: req.query.colid });
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

exports.deleteallbookbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Book.deleteMany({ colid: req.query.colid });
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

exports.deleteallprojectbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Projects.deleteMany({ colid: req.query.colid });
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

exports.deleteallseminarbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Seminar.deleteMany({ colid: req.query.colid });
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

exports.deleteallpatentbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Patents.deleteMany({ colid: req.query.colid });
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

exports.deleteallpubbyfac= async (req,res) => {
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
        // await Publications.deleteMany({ colid: req.query.colid });
        // res.status(200).json({
        //     status:'Success',
        // });
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Publications.deleteMany({ colid: req.query.colid });
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

exports.deleteallinnovationbyfac= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Innovation.deleteMany({ colid: req.query.colid });
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


exports.deleteallworkloadbyfac= async (req,res) => {
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
        await workload.deleteMany({ colid: req.query.colid });
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














