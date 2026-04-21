const Pub=require('../Models/naacopen');
const Link=require('../Models/uploadlink');


exports.getviewopenuni= async (req,res) => {
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
            res.status(200).render('viewopenuni', {
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

exports.getviewadminexportopenuni= async (req,res) => {
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
            res.status(200).render('viewadminexportopenuni', {
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




