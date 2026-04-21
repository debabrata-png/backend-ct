const jwt=require('jsonwebtoken');
const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Book=require('./../Models/book');
const Patents=require('./../Models/patents');
const Projects=require('./../Models/projects');
const Seminar=require('./../Models/seminar');
const Pub = require('./../Models/publications');


const Bos=require('./../Models/bos');
const Cbcs=require('./../Models/cbcs');
const Syllabus=require('./../Models/syllabusrev');
const Empb=require('./../Models/employability');
const Expl = require('./../Models/explearning');
const Admission=require('./../Models/admission');
const Reservecat=require('./../Models/reservecat');
const Tdata=require('./../Models/teacherdata');
const Passexam=require('./../Models/passexam');
const Taward = require('./../Models/teacheraward');
const Result=require('./../Models/result');
const Examauto=require('./../Models/examautomation');
const Mentees=require('./../Models/mentees');
const Instawards=require('./../Models/extawards');
const Extact = require('./../Models/extact');
const Collab=require('./../Models/collab');
const Mou=require('./../Models/mou');
const Econtent=require('./../Models/econtent');
const Seedm=require('./../Models/seedm');
const Tfellow = require('./../Models/teacherfellow');
const Rfellow=require('./../Models/researchfellow');
const Ict=require('./../Models/ict');
const Expd=require('./../Models/expenditure');
const Lib=require('./../Models/library');
const Scholarship = require('./../Models/studschsp');
const Skilldev=require('./../Models/skilldev');
const Careercounsel=require('./../Models/careercounsel');
const Placement=require('./../Models/placement');
const Hedu=require('./../Models/higheredu');
const Hexam = require('./../Models/higherexam');
const Alumni=require('./../Models/alumnicon');
const Awards=require('./../Models/awards');
const Egovern=require('./../Models/egovern');
const Tfs=require('./../Models/teacherfs');
const Funds = require('./../Models/funds');
const Quality = require('./../Models/quality');

const Expproj = require('./../Models/explearnproj');
const Fieldproj = require('./../Models/fieldproj');
const Teacherguide = require('./../Models/teacherguide');
const Sportsact = require('./../Models/sportsact');
const Egov = require('./../Models/egov');
const Fdp = require('./../Models/fdp');
const Qualityinit = require('./../Models/qualityinit');
const Event = require('./../Models/event');
const Mouact = require('./../Models/mouact');

const Phdguide = require('./../Models/phdguide');
const Kpi=require('./../Models/kpi');

const Depprograms=require('./../Models/depprograms');
const Curstructure=require('./../Models/curstructure');

const Leavebalance=require('./../Models/leavebalance');

const fs = require('fs');
const pdf = require('pdf-parse');


const multerStorage=multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now().toString() + '-' + file.originalname);
      }
});

// exports.upload = multer({
//   storage: multerStorage
// });

var upload = multer({
    storage: multerStorage
  }).single('upl');

  exports.uploadfacbooks = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Book.create({
                        colid: colid,
                        user: row[7],
                        name: row[8],
                        booktitle: row[0],
                        papertitle: row[1],
                        proceeding: row[2],
                        yop: row[3],
                        issn: row[4],
                        publisher: row[5],
                        affiliated:row[6],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacpatents = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Patents.create({
                        colid: colid,
                        user: row[5],
                        name: row[6],
                        title: row[0],
                        patentnumber: row[1],
                        yop: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacprojects = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const department=req.body.department;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Projects.create({
                        colid: colid,
                        user: row[7],
                        name: row[8],
                        project: row[0],
                        agency: row[1],
                        yop: row[2],
                        funds: parseInt(row[3]),
                        duration: row[4],
                        type: row[5],
                        level: row[6],
                        status1: 'Submitted',
                        comments: 'NA',
                        department: department
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacseminar = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Seminar.create({
                        colid: colid,
                        user: row[6],
                        name: row[7],
                        title: row[0],
                        yop: row[1],
                        duration: row[2],
                        membership: row[3],
                        amount: parseInt(row[4]),
                        level: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacpublications = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        const department=req.body.department;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Pub.create({
                        colid: colid,
                        user: row[9],
                        name: row[1],
                        title: row[0],
                        department: row[2],
                        journal: row[3],
                        yop: row[4],
                        issn: row[5],
                        journallink: row[6],
                        articlelink: row[7],
                        ugclisted: row[8],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};


// pratiti dec 13 2021

exports.uploadfacbos = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Bos.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        fname: name,
                        academicbody: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfaccbcs = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Cbcs.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        programcode: row[0],
                        programname: row[1],
                        yearofintro: row[2],
                        statusofimplement: row[3],
                        yearofimplement: row[4],
                        link: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacsyllabusrev = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Syllabus.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        programcode: row[0],
                        programname: row[1],
                        yearofintro: row[2],
                        statusofimplement: row[3],
                        yearofimplement: row[4],
                        yearofrevision: row[5],
                        changepercent: row[6],
                        link: row[7],
                        datastatus: 'Submitted',
                        comment: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacemployability = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Empb.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        coursename: row[1],
                        coursecode: row[2],
                        activity: row[3],
                        description: row[4],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacexplearning = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Expl.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        department: row[1],
                        programname: row[2],
                        programcode: row[3],
                        type: row[4],
                        activity: row[5],
                        sname: row[6],
                        regno: row[7],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacadmission = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Admission.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        programname: row[1],
                        programcode: row[2],
                        sancseat: row[3],
                        studapply: row[4],
                        studadmt: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacreservecat = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Reservecat.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        category: row[1],
                        sancseat: row[2],
                        studadmt: row[3],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacteacherdata = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Tdata.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                            fname: row[1],
                            department: row[2],
                            pan: row[3],
                            designation: row[4],
                            yoa: row[5],
                            type: row[6],
                            yoe: row[7],
                            status: row[8],
                            lastyear: row[9],
                            status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacpassexam = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Passexam.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        programcode: row[1],
                        programname: row[2],
                        studappear: row[3],
                        studpass: row[4],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacresult = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Result.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        programcode: row[1],
                        programname: row[2],
                        semester: row[3],
                        lastdate: row[4],
                        resultdate: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacteacheraward = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Taward.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        tname: name,
                        year: row[0],
                        pan: row[1],
                        designation: row[2],
                        award: row[3],
                        agency: row[4],
                        type: row[5],
                        amount: row[6],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacexamautomation = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Examauto.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        type: row[1],
                        status: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacmentees = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Mentees.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        department: row[1],
                        mentor: row[2],
                        noofmentee: row[3],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacinstawards = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Instawards.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        awardname: row[1],
                        awardbody: row[2],
                        activity: row[3],
                        status1: 'Submitted',
                        comments: 'NA'

                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacextact = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Extact.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        activityname: row[0],
                        orgunit: row[1],
                        scheme: row[2],
                        year: row[3],
                        noofstud: row[4],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfaccollaboration = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Collab.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        title: row[0],
                        agency: row[1],
                        participantname: row[2],
                        year: row[3],
                        duration: row[4],
                        activitynature: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacmou = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Mou.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        bodyname: row[1],
                        bodytype: row[2],
                        duration: row[3],
                        activity: row[4],
                        link: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacecontent = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Econtent.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        fname: row[1],
                        module: row[2],
                        platform: row[3],
                        date: row[4],
                        facility: row[5],
                        doclink: row[6],
                        videolink: row[7],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacseedm = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Seedm.create({
                        colid: colid,
                        user: row[3],
                        name: row[1],
                        year: row[0],
                        fname: row[1],
                        amount: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacteacherfellow = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Tfellow.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        tname: name,
                        award: row[1],
                        agency: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacresearchfellow = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Rfellow.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        fellowname: row[1],
                        duration: row[2],
                        agency: row[3],
                        type: row[4],
                        exam: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacict = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Ict.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        classroom: row[1],
                        seminarhall: row[2],
                        facitype: row[3],
                        link: row[4],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacexpenditure = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Expd.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        budget: parseInt(row[1]),
                        infraexp: parseInt(row[2]),
                        totalexp: parseInt(row[3]),
                        academicexp: parseInt(row[4]),
                        physicalexp: parseInt(row[5]),
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfaclibrary = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Lib.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        resource: row[1],
                        details: row[2],
                        bookexp: parseInt(row[3]),
                        otherexp: parseInt(row[4]),
                        totalexp: parseInt(row[5]),
                        link: row[6],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacscholarship = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Scholarship.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        scheme: row[1],
                        noofgovstud: row[2],
                        amountgov: parseInt(row[3]),
                        noofinststud: row[4],
                        amountinst: parseInt(row[5]),
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacskilldev = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Skilldev.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        programname: row[0],
                        date: row[1],
                        noofstudenr: parseInt(row[2]),
                        agency: row[3],
                        contactdetails: row[4],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfaccareercounsel = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Careercounsel.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        activityname: row[1],
                        studattd: parseInt(row[2]),
                        studplaced: parseInt(row[3]),
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacplacement = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Placement.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        studentname: row[1],
                        studcontactdetails: parseInt(row[2]),
                        programname: row[3],
                        employername: row[4],
                        empcontactdetails: parseInt(row[5]),
                        salary: parseInt(row[6]),
                        regno: row[7],
                        sector: row[8],
                        designation: row[9],
                        employerid: row[10],
                        jobid: row[11],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfachigheredu = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Hedu.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        studentname: row[1],
                        programgrad: row[2],
                        institution: row[3],
                        programadm: row[4],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfachigherexam = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Hexam.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        regno: row[1],
                        studentname: row[2],
                        examname: row[3],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacawards = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Awards.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        awardname: row[1],
                        engagementtype: row[2],
                        level: row[3],
                        activitytype: row[4],
                        studentname: row[5],
                        regno: row[6],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacalumnicon = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Alumni.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        department: row[1],
                        amount: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacegovern = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Egovern.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        egovernareas: row[0],
                        yearofimplement: row[1],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacteacherfs = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Tfs.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        tname: name,
                        workshop: row[1],
                        profbody: row[2],
                        amount: parseInt(row[3]),
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacfunds = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Funds.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        agency: row[1],
                        type: row[2],
                        purpose: row[3],
                        amount: parseInt(row[4]),
                        link: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacquality = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Quality.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        type: row[1],
                        action: row[2],
                        instname: row[3],
                        activity: row[4],
                        startdate: row[5],
                        enddate: row[6],
                        partstatus: row[7],
                        other: row[8],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacexplearnproj = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Expproj.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        programcode: row[1],
                        programname: row[2],
                        coursecode: row[3],
                        coursename: row[4],
                        sname: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacfieldproj = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Fieldproj.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        programcode: row[1],
                        programname: row[2],
                        sname: row[3],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacteacherguide = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Teacherguide.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        fname: row[0],
                        qualification: row[1],
                        status: row[2],
                        year: row[3],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacsportsact = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Sportsact.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        date: row[0],
                        title: row[1],
                        sname: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacegov = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Egov.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        egovernareas: row[0],
                        vendor: row[1],
                        yearofimplement: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacfdp = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Fdp.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        faculty: row[0],
                        title: row[1],
                        duration: row[2],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacqualityinit = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Qualityinit.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        type: row[1],
                        seminar: row[2],
                        action: row[3],
                        partstatus: row[4],
                        other: row[5],
                        instname: row[6],
                        date: row[7],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacevent = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Event.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        academicyear: row[0],
                        eventname: row[1],
                        description: row[2],
                        department: row[3],
                        brochurelink: row[4],
                        date: row[5],
                        time: row[6],
                        coordinator: row[7],
                        type: row[8],
                        eventlink: row[9],
                        fromto: row[10],
                        noofparticipants: parseInt(row[11]),
                        noofteachers: parseInt(row[12]),
                        financial: row[13],
                        target: row[14],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacmouact = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Mouact.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        year: row[0],
                        organisation: row[1],
                        bodyname: row[2],
                        duration: row[3],
                        activity: row[4],
                        participants: row[5],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadfacphdguide = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Phdguide.create({
                        colid: colid,
                        user: row[9],
                        name: row[10],
                        department: row[0],
                        researchguide: row[1],
                        qualification: row[2],
                        yog: row[3],
                        scholar: row[4],
                        title: row[5],
                        yor: row[6],
                        yop: row[7],
                        ifrecognized: row[8],
                        status1: 'Submitted',
                        comments: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadkpi = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Kpi.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        group: row[0],
                        category: row[1],
                        criteria: row[2],
                        metric: row[3],
                        narrative: row[4],
                        target: row[5],
                        link: 'NA'
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};


exports.uploaddepprog = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Depprograms.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        department: row[0],
                        program: row[1],
                        programcode: row[2],
                        level: row[3],
                        faculty: row[4],
                        introduced: new Date(row[5]),
                        discontinued: new Date(row[6]),
                        status1: 'Submitted',
                        comments: ''
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadcurstructure = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Curstructure.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        program: row[0],
                        programcode: row[1],
                        course: row[2],
                        coursecode: row[3],
                        lecture: row[4],
                        theory: row[5],
                        practical: row[6],
                        total: row[7],
                        credits: row[8],
                        department: row[9],
                        status1: 'Submitted',
                        comments: ''
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};


exports.uploadleavebalance = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        //const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        //const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Leavebalance.create({
                        colid: colid,
                        user: row[3],
                        name: row[4],
                        type: row[0],
                        year: row[1],
                        balance: row[2]
                    
                    });

                    
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};


exports.getpdf = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        //const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        //const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);

            let dataBuffer = fs.readFileSync(path1);

            fs.unlink(path1, function(err) {
                
            })
 
            pdf(dataBuffer).then(function(data) {
 
    
    res.status(200).json({
        status: 'Success',
        data: {
            text: data.text,
            numpages:data.numpages
        }
        
    });
        
});
            
            //console.log('uploaded');
           
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};
