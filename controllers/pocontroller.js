const Pub=require('./../Models/po');
const Link=require('./../Models/uploadlink');


exports.getaddpo= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addpo', {
            title: 'All PO'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewpo= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('user')
            .equals(user1);
            const link123= await Link.find()
            .where('criteria')
            .equals('PO')
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewpo', {
                categories: lcat1233,
                link: link123,
                title: 'List of PO'
            
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

exports.geteditpo= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editpo', {
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



exports.createpo= async (req,res) => {

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
                programcode: req.body.programcode,
                programname: req.body.programname,
                pocode: req.body.pocode,
                po: req.body.po,
                
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
        res.redirect('/viewpo');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addpo', {
        title: 'Add PO'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// exports.geteditcat= async (req,res) => {
//     //res.cookie("user","Akshata");
  
//     try{
//         const user1=req.cookies['user'];
//         console.log(req.params.id);
//         const leditcat= await Lcat.findById(req.params.id);
//         //.where('_id')
//         //.equals(req.params.id);
//         //res.status(200).send('Hello world for all the tours through db new router');
//         res.status(200).render('editcategory', {
//             category: leditcat,
//             title: 'Edit Categories'
            
//         });
       
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

exports.updatepo= async (req,res) => {

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
            programcode: req.body.programcode,
            programname: req.body.programname,
            pocode: req.body.pocode,
            po: req.body.po,
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewpo');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewpo');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deletepo= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewpo');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewpo');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

// exports.getallpub2= async (req,res) => {
//     //res.cookie("user","Akshata");
  
//     try{
//         const lcat123= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//         res.status(200).render('viewcategory', {
//             categories: lcat123,
//             title: 'List Categories'
            
//         });
       
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };



// exports.getallcat= async (req,res) => {

//     try{
//         const lcat12= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//        res.status(201).json({
//            status:'Success',
//            data: {
//                lcat12
//            }
//        });
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }   
// };

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