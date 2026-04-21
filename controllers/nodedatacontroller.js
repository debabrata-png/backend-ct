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
const Syllabusrev=require('./../Models/syllabusrev');
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
const nacademic=require('./../Models/nacademic');
const nworkbook=require('./../Models/nworkbook');
const nenrollment=require('./../Models/nenrollment');
const ncourseplan=require('./../Models/ncourseplan');
const ninter=require('./../Models/ninter');
const nclinicskills=require('./../Models/nclinicskills');
const nhlearner=require('./../Models/nhlearner');
const notherstud=require('./../Models/notherstud');
const nreval=require('./../Models/nreval');
const nfacilities=require('./../Models/nfacilities');
const ndepfunding=require('./../Models/ndepfunding');
const nprogcourse=require('./../Models/nprogcourse');
const nnvacstud=require('./../Models/nnvacstud');
const nnursinginter=require('./../Models/nnursinginter');
const nnexp=require('./../Models/nnexp');
const nnexam=require('./../Models/nnexam');
const nnratio=require('./../Models/nnratio');
const nnmentor=require('./../Models/nnmentor');

const necourse=require('./../Models/necourse');
const nnextension=require('./../Models/nnextension');
const nncollab=require('./../Models/nncollab');
const nnmou=require('./../Models/nnmou');
const nnpatients=require('./../Models/nnpatients');
const nnexposure=require('./../Models/nnexposure');

const nclient=require('./../Models/nclient');
const nmilestone=require('./../Models/nmilestone');
const ninvoice=require('./../Models/ninvoice');
const ngstgain=require('./../Models/ngstgain');
const nvendor=require('./../Models/nvendor');
const nvworkorder=require('./../Models/nvworkorder');
const nvinvoice=require('./../Models/nvinvoice');
const ntrialbalance=require('./../Models/ntrialbalance');

const nbudget=require('./../Models/nbudget');
const nledger=require('./../Models/nledger');
const naccounts=require('./../Models/naccounts');

const nseedmoney=require('./../Models/nseedmoney');
const nbudgetreq=require('./../Models/nbudgetreq');
const noodreq=require('./../Models/noodreq');
const neventreq=require('./../Models/neventreq');
const nassistantreq=require('./../Models/nassistantreq');
const nhousingreq=require('./../Models/nhousingreq');
const ntravelsupport=require('./../Models/ntravelsupport');

const ncompanies=require('./../Models/ncompanies');
const njobs=require('./../Models/njobs');
const njobstudents=require('./../Models/njobstudents');
const nhighereducation=require('./../Models/nhighereducation');

const noffcampus=require('./../Models/noffcampus');
const njobsapply=require('./../Models/njobsapply');
const nhigheredurep=require('./../Models/nhigheredurep');
const noffawards=require('./../Models/noffawards');
const noffscholarship=require('./../Models/noffscholarship');
const noffextension=require('./../Models/noffextension');
const noffcourses=require('./../Models/noffcourses');

const ncommittees=require('./../Models/ncommittees');
const ncommembers=require('./../Models/ncommembers');
const ncomminutes=require('./../Models/ncomminutes');
const ncomtasks=require('./../Models/ncomtasks');


const workload=require('./../Models/workload');
const lessonplan=require('./../Models/lessonplan');

const Class=require('./../Models/class');
const coursefiles=require('./../Models/coursefiles');

const co=require('./../Models/co');
const lannouncement=require('./../Models/lannouncement');
const lsyllabus=require('./../Models/lsyllabus');
const lcalendar=require('./../Models/lcalendar');

const user=require('./../Models/user');

const currenyear=require('./../Models/currenyear');

const studparents=require('./../Models/studparents');

const projectledger=require('./../Models/projectledger');
const projectcentral=require('./../Models/projectcentral');
const maintenance=require('./../Models/maintenance');
const otherincome=require('./../Models/otherincome');

const naccountheads=require('./../Models/naccountheads');
const ntransactions=require('./../Models/ntransactions');
const ntledger=require('./../Models/ntledger');


const nnursing812=require('./../Models/nnursing812');
const nnursing814=require('./../Models/nnursing814');
const nnursing815=require('./../Models/nnursing815');
const nnursing818=require('./../Models/nnursing818');
const nnursing424=require('./../Models/nnursing424');
const ncompetitive=require('./../Models/ncompetitive');
const nnursing515=require('./../Models/nnursing515');


const ndepmeetings=require('./../Models/ndepmeetings');
const nmeetingtasks=require('./../Models/nmeetingtasks');


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





exports.uploadnacademic = function(req, res) {
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
                    const pat1= nacademic.create({
                        colid: colid,
                        user: user1,
                        name: name,
                        week: row[0],
day: row[1],
activitydate: row[2],
morning: row[3],
afternoon: row[4],
department: row[5],
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

exports.bulksyllabusrev = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        //const name=req.body.name;
        const colid=req.body.colid;
        const colid1=parseInt(req.body.colid);
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
        var result='';
        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
                
      
                rows.forEach((row) => {

                    console.log(colid1 + ' ' + row[0]);
                    

                    const lcat1= Syllabusrev.updateMany( {programname: row[0], colid: colid},{
                        programname: row[1],
                        programcode: row[2]
            
                    });

                    //console.log(lcat1);

                    //result=result + ' ' + row[0] + ':' + lcat1.nModified;

                    
      
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

