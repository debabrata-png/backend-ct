const Pat=require('./../Models/instructions');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getaddins= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addinstruction', {
            title: 'All instructions'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};

exports.getviewins= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const role=req.cookies['role'];
        if(role == 'Admin') {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewinstructions', {
                categories: lcat1233,
                title: 'List instructions'
            
        });
        } else {
            req.flash("error", "You are not authorized or not logged in.");
            res.redirect('/notauthorized');

        }               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};


exports.getexportproject= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('user')
            .equals(user1);
            //res.status(200).send('Hello world for all the tours through db new router');
            let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('Customers'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'name', width: 30 },
		{ header: 'User', key: 'user', width: 30},
		{ header: 'Project', key: 'project', width: 30},
        { header: 'Agency', key: 'agency', width: 30},
        { header: 'Type', key: 'type', width: 30},
        { header: 'YoP', key: 'yop', width: 30},
        { header: 'Department', key: 'department', width: 30},
        { header: 'Funds', key: 'funds', width: 30},
        { header: 'Duration', key: 'duration', width: 30}

	];
	
	// Add Array Rows
	worksheet.addRows(lcat1233);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=project.xlsx");


    // Write to File
	// workbook.xlsx.writeFile(res)
    // .then(function() {
    //     console.log("file saved!");
    //     res.end();
    // });

    var tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(function() {
            //console.log('file is written');
            res.sendFile(tempFilePath, function(err){
                //console.log('---------- error downloading file: ' + err);
            });
        });




        //     res.status(200).render('viewproject', {
        //         categories: lcat1233,
        //         title: 'List projects'
            
        // });
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



exports.geteditins= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editinstruction', {
                category: leditcat,
                title: 'Edit instruction'
            
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



exports.createinstruction= async (req,res) => {

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
                content: req.body.content,
                link: req.body.link,
                status: req.body.status,
                type: req.body.type,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
        //    res.status(200).render('addpub', {
        //     title: 'Add publication'
        // });
        res.redirect('/viewinstructions');

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }



       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addinstruction', {
        title: 'Instructions'
    });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};



exports.updateinstruction= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        //console.log('Updating');
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
            title: req.body.title,
            content: req.body.content,
            link: req.body.link,
            status: req.body.status,
            type: req.body.type
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewinstructions');
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewinstructions');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};

exports.deleteinstruction= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        await Pat.findByIdAndDelete(req.body.category_id);
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewinstructions');
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
    //    res.status(200).render('addcategory', {
    //     title: 'Book category'
    // });
    res.redirect('/viewinstructions');
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







