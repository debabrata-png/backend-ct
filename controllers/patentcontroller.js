const Pat=require('./../Models/patents');
const Link=require('./../Models/uploadlink');


exports.getaddpatent= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addpatent', {
            title: 'All patents'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewpatent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('343')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewpatent', {
                categories: lcat1233,
                link: link123,
                title: 'List patents',
                user: user1
            
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

exports.geteditpatent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editpatent', {
                pub: leditcat,
                title: 'Edit patents'
            
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



exports.createpatent= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                title: req.body.title,
                patentnumber: req.body.patentnumber,
                yop: req.body.yop,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewpatent');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Patent could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addpatent', {
        title: 'Patent'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.updatepatent= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            name: name,           
            title: req.body.title,
            patentnumber: req.body.patentnumber,
            yop: req.body.yop,
            user: user1
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Patent has been updated successfully");
       res.redirect('/viewpatent');
    } catch(err) {
        req.flash("error", "Patent could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewpatent');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletepatent= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Patent has been deleted successfully");
       res.redirect('/viewpatent');
    } catch(err) {
        req.flash("error", "Patent could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewpatent');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







