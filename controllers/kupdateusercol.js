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


exports.updateadmission= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        const lcat1=await Admission.updateMany( {user: req.query.user},{
            colid: colid1
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

exports.updateteacherdata= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        const lcat1=await Teacherdata.updateMany( {user: req.query.user},{
            colid: colid1
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

exports.updatescholarship= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        const lcat1=await Scholarship.updateMany( {user: req.query.user},{
            colid: colid1
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