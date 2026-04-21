const Pat=require('./../Models/event');
const Link=require('./../Models/uploadlink');


exports.getaddevent= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addevent', {
            title: 'Add Event'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};



exports.getviewevent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
        
            res.status(200).render('viewevent', {
                categories: lcat1233,
                
                title: 'List event'
            
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


exports.geteditevent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editevent', {
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



exports.createevent= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const newdate=new Date(req.body.date + ' ' + req.body.time);
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                user: user1,
                department:department,
                eventname: req.body.eventname,
                description: req.body.description,
                department: req.body.department,
                brochurelink: req.body.brochurelink,
                date: newdate, //req.body.classdate,
                time: req.body.time,
                coordinator: req.body.coordinator,
                type: req.body.type,
                eventlink: req.body.eventlink
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/viewevent');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addevent', {
        title: 'Event'
    });
    }   
};



exports.updateevent= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.date + ' ' + req.body.time);
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            name: name,
                colid: colid,
                user: user1,
                department:department,
                eventname: req.body.eventname,
                description: req.body.description,
                department: req.body.department,
                brochurelink: req.body.brochurelink,
                date: newdate, //req.body.classdate,
                time: req.body.time,
                coordinator: req.body.coordinator,
                type: req.body.type,
                eventlink: req.body.eventlink
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewevent');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewevent');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteevent= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewevent');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewevent');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







