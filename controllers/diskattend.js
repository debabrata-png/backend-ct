const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/attendance');
const Attend=require('./../Models/attendance');


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

exports.uploadAvatar =function(req, res) {
    
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file." + err.toString());
        }
        //console.log(req.file);
        //console.log(req.params.id);
        const user1=req.cookies['user'];
        const name=req.cookies['name'];
        const colid=req.cookies['colid'];
        const classid=req.query.classid;
        const semester=req.query.semester;
        const section=req.query.section;
        const coursecode=req.query.coursecode;
        const course=req.query.course;
        //console.log(req.files);
        if(user1) {

            try {
                let path1="public/img/users/" + req.file.filename;
                //console.log(path1);
                readXlsxFile(path1).then((rows) => {
                    // skip header
                    rows.shift();
          
                    let tutorials = [];
                    //console.log(req.query.classid+ ',' + req.query.coursecode+ ',' + req.query.course+ ',' + req.query.section+ ',' + req.query.semester);
                    //console.log(classid+ ',' + coursecode+ ',' + course+ ',' + section+ ',' + semester);
          
                    rows.forEach((row) => {
                        //console.log(row[0] + ',' + row[1] + ',' + row[2]);
                        // const pat1= Attend.findOneAndUpdate({classid: classid, regno: row[0]},{
                        //     name: row[1],
                        //     colid: colid,
                        //     coursecode: coursecode,
                        //     semester: semester,
                        //     course: course,
                        //     section: section,
                        //     status: 1,
                        //     classdate: new Date(row[2]), //req.body.classdate,
                        //     user: user1
                        // }, {
                        //     new: true,
                        //     upsert: true 
                        // });

                        const pat1= Attend.create({
                            colid: colid,
                            regno: row[0],
                            name: row[1],
                            classdate: new Date(row[2]),
                            classid: classid,
                            course: course,
                            coursecode: coursecode,
                            section: section,
                            semester: semester,
                            user: user1,
                            status:1
                            });
            

                       
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/viewclassbycourse/' + req.query.coursecode);
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/viewclassbycourse/' + req.query.coursecode);

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.deleteattendance= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewclassbycourse/' + req.query.coursecode);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewclassbycourse/' + req.query.coursecode);
    }   
};

exports.getaddattendance= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addattendance', {
            title: 'Add Enrollment',
            coursecode: req.query.coursecode,
            course: req.query.course,
            semester: req.query.semester,
            section: req.query.section,
            classid: req.query.classid
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};

exports.getenroldash= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.distinct("coursecode")
            .where('user')
            .equals(user1);
            //console.log(lcat1233);
            res.status(200).render('enroldashboard', {
                categories: lcat1233,
                title: 'Enrollment Dashboard'
            
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

exports.getenrollist= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('coursecode')
            .equals(req.params.id);
            res.status(200).render('enrolstudlist', {
                categories: lcat1233,
                title: 'List enrolled students',
                coursecode: req.params.id
            
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

exports.getviewquestions= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('examid')
            .equals(req.params.id);
            res.status(200).render('viewquestions', {
                categories: lcat1233,
                title: 'List questions',
                examid: req.params.id
            
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