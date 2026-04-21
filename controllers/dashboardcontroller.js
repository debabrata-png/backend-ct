const Pat=require('./../Models/instructions');

exports.getdashboard= (req,res) => {
    //res.cookie("user","Akshata");
    res.status(200).render('dashboard1', {
        title: 'User dashboard'
    });
};

exports.getviewdash= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const photo=req.cookies['photo'];
        const name=req.cookies['name'];
        const status1=1;
        if(user1) {
            const lcat1233= await Pat.find()
            .where('colid')
            .equals(colid)
            .where('status')
            .equals(status1)
            .where('type')
            .equals('Dashboard');
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).render('dashboard1', {
                categories: lcat1233,
                title: 'Dashboard',
                photo: photo,
                name: name,
                user: user1
            
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
