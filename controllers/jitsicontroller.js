const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');

exports.getviewjitsi= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const regno=req.cookies['regno'];
        const name=user1 + ' (' + regno + ')';
        if(user1) {
            
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewjitsi2', {
                classid: req.params.id,
                user: user1,
                regno: regno,
                name: name,
                title: 'Online Classrooms'
            
        });
        } else {
            res.status(200).render('jitsilogin', {
                classid: req.params.id,
                title: 'Online Classrooms'
            
        });
        }               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.postlogin2= async (req,res) => {
    //res.cookie("user","Akshata");
    const classid=req.body.classid;
    //console.log(classid);

    try{
        
        const email=req.body.email;
        const password=req.body.password;
        var name= " ";
        User.findOne({ email: email, password: password }, (err, role) => {
            if (err) {
                req.flash("error", "An error occured " + err);
                res.status(200).render('jitsilogin', { 
                    classid: classid,           
                    title: 'Login'
                    
                });
            }
            //console.log('authenticated');
            if(role) {
                name=String([role.email]) + ' (' + String([role.regno]) + ')';
                res.cookie("user",String([role.email]));
                res.cookie("name",String([role.name]));
                res.cookie("department",String([role.department]));
                res.cookie("colid",String([role.colid]));
                res.cookie("role",String([role.role]));
                res.cookie("photo",String([role.photo]));
                if(String([role.role])=="Student") {
                    res.cookie("regno",String([role.regno]));
                    res.cookie("section",String([role.section]));
                    res.cookie("semester",String([role.semester]));
                    //res.redirect('/viewclassstud');
                } else {
                    //res.redirect('/dashboard');
                }
                res.status(200).render('viewjitsi2', {
                    classid: classid,
                    name: name,
                    user: String([role.email]),
                    title: 'Online Classrooms'
                
            });
            } else {
                req.flash("error", "Invalid email or password ");
                res.status(200).render('jitsilogin', { 
                    classid: classid,           
                    title: 'Login'
                    
                });

            }

          });

    } catch(err) {
        req.flash("error", "An error occured " + err);
        res.status(200).render('jitsilogin', { 
            classid: classid,           
            title: 'Login'
            
        });


    }  
};





exports.geteditict= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editict', {
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



exports.createict= async (req,res) => {

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
                classroom: req.body.classroom,
                seminarhall: req.body.seminarhall,
                facitype: req.body.facitype,
                link: req.body.link,
                status1: req.body.status1,
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
        res.redirect('/viewict');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addict', {
        title: 'Add ICT enabled Classrooms and Seminar Halls'
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

exports.updateict= async (req,res) => {

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
                classroom: req.body.classroom,
                seminarhall: req.body.seminarhall,
                facitype: req.body.facitype,
                link: req.body.link,
                status1: req.body.status1,
                comments: req.body.comments
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewict');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewict');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteict= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewict');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewict');
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