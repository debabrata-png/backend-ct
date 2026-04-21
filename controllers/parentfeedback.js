const Pub=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pub1=require('./../Models/parentfeedback');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getaddparentfeedback= async (req,res) => {
    //res.cookie("user","Akshata");
    //const user1=req.cookies['user'];
    var name="";
    res.status(200).render('addparentfeedback1', {
        title: 'Parent Feedback',
        colid: req.params.id
    });
    
    
};

exports.getexportparent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub1.find()
            .where('colid')
            .equals(colid)
            .where('feedbackdate')
            .gte(req.body.ldate)
            .where('feedbackdate')
            .lte(req.body.gdate);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Parent Feedback'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
        { header: 'Question', key: 'question', width: 30},
        { header: 'Score', key: 'score', width: 30},
        { header: 'Feedback Date', key: 'feedbackdate', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=parent.xlsx");

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

exports.getparentanalysis= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid1=parseInt(req.cookies['colid']);
        if(user1) {
            /* const lcat1233= await Pub1.aggregate()
            .match({colid: colid})
            .project({_id:0, question:1, score:1})
            .group({_id:'$question', avg_score: {$avg: '$score'}}); */
            const lcat1233= await Pub1.aggregate([
                { 
                    $match: {colid: colid1, type: { $regex: '.*' + 'parent' + '.*', $options: 'i' } }
                },
                { 
                    $group: {
                        _id:'$question', 
                        avg_score: {$avg: '$score'}
                    }
                }
            ]);
            //console.log(lcat1233);
            res.status(200).render('viewfparent', {
                categories: lcat1233,
                email: req.params.id,
                title: 'Feedback analysis'
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

exports.createparentfeedback= async (req,res) => {

    try{
        const user1=req.body.pemail;
        const colid=parseInt(req.params.id);
        const name=req.body.sname;
        const section=req.body.section;
        const regno=req.body.sregno;
        const semester=req.body.semester;
        const today = new Date();
        const pub1= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "This institution is suitable for your child’s education",
            score: req.body.one,
            feedbackdate:today
            
        });
        const pub2= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Facilities provided by the institution is helpful for your child",
            score: req.body.two,
            feedbackdate:today
        });
        const pub3= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Direct communication with the teaching staff is available in the institution",
            score: req.body.three,
            feedbackdate:today
        });
        const pub4= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Hostel facilities are satisfactory for your child",
            score: req.body.four,
            feedbackdate:today
        });
        const pub5= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Administrative staff in the institution is cooperative",
            score: req.body.five,
            feedbackdate:today
        });
        const pub6= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Institution provides upgradation of hard & soft skills for children",
            score: req.body.six,
            feedbackdate:today
        });
        const pub7= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Institution provides physical safety for your child",
            score: req.body.seven,
            feedbackdate:today
        });
        const pub8= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Institution provides a fair rate of transparency for evaluation system to children",
            score: req.body.eight,
            feedbackdate:today
        });
        const pub9= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Library Infrastructure is helpful for your child",
            score: req.body.nine,
            feedbackdate:today
        });
        const pub10= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            sregno: regno,
            semester: semester,
            section: section,
            type: 'Parent',
            pname: req.body.pname,
            pemail: req.body.pemail,
            pphone: req.body.pphone,
            sname: req.body.sname,
            program: req.body.program,
            academicyear: req.body.academicyear,
            question: "Institution provides a standard academic growth for child",
            score: req.body.ten,
            feedbackdate:today
        });
        
        //res.status(200).send('Hello world for all the tours through db new router');
    //    res.status(201).json({
    //        status:'Success',
    //        data: {
    //            Category: lcat1
    //        }
    //    });
       //req.flash("success", "Category has been added successfully");
       req.flash("success", "Feedback has been added successfully");
    //    res.status(200).render('addpub', {
    //     title: 'Add publication'
    // });
    res.redirect('/addparentfeedback/' + req.params.id);

       



       
    } catch(err) {
        req.flash("error", "Feedback could not be added successfully. Error " + err );
        res.redirect('/addparentfeedback/' + req.params.id);
    }   
};


exports.getviewparent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('colid')
            .equals(colid)
            .where('role')
            .equals('Faculty');
           /*  const link123= await Link.find()
            .where('criteria')
            .equals('345')
            .where('colid')
            .equals(colid); */
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewfacultystud', {
                categories: lcat1233,
                title: 'All Faculties'
            
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

exports.geteditpub= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editpub', {
                pub: leditcat,
                category: leditcat,
                title: 'Edit publications'
            
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

exports.getexportfacultyf= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub1.find()
            .where('colid')
            .equals(colid)
            .where('type')
            .equals('Faculty')
            .where('feedbackdate')
            .gte(req.body.ldate)
            .where('feedbackdate')
            .lte(req.body.gdate);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Faculty Feedback'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'Student Email', key: 'user', width: 30},
		{ header: 'Faculty', key: 'faculty', width: 30},
        { header: 'Faculty Email', key: 'facultyemail', width: 30},
        { header: 'Semester', key: 'semester', width: 30},
        { header: 'Question', key: 'question', width: 30},
        { header: 'Score', key: 'score', width: 30},
        { header: 'Feedback Date', key: 'feedbackdate', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=facultyfeedback.xlsx");

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






exports.updatepub= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            name: name,
            department: department,
            title: req.body.title,
            journal: req.body.journal,
            yop: req.body.yop,
            issn: req.body.issn,
            journallink: req.body.journallink,
            articlelink: req.body.articlelink,
            user: user1,
            ugclisted: req.body.ugclisted
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Publication has been updated successfully");
       res.redirect('/viewpub');
    } catch(err) {
        req.flash("error", "Publication could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewpub');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletepub= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Publication has been deleted successfully");
       res.redirect('/viewpub');
    } catch(err) {
        req.flash("error", "Publication could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewpub');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.getcat1= async (req,res) => {

    try{
        const lcat23= await Lcat.findById(req.body.id);
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               lcat23
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};