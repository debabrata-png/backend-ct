const multer=require('multer');
const readXlsxFile = require("read-excel-file/node");
const Pat=require('./../Models/scholarships');


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
                                colid: colid,
                                programcode: row[1],
                                academicyear: row[2],
                                semester: row[3],
                                feegroup: row[4],
                                status: row[5],
                                feeeitem: row[6],
                                amount: row[7],
                                classdate: new Date(row[8]),
                                feecategory: row[9],
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
                res.redirect('/viewscholarships');
            } catch(err1) {
                req.flash("error", "Data not added. Invalid file format");
                res.redirect('/addscholarships');

            }

            
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }



        //res.end("File is uploaded");
    });
};

exports.deletescholarships= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewscholarships');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewscholarships');
    }   
};

exports.getaddscholarships= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addscholarships', {
            title: 'Add scholarships'
        });
    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }   
};



exports.getviewscholarships= async (req,res) => {
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid);
            res.status(200).render('viewscholarships', {
                categories: lcat1233,
                title: 'List scholarship templates'
            
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

exports.updatescholarships= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
       
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            classdate: new Date(req.body.classdate),
            feegroup:req.body.feegroup,
            feeeitem:req.body.feeitem,
            programcode:req.body.programcode,
            amount:req.body.amount,
            academicyear:req.body.academicyear,
            feecategory:req.body.feecategory,
            semester:req.body.semester,
            status:req.body.status
        });
        req.flash("success", "Data has been updated successfully" );
        res.redirect('/viewscholarships');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
        res.redirect('/viewscholarships');

    }   
};

exports.geteditscholarships= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
            res.status(200).render('editscholarships', {
                pub: leditcat,
                title: 'Edit scholarship template'
            
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



exports.deleteallscholarships= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        //await Pat.findByIdAndDelete(req.body.category_id);
        await Pat.deleteMany({ colid: colid });
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewscholarships');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
        res.redirect('/viewscholarships');
    }   
};
