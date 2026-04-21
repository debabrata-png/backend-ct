const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const Supportingdoc=require('./../Models/supportingdoc');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');

exports.loginapi= async (req,res) => {
    try{

        const email=req.query.email;
        const password=req.query.password;
        User.findOne({ email: email, password: password  }, (err, role) => {
            if (err) {
                res.status(201).json({
                    status:'Error'
                });
            }
            if(role) {
                // res.cookie("user",String([role.email]));
                // res.cookie("name",String([role.name]));
                // res.cookie("department",String([role.department]));
                // res.cookie("colid",String([role.colid]));
                // res.cookie("role",String([role.role]));
                const token=jwt.sign({ user: email, colid: String([role.colid]) }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                res.status(200).json({
                    status:'Success',
                    user: String([role.email]),
                    role: String([role.role]),
                    name: String([role.name]),
                    colid: String([role.colid]),
                    regno: String([role.regno]),
                    section: String([role.section]),
                    semester: String([role.semester]),
                    token: token
                });
            } else {
                res.status(201).json({
                    status:'Invalid username or password',
                });
            }
          });
    } catch(err) {
        res.status(201).json({
            status:'Error ' + err,
        });

    }  
};

exports.getsupportingdoc= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const field1=req.query.field1;
        const lcat1233= await Supportingdoc.find()
        .where('user')
        .equals(user1)
        .where('field1')
        .equals(field1);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('Experential Project')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            // link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getsupportingdocbyfield1= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const field1=req.query.field1;
        const lcat1233= await Supportingdoc.find()
        .where('field1')
        .equals(field1);
   
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            // link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getsupportingdocbyfield2= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        //const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        
        //const user1=req.query.user;
        const field1=req.query.field1;
        const lcat1233= await Supportingdoc.find()
        .where('field1')
        .equals(field1)
        .where('colid')
        .equals(req.query.colid);
   
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            // link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getsupportingdocbyfield23= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        //const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        
        //const user1=req.query.user;
        const field1=req.query.field1;
        const lcat1233= await Supportingdoc.find()
        .where('field1')
        .equals(field1);
   
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            // link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.getallsupportingdocs= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        
        const lcat1233= await Supportingdoc.find()
        .where('colid')
        .equals(req.query.colid);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('Experential Project')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            // link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.createsupportingdoc= async (req,res) => {


    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const name=req.query.name;
        
        const pat1= await Supportingdoc.create({
            colid: colid,
            name: name,
            user: user1,
            classdate:new Date(),
            filename: req.query.filename,
            link: req.query.link,
            criteria:req.query.criteria,
            metric:req.query.metric,
            type:req.query.type,
            collection1:req.query.collection1,
            field1:req.query.field1
        });
        res.status(200).json({
            status:'Success'
             
        }); 
        
    
    } catch(err) {
        res.status(200).json({
            status:'Error',
            message: err  
        }); 

    }   
};

exports.createsupportingdoc1= async (req,res) => {


    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        const user1=req.query.user;
        const colid=req.query.colid;
        const name=req.query.name;
        
        const pat1= await Supportingdoc.create({
            colid: colid,
            name: name,
            user: user1,
            classdate:new Date(),
            filename: req.query.filename,
            link: req.query.link,
            criteria:req.query.criteria,
            metric:req.query.metric,
            type:req.query.type,
            description:req.query.description,
            comments:req.query.comments,
            collection1:req.query.collection1,
            field1:req.query.field1
        });
        res.status(200).json({
            status:'Success'
             
        }); 
        
    
    } catch(err) {
        res.status(200).json({
            status:'Error',
            message: err  
        }); 

    }   
};

exports.getallsupportingdocsbytype= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
        } catch(err1234) {
            //console.log(err1234);
        }
        
        const lcat1233= await Supportingdoc.find()
        .where('colid')
        .equals(req.query.colid)
        .where('metric')
        .equals(req.query.metric)
        .where('type')
        .equals(req.query.type);
        // const link123= await Link.find()
        // .where('criteria')
        // .equals('Experential Project')
        // .where('colid')
        // .equals(colid);
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            // link: link123
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};