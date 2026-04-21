const Pat=require('./../Models/projects');
const Pat1=require('./../Models/patents');
const Pub=require('./../Models/publications');
const Book1=require('./../Models/book');
const Seminar=require('./../Models/seminar');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getexportproject= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.cookies['colid'];
        if(colid) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Projects'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'User', key: 'user', width: 30},
		{ header: 'Project', key: 'project', width: 30},
        { header: 'Agency', key: 'agency', width: 30},
        { header: 'Type', key: 'type', width: 30},
        { header: 'YoP', key: 'yop', width: 30},
        { header: 'Department', key: 'department', width: 30},
        { header: 'Funds', key: 'funds', width: 30},
        { header: 'Duration', key: 'duration', width: 30}

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=project.xlsx");

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
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

exports.getexportpatents= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.cookies['colid'];
        if(colid) {
            const lpat= await Pat1.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Patents'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'Title of Patent', key: 'title', width: 30},
		{ header: 'Patent Number', key: 'patentnumber', width: 30},
        { header: 'Year of Publishing', key: 'yop', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lpat);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=patent.xlsx");

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
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


exports.getexportpub= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.cookies['colid'];
        if(colid) {
            const lpub= await Pub.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Publications'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Title of Paper', key: 'title', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
		{ header: 'Department', key: 'department', width: 30},
		{ header: 'Journal', key: 'journal', width: 30},
        { header: 'Year of Publishing', key: 'yop', width: 30},
        { header: 'ISSN Number', key: 'issn', width: 30},
        { header: 'Journal Link', key: 'journallink', width: 30},
        { header: 'Article Link', key: 'articlelink', width: 30},
        { header: 'Is UGC Listed', key: 'ugclisted', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lpub);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=publications.xlsx");

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
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

exports.getexportbook= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.cookies['colid'];
        if(colid) {
            const lbook= await Book1.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Books'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
		{ header: 'Book Title', key: 'booktitle', width: 30},
		{ header: 'Paper Title', key: 'papertitle', width: 30},
        { header: 'Title of Proceeding', key: 'proceeding', width: 30},
        { header: 'Year of Publication', key: 'yop', width: 30},
        { header: 'ISSN / ISBN', key: 'issn', width: 30},
        { header: 'Affiliated to same institution', key: 'affiliated', width: 30},
        { header: 'Name of Publisher', key: 'publisher', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lbook);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=books.xlsx");

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
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

exports.getexportseminar= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const colid=req.cookies['colid'];
        if(colid) {
            const lbook= await Seminar.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Seminar'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
		{ header: 'Seminar Title', key: 'title', width: 30},
		{ header: 'Duration', key: 'duration', width: 30},
        { header: 'Membership', key: 'membership', width: 30},
        { header: 'Year of Publication', key: 'yop', width: 30},
        { header: 'Amount', key: 'amount', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lbook);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=seminar.xlsx");

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
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