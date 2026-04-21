const Pat=require('./../Models/event');
const Link=require('./../Models/uploadlink');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


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
            const link123= await Link.find()
            .where('criteria')
            .equals('Activities')
            .where('colid')
            .equals(colid);
            res.status(200).render('viewevent3', {
                categories: lcat1233,
                link: link123,
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

exports.getexportevent= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const role=req.cookies['role'];
        if (role == 'Admin') {
        } else {
            res.redirect('/notauthorized');
        }
        if(user1) {
            const lcat1233= await Pub.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Event'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'User', key: 'user', width: 30},
		{ header: 'Name of event/activity', key: 'eventname', width: 30 },
		{ header: 'Description', key: 'description', width: 30},
		{ header: 'Department', key: 'department', width: 30},
        { header: 'Brochure link', key: 'brochurelink', width: 30},
        { header: 'Date', key: 'date', width: 30},
        { header: 'Time', key: 'time', width: 30},
        { header: 'Name of coordinator', key: 'coordinator', width: 30},
        { header: 'Type of activity', key: 'type', width: 30},
        { header: 'Link to activity/event', key: 'eventlink', width: 30},
        { header: 'Status', key: 'status1', width: 30},
,       { header: 'Comments', key: 'comments', width: 30}

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=events.xlsx");


    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                console.log('---------- error downloading file: ' + err);
            });
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
                eventlink: req.body.eventlink,
                status1: req.body.status1,
                comments: req.body.comments
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
        console.log('Updating');
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
                eventlink: req.body.eventlink,
                status1: req.body.status1,
                comments: req.body.comments
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







