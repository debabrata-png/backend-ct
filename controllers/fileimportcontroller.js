const Pat=require('./../Models/coursefiles');
const Link=require('./../Models/uploadlink');
const Pat1=require('./../Models/attendance');
const readXlsxFile = require("read-excel-file/node");


exports.getaddifiles= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    //console.log(user1);
    if(user1) {
        res.status(200).render('addifiles', {
            title: 'Add File Link',
            coursecode: req.params.id
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getaddcfileslink= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addcfiles', {
            title: 'Add File Link',
            coursecode: req.params.id
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewcfiles= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1)
            .where('coursecode')
            .equals(req.params.id);
            // const link123= await Link.find()
            // .where('criteria')
            // .equals('346')
            // .where('colid')
            // .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewcfiles', {
                categories: lcat1233,
                //link:link123,
                title: 'List file link',
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

exports.getviewcfilesstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('coursecode')
            .equals(req.params.id);
            res.status(200).render('viewcfilesstud', {
                categories: lcat1233,
                //link:link123,
                title: 'List file link',
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

exports.getviewclasstoday= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);      
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1)
            .where('classdate')
            .gte(today)
            .where('classdate')
            .lte(tomorrow);
            // const link123= await Link.find()
            // .where('criteria')
            // .equals('346')
            // .where('colid')
            // .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewclass', {
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

exports.getviewclassstud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const semester=req.cookies['semester'];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);      
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('semester')
            .equals(semester)
            .where('classdate')
            .gte(today)
            .where('classdate')
            .lte(tomorrow);
            // const link123= await Link.find()
            // .where('criteria')
            // .equals('346')
            // .where('colid')
            // .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
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



exports.geteditcfiles= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editcfiles', {
                pub: leditcat,
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



exports.createcfiles= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        // var d1=req.body;
        // console.log(req.body);
        // d1.forEach(function (item) {
        //     console.log(item.id + ' ' + item.Name);
        //     //console.log(item.Name);
        // });
        //const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                coursecode: req.body.coursecode,
                link: req.body.link,
                filename: req.body.filename,
                status: req.body.status,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewcfiles/' + req.params.id);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcfiles', {
        title: 'All file links',
        coursecode: req.params.id
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.createifiles2= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        //console.log("starting");
        //console.log(req.file);
        //console.log(req.file.filename);
        if(user1) {
            let path =
            __dirname + "/public/img/users" + req.file.filename;
            //console.log(path);
            
            readXlsxFile(path).then((rows) => {
                // skip header
                rows.shift();
          
                let tutorials = [];
          
                rows.forEach((row) => {
                  let tutorial = {
                    examid: row[0],
                    question: row[1],
                    option: row[2],
                    fullmarks: row[3]
                  };
                  //console.log(tutorial);
          
                  tutorials.push(tutorial);
                });
            });


            // const pat1= await Pat.create({
            //     name: name,
            //     colid: colid,
            //     coursecode: req.body.coursecode,
            //     link: req.file.location,
            //     filename: req.file.key,
            //     status: req.body.status,
            //     user: user1
            // });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/addifiles/' + req.params.id);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }
       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addifiles', {
        title: 'All file links',
        coursecode: req.params.id
    });
    }   
};



exports.updatecfiles= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            name: name,
            colid: colid,
            link: req.body.link,
            filename: req.body.filename,
            status: req.body.status,
            user: user1
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewcfiles');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewcfiles');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletecfiles= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewcfiles');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewcfiles');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







