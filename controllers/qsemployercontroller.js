
const Qsemployers=require('./../Models/qsemployers');
const Link=require('./../Models/uploadlink');


exports.getaddqsemployers= (req,res) => {
    //res.cookie("user","Akshata");
    //const user1=req.cookies['user'];
    res.status(200).render('qsemployers', {
        title: 'Employer data collection',
        uni: req.query.uni,
        colid:req.query.colid
    });
    
    
};



exports.createqsemployers= async (req,res) => {

    try{ 
            const pub1= await Qsemployers.create({
                name: req.body.name,
                colid: req.body.colid,
                department: req.body.department,
                user: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                designation: req.body.designation,
                institution: req.body.institution,
                country: req.body.country
            });
            
           req.flash("success", "Data has been added successfully");
      
        res.redirect('/addqsemployers?uni=' + req.body.uni + '&colid=' + req.body.colid);
       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.redirect('/addqsemployers?uni=' + req.body.uni + '&colid=' + req.body.colid);
     

    }   
};
