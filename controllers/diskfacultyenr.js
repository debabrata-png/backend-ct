const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/facultyenr');

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
                            user: user1,
                            name: name,
                            colid: colid,
                            examcode: req.params.id,
                            examname: row[1],
                            course: row[2],
                            program: row[3],
                            regno: row[4],
                            faculty: row[5],
                            email: row[6],
                            academicyear: row[7],
                            status: parseInt(row[8])
                            
                        });
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/viewexam');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/addfacultyenrol/' + req.params.id);

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.getaddfacultyenr= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addfacultyenr', {
            title: 'Add Enrollment',
            examcode: req.params.id
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};

exports.deleteenrollment= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewenrollfaculty/' + req.params.id);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewenrollfaculty/' + req.params.id);
    }   
};

exports.getviewmyallocation= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find().sort('regno')
            .where('email')
            .equals(user1)
            .where('status')
            .equals(1);
            res.status(200).render('viewmyallocation', {
                categories: lcat1233,
                title: 'List enrolled students'
                
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

//

exports.getenrollfacultylist= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('examcode')
            .equals(req.params.id);
            res.status(200).render('enrollfacultylist', {
                categories: lcat1233,
                title: 'List enrolled faculty',
                examcode: req.params.id
            
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