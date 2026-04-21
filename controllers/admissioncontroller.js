const Pub=require('./../Models/admission');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');

exports.getaddadmission= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addadmission', {
            title: 'All enrollment for admission'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewadmission= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('Student Enrollment for Admission')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewadmission', {
                categories: lcat1233,
                link: link123,
                title: 'List enrollment'
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

exports.getexportadmission= async (req,res) => {
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
            const lcat1233= await Pub.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Awards'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'User', key: 'user', width: 30},
        { header: 'Department', key: 'department', width: 30},
		{ header: 'Academic Year', key: 'year', width: 30 },
		{ header: 'Program Name', key: 'programname', width: 30},
		{ header: 'Program Code', key: 'programcode', width: 30},
        { header: 'No.of seat sactioned', key: 'sancseat', width: 30},
        { header: 'No.of eligible applications', key: 'studapply', width: 30},
        { header: 'No.of students admitted', key: 'studadmt', width: 30},
        { header: 'Status', key: 'status1', width: 30},
,       { header: 'Comments', key: 'comments', width: 30}

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=admission.xlsx");


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

// exports.getviewadmission= async (req,res) => {
//     //res.cookie("user","Akshata");
  
//     try{
//         const user1=req.cookies['user'];
//         const colid=req.cookies['colid'];
//             if(user1) {

//                 const role=req.cookies['role'];
            
//             if (role == 'Admin') {
//                 const lcat1233= await Pub.find()
//                 .where('colid')
//                 .equals(colid);
//                 const link123= await Link.find()
//                 .where('criteria')
//                 .equals('Student Enrollment for Admission')
//                 .where('colid')
//                 .equals(colid);
//                 //res.status(200).send('Hello world for all the tours through db new router');
//                 res.status(200).render('viewadmission', {
//                     categories: lcat1233,
//                     link: link123,
//                     title: 'List enrollment'
                
//             });
             
                
//         } else {

//             const lcat1233= await Pub.find()
//             .where('user')
//             .equals(user1);
//             const link123= await Link.find()
//             .where('criteria')
//             .equals('Student Enrollment for Admission')
//             .where('colid')
//             .equals(colid);
//             //res.status(200).send('Hello world for all the tours through db new router');
//             res.status(200).render('viewadmission', {
//                 categories: lcat1233,
//                 link: link123,
//                 title: 'List enrollment'
            
//         });
//     }
//         } else {
//             req.flash("error", "You have been logged out. Please login to continue.");
//             res.redirect('/login');

//         }               
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

exports.geteditadmission= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editadmission', {
                pub: leditcat,
                category: leditcat,
                title: 'Edit'
            
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



exports.createadmission= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        if(user1) {
            const pub1= await Pub.create({
                name: name,
                colid: colid,
                department: department,
                user: user1,
                year: req.body.year,
                programname: req.body.programname,
                programcode: req.body.programcode,
                sancseat: req.body.sancseat,
                studapply: req.body.studapply,
                studadmt: req.body.studadmt,
                status1: req.body.status1,
                comments: req.body.comments
                
            });
            //res.status(200).send('Hello world for all the tours through db new router');
        //    res.status(201).json({
        //        status:'Success',
        //        data: {
        //            Category: lcat1
        //        }
        //    });
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewadmission');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addadmission', {
        title: 'Add enrollment'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

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

exports.updateadmission= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        console.log('Updating');
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            
                name: name,
                colid: colid,
                department: department,
                user: user1,
                year: req.body.year,
                programname: req.body.programname,
                programcode: req.body.programcode,
                sancseat: req.body.sancseat,
                studapply: req.body.studapply,
                studadmt: req.body.studadmt,
                status1: req.body.status1,
                comments: req.body.comments
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewadmission');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewadmission');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteadmission= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewadmission');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewadmission');
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