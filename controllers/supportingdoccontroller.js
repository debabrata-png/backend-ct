const Pub=require('./../Models/supportingdoc');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');
const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");



exports.getaddsupportingdoc= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addbulksupportingdoc', {
            title: 'All Documents'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

// exports.getviewsyllabusprog= async (req,res) => {
//     //res.cookie("user","Akshata");
  
//     try{
//         const user1=req.cookies['user'];
//         const colid=req.cookies['colid'];
//         if(user1) {
//             const lcat1233= await Pub.find()
//             .where('user')
//             .equals(user1);
//             const link123= await Link.find()
//             .where('criteria')
//             .equals('Syllabus Revision Programwise')
//             .where('colid')
//             .equals(colid);
//             //res.status(200).send('Hello world for all the tours through db new router');
//             res.status(200).render('viewsyllabusprog', {
//                 categories: lcat1233,
//                 link: link123,
//                 title: 'List of Programs'
            
//         });
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
                        
                        field1: row[0],
                        user: row[1],
                        name: row[2],
                        type: row[3],
                        criteria: row[4],
                        metric: row[5],
                        filename: row[6],
                        link: row[7],
                        collection1: row[8],
                        colid: row[9],
                        classdate: new Date()
                        
                        });
          
                  //tutorials.push(tutorial);
                    });
                });
                req.flash("success", "Data will be added if format is correct. Please check after some time.");
                res.redirect('/addbulksupportingdoc');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/addbulksupportingdoc');

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.getaddbulksupportingdoc= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    console.log(user1);
    if(user1) {
        res.status(200).render('addbulksupportingdoc', {
            title: 'Add Supporting Documents'
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};



