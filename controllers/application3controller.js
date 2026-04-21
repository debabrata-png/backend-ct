const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
// const Pat=require('./../Models/application');
const Pat2=require('./../Models/application3');
const User=require('./../Models/user');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');
// const Fees=require('./../Models/fees');
// const Scholarships=require('./../Models/scholarships');


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

exports.uploadAvatar =  function(req, res) {
    
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

                        

                        try {

                            const pat1=  Pat.create({
                                regno: row[0],
                                student: row[1],
                                colid: colid,
                                academicyear: row[2],
                                semester: row[3],
                                feegroup: row[4],
                                feeitem: row[5],
                                amount: row[6],
                                classdate: new Date(row[7]),
                                feecategory: row[8],
                                installment: row[9],
                                comments: row[10], 
                                paymode: row[11], 
                                paydetails: row[12], 
                                status: row[13],
                                type: row[14],
                                user: user1,
                                name: name
                                });
                            

                        } catch(err) {
                            //console.log(err);
                        }
                

                        
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/addstudentledger');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/addstudentledger');

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.deletestudentledger= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewstudentledger');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewstudentledger');
    }   
};

exports.getaddsingleledger= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addsingleledger', {
            title: 'Add student ledger',
            feecategory: req.query.feecategory,
            feegroup:req.query.feegroup
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};

exports.getfeesreceipt= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    var dt1=new Date(req.query.classdate);
    var m1=dt1.getMonth() + 1;
    var dt2=dt1.getDate() + '/' + m1 + '/' + dt1.getFullYear();
    //console.log(user1);
    var amount=Number(req.query.amount) * (-1);
    if(user1) {
        res.status(200).render('feesreceipt', {
            title: 'Add student ledger',
            feecategory: req.query.feecategory,
            feegroup:req.query.feegroup,
            amount:amount,
            comments:req.query.comments,
            classdate:dt2,
            student:req.query.student,
            regno:req.query.regno,
            paymode:req.query.paymode,
            paydetails:req.query.paydetails,
            type:req.query.type,

        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};



exports.getviewstudentledger= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const colid1=req.cookies['colid'];
        const fregno=req.cookies['fregno'];
        if(user1) {
            const lcat1234= await Pat.aggregate([
                { 
                    $match: {regno: fregno }
                },
                { 
                    $group: {
                        _id:['$regno','$student'], 
                        total_attendance: {$sum: '$amount'}
                    }
                }
            ]);
            //console.log(lcat1234);
            const lcat1235= await Pat.aggregate([
                { 
                    $match: {regno: fregno, status: 'Approved' }
                },
                { 
                    $group: {
                        _id:'$regno', 
                        total_attendance: {$sum: '$amount'}
                    }
                }
            ]);
            //console.log(lcat1235);
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('regno')
            .equals(fregno);
            const lcat123= await User.find()
            .where('colid')
            .equals(colid)
            .where('regno')
            .equals(fregno);
             
            res.status(200).render('viewstudentledger', {
                categories: lcat1233,
                users: lcat123,
                balance: lcat1234,
                payable: lcat1235,
                title: 'View student ledger',
                fregno: fregno
            
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

exports.getprintstudentledger= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const colid1=req.cookies['colid'];
        const fregno=req.cookies['fregno'];
        if(user1) {
            const lcat1234= await Pat.aggregate([
                { 
                    $match: {regno: fregno }
                },
                { 
                    $group: {
                        _id:['$regno','$student'], 
                        total_attendance: {$sum: '$amount'}
                    }
                }
            ]);
            //console.log(lcat1234);
            const lcat1235= await Pat.aggregate([
                { 
                    $match: {regno: fregno, status: 'Approved' }
                },
                { 
                    $group: {
                        _id:'$regno', 
                        total_attendance: {$sum: '$amount'}
                    }
                }
            ]);
            //console.log(lcat1235);
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('regno')
            .equals(fregno);
            const lcat123= await User.find()
            .where('colid')
            .equals(colid)
            .where('regno')
            .equals(fregno);
             
            res.status(200).render('printstudentledger', {
                categories: lcat1233,
                users: lcat123,
                balance: lcat1234,
                payable: lcat1235,
                title: 'View student ledger',
                fregno: fregno
            
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

exports.applyfees= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const name=req.cookies['name'];
        const colid=req.cookies['colid'];
        const fregno=req.cookies['fregno'];

        var feegroup;
        var amount;
        var student;
        var semester;
        var feeitem;
        var classdate;
        var academicyear;
      
        if(user1) {
            //const lcat1233= await Pat.findById(req.params.id);
            const lcat1233= await Fees.find()
            .where('colid')
            .equals(colid)
            .where('feecategory')
            .equals(req.body.feecategory);
            //console.log(lcat1233);
            

            // const lcat1233= await Fees.aggregate([
            //     { 
            //         $match: {colid: colid, feecategory: req.body.feecategory }
            //     },
            //     { 
            //         $group: {
            //             _id:['$feegroup'], 
            //             total_amount: {$sum: '$amount'}
            //         }
            //     }
            // ]);
            //console.log(lcat1233);
            lcat1233.forEach(function(data){
                //console.log(data.link);
                feegroup=data.feegroup;
                amount=data.amount;
                student=req.body.student;
                feeitem=data.feeeitem;
                classdate=data.classdate;
                academicyear=data.academicyear;
                semester=data.semester;
                const pat1= Pat.create({
                    regno: fregno,
                    student: student,
                    colid: colid,
                    academicyear: academicyear,
                    semester: semester,
                    feegroup: feegroup,
                    feeitem: feeitem,
                    amount: amount,
                    classdate: new Date(classdate),
                    feecategory: req.body.feecategory,
                    installment: 'NA',
                    comments: 'NA', 
                    paymode: 'NA', 
                    paydetails: 'NA', 
                    status: 'Approved',
                    type: 'Fees',
                    user: user1,
                    name: name
                    });
               

            })
            req.flash("success", "Apply fees is in progress. please check in after some time.");
            res.redirect('/viewstudentledger');
            
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

exports.applyscholarship= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const name=req.cookies['name'];
        const colid=req.cookies['colid'];
        const fregno=req.cookies['fregno'];

        var feegroup;
        var amount;
        var student;
        var semester;
        var feeitem;
        var classdate;
        var academicyear;
      
        if(user1) {
            //const lcat1233= await Pat.findById(req.params.id);
            const lcat1233= await Scholarships.find()
            .where('colid')
            .equals(colid)
            .where('feecategory')
            .equals(req.body.feecategory);
            //console.log(lcat1233);
            

            // const lcat1233= await Fees.aggregate([
            //     { 
            //         $match: {colid: colid, feecategory: req.body.feecategory }
            //     },
            //     { 
            //         $group: {
            //             _id:['$feegroup'], 
            //             total_amount: {$sum: '$amount'}
            //         }
            //     }
            // ]);
            //console.log(lcat1233);
            lcat1233.forEach(function(data){
                //console.log(data.link);
                feegroup=data.feegroup;
                amount=data.amount;
                student=req.body.student;
                feeitem=data.feeeitem;
                classdate=data.classdate;
                academicyear=data.academicyear;
                semester=data.semester;
                const pat1= Pat.create({
                    regno: fregno,
                    student: student,
                    colid: colid,
                    academicyear: academicyear,
                    semester: semester,
                    feegroup: feegroup,
                    feeitem: feeitem,
                    amount: amount,
                    classdate: new Date(classdate),
                    feecategory: req.body.feecategory,
                    installment: 'NA',
                    comments: 'NA', 
                    paymode: 'NA', 
                    paydetails: 'NA', 
                    status: 'Approved',
                    type: 'Scholarship',
                    user: user1,
                    name: name
                    });
               

            })
            req.flash("success", "Apply fees is in progress. please check in after some time.");
            res.redirect('/viewstudentledger');
            
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




exports.updateenrollment= async (req,res) => {

    try{
        
        //console.log('Updating');
        const startdate=new Date(req.body.ldate + ' ' + req.body.ltime);
        const enddate=new Date(req.body.gdate + ' ' + req.body.gtime);
        const lcat1= await Pat.updateMany( { examcode: req.body.examcode},{
            startdate: startdate,
            enddate: enddate
        });
        req.flash("success", "Data has been updated successfully" );
        res.redirect('/viewenrollexam/'+ req.body.examcode);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/viewenrollexam/'+ req.body.examcode);

    }   
};

exports.updateproctor= async (req,res) => {

    try{
        
        //console.log('Updating');
        const startdate=new Date(req.body.ldate + ' ' + req.body.ltime);
        const enddate=new Date(req.body.gdate + ' ' + req.body.gtime);
        const lcat1= await Pat.updateMany( { examcode: req.body.examcode},{
            proctoremail: req.body.proctoremail
        });
        req.flash("success", "Data has been updated successfully" );
        res.redirect('/viewenrollexam/'+ req.body.examcode);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/viewenrollexam/'+ req.body.examcode);

    }   
};

exports.updatestudentledger= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
       
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            classdate: new Date(req.body.classdate),
            feegroup:req.body.feegroup,
            feeitem:req.body.feeitem,
            amount:req.body.amount,
            academicyear:req.body.academicyear,
            feecategory:req.body.feecategory,
            semester:req.body.semester,
            paymode:req.body.paymode,
            paydetails:req.body.paydetails,
            comments:req.body.comments,
            status:req.body.status
        });
        req.flash("success", "Data has been updated successfully" );
        res.redirect('/viewstudentledger');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/viewstudentledger');

    }   
};

exports.postselectstudentbyregno= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        res.cookie("fregno",req.body.regno);
       
       
        req.flash("success", "Data has been updated successfully" );
        res.redirect('/viewstudentledger');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/viewstudentledger');

    }   
};

exports.geteditstudentledger= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
            res.status(200).render('editstudentledger', {
                pub: leditcat,
                title: 'Edit student ledger'
            
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

exports.getselectstudenybyregno= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        if(user1) {
            //const leditcat= await Pat.findById(req.params.id);
            res.status(200).render('selectstudentbyregno', {
                title: 'Student ledger'
            
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

exports.getapplyfees= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        if(user1) {
            //const leditcat= await Pat.findById(req.params.id);
            res.status(200).render('applyfees', {
                title: 'Apply fees'
            
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

exports.getapplyscholarship= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        if(user1) {
            //const leditcat= await Pat.findById(req.params.id);
            res.status(200).render('applyscholarship', {
                title: 'Apply fees'
            
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



exports.deleteallstudentledger= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const fregno=req.cookies['fregno'];
        //await Pat.findByIdAndDelete(req.body.category_id);
        await Pat.deleteMany({ colid: colid, regno: fregno });
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewstudentledger');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewstudentledger');
    }   
};

exports.deleteallledgerentry= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const fregno=req.cookies['fregno'];
        //await Pat.findByIdAndDelete(req.body.category_id);
        await Pat.deleteMany({ colid: colid });
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/selectstudentbyregno');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/selectstudentbyregno');
    }   
};

exports.getaddapplicationform3= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    res.status(200).render('application3', {
        title: 'Application form',
        colid: req.query.colid,
        source: req.query.source,
        programcode: req.query.programcode
    });
      
};

exports.createapplicationform3= async (req,res) => {

    try{
        
        const colid=parseInt(req.body.colid);
        const source=req.body.source;

        const pat2= await Pat2.create({
            source: source,
            colid: colid,
            status: 'Applied',
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            address:req.body.address,
            previousregno:req.body.previousregno,
            phone:req.body.phone,
            programcode:req.body.programcode,
            admissionyear:'2021-22',
            parent:req.body.parent,
            occupation:req.body.occupation,
            parentphone:req.body.parentphone,
            guardian:req.body.guardian,
            guardianphone:req.body.guardianphone,
            annualincome:req.body.annualincome,
            marrital:req.body.marrital,
            hostelrequired:req.body.hostelrequired,
            transportation:req.body.transportation,
            religion:req.body.religion,
            category:req.body.category,
            caste:req.body.caste,
            dateofbirth:new Date(req.body.dateofbirth),
            reservedcategory:req.body.reservedcategory,
            language1:req.body.language1,
            language2:req.body.language2,
            twelfthexam:req.body.twelfthexam,
            twelfthboard:req.body.twelfthboard,
            twelfthpercentagemarks:req.body.twelfthpercentagemarks,
            twelfthschool:req.body.twelfthschool,
            twelfthattempts:req.body.twelfthattempts,
            twelfthyop:req.body.twelfthyop,
            twelfthsubject1:req.body.twelfthsubject1,
            twelfthsub1marks:req.body.twelfthsub1marks,
            twelfthsubject2:req.body.twelfthsubject2,
            twelfthsub2marks:req.body.twelfthsub2marks,
            twelfthsubject3:req.body.twelfthsubject3,
            twelfthsub3marks:req.body.twelfthsub3marks,
            twelfthsubject4:req.body.twelfthsubject4,
            twelfthsub4marks:req.body.twelfthsub4marks,
            twelfthsubject5:req.body.twelfthsubject5,
            twelfthsub5marks:req.body.twelfthsub5marks,
            twelfthsubject6:req.body.twelfthsubject6,
            twelfthsub6marks:req.body.twelfthsub6marks,
            bloodgroup:req.body.bloodgroup,
            capid:req.body.capid,
            refno:req.body.refno,
            aadhar:req.body.aadhar,
            applicationdate: new Date(),
            checkbox:'agreed'

        });
     
       //req.flash("success", "Category has been added successfully");
       req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
       res.redirect('/application3?colid=' + req.body.colid + '&source=' + req.body.source + '&programcode=' + req.body.programcode);
       
          
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/application3?colid=' + req.body.colid + '&source=' + req.body.source + '&programcode=' + req.body.programcode);
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('application1', {
    //     title: 'Application form'
    // });
    }   
};

exports.getexportapplication3= async (req,res) => {
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
            const lcat1233= await Pat2.find()
            .where('colid')
            .equals(colid)
            .where('applicationdate')
            .gte(req.body.ldate)
            .where('applicationdate')
            .lte(req.body.gdate);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Application Form Data'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
        { header: 'Date', key: 'applicationdate', width: 10 },
        { header: 'Name of Applicant', key: 'name', width: 30},
		{ header: 'Email', key: 'email', width: 30 },
		{ header: 'Phone', key: 'phone', width: 30},
		{ header: 'Password', key: 'password', width: 30},
        { header: 'Date of birth', key: 'dateofbirth', width: 30},
        { header: 'Marital status', key: 'marrital', width: 30},
        { header: 'Bloodgroup', key: 'bloodgroup', width: 30 },
        { header: 'Address', key: 'address', width: 30},
        { header: 'Parent name', key: 'parent', width: 30},
        { header: 'Parent occupation', key: 'occupation', width: 30},
		{ header: 'Parent phone', key: 'parentphone', width: 30},
        { header: 'Parent annual income', key: 'annualincome', width: 30},
        { header: 'Guardian Name', key: 'guardian', width: 30},
		{ header: 'Guardian phone', key: 'guardianphone', width: 30},
        { header: 'Category', key: 'category', width: 30},
        { header: 'Caste', key: 'caste', width: 30},
        { header: 'Reserved category', key: 'reservedcategory', width: 30},
        { header: 'Religion', key: 'religion', width: 30},
        { header: 'Previous qualifying exam reg no', key: 'previousregno', width: 30},
        { header: 'Program opting for', key: 'programcode', width: 30},
        { header: 'Hostel required', key: 'hostelrequired', width: 30},
		{ header: 'Transportation required', key: 'transportation', width: 30},
        { header: 'CAP ID', key: 'capid', width: 30},
		{ header: 'Ref No.', key: 'refno', width: 30},
        { header: 'Language 1', key: 'language1', width: 30},
        { header: 'Language 2', key: 'language2', width: 30 },
		{ header: 'Aadhar No.', key: 'aadhar', width: 30},
        { header: '12th Exam name', key: 'twelfthexam', width: 30},
        { header: '12th Exam board', key: 'twelfthboard', width: 30},
		{ header: '12th Percentage marks', key: 'twelfthpercentagemarks', width: 30},
        { header: '12th School name', key: 'twelfthschool', width: 30},
        { header: '12th Year of passing', key: 'twelfthyop', width: 30},
		{ header: 'No.of attempts in qualifing 12th standard', key: 'twelfthattempts', width: 30},
        { header: '12th Subject 1', key: 'twelfthsubject1', width: 30},
        { header: '12th Subject 1 marks', key: 'twelfthsub1marks', width: 30},
        { header: '12th Subject 2', key: 'twelfthsubject2', width: 30},
		{ header: '12th Subject 2 marks', key: 'twelfthsub2marks', width: 30},
        { header: '12th Subject 3', key: 'twelfthsubject3', width: 30},
        { header: '12th Subject 3 marks', key: 'twelfthsub3marks', width: 30},
		{ header: '12th Subject 4', key: 'twelfthsubject4', width: 30},
        { header: '12th Subject 4 marks', key: 'twelfthsub4marks', width: 30},
        { header: '12th Subject 5', key: 'twelfthsubject5', width: 30},
		{ header: '12th Subject 5 marks', key: 'twelfthsub5marks', width: 30},
        { header: '12th Subject 6', key: 'twelfthsubject6', width: 30},
        { header: '12th Subject 6 marks', key: 'twelfthsub6marks', width: 30},
		
,       

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=applicationform3.xlsx");


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
