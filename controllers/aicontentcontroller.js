const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Kpi=require('./../Models/kpi');
const Demandratio=require('./../Models/admission');
const Reservedcat=require('./../Models/reservecat');
const Fulltimeteacher=require('./../Models/teacherdata');
const Passpercentage=require('./../Models/passexam');
const Examdays=require('./../Models/result');
const Facultyaward=require('./../Models/teacheraward');
const Examautomation=require('./../Models/examautomation');
const Mentor=require('./../Models/mentees');
const Extensionawards=require('./../Models/extawards');
const Extension=require('./../Models/extact');
const Extensionstudents=require('./../Models/extact');
const Collaboration=require('./../Models/collab');
const MOU=require('./../Models/mou');
const Econtent=require('./../Models/econtent');
const Seedmoney=require('./../Models/seedm');
const Teacherfellow=require('./../Models/teacherfellow');
const Researchfellow=require('./../Models/researchfellow');
const Incubation=require('./../Models/incubation');
const IPR=require('./../Models/event');
const Researchawards=require('./../Models/innovation');
const Awards=require('./../Models/teacheraward');
const Consultancy=require('./../Models/consultancy');
const Librarybooks=require('./../Models/library');
const Libraryexp=require('./../Models/library');
const ICT=require('./../Models/ict');
const Econtentresource=require('./../Models/econtent');
const Expenditure=require('./../Models/expenditure');
const Infrastructure=require('./../Models/expenditure');
const Scholarship=require('./../Models/studschsp');
const Careercounsel=require('./../Models/careercounsel');
const Skilldevelopment=require('./../Models/skilldev');
const Higherexam=require('./../Models/higherexam');
const Placement=require('./../Models/placement');
const Highereducation=require('./../Models/higheredu');
const Studentawards=require('./../Models/awards');
const Sportscultural=require('./../Models/event');
const Alumnicontribution=require('./../Models/alumnicon');
const Egovernance=require('./../Models/egovern');
const Teachersupport=require('./../Models/teacherfs');
const Training=require('./../Models/event');
const TFDP=require('./../Models/event');
const FDP=require('./../Models/event');
const GFunds=require('./../Models/funds');
const NGFunds=require('./../Models/funds');
const Qualityinit=require('./../Models/quality');
const Supportingdoc=require('./../Models/supportingdoc');
const Taskassign=require('./../Models/taskassign');
const Project = require('./../Models/projects');
const Patent = require('./../Models/patents');
//const Consultancy=require('./../Models/consultancy');
const Explearning=require('./../Models/explearning');
const Explearnproj=require('./../Models/explearnproj');
const Employability=require('./../Models/employability');
const Accrcomments=require('./../Models/accrcomments');
const Syllabusrev=require('./../Models/syllabusrev');
const Seminar=require('./../Models/seminar');
const Projects=require('./../Models/projects');
const Publication=require('./../Models/publications');
const Patents=require('./../Models/patents');
const Fieldproj=require('./../Models/fieldproj');

const CBCS=require('./../Models/cbcs');
const BOS=require('./../Models/bos');
const Event=require('./../Models/event');
const Admission=require('./../Models/admission');
const Reservecat=require('./../Models/reservecat');
const Teacherdata=require('./../Models/teacherdata');
const Passexam=require('./../Models/passexam');
const Extact=require('./../Models/extact');
const Collab=require('./../Models/collab');
const Mou=require('./../Models/mou');
const Ict=require('./../Models/ict');
const Library=require('./../Models/library');
const Funds=require('./../Models/funds');
const Quality=require('./../Models/quality');
const Skilldev=require('./../Models/skilldev');
const Higheredu=require('./../Models/higheredu');
const Teacherfs=require('./../Models/teacherfs');
const Egovern=require('./../Models/egovern');

const Book=require('./../Models/book');
const Teacherawards = require('./../Models/teacheraward');
const Innovation = require('./../Models/innovation');
const MoU = require('./../Models/mou');
const AddOnCourse = require('../Models/addonc');
const Phdguide=require('./../Models/phdguide');
const Justawards=require('./../Models/awards');
const Sportsact=require('./../Models/sportsact');
const Fdpcol=require('./../Models/fdp');
const hnewprog=require('./../Models/hnewprog');
const ntimesheet=require('./../Models/ntimesheet');
const nsop=require('./../Models/nsop');
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

const feedback=require('./../Models/feedback');

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


const nodemailer=require('nodemailer');

//const Supportingdocs=require('supportingdoc');

const ndepmeetingsall=require('./../Models/ndepmeetingsall');
const nmeetingtasksall=require('./../Models/nmeetingtasksall');



const nallcourses=require('./../Models/nallcourses');

const verifystatus=require('./../Models/verifystatus');
const nissuesall=require('./../Models/nissuesall');
const ntickets=require('./../Models/ntickets');

var content='client has organized activity on dall.client has held its annual activity on dall.On dall the client has organized activity.activity was organized on dall by client.activity was organized by the client on dall.end of first line.';
content= content + 'The event was a huge success with many students and faculties participating.Many students and faculties participated in the event.Many departments participated in the event.Students and faculties from many departments participated in the event.The event was organized successfully with participation of many students and faculties.end of second line.';
content= content + 'Community representatives were also present in the event.Many representatives from local community attended the event.The event was attended by many representatives from the local community.Some students and faculties from other institutions also attended the events.Students from local community also attended the event.End of third line.';
content= content + 'The event was organized by the NSS department of the institution.Institution NSS department organized the event.NSS department of institution had organized the event.The event was arranged by NSS department of the institution.The NSS department, responsible for organizing outreach activities of the institution, had organized the event.End of fourth line.';
content= content + 'NSS department regularly organizes extension and outreach events and this event was organized as part of the regular activities in the month of dmonth.Regular extension and outreach events are organized by the NSS department and as part of this schedule, this event was organized in the month of dmonth.The NSS department organizes extension and outreach events every month and this event was conducted in the month of dmonth.Every month some event is organized by the NSS department, in the month of dmonth activity was organized.NSS department organizes extension and outreach events regularly with the departments, and in the month of dmonth activity was organized.End of fifth line.';
content= content + 'Usually the month of dmonth is occupied with many academic activities, however, extension and outreach activities are conducted in between the activities, as part of the institution policy for holistic development of the students, and the students are encouraged to attend such activities.dmonth is usually busy with a number of academic activities, however, the institution ensures that regular extension and outreach activities are conducted to promote holistic development of the students and students are always encouraged to attend such events.To promote holistic development of the students, the institution ensures each students participates in the extension and outreach activities among their busy schedule, and even though dmonth is quite busy with academic deadlines, extension and outreach events are organized and the students are encouraged to participate in the event.Although regular classes and exams are part of the academic schedule in dmonth, the institution ensures regular extension activities are organized and students participate in the activities to promote hoslistic development.It is important that students participate in the extension and outreach activities among their busy schedule, hence the institution organizes regular extensioon and outreach activities among the busy academic schedules and encurages the students to participate in such activities.End of sixth line.';
content= content + 'The event started with the inaugural speech by the chief guest.The chief guest of the event delivered an inaugural speech at the start of the event.The chief guest was invited for an inaugural speech at the start of the event.The chief guest started the event with his motivational inaugural speech for the students.In the inaugural speech, the chief guest explained the importance of extension and outreach activities and encouraged the students to participate in such activities.End of seventh line.';
content= content + 'client had also invited many eminent personalities to be part of the event.Many eminent personalities were also invited to be part of the event by client.client had extended invitation to many eminent personalities to be part of this event on dall.On dall, many eminent personalities were also present in the event.On dall, many eminent personalities were also invited by client to be part of the event.End of eigth line.';
content= content + 'An opening ceremony was conducted by the head of NSS department.NSS department head conducted an opening ceremony.NSS department head, in presence of the principal, conducted an opening ceremony.Opening ceremony conducted by the NSS head of department marked the start of the event.The opening ceremony, conducted by the head of NSS, was attended by the faculties and students of the institution.End of ninth line.';
content= content + 'The event started at starttime and held throughout the day.Starting at starttime, the event was organized throughout the day.The opening ceremony was conducted at starttime, and the event was held throughout the day.At starttiem, the event was started with the opening ceremony at the client campus.The event started at starttime with presence of the chief guest and other dignitaries invited for the event.End of tenth line.';


exports.getfirstparaext= async (req,res) => {
    //res.cookie("user","Akshata");

    const ar1=content.toString().split('.');
        var firstpara='';//'test ' + ar1.length + ' ';
        //const client=req.query.client;
        var activity=req.query.activity;
        var dateall=req.query.dateall;
        var datemonth=req.query.datemonth;
        var starttime=req.query.starttime;
        var client1=req.query.client1;

        var find = 'activity';
        var re = new RegExp(find, 'g');

        var find1 = 'client';
        var re1 = new RegExp(find1, 'g');

        var find2 = 'dall';
        var re2 = new RegExp(find2, 'g');

        var find3 = 'dmonth';
        var re3 = new RegExp(find3, 'g');

        var find4 = 'starttime';
        var re4 = new RegExp(find4, 'g');

        for (var i = 1; i < 11; i++) { 
            //gettext(i,client,activity,dateall,datemonth,starttime);
            var min=(i-1)*6 + 1;
            var max=i*6;
            var r1=Math.floor(Math.random() * (max - min)+min);
            //var j=1;
            //firstpara=firstpara + ' '  + i.toString() + ' ' + ' ' + max + ' ' + min + ' ' + r1.toString() + ',';

            for (var k = 0; k < ar1.length; k++) { 
                var k1=k+1;
                if(k1==r1){
                    firstpara = firstpara + ar1[k].toString() + '. ';
                    firstpara=firstpara.toString().replace(re,activity);
                    firstpara=firstpara.toString().replace(re1,client1);
                    firstpara=firstpara.toString().replace(re2,dateall);
                    firstpara=firstpara.toString().replace(re3,datemonth);
                    firstpara=firstpara.toString().replace(re4,starttime);
                }
                
                
            }

         
         }

        //  var second='';

        //  for (var k = 0; k < ar1.length; k++) { 
        //     var k1=k+1;
        //     second = second + k1.toString() + ' ' + ar1[k].toString() + ' ';
            
            
        // }
  
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
        

     res.status(200).json({
        status:'Success',
        firstpara:firstpara
        // data: {
        //     classes : firstpara
        // }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.getndepmeetingsbyfac= async (req,res) => {
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
        const lcat1233= await ndepmeetings.find()
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


