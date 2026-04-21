const Pat=require('./../Models/exam');
const Pub=require('./../Models/finalanswer');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getviewexam= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            res.status(200).render('viewexam', {
                categories: lcat1233,
                //link:link123,
                title: 'List exam'
            
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

exports.getexportfinalscore= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const examid=req.cookies['examid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('colid')
            .equals(colid)
            .where('examid')
            .equals(req.query.examid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Final Score'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'User', key: 'user', width: 30},
        { header: 'Student Reg No.', key: 'regno', width: 30},
		{ header: 'Course Code', key: 'coursecode', width: 30 },
        { header: 'Program code', key: 'programcode', width: 30},
		{ header: 'Exam Code', key: 'examid', width: 30},
		{ header: 'Question  ID', key: 'questionid', width: 30},
        { header: 'Question', key: 'question', width: 30},
        { header: 'Question Group', key: 'questiongroup', width: 30},
        { header: 'Type', key: 'type', width: 30},
        { header: 'CO', key: 'co', width: 30},
		{ header: 'PO', key: 'po', width: 30},
        { header: 'Full Marks', key: 'fullmarks', width: 30},
        { header: 'Score', key: 'score', width: 30},
,       { header: 'P-score', key: 'pscore', width: 30}


	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=finalscore.xlsx");


    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                console.log('---------- error downloading file: ' + err);
            });
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