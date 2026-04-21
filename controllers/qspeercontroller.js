
const Qspeers=require('./../Models/qspeers');
const Link=require('./../Models/uploadlink');


exports.getaddqspeers= (req,res) => {
    //res.cookie("user","Akshata");
    //const user1=req.cookies['user'];
    res.status(200).render('qspeers1', {
        title: 'Academic peer data collection',
        uni: req.query.uni,
        colid:req.query.colid
    });
    
    
};



exports.createqspeers= async (req,res) => {

    try{ 
            const pub1= await Qspeers.create({
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
      
        res.redirect('/addqspeers?uni=' + req.body.uni + '&colid=' + req.body.colid);
       
    } catch(err) {
        req.flash("error", "Data could not be added successfully. Error " + err );
       //req.flash("success", "Category has been added successfully for " + req.cookie.user);
       res.redirect('/addqspeers?uni=' + req.body.uni + '&colid=' + req.body.colid);
     

    }   
};
