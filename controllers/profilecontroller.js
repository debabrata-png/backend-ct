const Pat=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pat1=require('./../Models/attendance');


exports.getaddclass= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addclass', {
            title: 'Add Class'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewprofile= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
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


exports.getviewprofilestud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        //const semester=req.cookies['semester'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('email')
            .equals(user);
            res.status(200).render('editprofilestudent', {
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




exports.geteditprofilestud= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        //console.log(req.body);
        if(user1) {
            //const leditcat= await Pat.findById(req.params.id);

            const leditcat= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('email')
            .equals(user1);
            //console.log(leditcat);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editprofilestudent', {
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


exports.geteditprofilefac= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        //console.log(req.body);
        if(user1) {
            //const leditcat= await Pat.findById(req.params.id);

            const leditcat= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('email')
            .equals(user1);
            //console.log(leditcat);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editprofile', {
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



exports.createclass= async (req,res) => {

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
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                coursecode: req.body.coursecode,
                link: req.body.link,
                semester: req.body.semester,
                course: req.body.course,
                section: req.body.section,
                status: req.body.status,
                classdate: newdate, //req.body.classdate,
                classtime: req.body.classtime,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewclass');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addclass', {
        title: 'Class'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.updateprofilestud= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const lcat1= await Pat.findOneAndUpdate( {email: user1},{
            regno: req.body.regno,
            programcode: req.body.programcode,
            semester: req.body.semester,
            section: req.body.section,
            password: req.body.password,
            admissionyear: req.body.admissionyear
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/editprofilestudent');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/editprofilestudent');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.updateprofilefac= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        
        const lcat1= await Pat.findOneAndUpdate( {email: user1},{
            department:req.body.department,
            password: req.body.password
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/editprofile');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
    res.redirect('/editprofile');

    }   
};

exports.deleteclass= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewclass');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewclass');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







