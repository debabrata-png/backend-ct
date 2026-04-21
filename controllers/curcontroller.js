const Pub=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pub1=require('./../Models/feedback');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getcurriculum= async (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    var name="";
    var date1=new Date();
    if(user1) {
        res.status(200).render('curriculum', {
            title: 'Curriculum Feedback',
            time1: date1,
            type1: req.params.id,
            type2: req.params.id2
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};



exports.getexportcurriculum= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub1.find({ type: { $regex: '.*' + 'curriculum' + '.*', $options: 'i' }})
            .where('colid')
            .equals(colid)
            .where('feedbackdate')
            .gte(req.body.ldate)
            .where('feedbackdate')
            .lte(req.body.gdate);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Curriculum Feedback'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
        { header: 'Coursecode', key: 'coursecode', width: 30},
        { header: 'Type', key: 'type', width: 30},
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'Email', key: 'user', width: 30},
        { header: 'Question', key: 'question', width: 30},
        { header: 'Score', key: 'score', width: 30},
        { header: 'Feedback Date', key: 'feedbackdate', width: 30}
	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=curriculum.xlsx");

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

exports.getcuranalysis= async (req,res) => {
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
                    $match: {colid: colid1, type: { $regex: '.*' + 'curriculum' + '.*', $options: 'i' } }
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
        const colid2=parseInt(req.body.colid);
        const colid1=parseInt(req.cookies['colid']);
        var colid=1;
        if(colid2==25) {
            if(colid1) {
                colid=colid1;
            } else {
                req.flash("error", "You have been logged out. Please login to continue.");
                res.redirect('/login');        
            }
        } else {
            colid=colid2;
        }

        const today = new Date();
            const pub1= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "Syllabus is need based and suitable to the course",
                score: req.body.one,
                feedbackdate:today,
                user: req.body.email
            });
            const pub2= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum has well defined objectives",
                score: req.body.two,
                feedbackdate:today,
                user: req.body.email
            });
            const pub3= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum has components to address requirements of job",
                score: req.body.three,
                feedbackdate:today,
                user: req.body.email
            });
            const pub4= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum gives exposure to latest developments in the field",
                score: req.body.four,
                feedbackdate:today,
                user: req.body.email
            });
            const pub5= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum contains adequate course content and reference material",
                score: req.body.five,
                feedbackdate:today,
                user: req.body.email
            });
            const pub6= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "Reference books are available in the library",
                score: req.body.six,
                feedbackdate:today,
                user: req.body.email
            });
            const pub7= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum contains adequate balance between theory and practicals",
                score: req.body.seven,
                feedbackdate:today,
                user: req.body.email
            });
            const pub8= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum provides experiential learning through student seminar, group discussion, projects, field visits",
                score: req.body.eight,
                feedbackdate:today,
                user: req.body.email
            });
            const pub9= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum contains sufficient elective papers",
                score: req.body.nine,
                feedbackdate:today,
                user: req.body.email
            });
            const pub10= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum provides options for continuous assessment through quiz and exams",
                score: req.body.ten,
                feedbackdate:today,
                user: req.body.email
            });
            const pub11= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The time provided to complete the curriculum is adequate",
                score: req.body.eleven,
                feedbackdate:today,
                user: req.body.email
            });
            const pub12= await Pub1.create({
                name: req.body.name,
                colid: colid,
                regno: req.body.regno,
                type: req.body.type,
                coursecode: req.body.coursecode,
                section:'NA',
                semester: 'NA',
                question: "The curriculum facilitates adequate self learning",
                score: req.body.twelve,
                feedbackdate:today,
                user: req.body.email
            });

           req.flash("success", "Feedback has been added successfully");

           res.redirect('/curriculum/' + req.params.id + '/' + req.params.id2);

       



       
    } catch(err) {
        req.flash("error", "Feedback could not be added successfully. Error " + err );
        res.redirect('/curriculum/' + req.params.id + '/' + req.params.id2);
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
