const jwt=require('jsonwebtoken');
const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Classenr=require('./../Models/classenr');
const Libbooks=require('./../Models/libbooks');
const Explearning=require('./../Models/explearning');
const Addonc=require('./../Models/addonc');
const Nepcourselist=require('./../Models/nepcourselist');


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

exports.uploadclassenr = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Classenr.create({
                    colid: colid,
                    coursecode: req.body.coursecode,
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
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadclassenrext = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Classenr.create({
                    colid: colid,
                    coursecode: req.body.coursecode,
                    course: row[1],
                    student: row[2],
                    regno: row[3],
                    program: row[4],
                    status: parseInt(row[5]),
                    academicyear: row[6],
                    semester: row[7],
                    section: row[8],
                    classgroup: row[9],
                    user: user1,
                    name: name
                    });
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadclassenrexta = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Classenr.create({
                    colid: colid,
                    coursecode: req.body.coursecode,
                    course: req.body.course,
                    student: row[0],
                    regno: row[1],
                    program: req.body.program,
                    status: parseInt(row[2]),
                    academicyear: req.body.academicyear,
                    semester: req.body.semester,
                    section: req.body.section,
                    year: req.body.year,
                    classgroup: row[3],
                    user: user1,
                    name: name
                    });
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};



exports.uploadbooks = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Libbooks.create({
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
                        publisher: row[11],
                        status: 'Available'  
                    });
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadnepcourselist = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Libbooks.create({
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
                        publisher: row[11],
                        status: 'Available'  
                    });
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadexplearning = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Explearning.create({
                        name: name,
                        user: user1,
                        department: req.body.department,
                        year: row[0],
                        colid: colid,
                        programname: row[1],
                        programcode: row[2],
                        type: row[3],
                        activity: row[4],
                        sname: row[5],
                        regno: row[6],
                        status1: 'Submitted',
                        comments: 'NA'
                    });
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};

exports.uploadaddonc = function(req, res) {
    //console.log('processing file upload');
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
      
                let tutorials = [];
      
                rows.forEach((row) => {
                    const pat1= Addonc.create({
                        name: name,
                        user: user1,
                        department: req.body.department,
                        year: row[0],
                        colid: colid,
                        price: Number(row[1]),
                        status: row[2],
                        coursetitle: row[3],
                        imagelink: 'NA',
                        coursecode: row[4],
                        coursetype: row[5],
                        offeredtimes: row[6],
                        duration: row[7],
                        category: row[8],
                        studentsenrolled: row[9],
                        studentscompleted: row[10],
                        status1: 'Submitted',
                        comments: 'NA'
                    });
      
              //tutorials.push(tutorial);
                });
            });
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};