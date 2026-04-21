const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/classenr');
const Pat1=require('./../Models/class');


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

                        const pat1= Pat.create({
                        colid: colid,
                        coursecode: row[0],
                        course: row[1],
                        student: row[2],
                        regno: row[3],
                        program: row[4],
                        status: parseInt(row[5]),
                        academicyear: row[6],
                        user: user1,
                        name: name
                        });
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/enroldashboard');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/addclassenroll');

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.deleteenrollment= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/enrolllist/' + req.params.id);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/enrolllist/' + req.params.id);
    }   
};

exports.getaddenroll= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addclassenr', {
            title: 'Add Enrollment'
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};

exports.getenroldcourses= async (req,res) => {
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

exports.getenrolcourselist= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const regno=req.cookies['regno'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('regno')
            .equals(regno)
            .where('colid')
            .equals(colid)
            .where('status')
            .equals(1);
            res.status(200).render('viewenrolledcourses', {
                categories: lcat1233,
                title: 'List enrolled courses'
            
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

exports.getenrolclassstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const semester=req.cookies['semester'];
        const section=req.cookies['section'];
        const today = new Date();
        //console.log(today);
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(today.getHours() - 1 + 5);
        today.setMinutes(today.getMinutes() + 30);
        tomorrow.setHours(tomorrow.getHours() + 1 + 5);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30);   
        //console.log(today);
        //console.log(tomorrow);  
        if(user1) {
            const lcat1233= await Pat1.find()
            .where('colid')
            .equals(colid)
            .where('coursecode')
            .equals(req.query.coursecode)
            .where('enrollreq')
            .equals('Yes')
            .where('user')
            .equals(req.query.email);
            res.status(200).render('viewclassstud', {
                categories: lcat1233,
                //link:link123,
                title: 'List class'       
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