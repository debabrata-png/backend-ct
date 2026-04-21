const Pub=require('./../Models/cocal');
const Link=require('./../Models/uploadlink');
const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");


exports.getaddcocal= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addcocal', {
            title: 'All CO Calculation'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getcoursecodeattainment= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('getcoursecodeattainment', {
            title: 'All CO Calculation'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.postcoursecodeattainment= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
       res.redirect('/viewbulkattainment?coursecode=' + req.body.coursecode + '&examcode=' + req.body.examcode);

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewcocal= async (req,res) => {
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
            .equals('CO')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewcocal', {
                categories: lcat1233,
                link: link123,
                title: 'List of CO Calculation'
            
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


exports.getco1= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        var co1;
        var co2;
        var co3;
        if(user1) {
            const lcat1233= await Pub.aggregate([
                { 
                    $match: {coursecode: req.query.coursecode }
                },
                { 
                    $group: {
                        _id:'$course', 
                        co1: {$avg: '$co1'}
                    }
                }
            ]);
            lcat1233.forEach(function(data){
                co1=data.co1;
            })
            const lcat1234= await Pub.aggregate([
                { 
                    $match: {coursecode: req.query.coursecode }
                },
                { 
                    $group: {
                        _id:'$course', 
                        co2: {$avg: '$co2'}
                    }
                }
            ]);
            lcat1234.forEach(function(data1){
                co2=data1.co2;
            })
            const lcat1235= await Pub.aggregate([
                { 
                    $match: {coursecode: req.query.coursecode }
                },
                { 
                    $group: {
                        _id:'$course', 
                        co3: {$avg: '$co3'}
                    }
                }
            ]);
            lcat1235.forEach(function(data2){
                co3=data2.co3;
            })
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewbulkattainment', {
                coursecode: req.query.coursecode,
                co1:co1,
                co2:co2,
                co3:co3,
                title: 'List of CO Calculation'
            
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


exports.getco2= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        var co1;
        var co2;
        var co3;
        if(user1) {
            const lcat1233= await Pub.aggregate([
                { 
                    $match: {coursecode: req.query.coursecode, examcode: req.query.examcode }
                },
                { 
                    $group: {
                        _id:'$course', 
                        co1: {$avg: '$co1'}
                    }
                }
            ]);
            lcat1233.forEach(function(data){
                co1=data.co1;
            })
            const lcat1234= await Pub.aggregate([
                { 
                    $match: {coursecode: req.query.coursecode, examcode: req.query.examcode }
                },
                { 
                    $group: {
                        _id:'$course', 
                        co2: {$avg: '$co2'}
                    }
                }
            ]);
            lcat1234.forEach(function(data1){
                co2=data1.co2;
            })
            const lcat1235= await Pub.aggregate([
                { 
                    $match: {coursecode: req.query.coursecode, examcode: req.query.examcode }
                },
                { 
                    $group: {
                        _id:'$course', 
                        co3: {$avg: '$co3'}
                    }
                }
            ]);
            lcat1235.forEach(function(data2){
                co3=data2.co3;
            })
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewbulkattainment', {
                coursecode: req.query.coursecode,
                co1:co1,
                co2:co2,
                co3:co3,
                title: 'List of CO Calculation'
            
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


exports.geteditcocal= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editcocal', {
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



exports.createcocal= async (req,res) => {

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
                coursecode: req.body.coursecode,
                course: req.body.course,
                programcode: req.body.programcode,
                program: req.body.program,
                examcode: req.body.examcode,
                examname: req.body.examname,
                semester: req.body.semester,
                iamarks: req.body.iamarks,
                extmarks: req.body.extmarks,
                totalmarks: req.body.totalmarks,
                co1: req.body.co1,
                co2: req.body.co2,
                co3: req.body.co3
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
        res.redirect('/viewcocal');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcocal', {
        title: 'Add CO Calculation'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.updatecocal= async (req,res) => {

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
                coursecode: req.body.coursecode,
                course: req.body.course,
                programcode: req.body.programcode,
                program: req.body.program,
                examcode: req.body.examcode,
                examname: req.body.examname,
                semester: req.body.semester,
                iamarks: req.body.iamarks,
                extmarks: req.body.extmarks,
                totalmarks: req.body.totalmarks,
                co1: req.body.co1,
                co2: req.body.co2,
                co3: req.body.co3
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewcocal');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewcocal');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletecocal= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewcocal');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewcocal');
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
                    const co1ia1p=Math.random();
                  const co1ia2p=Math.random();
                  const co2ia1p=Math.random();
                  const co2ia2p=Math.random();
                  const co3ia1p=Math.random();
                  const co3ia2p=Math.random();
          
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
                  
                  var co1m=Number(row[7]) * co1ia1p + Number(row[8]) * co1ia2p;
                  var co1t= Number(row[11]) * co1ia1p + Number(row[12]) * co1ia2p;
                  var co2m=Number(row[7]) * co2ia1p + Number(row[8]) * co2ia2p;
                  var co2t= Number(row[11]) * co2ia1p + Number(row[12]) * co2ia2p;
                  var co3m=Number(row[7]) * co3ia1p + Number(row[8]) * co3ia2p;
                  var co3t= Number(row[11]) * co3ia1p + Number(row[12]) * co3ia2p;

                  var co1p=(co1m/co1t) * 100;
                  var co2p=(co2m/co2t) * 100;
                  var co3p=(co3m/co3t) * 100;


                        const pat1= Pub.create({
                        colid: colid,
                        coursecode: row[0],
                        course: row[1],
                        programcode: row[2],
                        program: row[3],
                        examcode: row[4],
                        examname: row[5],
                        semester: row[6],
                        iamarks:row[7],
                        extmarks:row[8],
                        regno:row[9],
                        student:row[10],
                        totalmarks: Number(row[7]) + Number(row[8]),
                        co1: co1p,
                        co2: co2p,
                        co3: co3p,
                        user: user1,
                        name: name
                        });
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/viewcocal');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/viewcocal');

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.getaddbulkcocal= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    console.log(user1);
    if(user1) {
        res.status(200).render('addbulkcocal', {
            title: 'Add CO Calculation'
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};