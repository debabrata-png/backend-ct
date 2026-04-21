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
const Kpi=require('./../Models/kpi');
const Syllabusrev=require('./../Models/syllabusrev');
const Employability=require('./../Models/employability');
const Explearning=require('./../Models/explearning');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Project = require('../Models/projects');
const Seminar=require('./../Models/seminar');

const Publication=require('./../Models/publications');
const Patents=require('./../Models/patents');
const Book=require('./../Models/book');
const Patent = require('./../Models/patents');
const Depprograms = require('./../Models/depprograms');

exports.getcbcsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var cbcscount=0;
    const lcat1233= await CBCS.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    cbcscount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '1.2.2', colid: colid1, type: 'University'},{
    currentvalue: cbcscount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '1.2.1', colid: colid1, type: 'Affiliated'},{
        currentvalue: cbcscount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '1.2.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: cbcscount
    });
    
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    cbcscount: cbcscount,
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

exports.getbosalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var boscount=0;
    const lcat1233= await BOS.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    boscount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '1.1.3', colid: colid1, type: 'Affiliated'},{
    currentvalue: boscount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    boscount: boscount,
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

exports.geteventalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var eventcount=0;
    const lcat1233= await Event.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    eventcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '1.3.4-3.3.2-5.3.3-6.3.3-6.3.4', colid: colid1, type: 'University/Affiliated/Autonomous'},{
    currentvalue: eventcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    eventcount: eventcount,
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

exports.getadmissionalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var admissioncount=0;
    const lcat1233= await Admission.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    admissioncount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '2.1.1', colid: colid1, type: 'University'},{
    currentvalue: admissioncount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '2.1.1', colid: colid1, type: 'Affiliated'},{
        currentvalue: admissioncount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '2.1.1', colid: colid1, type: 'Autonomous'},{
        currentvalue: admissioncount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    admissioncount: admissioncount,
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

exports.getreservecatalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var reservecatcount=0;
    const lcat1233= await Reservecat.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    reservecatcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '2.1.2', colid: colid1, type: 'University'},{
    currentvalue: reservecatcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '2.1.2', colid: colid1, type: 'Affiliated'},{
        currentvalue: reservecatcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '2.1.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: reservecatcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    reservecatcount: reservecatcount,
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

exports.getteacherdataalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var teacherdatacount=0;
    const lcat1233= await Teacherdata.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    teacherdatacount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '2.4.2', colid: colid1, type: 'University'},{
    currentvalue: teacherdatacount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '2.4.1-2.4.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: teacherdatacount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '2.4.1', colid: colid1, type: 'Autonomous'},{
        currentvalue: teacherdatacount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    teacherdatacount: teacherdatacount,
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

exports.getteacherfsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var teacherfscount=0;
    const lcat1233= await Teacherfs.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    teacherfscount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '6.3.2', colid: colid1, type: 'University'},{
    currentvalue: teacherfscount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '6.3.2', colid: colid1, type: 'Affiliated'},{
        currentvalue: teacherfscount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '6.3.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: teacherfscount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    teacherfscount: teacherfscount,
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

exports.getpassexamalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var passexamcount=0;
    const lcat1233= await Passexam.aggregate([
    { 
    $match: {colid: colid1}
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    passexamcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '2.6.3', colid: colid1, type: 'University'},{
    currentvalue: passexamcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '2.6.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: passexamcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '2.6.3', colid: colid1, type: 'Autonomous'},{
        currentvalue: passexamcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    passexamcount: passexamcount,
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

exports.getawardsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var awardscount=0;
    const lcat1233= await Awards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    awardscount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.3.1', colid: colid1, type: 'University'},{
    currentvalue: awardscount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.3.1', colid: colid1, type: 'Affiliated'},{
        currentvalue: awardscount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.3.1', colid: colid1, type: 'Autonomous'},{
        currentvalue: awardscount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    awardscount: awardscount,
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

exports.getextactalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var extactcount=0;
    const lcat1233= await Extact.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    extactcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '3.6.3', colid: colid1, type: 'University'},{
    currentvalue: extactcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '3.4.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: extactcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '3.6.3-3.6.4', colid: colid1, type: 'Autonomous'},{
        currentvalue: extactcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    extactcount: extactcount,
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

exports.getcollabalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var collabcount=0;
    const lcat1233= await Collab.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    collabcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '3.7.1', colid: colid1, type: 'University'},{
    currentvalue: collabcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '3.5.1', colid: colid1, type: 'Affiliated'},{
        currentvalue: collabcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '3.7.1', colid: colid1, type: 'Autonomous'},{
        currentvalue: collabcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    collabcount: collabcount,
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

exports.getictalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var ictcount=0;
    const lcat1233= await Ict.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    ictcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '4.3.1', colid: colid1, type: 'University'},{
    currentvalue: ictcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '4.1.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: ictcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '4.1.3', colid: colid1, type: 'Autonomous'},{
        currentvalue: ictcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    ictcount: ictcount,
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

exports.getexpenditurealert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var expenditurecount=0;
    const lcat1233= await Expenditure.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    expenditurecount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '4.1.4-4.4.1', colid: colid1, type: 'University'},{
    currentvalue: expenditurecount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '4.1.4', colid: colid1, type: 'Affiliated'},{
        currentvalue: expenditurecount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '4.1.4', colid: colid1, type: 'Autonomous'},{
        currentvalue: expenditurecount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    expenditurecount: expenditurecount,
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

exports.getscholarshipalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var scholarshipcount=0;
    const lcat1233= await Scholarship.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    scholarshipcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.1.1', colid: colid1, type: 'University'},{
    currentvalue: scholarshipcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.1.1-5.1.2', colid: colid1, type: 'Affiliated'},{
        currentvalue: scholarshipcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.1.1-5.1.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: scholarshipcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    scholarshipcount: scholarshipcount,
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

exports.getlibraryalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var librarycount=0;
    const lcat1233= await Library.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    librarycount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '4.2.2-4.2.3', colid: colid1, type: 'University'},{
    currentvalue: librarycount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '4.2.2-4.2.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: librarycount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '4.3.4', colid: colid1, type: 'Autonomous'},{
        currentvalue: librarycount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    librarycount: librarycount,
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

exports.getfundsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var fundscount=0;
    const lcat1233= await Funds.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    fundscount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '6.4.2-6.4.3', colid: colid1, type: 'University'},{
    currentvalue: fundscount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '6.4.2', colid: colid1, type: 'Affiliated'},{
        currentvalue: fundscount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '6.4.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: fundscount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    fundscount: fundscount,
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

exports.getqualityalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var qualitycount=0;
    const lcat1233= await Quality.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    qualitycount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '6.5.2', colid: colid1, type: 'University'},{
    currentvalue: qualitycount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '6.5.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: qualitycount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '6.5.3', colid: colid1, type: 'Autonomous'},{
        currentvalue: qualitycount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    qualitycount: qualitycount,
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

exports.getskilldevalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var skilldevcount=0;
    const lcat1233= await Skilldev.aggregate([
    { 
    $match: {colid: colid1}
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    skilldevcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.1.3', colid: colid1, type: 'University'},{
    currentvalue: skilldevcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.1.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: skilldevcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.1.3', colid: colid1, type: 'Autonomous'},{
        currentvalue: skilldevcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    skilldevcount: skilldevcount,
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

exports.getcareercounselalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var careercounselcount=0;
    const lcat1233= await Careercounsel.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    careercounselcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.1.2', colid: colid1, type: 'University'},{
    currentvalue: careercounselcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.1.4', colid: colid1, type: 'Affiliated'},{
        currentvalue: careercounselcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.1.4', colid: colid1, type: 'Autonomous'},{
        currentvalue: careercounselcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    careercounselcount: careercounselcount,
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

exports.getplacementalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var placementcount=0;
    const lcat1233= await Placement.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    placementcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.2.2', colid: colid1, type: 'University'},{
    currentvalue: placementcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.2.1', colid: colid1, type: 'Affiliated'},{
        currentvalue: placementcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.2.1', colid: colid1, type: 'Autonomous'},{
        currentvalue: placementcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    placementcount: placementcount,
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

exports.gethigheredualert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var highereducount=0;
    const lcat1233= await Higheredu.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    highereducount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.2.3', colid: colid1, type: 'University'},{
    currentvalue: highereducount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.2.2', colid: colid1, type: 'Affiliated'},{
        currentvalue: highereducount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.2.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: highereducount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    highereducount: highereducount,
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

exports.gethigherexamalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var higherexamcount=0;
    const lcat1233= await Higherexam.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    higherexamcount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '5.2.1', colid: colid1, type: 'University'},{
    currentvalue: higherexamcount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '5.2.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: higherexamcount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '5.2.3', colid: colid1, type: 'Autonomous'},{
        currentvalue: higherexamcount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    higherexamcount: higherexamcount,
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

exports.getegovernalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var egoverncount=0;
    const lcat1233= await Egovern.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    egoverncount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '6.2.3', colid: colid1, type: 'University'},{
    currentvalue: egoverncount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '6.2.3', colid: colid1, type: 'Affiliated'},{
        currentvalue: egoverncount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '6.2.3', colid: colid1, type: 'Autonomous'},{
        currentvalue: egoverncount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    egoverncount: egoverncount,
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

// exports.getaddoncalert= async (req,res) => {
//     try{
//     const colid1=parseInt(req.query.colid);
//     var addonccount=0;
//     const lcat1233= await Addonc.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     // _id:['$regno','$name'],
//     // _id:['$regno','$name'], 
//     _id: {
//     question: '$colid'
//     },
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     lcat1233.forEach(async function(data){
//     //console.log(data.link);
//     addonccount=data.total_attendance;
//     })
//     const lcat1=await Kpi.findOneAndUpdate( {metric: '1.3.2-1.3.3', colid: colid1, type: 'University'},{
//     currentvalue: addonccount
//     });
//     const lcat2=await Kpi.findOneAndUpdate( {metric: '1.2.2-1.2.3', colid: colid1, type: 'Affiliated'},{
//         currentvalue: addonccount
//     });
//     const lcat3=await Kpi.findOneAndUpdate( {metric: '1.3.2-1.3.3', colid: colid1, type: 'Autonomous'},{
//         currentvalue: addonccount
//     });
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     addonccount: addonccount,
//     classes : lcat1233
//     } 
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
        
//     } 
// };

exports.getinstawardsalert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var instawardscount=0;
    const lcat1233= await Instawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    instawardscount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '3.6.2', colid: colid1, type: 'University'},{
    currentvalue: instawardscount
    });
    const lcat2=await Kpi.findOneAndUpdate( {metric: '3.6.2', colid: colid1, type: 'Affiliated'},{
        currentvalue: instawardscount
    });
    const lcat3=await Kpi.findOneAndUpdate( {metric: '3.4.2', colid: colid1, type: 'Autonomous'},{
        currentvalue: instawardscount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    instawardscount: instawardscount,
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


exports.getmoualert= async (req,res) => {
    try{
    const colid1=parseInt(req.query.colid);
    var moucount=0;
    const lcat1233= await Mou.aggregate([
    { 
    $match: {colid: colid1, year: req.query.year }
    },
    { 
    $group: {
    // _id:['$regno','$name'],
    // _id:['$regno','$name'], 
    _id: {
    question: '$colid'
    },
    total_attendance: {$sum: 1}
    }
    }
    ]);
    lcat1233.forEach(async function(data){
    //console.log(data.link);
    moucount=data.total_attendance;
    })
    const lcat1=await Kpi.findOneAndUpdate( {metric: '3.7.2', colid: colid1, type: 'University'},{
    currentvalue: moucount
    });
    //console.log(lcat1233);
    res.status(200).json({
    status:'Success',
    data: {
    moucount: moucount,
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

exports.getmoualert= async (req,res) => {
try{
const colid1=parseInt(req.query.colid);
var moucount=0;
const lcat1233= await Mou.aggregate([
    { 
$match: {colid: colid1 }
},
{ 
$group: {
// _id:['$regno','$name'],
// _id:['$regno','$name'], 
_id: {
question: '$colid'
},
total_attendance: {$sum: 1}
}
}
]);
lcat1233.forEach(async function(data){
//console.log(data.link);
moucount=data.total_attendance;
})
const lcat1=await Kpi.findOneAndUpdate( {metric: '3.7.2', colid: colid1, type: 'University'},{
currentvalue: moucount
});
const lcat2=await Kpi.findOneAndUpdate( {metric: '3.5.2', colid: colid1, type: 'Affiliated'},{
    currentvalue: moucount
});
const lcat3=await Kpi.findOneAndUpdate( {metric: '3.7.2', colid: colid1, type: 'Autonmous'},{
    currentvalue: moucount
});
//console.log(lcat1233);
res.status(200).json({
status:'Success',
data: {
moucount: moucount,
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

// exports.getsyllabusrevalert= async (req,res) => {
//     try{
        
//         const colid1=parseInt(req.query.colid);
//         var moucount=0;
//         const lcat1233= await Syllabusrev.aggregate([
//             { 
//                 $match: {colid: colid1 }
//             },
//             { 
//                 $group: {
//                     _id: {
//                         question: '$datastatus'
//                     },
//                     total_attendance: {$sum: 1}
//                 }
//             }
//         ]);
//         var submitted=0;
//         var accepted=0;
//         var flagged=0;
//         lcat1233.forEach(async function(data){
//             //console.log(data.link);
//             //moucount=data.total_attendance;
//             if(data._id.question='Accepted'){
//                 accepted=accepted+data.total_attendance;
//             } else if(data._id.question='Flagged'){
//                 flagged=flagged+data.total_attendance;
//             } else {
//                 submitted=submitted+data.total_attendance;
//             }
            
//         })
//         var total=submitted + accepted + flagged;
//         const lcat1=await Kpi.findOneAndUpdate( {metric: '1.1.2', colid: colid1},{
//             currentvalue: total
//         });
//         //console.log(lcat1233);
//         res.status(200).json({
//             status:'Success',
//             data: {
//                 total: total,
//                 submitted: submitted,
//                 accepted:accepted,
//                 classes : lcat1233
//             }   
//         });               
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

exports.getprojectalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Project.aggregate([
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
        const lcat1234= await Project.aggregate([
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

        const lcat1235= await Project.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    _id: {
                        user: '$user'
                    },
                    total_attendance: {$sum: '$funds'}
                }
            }
        ]);
        lcat1235.forEach(async function(data2){
            //console.log(data.link);
            //moucount=data.total_attendance;
            funds=funds+data2.total_attendance;
            
        })
        // const lcat1=await Kpi.findOneAndUpdate( {metric: '3.1.6', colid: colid1},{
        //     currentvalue: total
        // });
        // const lcat1=await Kpi.findOneAndUpdate( {category: 'Project', colid: colid1},{
        //     currentvalue: total,
        //     submitted: submitted,
        //     accepted: accepted,
        //     faculties:faculties,
        //     flagged: flagged
        // });
        var currentstatus='Total funds sanctioned ' + funds;
        const lcat1=await Kpi.updateMany( {category: 'Project', colid: colid1},{
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

exports.getseminaralert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Seminar.aggregate([
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
        const lcat1234= await Seminar.aggregate([
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

        const lcat1235= await Seminar.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    _id: {
                        user: '$user'
                    },
                    total_attendance: {$sum: '$amount'}
                }
            }
        ]);
        lcat1235.forEach(async function(data2){
            funds=funds+data2.total_attendance;
            
        })
       
        var currentstatus='Total amount provided ' + funds;
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

exports.getpatentalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Patent.aggregate([
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
        const lcat1234= await Patent.aggregate([
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

        // const lcat1235= await Seminar.aggregate([
        //     { 
        //         $match: {colid: colid1 }
        //     },
        //     { 
        //         $group: {
        //             _id: {
        //                 user: '$user'
        //             },
        //             total_attendance: {$sum: '$amount'}
        //         }
        //     }
        // ]);
        // lcat1235.forEach(async function(data2){
        //     funds=funds+data2.total_attendance;
            
        // })
       
        var currentstatus='Total patents' + total;
        const lcat1=await Kpi.updateMany( {category: 'Patent', colid: colid1},{
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

exports.getpubalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Publication.aggregate([
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
        const lcat1234= await Publication.aggregate([
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
        const lcat1=await Kpi.updateMany( {category: 'Publication', colid: colid1},{
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

exports.getbookalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Book.aggregate([
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
        const lcat1234= await Book.aggregate([
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
        const lcat1=await Kpi.updateMany( {category: 'Book', colid: colid1},{
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


exports.getsyllabusrevalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        const prog1=parseInt(req.query.programs);
        var moucount=0;
        var submitted=0;
        var accepted=0;
        var flagged=0;
        var faculties=0;
        var funds=0;
        var programs=0;
        var entries='';
        var score=0;
        var gp=0;
        var status='Ok';
        const lcat1233= await Syllabusrev.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    _id: {
                        status: '$datastatus'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
       
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

        const dt1=new Date();
        var months= dt1.getMonth() + 1;
        var dt2=dt1.getDate() + '/' + months + '/' + dt1.getFullYear() + '-' + dt1.getHours() + ':' + dt1.getMinutes();

        var currentstatus='Report as on ' + dt2 + '<br /><br />';

        currentstatus=currentstatus + 'Total entries ' + total;

        const lcat3= await Syllabusrev.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    _id: {
                        status: '$programcode'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
       
        lcat3.forEach(async function(data){
            programs = programs + 1;
            if(data.total_attendance>1) {
                entries = entries + 'Programcode ' + data._id.status + '<br />';
                status='Urgent';
            }
        })

        // if(programs >= prog1) {
        //     currentstatus='Only each program should be entered once for more than 20 percent syllabus revision, even if revised more than once. Course names should not be entered. Please check data.<br />';
        //     status='Urgent';
        // } else {
        //     const diff=prog1 - programs;
        //     currentstatus='Syllabus is not revised for ' + diff + ' programs. Please revise syllabus and convene BoS within assessment period. Also BoS date must be within the assessment period.<br />';
        //     status='Urgent';
        // }
        // if(entries.length>0) {
        //     currentstatus= currentstatus + ' Multiple entries for ' + entries;
        // }

        var comments='If not done, please get syllabus revised for all programs with BoS date within assessment period. Emergency BoS may also be conducted. If syllabus is revised, please consider including employability content in each course.<br />';
        comments=comments + ' Multiple entries for ' + entries + '<br />';
        comments=comments + 'For each program we need only one entry within the assessment period (2017-18 till 2021-22) where syllabus revision was more than 20 percent.<br />';
        currentstatus=currentstatus + ' ' + comments + '<br />';

        const lcat1234= await Syllabusrev.aggregate([
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

        if(programs > prog1) {
            score=0;
        } else {
            score=Math.floor((programs/prog1)*4);
        }
        
        gp=score * 20;


        const lcat5= await Syllabusrev
            .aggregate([
                { $addFields: { 'userId': { $toString: '$_id' }}},
                {
                    $lookup: {
                      from: 'supportingdocs', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'seminars'
                    }
                  }, 
                  {
                    $lookup: {
                      from: 'accrcomments', 
                      localField: 'userId', 
                      foreignField: 'field1', 
                      as: 'allcomments'
                    }
                  }, 
                  {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ]);

                  var doccount='';
                  var emptydocs='';
                lcat5.forEach(async function(data5){
                    //console.log(data.link);
                    //moucount=data.total_attendance;
                    //doccount=doccount + data5.programcode + '-' + data5.seminars.length + '   ';
                    if(data5.seminars.length<1) {
                        emptydocs=emptydocs + 'Programcode ' + data5.programcode + ' Program ' + data5.programname + '<br />';
                    } else {
                        doccount=doccount + 'Programcode ' + data5.programcode + ' ' + ' Program ' +  data5.programname + ' - ' + data5.seminars.length + '<br />';
                    }
                    //faculties=faculties + 1;
                    
                })


                

                currentstatus=currentstatus + '<br />';
                currentstatus=currentstatus + 'For every entry at least two documents (syllabus copy highlighted and BoS meeting minutes) must be submitted.<br />';
                currentstatus=currentstatus + 'Documents submission status for following entries : <br />' + doccount + '<br />';
                currentstatus=currentstatus + 'Documents not submitted for following entries : <br />' + emptydocs;

                currentstatus=currentstatus + 'Additional observations if any is below<br />';



                const lcat6= await Depprograms
                .aggregate([
                  
                    {
                        $lookup: {
                          from: 'syllabusrevisions', 
                          localField: 'programcode', 
                          foreignField: 'programcode', 
                          as: 'seminars'
                        }
                      }, 
                     
                      {
                        $match: {
                          'colid': parseInt(req.query.colid)
                        }
                      }
                      ]);
    
                      var nmatch='';
                      var npercent='';
                      var nassessment='';
                    lcat6.forEach(async function(data6){
                        //console.log(data.link);
                        //moucount=data.total_attendance;
                        //doccount=doccount + data5.programcode + '-' + data5.seminars.length + '   ';
                        var valid=0;
                        var invalid=0;

                        
                        if(data6.seminars.length<1) {
                            nmatch=nmatch + 'Programcode ' + data6.programcode + ' Program ' + data6.program + '<br />';
                        } else if(data6.seminars.length>1) {
                            data6.seminars.forEach(async function(data61){
                                
                                var prog='For program ' + data61.programname + ' programcode ' + data61.programcode;
                                if(data61.changepercent>19) {
                                    if(data61.yearofrevision.toString().indexOf('2017')>-1 || data61.yearofrevision.toString().indexOf('2018')>-1 || data61.yearofrevision.toString().indexOf('2019')>-1 || data61.yearofrevision.toString().indexOf('2020')>-1 || data61.yearofrevision.toString().indexOf('2021')>-1) {
                                        prog=prog + ' syllabus revision year ' + data61.yearofrevision + ' entry is valid.<br />'; 
                                        valid=valid+1;
                                    } else {
                                        prog=prog + ' syllabus revision year ' + data61.yearofrevision + ' entry is not valid.<br />';
                                        invalid=invalid+1;
                                    }               
                                } else {
                                    prog=prog + ' syllabus revision year ' + data61.yearofrevision + ' entry is not valid.<br />';
                                    invalid=invalid+1;
                                }
                                currentstatus=currentstatus + prog;
                                

                            })
                        }
                         else {
                            data6.seminars.forEach(async function(data61){
                             
                                var prog='For program ' + data61.programname + ' programcode ' + data61.programcode;
                                if(data61.changepercent>19) {
                                    if(data61.yearofrevision.toString().indexOf('2017')>-1 || data61.yearofrevision.toString().indexOf('2018')>-1 || data61.yearofrevision.toString().indexOf('2019')>-1 || data61.yearofrevision.toString().indexOf('2020')>-1 || data61.yearofrevision.toString().indexOf('2021')>-1) {
                                        prog=prog + ' syllabus revision year ' + data61.yearofrevision + ' entry is valid.<br />'; 
                                        valid=valid+1;
                                    } else {
                                        prog=prog + ' syllabus revision year ' + data61.yearofrevision + ' entry is not valid.<br />';
                                        invalid=invalid+1;
                                    }               
                                } else {
                                    prog=prog + ' syllabus revision year ' + data61.yearofrevision + ' entry is not valid.<br />';
                                    invalid=invalid+1;
                                }
                                currentstatus=currentstatus + prog;
                               

                            })
                            //doccount=doccount + 'Programcode ' + data5.programcode + ' ' + ' Program ' +  data5.programname + ' - ' + data5.seminars.length + '<br />';
                        }
                        if(data6.seminars.length>1) {
                            if(valid>1) {
                                currentstatus=currentstatus + 'For this program we have ' + valid + ' valid entries and ' + invalid + ' invalid entries. Delete others and keep any one valid entry.<br />';
                            } else {
                                if(valid<1) {
                                    currentstatus=currentstatus + 'For this program we have no valid entries and ' + invalid + ' invalid entries. Please delete all and enter only one valid entry (minimum 20% syllabus revision in the assessment period).<br />';
                                } else {
                                    currentstatus=currentstatus + 'For this program we have ' + valid + ' valid entry and ' + invalid + ' invalid entries. Delete others and keep any one valid entry.<br />';
                                }
                            }
                        }
                        
                        //faculties=faculties + 1;
                        
                    })


                    currentstatus=currentstatus + 'Valid entries not found for following programs<br />' + nmatch;
                    currentstatus=currentstatus + 'End of report<br />';
    
    



       
        
        const lcat1=await Kpi.updateMany( {category: 'Syllabusrev', colid: colid1},{
            currentvalue: total,
            submitted: submitted,
            accepted: accepted,
            faculties:faculties,
            flagged: flagged,
            link: currentstatus,
            weightage: 20,
            score: score,
            gp: gp,
            comments: comments,
            status: status

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
                users: lcat1234,
                programs: programs,
                doccount:doccount
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getexplearningalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Explearning.aggregate([
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
        const lcat1234= await Explearning.aggregate([
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
        const lcat1=await Kpi.updateMany( {category: 'Explearning', colid: colid1},{
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

exports.getaddoncalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        const stud1=parseInt(req.query.stud1);
        var moucount=0;
        const lcat1233= await Addonc.aggregate([
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
        const lcat1234= await Addonc.aggregate([
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
       
        const dt1=new Date();
        var months= dt1.getMonth() + 1;
        var dt2=dt1.getDate() + '/' + months + '/' + dt1.getFullYear() + '-' + dt1.getHours() + ':' + dt1.getMinutes();

        var currentstatus='Report as on ' + dt2 + '<br /><br />';
        var currentstatus=currentstatus + 'Total entries ' + total + '<br />';
        var entries='';
        var programs=0;

        const lcat3= await Addonc.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    _id: {
                        status: '$coursetitle'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var suggested='';
        lcat3.forEach(async function(data){
            programs = programs + 1;
            if(data.total_attendance>1) {
                entries = entries + ' ' + data._id.status + ' : ' + data.total_attendance + ' ';
                //status='Urgent';
                var cc=data.total_attendance;
                
                for(var cci=0;cci<cc;cci++) {
                    var level=cci+1;
                    suggested=suggested + data._id.status + ' level ' + level + '<br />';
                }
            }
            
        })

        currentstatus=currentstatus + ' Entries repeating multiple times with same name ' + entries + '<br />';
        if(suggested.length>0) {
            currentstatus=currentstatus + 'Suggested entries for multiple entries with same course tile <br />' + suggested + '<br />';
        }


        const lcat5= await Addonc
        .aggregate([
            { $addFields: { 'userId': { $toString: '$_id' }}},
            {
                $lookup: {
                  from: 'supportingdocs', 
                  localField: 'userId', 
                  foreignField: 'field1', 
                  as: 'seminars'
                }
              }, 
            //   {
            //     $lookup: {
            //       from: 'accrcomments', 
            //       localField: 'userId', 
            //       foreignField: 'field1', 
            //       as: 'allcomments'
            //     }
            //   }, 
              {
                $match: {
                  'colid': parseInt(req.query.colid)
                }
              }
              ]);

              var doccount='';
              var emptydocs='';
            lcat5.forEach(async function(data5){
                //console.log(data.link);
                //moucount=data.total_attendance;
                //doccount=doccount + data5.programcode + '-' + data5.seminars.length + '   ';
                if(data5.seminars.length<1) {
                    emptydocs=emptydocs + 'Coursetitle ' + data5.coursetitle + '<br />';
                } else {
                    doccount=doccount + 'Coursetitle ' + data5.coursetitle +  ' - ' + data5.seminars.length + '<br />';
                }
                //faculties=faculties + 1;
                
            })


            

            currentstatus=currentstatus + '<br />';
            currentstatus=currentstatus + 'For every entry at least four documents (circular, brochure, report with attendance list, sample certificate copies) must be submitted.<br />';
            currentstatus=currentstatus + 'Documents submission status for following entries : <br />' + doccount + '<br />';
            currentstatus=currentstatus + 'Documents not submitted for following entries : <br />' + emptydocs + '<br />';

            const lcat6= await Addonc.aggregate([
                { 
                    $match: {colid: colid1 }
                },
                { 
                    $group: {
                        _id: {
                            status: '$year'
                        },
                        total_attendance: {$sum: 1}
                    }
                }
            ]);
            var yearlycount='';
            lcat6.forEach(async function(data6){
                
                if(data6.total_attendance<50) {
                    yearlycount= yearlycount + ' Less entries for year ' + data6._id.status + ' with no of entries ' + data6.total_attendance + '<br />';
                    //status='Urgent';
                    
                }
                
            })

            currentstatus=currentstatus + 'Inadequate entries for following year: <br />' + yearlycount;


        const lcat1=await Kpi.updateMany( {category: 'VACtotal', colid: colid1},{
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

exports.getemployabilityalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        const reqcourses=parseInt(req.query.courses);
        var moucount=0;
        var courses=0;
        var entries='';
        var status='Ok';
        const lcat1233= await Employability.aggregate([
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
        var newcourses=0;
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

        var currentstatus='Total entries ' + total;

        const lcat3= await Employability.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    _id: {
                        status: '$coursecode'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
       
        lcat3.forEach(async function(data){
            courses = courses + 1;
            if(data.total_attendance>1) {
                entries = entries + ' ' + data._id.status;
            }
        })

        if(courses > reqcourses) {
            currentstatus='Coursename related to employability to be entered only once. Please check data.';
            status='Urgent';
        } else {
            const diff=reqcourses - courses;
            currentstatus='Please add emloyability content for ' + diff + ' courses.';
            status='Urgent';
        }
        // if(entries.length>0) {
        //     currentstatus= currentstatus + ' Multiple entries for ' + entries;
        // }

        var comments='If employability content is not included in all courses, please get syllabus revised with the new content for all programs with BoS date within assessment period. Emergency BoS may also be conducted.';
        comments=comments + ' ' + entries;

        

        const lcat1= await Employability.find({ year: { $in: ['2017-18', '2018-19', '2019-20', '2020-21', '2021-22' ] } })
            .where('colid')
            .equals(colid1);


        lcat1.forEach(async function(data){
            newcourses = newcourses + 1;
           
        })

        var gp=0;
        
        var coursescore=0;
        var newscore=0;

        var pemployability=0;
        var pcourses=0;

        pemployability=(courses/reqcourses) * 100;
        pcourses=(newcourses/reqcourses) * 100;

        currentstatus=currentstatus + '. New courses ' + newcourses + ' percentage ' + pcourses + '. Target 25%. Employability target 100% status ' + pemployability;




        if(courses > reqcourses) {
            coursescore=0;
        } else {
            coursescore=Math.floor((pemployability/100)*4);
            if (coursescore > 4) {
                coursescore=4;
            }
        }

        if(newcourses > reqcourses) {
            newscore=0;
        } else {
            newscore=Math.floor((pcourses/25)*4);
            if (newscore > 4) {
                newscore=4;
            }
        }

        currentstatus=currentstatus + '. tentative score New courses ' + newscore +  ' Employability ' + coursescore;
        
        
        

        const lcat1234= await Employability.aggregate([
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
       
        //var currentstatus='Total ' + total;
        const lcat4=await Kpi.updateMany( {category: 'Employability', colid: colid1},{
            currentvalue: total,
            submitted: submitted,
            accepted: accepted,
            faculties:faculties,
            flagged: flagged,
            link: currentstatus,
            weightage: 10,
            status: status,
            comments: comments
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
                users: lcat1234,
                newcourses: newcourses
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.getkpibystatus= async (req,res) => {
    try{
    
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await Kpi.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        name: '$status'
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