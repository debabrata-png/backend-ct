const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/ledgerstud');
const User=require('./../Models/user');
const Fees=require('./../Models/fees');
const Scholarships=require('./../Models/scholarships');


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

exports.getaddstudentledger= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addstudentledger', {
            title: 'Upload student ledger'
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
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

exports.createsingleledger= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const fregno=req.cookies['fregno'];
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                classdate: new Date(req.body.classdate),
                feegroup:req.body.feegroup,
                feeitem:req.body.feeitem,
                amount:req.body.amount,
                academicyear:req.body.academicyear,
                feecategory:req.body.feecategory,
                semester:req.body.semester,
                paymode:req.body.paymode,
                paydetails:req.body.paydetails,
                status:req.body.status,
                installment:req.body.installment,
                comments:req.body.comments,
                type: 'Fees',
                regno: fregno,
                student: req.body.student,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/selectstudentbyregno');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('selectstudentbyregno', {
        title: 'Class'
    });
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
