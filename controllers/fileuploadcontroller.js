const Pat=require('./../Models/projects');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');
const multer=require('multer');
const aws=require('aws-sdk');
const multerS3=require('multer-s3');


aws.config.update({
    accessKey: 'AKIAUAC655EBDFT6YKIL',
    secretAccessKey: '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',
    region: 'US East (Ohio) us-east-2'
});

const s3=new aws.S3();




/* var storage = multer.diskStorage({   
    destination: (req, file, cb) => { 
       cb(null, 'public/img/users');    
    }, 
    filename: (req, file, cb) => { 
        //const user1=req.cookies['user'];
        const ext = file.mimetype.split('/')[1];
       cb(null ,  file.originalname);   
    }
 }); */

 const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
        req.flash("error", "Please upload image.");
      cb(err, false);
    }
  };

//   const upload=multer ({
//     storage: multerS3({
//         S3: s3,
//         bucket: 'campustech1',
//         acl:'public-read',
//         metadata(req, file, cb) {
//             cb(null, {fieldName: file.fieldName});
//         },
//         key(req, file, cb) {
//             cb(null, file.originalname);
//         },
//         rename(fieldName, fileName) {
//             return fileName.replace(/\W+/g,'-');
//         }
//     })
// });

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'campustech1',
        key: function (req, file, cb) {
            //console.log("file" + file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

// const upload=multer ({
//     dest: 'public/img/users'
// });
/* const upload=multer ({
    storage: storage,
    fileFilter: multerFilter
}); */
/* const upload=multer ({
    storage: storage
}); */

//exports.uploaduserphoto= upload.single('photo');
exports.uploaduserphoto= upload.any();

exports.upload1=upload.array('upl',1);


exports.getuploadphoto= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('uploadphoto', {
            title: 'File upload'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewproject= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('316')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewproject', {
                categories: lcat1233,
                link: link123,
                title: 'List projects'
            
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


exports.getexportproject= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Customers'); //creating worksheet
	
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


exports.postfileupload= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log(req.file);
        //console.log(req.file.location);
        //console.log(req.file.key);
        //console.log(req.body);
        //console.log('Updating');
        /* const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            project: req.body.project,
            agency: req.body.agency,
            yop: req.body.yop,
            funds: req.body.funds,
            type: req.body.type,
            duration: req.body.duration
        }); */
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/uploadphoto');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/uploadphoto');
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







