const Lcat=require('./../Models/lcategory');


exports.getallcat1= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addcategory', {
            title: 'All categories'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};


exports.createcat= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const lcat1= await Lcat.create({
            name: req.body.name,
            description: req.body.description,
            user: user1,
            status: req.body.status
        });
        //res.status(200).send('Hello world for all the tours through db new router');
    //    res.status(201).json({
    //        status:'Success',
    //        data: {
    //            Category: lcat1
    //        }
    //    });
       //req.flash("success", "Category has been added successfully");
       req.flash("success", "Category has been added successfully for user " + req.cookies['user']);
       res.status(200).render('addcategory', {
        title: 'Book category'
    });
    } catch(err) {
        req.flash("error", "Category could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcategory', {
        title: 'Book category'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.geteditcat= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        //console.log(req.params.id);
        const leditcat= await Lcat.findById(req.params.id);
        //.where('_id')
        //.equals(req.params.id);
        //res.status(200).send('Hello world for all the tours through db new router');
        res.status(200).render('editcategory', {
            category: leditcat,
            title: 'Edit Categories'
            
        });
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.updatecat= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const lcat1= await Lcat.findByIdAndUpdate( req.params.id,{
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Category has been updated successfully");
       res.redirect('/viewcategory');
    } catch(err) {
        req.flash("error", "Category could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcategory', {
        title: 'Book category'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletecat= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Lcat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Category has been deleted successfully");
       res.redirect('/viewcategory');
    } catch(err) {
        req.flash("error", "Category could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addcategory', {
        title: 'Book category'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.getallcat2= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const lcat123= await Lcat.find();
        //res.status(200).send('Hello world for all the tours through db new router');
        res.status(200).render('viewcategory', {
            categories: lcat123,
            title: 'List Categories'
            
        });
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getallcat23= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const lcat1233= await Lcat.find()
        .where('user')
        .equals(user1);
        //res.status(200).send('Hello world for all the tours through db new router');
        res.status(200).render('viewcategory', {
            categories: lcat1233,
            title: 'List Categories'
            
        });
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getallcat= async (req,res) => {

    try{
        const lcat12= await Lcat.find();
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               lcat12
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.getcat1= async (req,res) => {

    try{
        const lcat23= await Lcat.findById(req.body.id);
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               lcat23
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};