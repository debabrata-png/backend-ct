//const Pub=require('../Models/naacautonomous');
const Link=require('../Models/uploadlink');


exports.getviewnaacautonomous= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        if(user1) {
           // const lcat1233= await Pub.find()
            //.where('user')
           // .equals(user1);
            //const link123= await Link.find()
            //.where('colid')
            //.equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('viewnaacautonomous', {
                //categories: lcat1233,
                //link: link123,
                title: 'All NAAC Criterion'
            
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