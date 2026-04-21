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
const Higheredu=require('./../Models/higheredu');
const Higherexam=require('./../Models/higherexam');
const Teacherfs=require('./../Models/teacherfs');
const Egovern=require('./../Models/egovern');
const Addonc=require('./../Models/addonc');
const Instawards=require('./../Models/extawards');
const Result=require('./../Models/result');
const Econtent=require('./../Models/econtent');
const Seedm=require('./../Models/seedm');
const Consultancy=require('./../Models/consultancy');
const Syllabusrev=require('./../Models/syllabusrev');
const Explearning=require('./../Models/explearning');
const Emp=require('./../Models/employability');
const Phd=require('./../Models/phdguide');
const Teacheraward=require('./../Models/teacheraward');
const Examautomation=require('./../Models/examautomation');
const Teacherfellow=require('./../Models/teacherfellow');
const Researchfellow=require('./../Models/researchfellow');
const Alumnicon=require('./../Models/alumnicon');
const Mentees=require('./../Models/mentees');

const Book=require('./../Models/book');
const Patents=require('./../Models/patents');
const Projects=require('./../Models/projects');
const Seminar=require('./../Models/seminar');
const Publications=require('./../Models/publications');
const Innovation=require('./../Models/innovation');




exports.deleteallteacherdatabyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacherdata.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallcbcsbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await CBCS.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallbosbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await BOS.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deletealleventbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Event.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deletealladmissionbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Admission.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallreservecatbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Reservecat.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallpassexambyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Passexam.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallawardsbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Awards.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallextactbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Extact.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallcollabbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Collab.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallmoubyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Mou.deleteMany({ colid: req.query.colid, user: req.query.user, status1: {$ne: 'Accepted'} });
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

exports.deleteallictbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Ict.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallexpenditurebyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Expenditure.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallscholarshipbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Scholarship.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deletealllibrarybyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Library.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallfundsbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Funds.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallqualitybyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Quality.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallskilldevbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
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

exports.deleteallcareercounselbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Careercounsel.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallplacementbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Placement.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallhigheredubyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Higheredu.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallhigherexambyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Higherexam.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallteacherfsbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacherfs.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallegovernbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Egovern.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deletealladdoncbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Addonc.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallextawardsbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Instawards.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallresultbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Result.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallecontentbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Econtent.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallseedmbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Seedm.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallconsultancybyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Consultancy.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallsyllabusrevbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Syllabusrev.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallexplearningbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Explearning.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallemployabilitybyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Emp.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallphdbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Phd.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallteacherawardbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacheraward.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallexamautomationbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Examautomation.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallteacherfellowbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Teacherfellow.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallresearchfellowbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Researchfellow.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallalumniconbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Alumnicon.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallmenteesbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Mentees.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallbookbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Book.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallprojectbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Projects.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallseminarbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Seminar.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallpatentbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Patents.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallpubbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Publications.deleteMany({ colid: req.query.colid, user: req.query.user });
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

exports.deleteallinnovationbyuser= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        await Innovation.deleteMany({ colid: req.query.colid, user: req.query.user });
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