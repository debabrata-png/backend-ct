const Pub=require('./../Models/phdguide');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');
const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");


exports.getaddphdguide= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addphdguide', {
            title: 'All guides'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewphdguide= async (req,res) => {
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
            .equals('Research Guide')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewphdguide', {
                categories: lcat1233,
                link: link123,
                title: 'List of guides'
            
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

const multerStorage=multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now().toString() + '-' + file.originalname);
      }
});

// exports.upload = multer({
//   storage: multerStorage
// });

var upload = multer({
    storage: multerStorage
  }).single('upl');

exports.uploadAvatar = function(req, res) {
    
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file." + err.toString());
        }
        //console.log(req.file);
        //console.log(req.params.id);
        const user1=req.cookies['user'];
        const name=req.cookies['name'];
        const colid=req.cookies['colid'];
        //console.log(req.files);
        if(user1) {

            try {
                let path1="public/img/users/" + req.file.filename;
                //console.log(path1);
                readXlsxFile(path1).then((rows) => {
                    // skip header
                    rows.shift();
          
                    let tutorials = [];
          
                    rows.forEach((row) => {
                //   let tutorial = {
                //     examid: req.params.id,
                //     question: row[1],
                //     option: row[2],
                //     fullmarks: row[3],
                //     link: row[4],
                //     type: row[5],
                //     questiongroup: row[6],
                //     status: row[7],
                //     difficulty: row[8],
                //     user: user1,
                //     colid: colid
                //   };
                  //console.log(tutorial);

                        const pat1= Pub.create({
                        colid: colid,
                        department: row[0],
                        scholar: row[1],
                        researchguide: row[2],
                        title: row[3],
                        yor: row[4],
                        yop: row[5],
                        yog: row[6],
                        status1: row[7],
                        comments: row[8],
                        user: user1,
                        name: name
                        });
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/viewphdguide');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/viewphdguide');

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.getaddbulkphdguide= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    console.log(user1);
    if(user1) {
        res.status(200).render('addbulkphdguide', {
            title: 'Add guides'
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};

exports.getexportphdguide= async (req,res) => {
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
	let worksheet = workbook.addWorksheet('Research guides'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'User', key: 'user', width: 30},
        { header: 'Department', key: 'department', width: 30},
        { header: 'Scholar', key: 'scholar', width: 30},
        { header: 'Research guide', key: 'researchguide', width: 30},
        { header: 'Theisis title', key: 'title', width: 30},
        { header: 'Year of registration', key: 'yor', width: 30},
        { header: 'Year of degree awarded', key: 'yop', width: 30},
        { header: 'Year of recognition as research guide', key: 'yog', width: 30 },
        { header: 'Status', key: 'status1', width: 30},
,       { header: 'Comments', key: 'comments', width: 30}

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=phdguide.xlsx");


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

exports.getviewphdguideadmin= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('colid')
            .equals(colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Value Added Courses')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewphdguideadmin', {
                categories: lcat1233,
                link: link123,
                title: 'List of guides'
            
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

exports.geteditphdguide= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editphdguide', {
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



exports.createphdguide= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        if(user1) {
            const pub1= await Pub.create({
                name: name,
                colid: colid,
                user: user1,
                department: req.body.department,
                researchguide: req.body.researchguide,
                yog: req.body.yog,
                scholar: req.body.scholar,
                title: req.body.title,
                yor: req.body.yor,
                yop: req.body.yop,
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
        res.redirect('/viewphdguide');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addphdguide', {
        title: 'All guides'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.updatephdguide= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        console.log('Updating');
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            name: name,
            colid: colid,
            user: user1,
            department: req.body.department,
            researchguide: req.body.researchguide,
            yog: req.body.yog,
            scholar: req.body.scholar,
            title: req.body.title,
            yor: req.body.yor,
            yop: req.body.yop,
            status1: req.body.status1,
            comments: req.body.comments
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewphdguide');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewphdguide');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletephdguide= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewphdguide');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewphdguide');
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

// exports.getcat1= async (req,res) => {

//     try{
//         const lcat23= await Lcat.findById(req.body.id);
//         //res.status(200).send('Hello world for all the tours through db new router');
//        res.status(201).json({
//            status:'Success',
//            data: {
//                lcat23
//            }
//        });
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }   
// };