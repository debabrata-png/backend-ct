const Pub=require('./../Models/taskassign');
const Link=require('./../Models/uploadlink');
const User=require('./../Models/user');


exports.getaddtaskassign= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.cookie("taskassignname",req.query.name);
        res.cookie("taskassignemail",req.query.email);
        res.status(200).render('addtaskassign', {
            title: 'Add task assignment'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getselecttaskassign= async (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    const colid=req.cookies['colid'];
    if(user1) {
        const lcat1233= await User.find()
            .where('colid')
            .equals(colid);
            
        res.status(200).render('selectfacultytask', {
            categories: lcat1233,
            title: 'Select faculty'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.status(200).render('login', {
            title: 'Login'
        });
    }
    
};

exports.getviewtaskassign= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('taskid')
            .equals(req.query.taskid);
            res.cookie("taskid",req.query.taskid);
            res.cookie("task",req.query.task);
            
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewtaskassign', {
                categories: lcat1233,
                title: 'Task assignment',
                taskid: req.query.taskid,
                task: req.query.task
            
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

exports.getviewtaskmy= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pub.find()
            .where('assignedtouser')
            .equals(user1)
            .where('status')
            .ne('Completed');
            //res.cookie("taskid",req.query.taskid);
            //res.cookie("task",req.query.task);
            
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewtaskmy', {
                categories: lcat1233,
                title: 'Task assignment'
            
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

exports.getedittaskassign= async (req,res) => {
    //res.cookie("user","Akshata");
    //const taskid=req.cookies['taskid'];
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('edittaskassign', {
                pub: leditcat,
                category: leditcat,
                title: 'Edit task assignment'
            
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

exports.getedittaskmy= async (req,res) => {
    //res.cookie("user","Akshata");
    //const taskid=req.cookies['taskid'];
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pub.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('edittaskmy', {
                pub: leditcat,
                category: leditcat,
                title: 'Edit task assignment'
            
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



exports.createtaskassign= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const assignedtoname=req.cookies['taskassignname'];
        const assignedtouser=req.cookies['taskassignemail'];
        const taskid=req.cookies['taskid'];
        const task=req.cookies['task'];
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        if(user1) {
            const pub1= await Pub.create({
                name: name,
                colid: colid,
                title: task,
                taskid: taskid,
                instructions: req.body.instructions,
                assignedtoname:assignedtoname,
                assignedtouser:assignedtouser,
                status: 'Assigned',
                classdate: newdate, //req.body.classdate,
                classtime: req.body.classtime,
                user: user1
            });
          
           req.flash("success", "Data has been added successfully");
           res.redirect('/viewtaskassign?taskid=' + taskid + '&task=' + task);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }
       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addtaskassign?name=' + assignedtoname + '&email=' + assignedtoemail, {
        title: 'Add task assignment'
    });
    }   
};



exports.updatetaskassign= async (req,res) => {
    const taskid=req.cookies['taskid'];
    const task=req.cookies['task'];

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            
          
            status: req.body.status,
            classdate: newdate, //req.body.classdate,
            classtime: req.body.classtime
        });
        
       
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewtaskassign?taskid=' + taskid + '&task=' + task);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
      
        res.redirect('/viewtaskassign?taskid=' + taskid + '&task=' + task);
       

    }   
};

exports.updatetaskmy= async (req,res) => {
    const taskid=req.cookies['taskid'];
    const task=req.cookies['task'];

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const newdate=new Date(req.body.classdate + ' ' + req.body.classtime);
        const lcat1= await Pub.findByIdAndUpdate( req.params.id,{
            
            documentlink: req.body.documentlink,
            comments: req.body.comments,
            status: req.body.status
        });
        
       
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewtaskmy');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
      
        res.redirect('/viewtaskmy');
       

    }   
};

exports.deletetaskassign= async (req,res) => {
    const taskid=req.cookies['taskid'];
    const task=req.cookies['task'];

    try{
        const user1=req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewtaskassign?taskid=' + taskid + '&task=' + task);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       
        res.redirect('/viewtaskassign?taskid=' + taskid + '&task=' + task);
       

    }   
};

