const Pub=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pub1=require('./../Models/feedback');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getaddfeedback= async (req,res) => {
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
        res.status(200).render('viewffeedbackstud', {
            title: 'Faculty Feedback',
            email: req.params.id,
            facultyname: name
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewfaculty= async (req,res) => {
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
                    $match: {colid: colid1, facultyemail: req.params.id }
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
           /*  const link123= await Link.find()
            .where('criteria')
            .equals('345')
            .where('colid')
            .equals(colid); */
            //res.status(200).send('Hello world for all the tours through db new router');
            
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

exports.getmyfeedback= async (req,res) => {
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
                    $match: {colid: colid1, facultyemail: user1 }
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
                email: user1,
                title: 'My feedback'
            });
           /*  const link123= await Link.find()
            .where('criteria')
            .equals('345')
            .where('colid')
            .equals(colid); */
            //res.status(200).send('Hello world for all the tours through db new router');
            
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

exports.getviewfacultyall= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const role=req.cookies['role'];
        if (role == 'Admin') {
            if(user1) {
                const lcat1233= await Pub.find()
                .where('colid')
                .equals(colid)
                .where('role')
                .equals('Faculty');
                res.status(200).render('viewfacultyall', {
                    categories: lcat1233,
                    title: 'All Faculties'
                
            });
            } else {
                req.flash("error", "You have been logged out. Please login to continue.");
                res.redirect('/login');
    
            }
        } else {
            res.redirect('/notauthorized');

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
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "Communication skill of the faculty",
                score: req.body.one,
                feedbackdate:today,
                user: user1
            });
            const pub2= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "Availability of the faculty",
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
                type: 'Faculty',
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                question: "Subject knowledge",
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
                type: 'Faculty',
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                question: "Preparedness of the faculty for class",
                score: req.body.four,
                feedbackdate:today,
                user: user1
            });
            const pub5= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The teaching sessions are always participative and interactive",
                score: req.body.five,
                feedbackdate:today,
                user: user1
            });
            const pub6= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The faculty always answers questions effectively in the class",
                score: req.body.six,
                feedbackdate:today,
                user: user1
            });
            const pub7= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The faculty assesses the learning of the students through quiz and exams",
                score: req.body.seven,
                feedbackdate:today,
                user: user1
            });
            const pub8= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The faculty encourages experiential learning",
                score: req.body.eight,
                feedbackdate:today,
                user: user1
            });
            const pub9= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The facukty uses ICT",
                score: req.body.nine,
                feedbackdate:today,
                user: user1
            });
            const pub10= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The faculty discusses topics outside syllabus but relevant for industry",
                score: req.body.ten,
                feedbackdate:today,
                user: user1
            });
            const pub11= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The faculty is punctual",
                score: req.body.eleven,
                feedbackdate:today,
                user: user1
            });
            const pub12= await Pub1.create({
                name: name,
                colid: colid,
                regno: regno,
                semester: semester,
                faculty: req.body.facultyname,
                facultyemail: req.body.email,
                section: section,
                type: 'Faculty',
                question: "The faculty covers all topics in the syllabus",
                score: req.body.twelve,
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
        res.redirect('/addfacultyfeedback/' + req.params.id);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Feedback could not be added successfully. Error " + err );
        res.redirect('/addfacultyfeedback/' + req.params.id);
    }   
};

// exports.geteditcat= async (req,res) => {
//     //res.cookie("user","Akshata");
  
//     try{
//         const user1=req.cookies['user'];
//         console.log(req.params.id);
//         const leditcat= await Lcat.findById(req.params.id);
//         //.where('_id')
//         //.equals(req.params.id);
//         //res.status(200).send('Hello world for all the tours through db new router');
//         res.status(200).render('editcategory', {
//             category: leditcat,
//             title: 'Edit Categories'
            
//         });
       
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

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

exports.deletefaculty= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewallfaculty');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewallfaculty');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// exports.getallpub2= async (req,res) => {
//     //res.cookie("user","Akshata");
  
//     try{
//         const lcat123= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//         res.status(200).render('viewcategory', {
//             categories: lcat123,
//             title: 'List Categories'
            
//         });
       
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };



// exports.getallcat= async (req,res) => {

//     try{
//         const lcat12= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//        res.status(201).json({
//            status:'Success',
//            data: {
//                lcat12
//            }
//        });
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }   
// };

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