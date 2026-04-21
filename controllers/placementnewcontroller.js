const Pub=require('./../Models/placement');
const Link=require('./../Models/uploadlink');


exports.getaddplacement= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addplacementerp', {
            title: 'All placement details'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewplacement= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('user')
            .equals(user1)
            .where('jobid')
            .equals(req.query.jobid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Outgoing Student Placement')
            .where('colid')
            .equals(colid);
            res.cookie("employerid",req.query.employerid);
            res.cookie("employername",req.query.employername);
            res.cookie("jobid",req.query.jobid);
            res.cookie("designation",req.query.designation);
            res.cookie("sector",req.query.sector);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewplacementerp', {
                categories: lcat1233,
                link: link123,
                title: 'List of placements'
            
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

exports.geteditplacement= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
            
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editplacementerp', {
                pub: leditcat,
                category: leditcat,
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



exports.createplacement= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const employerid=req.cookies['employerid'];
        const employername=req.cookies['employername'];
        const designation=req.cookies['designation'];
        const jobid=req.cookies['jobid'];
        const sector=req.cookies['sector'];
        if(user1) {
            const pub1= await Pub.create({
                name: name,
                colid: colid,
                department: department,
                user: user1,
                year: req.body.year,
                studentname: req.body.studentname,
                regno: req.body.regno,
                studcontactdetails: req.body.studcontactdetails,
                programname: req.body.programname,                
                empcontactdetails: req.body.empcontactdetails,
                salary: req.body.salary,
                status1: req.body.status1,
                employerid: employerid,
                employername:employername,
                jobid:jobid,
                designation:designation,
                sector:sector,
                comments: req.body.comments
            });
            //res.status(200).send('Hello world for all the tours through db new router');
        //    res.status(201).json({
        //        status:'Success',
        //        data: {
        //            Category: lcat1
        //        }
        //    });
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewplacementerp?employerid=' + employerid + '&employername=' + employername + '&jobid=' + jobid + '&designation=' + designation + '&sector=' + sector);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addplacementerp', {
        title: 'Add placement'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.updateplacement= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        const employerid=req.cookies['employerid'];
        const employername=req.cookies['employername'];
        const designation=req.cookies['designation'];
        const jobid=req.cookies['jobid'];
        const sector=req.cookies['sector'];
        //console.log('Updating');
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            
                name: name,
                colid: colid,
                department: department,
                user: user1,
                year: req.body.year,
                studentname: req.body.studentname,
                regno:req.body.regno,
                studcontactdetails: req.body.studcontactdetails,
                programname: req.body.programname,
                employername: req.body.employername,
                empcontactdetails: req.body.empcontactdetails,
                salary: req.body.salary,
                status1: req.body.status1,
                employerid: employerid,
                employername:employername,
                jobid:jobid,
                designation:designation,
                sector:sector,
                comments: req.body.comments
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewplacementerp?employerid=' + employerid + '&employername=' + employername + '&jobid=' + jobid + '&designation=' + designation + '&sector=' + sector);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
      
        res.redirect('/viewplacementerp?employerid=' + employerid + '&employername=' + employername + '&jobid=' + jobid + '&designation=' + designation + '&sector=' + sector);
       

    }   
};

exports.deleteplacement= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const employerid=req.cookies['employerid'];
        const employername=req.cookies['employername'];
        const designation=req.cookies['designation'];
        const jobid=req.cookies['jobid'];
        const sector=req.cookies['sector'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewplacementerp?employerid=' + employerid + '&employername=' + employername + '&jobid=' + jobid + '&designation=' + designation + '&sector=' + sector);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       
        res.redirect('/viewplacementerp?employerid=' + employerid + '&employername=' + employername + '&jobid=' + jobid + '&designation=' + designation + '&sector=' + sector);
       

    }   
};

