const Pat=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');



exports.getviewstudents= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('role')
            .equals('Student');
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewstudents', {
                categories: lcat1233,
                title: 'List all students'
            
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


exports.postexportstudents= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('role')
            .equals('Student');
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Students'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'Email', key: 'email', width: 30},
		{ header: 'Semester', key: 'semester', width: 30},
        { header: 'Section', key: 'section', width: 30},
        { header: 'RegNo', key: 'regno', width: 30},
        { header: 'Programcode', key: 'programcode', width: 30},
        { header: 'Admissionyear', key: 'admissionyear', width: 30}

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");


    // Write to File
	// workbook.xlsx.writeFile(res)
    // .then(function() {
    //     console.log("file saved!");
    //     res.end();
    // });

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
            });
        });




        //     res.status(200).render('viewproject', {
        //         categories: lcat1233,
        //         title: 'List projects'
            
        // });
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



exports.geteditproject= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editproject', {
                pub: leditcat,
                title: 'Edit projects'
            
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



exports.createproject= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                department: department,
                project: req.body.project,
                agency: req.body.agency,
                yop: req.body.yop,
                funds: req.body.funds,
                type: req.body.type,
                duration: req.body.duration,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewproject');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addproject', {
        title: 'Project'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.updateproject= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            project: req.body.project,
            agency: req.body.agency,
            yop: req.body.yop,
            funds: req.body.funds,
            type: req.body.type,
            duration: req.body.duration
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewproject');
    } catch(err) {
        req.flash("error", "Project could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewproject');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteproject= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewproject');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewproject');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







