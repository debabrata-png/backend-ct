const Pub=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pub1=require('./../Models/feedback');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getaddsss= async (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    var name="";
    if(user1) {
        const lcat1233= await Pub.find()
            .where('email')
            .equals(req.params.id);
        lcat1233.forEach(function(data){
            name=data.name;
        })
        res.status(200).render('viewsss', {
            title: 'Student Satisfaction Survey'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};



exports.getexportsss= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub1.find()
            .where('colid')
            .equals(colid)
            .where('type')
            .equals('sss')
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
        { header: 'Semester', key: 'semester', width: 30},
        { header: 'Question', key: 'question', width: 30},
        { header: 'Score', key: 'score', width: 30},
        { header: 'Feedback Date', key: 'feedbackdate', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=sss.xlsx");

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

exports.getsssanalysis= async (req,res) => {
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
                    $match: {colid: colid1, type: 'sss' }
                },
                { 
                    $group: {
                        _id:'$question', 
                        avg_score: {$avg: '$score'}
                    }
                }
            ]);
            //console.log(lcat1233);
            res.status(200).render('viewfrepfac', {
                categories: lcat1233,
                email: req.params.id,
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



exports.createfeedback= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        //const name=req.cookies['name'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const section=req.cookies['section'];
        const regno=req.cookies['regno'];
        const semester=req.cookies['semester'];
        const today = new Date();
        if(user1) {

            const pub1= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "How much of the syllabus was covered in the class",
                score: req.body.one,
                feedbackdate:today,
                user: user1
            });
            const pub2= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "How well did the teachers prepare for the classes",
                score: req.body.two,
                feedbackdate:today,
                user: user1
            });
            const pub3= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "How well were the teachers able to communicate",
                score: req.body.three,
                feedbackdate:today,
                user: user1
            });
            const pub4= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The teacher’s approach to teaching can best be described as",
                score: req.body.four,
                feedbackdate:today,
                user: user1
            });
            const pub5= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Fairness of the internal evaluation process by the teachers",
                score: req.body.five,
                feedbackdate:today,
                user: user1
            });
            const pub6= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Was your performance in assignment discussed with you",
                score: req.body.six,
                feedbackdate:today,
                user: user1
            });
            const pub7= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The institute takes active interest in promoting internship, student exchange, field visit for students",
                score: req.body.seven,
                feedbackdate:today,
                user: user1
            });
            const pub8= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The teaching and mentoring process in your institution facilitates you in cognitive, social and emotional growth",
                score: req.body.eight,
                feedbackdate:today,
                user: user1
            });
            const pub9= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The institution provides multiple opportunities to learn and grow",
                score: req.body.nine,
                feedbackdate:today,
                user: user1
            });
            const pub10= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Teachers inform you about your expected competencies, course outcomes and programme outcomes",
                score: req.body.ten,
                feedbackdate:today,
                user: user1
            });
            const pub11= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Your mentor does a necessary follow-up with an assigned task to you",
                score: req.body.eleven,
                feedbackdate:today,
                user: user1
            });
            const pub12= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The teachers illustrate the concepts through examples and applications",
                score: req.body.twelve,
                feedbackdate:today,
                user: user1
            });
            const pub13= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The teachers identify your strengths and encourage you with providing right level of challenges",
                score: req.body.thirteen,
                feedbackdate:today,
                user: user1
            });
            const pub14= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Teachers are able to identify your weaknesses and help you to overcome them",
                score: req.body.fourteen,
                feedbackdate:today,
                user: user1
            });
            const pub15= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The institution makes effort to engage students in the monitoring, review and continuous quality improvement of the teaching learning process",
                score: req.body.fifteen,
                feedbackdate:today,
                user: user1
            });
            const pub16= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The institute/ teachers use student centric methods, such as experiential learning, participative learning and problem solving methodologies for enhancing learning experiences",
                score: req.body.sixteen,
                feedbackdate:today,
                user: user1
            });
            const pub17= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Teachers encourage you to participate in extracurricular activities",
                score: req.body.seventeen,
                feedbackdate:today,
                user: user1
            });
            const pub18= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "Efforts are made by the institute/ teachers to inculcate soft skills, life skills and employability skills to make you ready for the world of work",
                score: req.body.eighteen,
                feedbackdate:today,
                user: user1
            });
            const pub19= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "What percentage of teachers use ICT tools such as LCD projector, Multimedia, etc. while teaching",
                score: req.body.nineteen,
                feedbackdate:today,
                user: user1
            });
            const pub20= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'sss',
                question: "The overall teaching learning process is very good",
                score: req.body.twenty,
                feedbackdate:today,
                user: user1
            });
            const pub21= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'ssstext',
                question: "First suggestion",
                option: 'Institution should ' + req.body.sug1,
                score:0,
                feedbackdate:today,
                user: user1
            });
            const pub22= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'ssstext',
                question: "First suggestion",
                option: 'Institution should ' + req.body.sug2,
                score:0,
                feedbackdate:today,
                user: user1
            });
            const pub23= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                section: section,
                type: 'ssstext',
                question: "First suggestion",
                option: 'Institution should ' + req.body.sug3,
                score:0,
                feedbackdate:today,
                user: user1
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
        res.redirect('/sss');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Feedback could not be added successfully. Error " + err );
        res.redirect('/addfacultyfeedback/' + req.params.id);
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

    res.redirect('/viewpub');


    }   
};
