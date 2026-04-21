const Pat=require('./../Models/workload');
const Link=require('./../Models/uploadlink');
const Pat1=require('./../Models/attendance');


exports.getaddworkload= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addworkload', {
            title: 'Add Workload',
            user: req.params.id,
            name: req.query.name
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};



exports.getviewworkload= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.params.id;
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
            res.status(200).render('viewworkload', {
                categories: lcat1233,
                //link:link123,
                title: 'List workload',
                user: req.params.id,
                name: req.query.name
            
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




exports.geteditworkload= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editworkload', {
                pub: leditcat,
                title: 'Edit',
                user: req.query.user,
                name: req.query.name
            
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




exports.createworkload= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        //const weeks=parseInt(req.body.weeks) + 1;
        
        if(user1) {

            const pat1= await Pat.create({
                name: req.query.name,
                colid: colid,
                hours: req.body.hours,
                coursecode: req.body.coursecode,
                semester: req.body.semester,
                program: req.body.program,
                module: req.body.module,
                type: 'Academic',
                course: req.body.course,
                section: req.body.section,
                status: req.body.status,
                user: req.params.id
            });
            
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/viewworkload/' + req.params.id +'?name=' + req.query.name);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addworkload/' + req.params.id +'?name=' + req.query.name, {
        title: 'Add Workload'
    });
    }   
};

exports.updateworkload= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');

        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            coursecode: req.body.coursecode,
            semester: req.body.semester,
            course: req.body.course,
            program: req.body.program,
            module: req.body.module,
            section: req.body.section,
            status: req.body.status
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewworkload/' + req.query.user +'?name=' + req.query.name);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewworkload/' + req.query.user +'?name=' + req.query.name);
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteworkload= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewworkload/' + req.body.user +'?name=' + req.body.name);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewworkload/' + req.body.user +'?name=' + req.body.name);
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







