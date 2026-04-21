const Pub=require('./../Models/companyjobs');
const Link=require('./../Models/uploadlink');


exports.getaddcompanyjobs= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addcompanyjobs', {
            title: 'Add job details',
            employerid: req.query.employerid,
            employername: req.query.employername
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewcompanyjobs= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('employerid')
            .equals(req.query.employerid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Outgoing Student Placement')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewcompanyjobs', {
                categories: lcat1233,
                link: link123,
                title: 'List of jobs',
                employerid: req.query.employerid,
                employername: req.query.employername
            
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

exports.geteditcompanyjobs= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editcompanyjobs', {
                pub: leditcat,
                category: leditcat,
                title: 'Edit',
                employerid: req.query.employerid,
                employername: req.query.employername
            
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



exports.createcompanyjobs= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        if(user1) {
            const pub1= await Pub.create({
                name: name,
                colid: colid,
                department: department,
                user: user1,
                year: req.body.year,
                designation: req.body.designation,
                sector: req.body.sector,
                employername: req.query.employername,
                employerid: req.query.employerid,
                profile: req.body.profile,
                website: req.body.website,
                salary: req.body.salary,
                comments: req.body.comments
            });
          
           req.flash("success", "Data has been added successfully");
           res.redirect('/viewcompanyjobs?employerid=' + req.query.employerid + '&employername=' + req.query.employername);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }
       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcompanyjobs?employerid=' + req.query.employerid + '&employername=' + req.query.employername, {
        title: 'Add employer'
    });
    }   
};



exports.updatecompanyjobs= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            
                name: name,
                colid: colid,
                department: department,
                user: user1,
                year: req.body.year,
                designation: req.body.designation,
                sector: req.body.sector,
                profile: req.body.profile,
                employerid:req.query.employerid,
                employername:req.query.employername,
                website: req.body.website,
                salary: req.body.salary,
                comments: req.body.comments
        });
        
       
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewcompanyjobs?employerid=' + req.query.employerid + '&employername=' + req.query.employername);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
      
        res.redirect('/viewcompanyjobs?employerid=' + req.query.employerid + '&employername=' + req.query.employername);
       

    }   
};

exports.deletecompanyjobs= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewcompanyjobs?employerid=' + req.query.employerid + '&employername=' + req.query.employername);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       
        res.redirect('/viewcompanyjobs?employerid=' + req.query.employerid + '&employername=' + req.query.employername);
       

    }   
};

