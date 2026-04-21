const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const Kpi=require('./../Models/kpi');



const cnewfeedback=require('./../Models/cnewfeedback');
const sssstud=require('./../Models/sssstud');
const admusers=require('./../Models/admusers');

const opencourse=require('./../Models/opencourse');
const openmodules=require('./../Models/openmodules');

const alumniusers=require('./../Models/alumniusers');

const evguests=require('./../Models/evguests');

const genderaudit=require('./../Models/genderaudit');

const aupaynew=require('./../Models/aupaynew');

const onlinepay=require('./../Models/onlinepay');
const mtestseenrol1=require('./../Models/mtestseenrol1');

const mtestscoresnew1=require('./../Models/mtestscoresnew1');

const mtestnewm=require('./../Models/mtestnewm');

const miseenrol1=require('./../Models/miseenrol1');

const miscores=require('./../Models/miscores');

const minewm=require('./../Models/minewm');




exports.getaddcnewfeedback= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    const meetingid=req.query.meetingid;
    
    res.status(200).render('addcnewfeedbackview', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user,
        meetingid: meetingid
    });
    
    
};





exports.createcnewfeedback= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        const today=new Date();
        //const name=req.cookies['name'];
        const pub1= await cnewfeedback.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            presenter:req.body.name,
pemail:req.body.user,
meetingid:req.body.meetingid,
respondent:req.body.respondent,
remail:req.body.remail,
rphone:req.body.rphone,
submitteddate:today,
knowledge:req.body.knowledge,
communication:req.body.communication,
confidence:req.body.confidence,
understood:req.body.understood,
satisfied:req.body.satisfied,
response:req.body.response,

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
       res.redirect('/addcnewfeedback?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid + '&meetingid=' + req.body.meetingid);
       



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcnewfeedback?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid + '&meetingid=' + req.body.meetingid, {
        title: 'Epaathsala campus Canvas'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// apr 19 2023



exports.getaddsssstud= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    const inst=req.query.inst;
    
    res.status(200).render('addsssstudview', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user,
        inst: inst
    });
    
    
};





exports.createsssstud= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        //const name=req.cookies['name'];
        const pub1= await sssstud.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            student:req.body.student,
gender:req.body.gender,
category:req.body.category,
domicile:req.body.domicile,
nationality:req.body.nationality,
email:req.body.email,
level:req.body.level,
discipline:req.body.discipline,
department:req.body.department,
course:req.body.course,
regno:req.body.regno,
mobile:req.body.mobile,
joinyear:req.body.joinyear,

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
       res.redirect('/addsssstud?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
       



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addsssstud?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid, {
        title: 'Epaathsala campus Canvas'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// apr 28 2023



exports.getaddadmusers= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    
    res.status(200).render('addadmusersview', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user
    });
    
    
};





exports.createadmusers= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        //const name=req.cookies['name'];
        const pub1= await admusers.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            student:req.body.student,
address:req.body.address,
city:req.body.city,
country:req.body.country,
email:req.body.email,
phone:req.body.phone,
refer:req.body.refer,
referuser:req.body.referuser,
username:req.body.phone,
password:req.body.password

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
    //    res.redirect('/addadmusers?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
    res.redirect('/thankyou');
       



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addadmusers?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid, {
        title: 'Epaathsala campus Canvas'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// May 1 2023

exports.getthankyou= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    
    res.status(200).render('thankyou', {
        title: 'Epaathsala Campus Canvas'
    });
    
    
};

// May 5 2023

exports.getviewopenclass= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await openmodules.find();
            // const link123= await Link.find()
            // .where('criteria')
            // .equals('346')
            // .where('colid')
            // .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewopencourse', {
                categories: lcat1233,
                //link:link123,
                title: 'List class'
            
        });
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getloginnew= (req,res) => {
    //res.cookie("user","Akshata");
    res.clearCookie("user");
    res.status(200).render('loginnew1', {
        title: 'Login to the online portal',
        college:req.query.institution
    });
};

// Jun 2 2023



exports.getaddalumniusers= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    
    res.status(200).render('addalumniusersview', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user
    });
    
    
};





exports.createalumniusers= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        //const name=req.cookies['name'];
        const pub1= await alumniusers.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            alumni:req.body.alumni,
address:req.body.address,
city:req.body.city,
country:req.body.country,
email:req.body.email,
phone:req.body.phone,
program:req.body.program,
regno:req.body.regno,
batch:req.body.batch,
paymentref:req.body.paymentref,
payamount:req.body.payamount,
paydate:req.body.paydate,
paymode:req.body.paymode,
username:req.body.username,
password:req.body.password

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
       //res.redirect('/addalumniusers?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
       res.redirect('/thankyou');



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addalumniusers?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid, {
        title: 'Epaathsala campus Canvas'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// Aug 26 2023

exports.getaddalumniusers1= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    
    res.status(200).render('addalumniusersview1', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user
    });
    
    
};





exports.createalumniusers1= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        //const name=req.cookies['name'];
        const pub1= await alumniusers.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            alumni:req.body.alumni,
address:req.body.address,
city:req.body.city,
country:req.body.country,
email:req.body.email,
phone:req.body.phone,
program:req.body.program,
regno:req.body.regno,
batch:req.body.batch,
username:req.body.email,
password:req.body.password

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
       //res.redirect('/addalumniusers?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
       res.redirect('/thankyou');



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.redirect('/addalumniusers1?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
    //    res.redirect('addalumniusers1?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid, {
    //     title: 'Epaathsala campus Canvas'
    // });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// Aug 29 2023


exports.getaddevguests= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    const eventid=req.query.eventid;
    const event=req.query.event;
    
    res.status(200).render('addevguestsview', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user,
        eventid:eventid,
        event:event
    });
    
    
};





exports.createevguests= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        //const eventid=req.body.eventid;
        //const event=req.body.event;
        //const name=req.cookies['name'];
        const pub1= await evguests.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            eventid:req.body.eventid,
event:req.body.event,
guest:req.body.guest,
email:req.body.email,
phone:req.body.phone,
designation:req.body.designation,
institute:req.body.institute,
address:req.body.address,
country:req.body.country,
username:req.body.email,
password:req.body.password,

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
       res.redirect('/addevguests?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
       



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.redirect('/addevguests?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
    //    res.status(200).render('addevguests?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid, {
    //     title: 'Epaathsala campus Canvas'
    // });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// Sep 5 2023


exports.getaddgenderaudit= (req,res) => {
    
    //const user1=req.cookies['user'];
    const colid=req.query.id;
    const name=req.query.name;
    const user=req.query.user;
    
    res.status(200).render('addgenderauditview', {
        title: 'Epaathsala Campus Canvas',
        colid:colid,
        name: name,
        user:user
    });
    
    
};





exports.creategenderaudit= async (req,res) => {

    try{
        //const user1=req.cookies['user'];
        //const department=req.cookies['department'];
        const colid=req.body.colid;
        const todaydate=new Date();
        //const name=req.cookies['name'];
        const pub1= await genderaudit.create({
            
            colid: colid,
            name: req.body.name,
            user:req.body.user,
            
            student:req.body.student,
regno:req.body.regno,
filldate:todaydate,
security:req.body.security,
common:req.body.common,
sanitation:req.body.sanitation,
cctv:req.body.cctv,
classroom:req.body.classroom,
library:req.body.library,
timing:req.body.timing,
daycare:req.body.daycare,
medical:req.body.medical,
hostel:req.body.hostel,
icc:req.body.icc,
seminar:req.body.seminar,
course:req.body.course,
icccom:req.body.icccom,
discriminated:req.body.discriminated,
equal:req.body.equal,
grievance:req.body.grievance,
safe:req.body.safe,

            // coursecode: req.body.coursecode,
            // coursename: req.body.coursename,
            // cocode: req.body.cocode,
            // co: req.body.co,
            
        });

       req.flash("success", "Data has been added successfully.");        
       res.redirect('/addgenderaudit?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
       



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.redirect('/addgenderaudit?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid);
    //    res.status(200).render('addgenderaudit?name=' + req.body.name + '&user=' + req.body.user + '&id=' + req.body.colid, {
    //     title: 'Epaathsala campus Canvas'
    // });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// Apr 26 2024

exports.getthankyouau= async (req,res) => {
    
    //const user1=req.cookies['user'];
    const transactionid=req.query.transactionid;
    const amount=parseInt(req.query.amount);
    const refno=req.query.refno;
    const paydate=new Date();

    const lcat1= await aupaynew.findByIdAndUpdate( req.query.refno,{       
        collegecode:amount,
paydate:paydate,
payref:transactionid,
paytype:req.query.paymode,
status1: req.query.responsecode
    });
 
    
    res.status(200).render('thankyouau', {
        title: 'Epaathsala Campus Canvas'
    });
    
    
};


// nov 30 2024


exports.getthankyouct= async (req,res) => {
    
    //const user1=req.cookies['user'];
    //const transactionid=req.query.transactionid;
    const amount=parseInt(req.query.amount);
    //const refno=req.query.refno;
    const paydate=new Date();
    const user=req.query.user;
    const ar1=user.split('-');
    const username=ar1[0];
    const regno=ar1[1];


    const pub1= await onlinepay.create({
        name: 'PG',
        colid: 111362,
        user: 'ct@ctexam.in',
        transactionid:req.query.transactionid,
orderid:req.query.orderid,
bankref:req.query.bankref,
paymode:req.query.paymode,
bank:req.query.bank,
amount:amount,
username:username,
regno:regno,
clientcolid:req.query.colid,
sessionslot:req.query.sessionslot,
testc:req.query.test,
type:req.query.type,
paydate:paydate,
status1: 'Submitted',
        comments: 'NA'
    });

    const lcat1= await mtestseenrol1.findByIdAndUpdate( req.query.orderid,{
        type: 'Upcoming',
        level: 'National'
       
    });

    // const response = await ep1.get('/api/v2/updatemtestseenrol1comments', {
    //     params: {
    //       id: req.query.orderid,
    //       type: 'Upcoming',
    //       level: 'National'
    //     }
    //   });

//     const lcat1= await aupaynew.findByIdAndUpdate( req.query.refno,{       
//         collegecode:amount,
// paydate:paydate,
// payref:transactionid,
// paytype:req.query.paymode,
// status1: req.query.responsecode
//     });
 
    
    res.status(200).render('thankyouct', {
        title: 'AI Mentor'
    });
    
    
};


// dec 11 2024

exports.getextendreg= async (req,res) => {
    
    //const user1=req.cookies['user'];
    //const transactionid=req.query.transactionid;
    const amount=parseInt(req.query.amount);
    const monthssub=parseInt(req.query.monthssub);
    //const refno=req.query.refno;
    const paydate=new Date();

    var someDate = new Date();

    
    
    var numberOfDaysToAdd = 30 * monthssub;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dt2=new Date(result);


    const user=req.query.user;

 

    const pub1= await onlinepay.create({
        name: 'PG',
        colid: 111362,
        user: 'ct@ctexam.in',
        transactionid:req.query.transactionid,
orderid:req.query.orderid,
bankref:req.query.bankref,
paymode:req.query.paymode,
bank:req.query.bank,
amount:amount,
username:req.query.user,
regno:req.query.user,
clientcolid:req.query.colid,
sessionslot:req.query.monthssub,
testc:'Extend',
type:req.query.type,
paydate:paydate,
status1: 'Submitted',
        comments: 'NA'
    });


    const lcat1 = await User.updateMany(
        { colid: req.query.colid, email: req.query.user }, {
        lastlogin: someDate
      });

    

 
    
    res.status(200).render('thankyouctreg', {
        title: 'AI Mentor'
    });
    
    
};

// dec 14 2024


exports.getsubscription= async (req,res) => {
    
    //const user1=req.cookies['user'];
    //const transactionid=req.query.transactionid;
    const amount=parseInt(req.query.amount);
    const monthssub=parseInt(req.query.monthssub);
    //const refno=req.query.refno;
    const paydate=new Date();

    var someDate = new Date();

    
    
    var numberOfDaysToAdd = 30 * monthssub;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dt2=new Date(result);


    const user=req.query.user;

 

    const pub1= await onlinepay.create({
        name: 'PG',
        colid: 111362,
        user: 'ct@ctexam.in',
        transactionid:req.query.transactionid,
orderid:req.query.orderid,
bankref:req.query.bankref,
paymode:req.query.paymode,
bank:req.query.bank,
amount:amount,
username:req.query.user,
regno:req.query.user,
clientcolid:req.query.colid,
sessionslot:req.query.monthssub,
testc:'Subscription',
type:req.query.type,
paydate:paydate,
status1: 'Submitted',
        comments: 'NA'
    });

   
    const lcat1 = await User.updateMany(
        { email: req.query.user }, {
        status1: 'Yes',
        lastlogin: someDate
      });

    

 
    
    res.status(200).render('thankyouct', {
        title: 'AI Mentor'
    });
    
    
};

// dec 15 2024

exports.activateuser= async (req,res) => {
    
   



    const user=req.query.user;


   
    const lcat1 = await User.updateMany(
        { email: req.query.user }, {
        status: 1
      });

    

 
    
    res.status(200).render('thankyouctnew', {
        title: 'AI Mentor'
    });
    
    
};

// jan 1 2025


exports.getcert= async (req,res) => {
    
    //const user=req.query.user;

   
    // const lcat1 = await User.updateMany(
    //     { email: req.query.user }, {
    //     status: 1
    //   });

    const lcat1233 = await mtestscoresnew1.aggregate([
        {
          $match: {
            regno: req.query.regno,
            testid: req.query.testid,
            sessionid: req.query.sessionid
          },
        },
        {
          $group: {
            // _id:['$regno','$name'],
            // _id:['$regno','$name'],
            _id: {
              section: "$section",
              student: "$student",
              regno: "$regno",
            },
            total_attendance: { $sum: "$score" },
          },
        },
      ]);

      var score=0;

      lcat1233.forEach(async function(data){
        score=score + data.total_attendance;
      })

      var date1=new Date();
      var month1=date1.getMonth() + 1;
      var dt1=date1.getDate() + '/' + month1 + '/' + date1.getFullYear();

      //var student=req.query.student;
      //var course=req.query.course;

      const link123= await User.find()
            .where('regno')
            .equals(req.query.regno);

       var student='';

       link123.forEach(async function(data){
            student= data.name;
        })

        const link124= await mtestnewm.find()
            .where('_id')
            .equals(req.query.testid);

            //console.log(link124);

       var test='';

       link124.forEach(async function(data){
            test= data.testc;
        })


        

        var weblink='https://canvasapi5.azurewebsites.net/getcert?testid=' + req.query.testid + '&sessionid=' + req.query.sessionid + '&regno=' + req.query.regno;

    

      if(score>24) {
        res.status(200).render('thankyoucertificate1', {
            title: 'AI Mentor',
            student: student,
            course: test,
            score: score,
            dt1: dt1,
            regno:req.query.regno,
            testid: req.query.testid,
            sessionid: req.query.sessionid,
            weblink: weblink
        });
        return;

      } else {

        res.status(200).render('thanyoufail', {
            title: 'AI Mentor',
            student: student,
            course: test,
            score: score,
            dt1: dt1,
            regno:req.query.regno,
            testid: req.query.testid,
            sessionid: req.query.sessionid,
            weblink: weblink
        });
        return;

      }

      
    
   
    
    
};


// feb 23 2025


exports.getthankyoucti= async (req,res) => {
    
    //const user1=req.cookies['user'];
    //const transactionid=req.query.transactionid;
    const amount=parseInt(req.query.amount);
    //const refno=req.query.refno;
    const paydate=new Date();
    const user=req.query.user;
    const ar1=user.split('-');
    const username=ar1[0];
    const regno=ar1[1];


    const pub1= await onlinepay.create({
        name: 'PG',
        colid: 111362,
        user: 'ct@ctexam.in',
        transactionid:req.query.transactionid,
orderid:req.query.orderid,
bankref:req.query.bankref,
paymode:req.query.paymode,
bank:req.query.bank,
amount:amount,
username:username,
regno:regno,
clientcolid:req.query.colid,
sessionslot:req.query.sessionslot,
testc:req.query.test,
type:req.query.type,
paydate:paydate,
status1: 'Submitted',
        comments: 'NA'
    });

    const lcat1= await miseenrol1.findByIdAndUpdate( req.query.orderid,{
        type: 'Upcoming',
        level: 'National'
       
    });

    // const response = await ep1.get('/api/v2/updatemtestseenrol1comments', {
    //     params: {
    //       id: req.query.orderid,
    //       type: 'Upcoming',
    //       level: 'National'
    //     }
    //   });

//     const lcat1= await aupaynew.findByIdAndUpdate( req.query.refno,{       
//         collegecode:amount,
// paydate:paydate,
// payref:transactionid,
// paytype:req.query.paymode,
// status1: req.query.responsecode
//     });
 
    
    res.status(200).render('thankyouct', {
        title: 'AI Mentor'
    });
    
    
};

// feb 26 2025


exports.getcertintern= async (req,res) => {
    
    //const user=req.query.user;

   
    // const lcat1 = await User.updateMany(
    //     { email: req.query.user }, {
    //     status: 1
    //   });

    const lcat1233 = await miscores.aggregate([
        {
          $match: {
            regno: req.query.regno,
            testid: req.query.testid,
            sessionid: req.query.sessionid
          },
        },
        {
          $group: {
            // _id:['$regno','$name'],
            // _id:['$regno','$name'],
            _id: {
              section: "$section",
              student: "$student",
              regno: "$regno",
            },
            total_attendance: { $sum: "$score" },
          },
        },
      ]);

      var score=0;

      lcat1233.forEach(async function(data){
        score=score + data.total_attendance;
      })

      var date1=new Date();
      var month1=date1.getMonth() + 1;
      var dt1=date1.getDate() + '/' + month1 + '/' + date1.getFullYear();

      //var student=req.query.student;
      //var course=req.query.course;

      const link123= await User.find()
            .where('regno')
            .equals(req.query.regno);

       var student='';

       link123.forEach(async function(data){
            student= data.name;
        })

        const link124= await minewm.find()
            .where('_id')
            .equals(req.query.testid);

            //console.log(link124);

       var test='';

       link124.forEach(async function(data){
            test= data.testc;
        })


        

        var weblink='https://ctserver1.azurewebsites.net/getcertintern?testid=' + req.query.testid + '&sessionid=' + req.query.sessionid + '&regno=' + req.query.regno;

    

      if(score>6) {
        res.status(200).render('thankyouintern', {
            title: 'AI Mentor',
            student: student,
            course: test,
            score: score,
            dt1: dt1,
            regno:req.query.regno,
            testid: req.query.testid,
            sessionid: req.query.sessionid,
            weblink: weblink
        });
        return;

      } else {

        res.status(200).render('thanyoufail', {
            title: 'AI Mentor',
            student: student,
            course: test,
            score: score,
            dt1: dt1,
            regno:req.query.regno,
            testid: req.query.testid,
            sessionid: req.query.sessionid,
            weblink: weblink
        });
        return;

      }

      
    
   
    
    
};