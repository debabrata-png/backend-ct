const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const Link=require('./../Models/uploadlink');
const User=require('./../Models/user');
const Book=require('./../Models/book');
const Patents=require('./../Models/patents');
const Projects=require('./../Models/projects');
const Seminar=require('./../Models/seminar');
const Publications=require('./../Models/publications');
const Pubaqar=require('./../Models/pubaqar');


exports.getbookbyfaculty= async (req,res) => {
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
        const lcat1233= await Book.find()
            .where('user')
            .equals(req.query.user);
            const link123= await Link.find()
            .where('criteria')
            .equals('Books &Chapters')
            .where('colid')
            .equals(req.query.colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233,
                    link: link123
                }
         
            }); 
                    
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getallbooks= async (req,res) => {
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
        const lcat1233= await Book.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Books &Chapters')
            .where('colid')
            .equals(req.query.colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233,
                    link: link123
                }
         
            }); 
                    
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.createbookbyfaculty= async (req,res) => {

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
        const pat1= await Book.create({
            name: req.query.name,
            user: req.query.user,
            colid: req.query.colid,
            booktitle: req.query.booktitle,
            papertitle: req.query.papertitle,
            proceeding: req.query.proceeding,
            issn: req.query.issn,
            publisher: req.query.publisher,
            yop: req.query.yop,
            affiliated: req.query.affiliated,
            status1: req.query.status1,
            comments: req.query.comments
            
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
 
exports.updatebookbyfaculty= async (req,res) => {

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
        const lcat1= await Book.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            user: req.query.user,
            booktitle: req.query.booktitle,
            papertitle: req.query.papertitle,
            proceeding: req.query.proceeding,
            issn: req.query.issn,
            publisher: req.query.publisher,
            yop: req.query.yop,
            affiliated: req.query.affiliated,
            status1: req.query.status1,
            comments: req.query.comments,
            name:req.query.name
           
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

exports.deletebookbyfaculty= async (req,res) => {

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
        await Book.findByIdAndDelete(req.query.id);
        
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

exports.getpatentbyfaculty= async (req,res) => {
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
        const lcat1233= await Patents.find()
            .where('user')
            .equals(req.query.user);
            const link123= await Link.find()
            .where('criteria')
            .equals('Published Patents')
            .where('colid')
            .equals(req.query.colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233,
                    link: link123
                }
         
            }); 
        
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getallpatents= async (req,res) => {
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
        const lcat1233= await Patents.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Published Patents')
            .where('colid')
            .equals(req.query.colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233,
                    link: link123
                }
         
            }); 
        
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.createpatentbyfaculty= async (req,res) => {

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
        const pat1= await Patents.create({
            name: req.query.name,
            user: req.query.user,
            colid: req.query.colid,
            title: req.query.title,
            patentnumber: req.query.patentnumber,
            yop: req.query.yop,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.updatepatentbyfaculty= async (req,res) => {

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
        const lcat1= await Patents.findByIdAndUpdate( req.query.id,{
            name: req.query.name, 
            user: req.query.user,          
            title: req.query.title,
            patentnumber: req.query.patentnumber,
            yop: req.query.yop,
            status1: req.query.status1,
            comments: req.query.comments
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

exports.deletepatentbyfaculty= async (req,res) => {

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
        await Patents.findByIdAndDelete(req.query.id);
        
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

exports.getprojectbyfaculty= async (req,res) => {
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
        const lcat1233= await Projects.find()
            .where('user')
            .equals(req.query.user);
            const link123= await Link.find()
            .where('criteria')
            .equals('Research Projects')
            .where('colid')
            .equals(req.query.colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233,
                    link: link123
                }
         
            }); 
         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getallprojects= async (req,res) => {
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
        const lcat1233= await Projects.find()
            .where('colid')
            .equals(req.query.colid);
            const link123= await Link.find()
            .where('criteria')
            .equals('Research Projects')
            .where('colid')
            .equals(req.query.colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            res.status(200).json({
                status:'Success',
                data: {
                    classes : lcat1233,
                    link: link123
                }
         
            }); 
         
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.createprojectbyfaculty= async (req,res) => {

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
        const pat1= await Projects.create({
            name: req.query.name,
            user: req.query.user,
            colid: req.query.colid,
            project: req.query.project,
            agency: req.query.agency,
            yop: req.query.yop,
            funds: req.query.funds,
            type: req.query.type,
            duration: req.query.duration,
            status1: req.query.status1,
            department: req.query.department,
            comments: req.query.comments,
            level: req.query.level
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



exports.updateprojectbyfaculty= async (req,res) => {

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
        
        const lcat1= await Projects.findByIdAndUpdate( req.query.id,{
            name: req.query.name,
            user: req.query.user,
            project: req.query.project,
            agency: req.query.agency,
            yop: req.query.yop,
            funds: req.query.funds,
            type: req.query.type,
            duration: req.query.duration,
            status1: req.query.status1,
            comments: req.query.comments,
            level: req.query.level
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

exports.deleteprojectbyfaculty= async (req,res) => {

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
        await Projects.findByIdAndDelete(req.query.id);
        
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

exports.getseminarbyfaculty= async (req,res) => {
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
        const lcat1233= await Seminar.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('632')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
        res.status(200).json({
            status:'Success',
            data: {
                classes : lcat1233,
                link: link123
            }
     
        });           
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};

exports.getallseminars= async (req,res) => {
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
        const lcat1233= await Seminar.find()
        .where('colid')
        .equals(colid);
        const link123= await Link.find()
        .where('criteria')
        .equals('632')
        .where('colid')
        .equals(colid);
        //res.status(200).send('Hello world for all the tours through db new router');
        res.status(200).json({
            status:'Success',
            data: {
                classes : lcat1233,
                link: link123
            }
     
        });           
       
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }  
};



exports.createseminarbyfac= async (req,res) => {

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
     
        const pat1= await Seminar.create({
            name: req.query.name,
            colid: req.query.colid,
            title: req.query.title,
            duration: req.query.duration,
            yop: req.query.yop,
            amount: req.query.amount,
            membership: req.query.membership,
            user: req.query.user,
            status1: req.query.status1,
            comments: req.query.comments,
            role: req.query.role,
            paper: req.query.paper,
            level: req.query.level,
            type: req.query.type
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

exports.updateseminarbyfac= async (req,res) => {

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
      
        const lcat1= await Seminar.findByIdAndUpdate( req.query.id,{
            title: req.query.title,
            duration: req.query.duration,
            yop: req.query.yop,
            amount: req.query.amount,
            membership: req.query.membership,
            status1: req.query.status1,
            comments: req.query.comments,
            level:req.query.level,
            role:req.query.role,
            type: req.query.type,
            name: req.query.name
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

exports.deleteseminarbyfac= async (req,res) => {

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
        await Seminar.findByIdAndDelete(req.query.id);
        
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


exports.getviewpubbyfac= async (req,res) => {
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
        const lcat1233= await Publications.find()
        .where('user')
        .equals(user1);
        const link123= await Link.find()
        .where('criteria')
        .equals('Research Papers')
        .where('colid')
        .equals(colid);
    //res.status(200).send('Hello world for all the tours through db new router');
    res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });       
} catch(err) {
    res.status(200).json({
        status:'Error',
        message: err  
    }); 

}   
};

exports.getallpubs= async (req,res) => {
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
        const lcat1233= await Publications.find()
        .where('colid')
        .equals(colid);
        const link123= await Link.find()
        .where('criteria')
        .equals('Research Papers')
        .where('colid')
        .equals(colid);
    //res.status(200).send('Hello world for all the tours through db new router');
    res.status(200).json({
        status:'Success',
        data: {
            classes : lcat1233,
            link: link123
        }
 
    });       
} catch(err) {
    res.status(200).json({
        status:'Error',
        message: err  
    }); 

}   
};

exports.createpubbyfac= async (req,res) => {

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


        const pub1= await Publications.create({
            name: req.query.name,
            colid: req.query.colid,
            department: req.query.department,
            title: req.query.title,
            journal: req.query.journal,
            yop: req.query.yop,
            issn: req.query.issn,
            journallink: req.query.journallink,
            articlelink: req.query.articlelink,
            user: req.query.user,
            ugclisted: req.query.ugclisted,
            hindex: req.query.hindex,
            citation: req.query.citation,
            citationindex:req.query.citationindex,
            status1: req.query.status1,
            comments: req.query.comments,
            level: req.query.level
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

exports.updatepubbyfac= async (req,res) => {

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
        const lcat1= await Publications.findByIdAndUpdate( req.query.id,{
            title: req.query.title,
            journal: req.query.journal,
            yop: req.query.yop,
            issn: req.query.issn,
            journallink: req.query.journallink,
            articlelink: req.query.articlelink,
            user: req.query.user,
            ugclisted: req.query.ugclisted,
            status1: req.query.status1,
            comments: req.query.comments,
            hindex: req.query.hindex,
            citation: req.query.citation,
            citationindex:req.query.citationindex,
            level: req.query.level,
            name:req.query.name

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



exports.deletepubbyfac= async (req,res) => {

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
        await Publications.findByIdAndDelete(req.query.id);
        
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
exports.createassignment= async (req,res) => {


    try{
    const token=req.body.token;
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
        const user1=req.body.user;
        const colid=req.body.colid;
        const name=req.body.name;
        var dt1=new Date(req.body.classdate);
        const pat1= await Assignment.create({
        colid: colid,
        coursecode: req.body.coursecode,
        topic: req.body.topic,
        link: req.file.location,
        course: req.body.course,
        status: 1,
        classdate: dt1, //req.body.classdate,
        user: user1,
        name: name
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



    exports.getpubaqarbyfaculty= async (req,res) => {
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
            const lcat1233= await Pubaqar.find()
                .where('user')
                .equals(req.query.user);
                const link123= await Link.find()
                .where('criteria')
                .equals('Pubaqar')
                .where('colid')
                .equals(req.query.colid);
                //res.status(200).send('Hello world for all the tours through db new router');
                res.status(200).json({
                    status:'Success',
                    data: {
                        classes : lcat1233,
                        link: link123
                    }
             
                }); 
                        
        } catch(err) {
            res.status(400).json({
                status:'Failed',
                message: err
            });
    
        }  
    };
    
    
    
    exports.createpubaqarbyfaculty= async (req,res) => {
    
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
            const pat1= await Pubaqar.create({
                name: req.query.name,
                user: req.query.user,
                colid: req.query.colid,
                booktitle: req.query.booktitle,
                papertitle: req.query.papertitle,
                proceeding: req.query.proceeding,
                level: req.query.level,
                conference: req.query.conference,
                issn: req.query.issn,
                publisher: req.query.publisher,
                yop: req.query.yop,
                affiliated: req.query.affiliated,
                status1: req.query.status1,
                comments: req.query.comments
                
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
     
    exports.updatepubaqarbyfaculty= async (req,res) => {
    
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
            const lcat1= await Pubaqar.findByIdAndUpdate( req.query.id,{
                name: req.query.name,
                user: req.query.user,
                booktitle: req.query.booktitle,
                papertitle: req.query.papertitle,
                proceeding: req.query.proceeding,
                level: req.query.level,
                conference: req.query.conference,
                issn: req.query.issn,
                publisher: req.query.publisher,
                yop: req.query.yop,
                affiliated: req.query.affiliated,
                status1: req.query.status1,
                comments: req.query.comments
               
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
    
    exports.deletepubaqarbyfaculty= async (req,res) => {
    
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
            await Pubaqar.findByIdAndDelete(req.query.id);
            
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
