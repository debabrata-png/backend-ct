const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/questions');


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
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        //console.log(req.files);
        let path =
            __dirname + "/" + req.file.path;
            //console.log(path);

            let path1="public/img/users/" + req.file.filename;
            //console.log(path1);
            readXlsxFile(path1).then((rows) => {
                // skip header
                rows.shift();
          
                let tutorials = [];
          
                rows.forEach((row) => {
                  let tutorial = {
                    examid: req.params.id,
                    question: row[1],
                    option: row[2],
                    fullmarks: row[3],
                    link: row[4],
                    type: row[5],
                    questiongroup: row[6],
                    status: row[7],
                    difficulty: row[8],
                    user: user1,
                    colid: colid
                  };
                  //console.log(tutorial);

                  const pat1= Pat.create({
                        colid: colid,
                        examid: req.params.id,
                        question: row[1],
                        option: row[2],
                        fullmarks: parseInt(row[3]),
                        link: row[4],
                        type: row[5],
                        questiongroup: row[6],
                        status: parseInt(row[7]),
                        difficulty: row[8],
                        user: user1
                    });
          
                  //tutorials.push(tutorial);
                });
            });




        req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/addifiles/' + req.params.id);


        //res.end("File is uploaded");
    });
};