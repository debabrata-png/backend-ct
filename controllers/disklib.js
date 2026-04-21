const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/libbooks');

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

                        const pat1= Pat.create({
                            book: row[0],
                            colid: colid,
                            author: row[1],
                            accno: row[2],
                            comments: row[3],
                            price: Number(row[4]),
                            purchasedate: row[5],
                            category: row[6],
                            type: row[7],
                            programcode: row[8],
                            semester: row[9],
                            academicyear: row[10],
                            status: 'Available'                          
                        });
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/viewlibbooks');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/viewlibbooks');
                

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.getaddiamarks= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addiamarks', {
            title: 'Add IA marks',
            coursecode: req.params.id
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};

exports.deleteiamarks= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewiamarks/' + req.params.id);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewiamarks/' + req.params.id);
    }   
};

exports.getviewiamarks= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('evaluator')
            .equals(user1)
            .where('coursecode')
            .equals(req.params.id);
            res.status(200).render('viewiamarks', {
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