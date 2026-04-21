// listener.js
const myEmitter = require('./eventEmitter');

const tblemitter=require('./../Models/tblemitter');
const tblerrorlog=require('./../Models/tblerrorlog');
const ledgerstud=require('./../Models/ledgerstud');



myEmitter.on('user_created',  async(userData) => {
    //console.log(`[LISTENER]: New user created`);
    const colid=parseInt(userData.colid1);
    const pub2 = await tblemitter.find({"colid" : colid, "emode" : "user_created"});
    //console.log(pub2);
    
        var isactive='';
    
        pub2.forEach(async function(data){
          isactive=data.isactive;
    
        });
        console.log(isactive);
    // console.log(`[LISTENER]: New user created: ${userData.name} (${userData.email})`);
    console.log(`[LISTENER]: New user created:  (${userData.colid1})`);
    // Add logic here, e.g., sending a welcome email
});

myEmitter.on('iqac_project',  async(userData) => {
    //console.log(`[LISTENER]: checking project data`);
    const colid=parseInt(userData.colid1);
    const pub2 = await tblemitter.find({"colid" : colid, "emode" : "iqac_project"});
    //console.log(pub2);
    
        var isactive='';
    
        pub2.forEach(async function(data){
          isactive=data.isactive;
    
        });
        //console.log(isactive);
        var error='';
        if(isactive=='Yes') {
            if(!userData.project || !userData.agency || !userData.yop || userData.funds) {
                error=error + 'All fields required.';
            }
            if(userData.yop.indexOf('-')<0) {
                error=error + ' ' + 'Year must be in academic year format such as 2025-26';
            }
            if(parseInt(userData.funds) < 0) {
                error = error + ' ' + 'Funds should be positive.';
            }
            if(parseInt(userData.funds) > 1000) {
                error = error + ' ' + 'Funds should be in lakhs. Check your data';
            }
            //console.log(error);
            if(error.length>0) {
                 const pub12= await tblerrorlog.create({
            name: userData.name,
            colid: colid,
            user: userData.user,
            domain:'IQAC',
            username:userData.user,
            pagename:'Project',
            error:error,
            errordate:new Date(),
            type:userData.type,
            status1: 'Submitted',
            comments: 'NA'
        });

            }

        } else {
            //console.log('Not enabled');

        }

    
 
});

myEmitter.on('stud_ledger',  async(userData) => {
    //console.log(`[LISTENER]: checking project data`);
    const colid=parseInt(userData.colid1);
    const pub2 = await tblemitter.find({"colid" : colid, "emode" : "stud_ledger"});
    //console.log(pub2);
    
        var isactive='';
    
        pub2.forEach(async function(data){
          isactive=data.isactive;
    
        });
        //console.log(isactive);
        var error='';
        if(isactive=='Yes') {

            const name=userData.name;

            // const pub1= await ledgerstud.create({
            //             name: req.query.name,
            //             colid: req.query.colid,
            //             user: req.query.user,
            //             academicyear:req.query.academicyear,
            // student:req.query.student,
            // regno:req.query.regno,
            // feegroup:req.query.feegroup,
            // semester:req.query.semester,
            // feeitem:req.query.feeeitem,
            // feecategory:req.query.feecategory,
            // classdate:req.query.classdate,
            // amount:req.query.amount,
            // paymode:req.query.paymode,
            // paydetails:req.query.paydetails,
            // installment:req.query.installment,
            // status:req.query.status,
            // status1: 'Submitted',
            //             comments: 'NA'
            //         });
            
            //console.log(error);
            if(error.length>0) {
                 const pub12= await tblerrorlog.create({
            name: userData.name,
            colid: colid,
            user: userData.user,
            domain:'IQAC',
            username:userData.user,
            pagename:'Project',
            error:error,
            errordate:new Date(),
            type:userData.type,
            status1: 'Submitted',
            comments: 'NA'
        });

            }

        } else {
            //console.log('Not enabled');

        }

    
 
});

console.log('[LISTENER]: Listening for "user_created" events...');

//console.log('[LISTENER]: Listening for "user_created" events...');
