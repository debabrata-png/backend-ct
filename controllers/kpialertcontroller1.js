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


//Criteria 2//
exports.getdemandratioalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Demandratio.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Demandratio.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Demandratio', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
    };
  
exports.getreservedcatalert= async (req,res) => {
    try{
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Reservedcat.aggregate([
        { 
        $match: {colid: colid1 }
        },
        { 
        $group: {
        _id: {
        status: '$status1'
        },
        total_attendance: {$sum: 1}
        }
        }
        ]);
        var submitted=0;
        var accepted=0;
        var flagged=0;
        var faculties=0;
        var funds=0;
        lcat1233.forEach(async function(data){
        //console.log(data.link);
        //moucount=data.total_attendance;
        if(data._id.status=='Accepted'){
        accepted=accepted+data.total_attendance;
        } else if(data._id.status=='Flagged'){
        flagged=flagged+data.total_attendance;
        } else {
        submitted=submitted+data.total_attendance;
        }
        })
        var total=submitted + accepted + flagged;
        const lcat1234= await Reservedcat.aggregate([
        { 
        $match: {colid: colid1 }
        },
        { 
        $group: {
        _id: {
        user: '$user'
        },
        total_attendance: {$sum: 1}
        }
        }
        ]);
        lcat1234.forEach(async function(data1){
        //console.log(data.link);
        //moucount=data.total_attendance;
        faculties=faculties + 1;
        })
        var currentstatus='Total ' + total;
        const lcat1=await Kpi.updateMany( {category: 'Reservedcat', colid: colid1},{
        currentvalue: total,
        submitted: submitted,
        accepted: accepted,
        faculties:faculties,
        flagged: flagged,
        link: currentstatus
        });
        //console.log(lcat1233);
        res.status(200).json({
        status:'Success',
        data: {
        total: total,
        submitted: submitted,
        accepted:accepted,
        flagged: flagged,
        faculties: faculties,
        link:currentstatus,
        classes : lcat1233,
        users: lcat1234
        } 
        }); 
        } catch(err) {
        res.status(400).json({
        status:'Failed',
        message: err
        });
        
        } 
};

exports.getfulltimeteacheralert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Fulltimeteacher.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Fulltimeteacher.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Facultyhr', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getpasspercentagealert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Passpercentage.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Passpercentage.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Passpercentage', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getexamdaysalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Examdays.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Examdays.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Examdays', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getfacultyawardalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Facultyaward.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Facultyaward.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Facultyaward', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getexamautomationalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Examautomation.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Examautomation.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Examautomation', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getmentoralert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Mentor.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Mentor.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Mentor', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
    };

// exports.getremedialalert= async (req,res) => {
//         try{
//         const colid1=parseInt(req.query.colid);
//         var moucount=0;
//         const lcat1233= await Remedial.aggregate([
//         { 
//         $match: {colid: colid1 }
//         },
//         { 
//         $group: {
//         _id: {
//         status: '$status1'
//         },
//         total_attendance: {$sum: 1}
//         }
//         }
//         ]);
//         var submitted=0;
//         var accepted=0;
//         var flagged=0;
//         var faculties=0;
//         var funds=0;
//         lcat1233.forEach(async function(data){
//         //console.log(data.link);
//         //moucount=data.total_attendance;
//         if(data._id.status=='Accepted'){
//         accepted=accepted+data.total_attendance;
//         } else if(data._id.status=='Flagged'){
//         flagged=flagged+data.total_attendance;
//         } else {
//         submitted=submitted+data.total_attendance;
//         }
//         })
//         var total=submitted + accepted + flagged;
//         const lcat1234= await Remedial.aggregate([
//         { 
//         $match: {colid: colid1 }
//         },
//         { 
//         $group: {
//         _id: {
//         user: '$user'
//         },
//         total_attendance: {$sum: 1}
//         }
//         }
//         ]);
//         lcat1234.forEach(async function(data1){
//         //console.log(data.link);
//         //moucount=data.total_attendance;
//         faculties=faculties + 1;
//         })
//         var currentstatus='Total ' + total;
//         const lcat1=await Kpi.updateMany( {category: 'Remedial', colid: colid1},{
//         currentvalue: total,
//         submitted: submitted,
//         accepted: accepted,
//         faculties:faculties,
//         flagged: flagged,
//         link: currentstatus
//         });
//         //console.log(lcat1233);
//         res.status(200).json({
//         status:'Success',
//         data: {
//         total: total,
//         submitted: submitted,
//         accepted:accepted,
//         flagged: flagged,
//         faculties: faculties,
//         link:currentstatus,
//         classes : lcat1233,
//         users: lcat1234
//         } 
//         }); 
//         } catch(err) {
//         res.status(400).json({
//         status:'Failed',
//         message: err
//         });
        
//         } 
//         };
//     exports.getremedialalert= async (req,res) => {
//         try{
//         const colid1=parseInt(req.query.colid);
//         var moucount=0;
//         const lcat1233= await Remedial.aggregate([
//         { 
//         $match: {colid: colid1 }
//         },
//         { 
//         $group: {
//         _id: {
//         status: '$status1'
//         },
//         total_attendance: {$sum: 1}
//         }
//         }
//         ]);
//         var submitted=0;
//         var accepted=0;
//         var flagged=0;
//         var faculties=0;
//         var funds=0;
//         lcat1233.forEach(async function(data){
//         //console.log(data.link);
//         //moucount=data.total_attendance;
//         if(data._id.status=='Accepted'){
//         accepted=accepted+data.total_attendance;
//         } else if(data._id.status=='Flagged'){
//         flagged=flagged+data.total_attendance;
//         } else {
//         submitted=submitted+data.total_attendance;
//         }
//         })
//         var total=submitted + accepted + flagged;
//         const lcat1234= await Remedial.aggregate([
//         { 
//         $match: {colid: colid1 }
//         },
//         { 
//         $group: {
//         _id: {
//         user: '$user'
//         },
//         total_attendance: {$sum: 1}
//         }
//         }
//         ]);
//         lcat1234.forEach(async function(data1){
//         //console.log(data.link);
//         //moucount=data.total_attendance;
//         faculties=faculties + 1;
//         })
//         var currentstatus='Total ' + total;
//         const lcat1=await Kpi.updateMany( {category: 'Remedial', colid: colid1},{
//         currentvalue: total,
//         submitted: submitted,
//         accepted: accepted,
//         faculties:faculties,
//         flagged: flagged,
//         link: currentstatus
//         });
//         //console.log(lcat1233);
//         res.status(200).json({
//         status:'Success',
//         data: {
//         total: total,
//         submitted: submitted,
//         accepted:accepted,
//         flagged: flagged,
//         faculties: faculties,
//         link:currentstatus,
//         classes : lcat1233,
//         users: lcat1234
//         } 
//         }); 
//         } catch(err) {
//         res.status(400).json({
//         status:'Failed',
//         message: err
//         });
        
//         } 
// };

// exports.getstudteacherratioalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Studteacherratio.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Studteacherratio.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Studteacherratio', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getstudentcentricalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Studentcentric.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Studentcentric.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Studentcentric', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getlmsalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await LMS.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await LMS.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'LMS', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getfacultyhralert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Facultyhr.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Facultyhr.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Facultyhr', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getphdalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Phd.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Phd.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Phd', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getexamreevalalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Examreeval.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Examreeval.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Examreeval', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
    
// };

// exports.getcolistalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Colist.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Colist.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Colist', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
    
// };

// exports.getcoattainmentalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Coattainment.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Coattainment.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Coattainment', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };


//Criteria 3//
exports.getseedmoneyalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Seedmoney.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Seedmoney.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Seedmoney', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getteacherfellowalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Teacherfellow.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Teacherfellow.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Teacherfellow', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getresearchfellowalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Researchfellow.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Researchfellow.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Researchfellow', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getipralert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await IPR.aggregate([
    { 
    $match: {colid: colid1, type: { $in: ['Research/IPR', 'Extension Lecture', 'Conference/Seminar' ] } }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await IPR.aggregate([
    { 
    $match: {colid: colid1, type: { $in: ['Research/IPR', 'Extension Lecture', 'Conference/Seminar' ] }  }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'IPR', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getresearchawardsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Researchawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Researchawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Researchawards', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getawardsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Awards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Awards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Awards', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getecontentalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Econtent.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Econtent.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Econtent', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getconsultancyalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Consultancy.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Consultancy.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Consultancy', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getextensionawardsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Extensionawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Extensionawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Extensionawards', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getextensionalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Extension.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Extension.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Extension', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getextensionstudentsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Extensionstudents.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Extensionstudents.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Extensionstudents', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getcollaborationalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Collaboration.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Collaboration.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Collaboration', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getmoualert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await MOU.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await MOU.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'MoU', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};


//Criteria 4//
// exports.getteachingfacilityalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Teachingfacility.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Teachingfacility.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Teachingfacility', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getsportsfacilityalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Sportsfacility.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Sportsfacility.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Sportsfacility', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getgeneralfacilityalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Generalfacility.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Generalfacility.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Generalfacility', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getilmsalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await ILMS.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await ILMS.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'ILMS', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getlibrarybooksalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Librarybooks.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Librarybooks.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Libraryexp', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getlibraryexpalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Libraryexp.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Libraryexp.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Libraryexp', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getlibraryfootfallsalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Libraryfootfalls.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Libraryfootfalls.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Libraryfootfalls', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getictalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await ICT.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await ICT.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'ICT', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getitpolicyalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Itpolicy.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Itpolicy.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Itpolicy', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getstudcompratioalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Studcompratio.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Studcompratio.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Studcompratio', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getbandwidthalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Bandwidth.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Bandwidth.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Bandwidth', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getecontentresourcealert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Econtentresource.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Econtentresource.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Econtent', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getexpenditurealert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Expenditure.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Expenditure.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Infrastructureexp', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getinfrastructurealert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Infrastructure.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Infrastructure.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Infrastructureexp', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

//Criteria 5//
exports.getscholarshipalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Scholarship.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Scholarship.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Scholarship', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getcareercounselalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Careercounsel.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Careercounsel.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Careercounsel', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getskilldevelopmentalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Skilldevelopment.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Skilldevelopment.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Skilldevelopment', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getstudentgrievancealert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Studentgrievance.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Studentgrievance.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Studentgrievance', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.gethigherexamalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Higherexam.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Higherexam.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Higherexam', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getplacementalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Placement.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Placement.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Placement', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.gethighereducationalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Highereducation.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Highereducation.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Highereducation', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getstudentawardsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Studentawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Studentawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Studentawards', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getstudentcouncilalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Studentcouncil.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Studentcouncil.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Studentcouncil', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getsportsculturalalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Sportscultural.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Sportscultural.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Sportscultural', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getalumnichaptersalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Alumnichapters.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Alumnichapters.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Alumnichapters', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getalumnicontributionalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Alumnicontribution.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Alumnicontribution.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Alumnicontribution', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

//Criteria 6//
// exports.getvisionalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Vision.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Vision.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Vision', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getinstpracticealert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Instpractice.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Instpractice.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Instpractice', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getstrategicplanalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Strategicplan.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Strategicplan.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Strategicplan', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getpolicyalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Policy.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Policy.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Policy', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getappraisalalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Appraisal.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Appraisal.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Appraisal', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getegovernancealert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Egovernance.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Egovernance.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Egovernance', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getteachersupportalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Teachersupport.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Teachersupport.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Teachersupport', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.gettrainingalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Training.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Training.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Event', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.gettfdpalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await TFDP.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await TFDP.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Seminar', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getfdpalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await FDP.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await FDP.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'FDP', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getresourceutilalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Resourceutil.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Resourceutil.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Resourceutil', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getgfundsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await GFunds.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await GFunds.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Funds', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

exports.getngfundsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await NGFunds.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await NGFunds.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Funds', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getauditalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Audit.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Audit.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Audit', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

// exports.getqualitypracticealert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Qualitypractice.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Qualitypractice.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Qualitypractice', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };

exports.getqualityinitalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Qualityinit.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    status: '$status1'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    var submitted=0;
    var accepted=0;
    var flagged=0;
    var faculties=0;
    var funds=0;
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    if(data._id.status=='Accepted'){
    accepted=accepted+data.total_attendance;
    } else if(data._id.status=='Flagged'){
    flagged=flagged+data.total_attendance;
    } else {
    submitted=submitted+data.total_attendance;
    }
    })
    var total=submitted + accepted + flagged;
    const lcat1234= await Qualityinit.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id: {
    user: '$user'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1234.forEach(async function(data1){
    //console.log(data.link);
    //moucount=data.total_attendance;
    faculties=faculties + 1;
    })
    var currentstatus='Total ' + total;
    const lcat1=await Kpi.updateMany( {category: 'Qualityinit', colid: colid1},{
    currentvalue: total,
    submitted: submitted,
    accepted: accepted,
    faculties:faculties,
    flagged: flagged,
    link: currentstatus
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    total: total,
    submitted: submitted,
    accepted:accepted,
    flagged: flagged,
    faculties: faculties,
    link:currentstatus,
    classes : lcat1233,
    users: lcat1234
    } 
    }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
};

// exports.getqualityimprovealert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var moucount=0;
//     const lcat1233= await Qualityimprove.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     status: '$status1'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     var submitted=0;
//     var accepted=0;
//     var flagged=0;
//     var faculties=0;
//     var funds=0;
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     if(data._id.status=='Accepted'){
//     accepted=accepted+data.total_attendance;
//     } else if(data._id.status=='Flagged'){
//     flagged=flagged+data.total_attendance;
//     } else {
//     submitted=submitted+data.total_attendance;
//     }
//     })
//     var total=submitted + accepted + flagged;
//     const lcat1234= await Qualityimprove.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id: {
//     user: '$user'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1234.forEach(async function(data1){
//     //console.log(data.link);
//     //moucount=data.total_attendance;
//     faculties=faculties + 1;
//     })
//     var currentstatus='Total ' + total;
//     const lcat1=await Kpi.updateMany( {category: 'Qualityimprove', colid: colid1},{
//     currentvalue: total,
//     submitted: submitted,
//     accepted: accepted,
//     faculties:faculties,
//     flagged: flagged,
//     link: currentstatus
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     total: total,
//     submitted: submitted,
//     accepted:accepted,
//     flagged: flagged,
//     faculties: faculties,
//     link:currentstatus,
//     classes : lcat1233,
//     users: lcat1234
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
    
//     } 
// };


