const Pub=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pub1=require('./../Models/curriculumstphilos');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getaddcurriculumstphilos= async (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    var name="";
    res.status(200).render('addcurriculumstphilos', {
        title: 'Department Feedback',
        colid: req.params.id
    });
    
    
};

exports.createcurriculumstphilos= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const today = new Date();
        const pub1= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "Syllabus is need based and suitable to the course.",
            score: req.body.one,
            feedbackdate:today
            
        });
        const pub2= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum has well defined objectives.",
            score: req.body.two,
            feedbackdate:today
        });
        const pub3= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum has components to address requirements of job.",
            score: req.body.three,
            feedbackdate:today
        });
        const pub4= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum gives exposure to latest developments in the field.",
            score: req.body.four,
            feedbackdate:today
        });
        const pub5= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum contains adequate course content and reference material.",
            score: req.body.five,
            feedbackdate:today
        });
        const pub6= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "Reference books are available in the library.",
            score: req.body.six,
            feedbackdate:today
        });
        const pub7= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum contains adequate balance between theory and practicals.",
            score: req.body.seven,
            feedbackdate:today
        });
        const pub8= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Departmnet',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum provides experiential learning through student seminar, group discussion, projects, field visits.",
            score: req.body.eight,
            feedbackdate:today
        });
        const pub9= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Department',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum contains sufficient elective papers.",
            score: req.body.nine,
            feedbackdate:today
        });
        const pub10= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Department',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum provides options for continuous assessment through quiz and exams.",
            score: req.body.ten,
            feedbackdate:today
        });

        const pub11= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Department',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The time provided to complete the curriculum is adequate.",
            score: req.body.eleven,
            feedbackdate:today
        });

        const pub12= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Department',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            sem: req.body.sem,
            year: req.body.year,
            degree: req.body.degree,
            program: req.body.program,
            course: req.body.course,
            question: "The curriculum facilitates adequate self learning.",
            score: req.body.twelve,
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
       req.flash("success", "Feedback has been added successfully for user " + req.cookies['user']);
    //    res.status(200).render('addpub', {
    //     title: 'Add publication'
    // });
    res.redirect('/addcurriculumstphilos/' + req.params.id);

          
    } catch(err) {
        req.flash("error", "Feedback could not be added successfully. Error " + err );
        res.redirect('/addcurriculumstphilos/' + req.params.id);
    }   
};

exports.getexportcurriculumstphilos= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const role=req.cookies['role'];
        if (role == 'Admin') {
        } else {
            res.redirect('/notauthorized');
        }
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
	let worksheet = workbook.addWorksheet('Feedback Data'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Student Name', key: 'fsname', width: 30},
		{ header: 'Email', key: 'email', width: 30 },
		{ header: 'Registration No.', key: 'regno', width: 30},
        { header: 'Department', key: 'department', width: 30},
        { header: 'Year-Semester-Section', key: 'sem', width: 30},
        { header: 'Year', key: 'year', width: 30},
        { header: 'Degree', key: 'degree', width: 30},
        { header: 'Program name', key: 'program', width: 30},
        { header: 'Course name', key: 'course', width: 30},
        { header: 'Question', key: 'question', width: 30},
        { header: 'Score', key: 'score', width: 30},
        { header: 'Feedback Date', key: 'feedbackdate', width: 30}
        
		
,       

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=feedbackdata.xlsx");


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



