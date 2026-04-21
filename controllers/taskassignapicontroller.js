const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const TaskA=require('./../Models/taskassign');
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

exports.gettaskassign= async (req,res) => {
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
        const colid=req.query.colid;
        const lcat1233= await TaskA.find()
        .where('taskid')
        .equals(req.query.taskid);
        
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.getmytaskassign= async (req,res) => {
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
        const colid=req.query.colid;
        const lcat1233= await TaskA.find()
        .where('assignedtouser')
        .equals(user1)
        .where('status')
        .ne('Completed');
        
       //res.status(200).send('Hello world for all the tours through db new router');
       res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

exports.createtaskassign= async (req,res) => {

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
  
        const pub1= await TaskA.create({ 
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            taskid: req.query.taskid,
            title: req.query.title,
            assignedtoname: req.query.assignedtoname,
            assignedtouser: req.query.assignedtouser,
            instructions: req.query.instructions,
            comments: req.query.comments,
            documentlink: req.query.documentlink,
            classdate: req.query.classdate,
            classtime: req.query.classtime,
            status: req.query.status
            
        });
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updatetaskassign= async (req,res) => {

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
      
        const lcat1= await TaskA.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            taskid: req.query.taskid,
            title: req.query.title,
            assignedtoname: req.query.assignedtoname,
            assignedtouser: req.query.assignedtouser,
            instructions: req.query.instructions,
            comments: req.query.comments,
            documentlink: req.query.documentlink,
            classdate: req.query.classdate,
            classtime: req.query.classtime,
            status: req.query.status

        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.updatetaskassignticket= async (req,res) => {

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
      
        const lcat1= await TaskA.findByIdAndUpdate( req.query.id,{
            comments: req.query.comments,
            status: req.query.status

        });
        
        res.status(200).json({
            status:'Success'
        });
      
   
              
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};



exports.deletetaskassign= async (req,res) => {

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
        const user=req.query.user;
        await TaskA.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status:'Success'
        });
               
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};