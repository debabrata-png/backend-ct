const Pat=require('./../Models/kpi');
const Link=require('./../Models/uploadlink');
const Pat1=require('./../Models/attendance');
const Pub=require('./../Models/taskassign');


exports.getaddkpi= (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    if(user1) {
        res.status(200).render('addkpi', {
            title: 'Add KPI'
        });

    } else {
        req.flash("error", "You have been logged out. Please login to continue.");
        res.redirect('/login');
    }
    
};





exports.getviewkpi= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('metric')
            .equals(req.query.metric)
            .where('type')
            .equals(req.query.type);

            res.cookie("criteria",String(req.query.criteria));
            res.cookie("metric",String(req.query.metric));
            res.cookie("kpitype",String(req.query.type));
           
            res.status(200).render('viewkpi', {
                categories: lcat1233,
                //link:link123,
                title: 'List KPI'
            
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

exports.getviewallkpi= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid);

            
           
            res.status(200).render('viewallkpi', {
                categories: lcat1233,
                //link:link123,
                title: 'List KPI'
            
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





exports.geteditkpi= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        if(user1) {
            const leditcat= await Pat.findById(req.params.id);
           
            //res.status(200).send('Hello world for all the tours through db new router');
            //req.flash("success", "Edit data for " + user1);
            res.status(200).render('editkpi', {
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



exports.createkpi= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const department=req.cookies['department'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const criteria=req.cookies['criteria'];
        const metric=req.cookies['metric'];
        const type=req.cookies['kpitype'];
        
        if(user1) {
            const pat1= await Pat.create({
                name: name,
                colid: colid,
                comments: req.body.comments,
                criteria:criteria,
                metric:metric,
                currentvalue:req.body.currentvalue,
                firstkpi:req.body.firstkpi,
                threekpi:req.body.threekpi,
                fivekpi:req.body.fivekpi,
                link:req.body.link,
                type: type,
                user: user1
            });
         
           //req.flash("success", "Category has been added successfully");
           req.flash("success", "Data has been added successfully for user " + req.cookies['user']);
           res.redirect('/viewkpi?criteria=' + criteria + '&metric=' + metric + '&type=' + type);

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');
        }   
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.status(200).render('addkpi', {
        title: 'Add KPI'
    });
    }   
};




exports.updatekpi= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const department=req.cookies['department'];
        const name=req.cookies['name'];
        const criteria=req.cookies['criteria'];
        const metric=req.cookies['metric'];
        const type=req.cookies['kpitype'];
        
        const lcat1= await Pat.findByIdAndUpdate( req.params.id,{
                name: name,
                colid: colid,
                comments: req.body.comments,
                criteria:criteria,
                metric:metric,
                currentvalue:req.body.currentvalue,
                firstkpi:req.body.firstkpi,
                threekpi:req.body.threekpi,
                fivekpi:req.body.fivekpi,
                link:req.body.link,
                type:type,
                user: user1
        });
        
       //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
       req.flash("success", "Data has been updated successfully");
       res.redirect('/viewkpi?criteria=' + criteria + '&metric=' + metric + '&type=' + type);
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
      
    res.redirect('/viewkpi?criteria=' + criteria + '&metric=' + metric + '&type=' + type);
       
    }   
};

exports.deletekpi= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const criteria=req.cookies['criteria'];
        const metric=req.cookies['metric'];
        const type=req.cookies['kpitype'];

        await Pat.findByIdAndDelete(req.body.category_id);

        
       
        
       req.flash("success", "Data has been deleted successfully");
       res.redirect('/viewkpi?criteria=' + criteria + '&metric=' + metric + '&type=' + type);
    } catch(err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err );
       
    res.redirect('/viewkpi?criteria=' + criteria + '&metric=' + metric + '&type=' + type);
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }   
};







