const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const nallcourses=require('./../Models/nallcourses');
const addonc=require('./../Models/addonc');
const nuexplearning=require('./../Models/nuexplearning');
const admission=require('./../Models/admission');

const doc121bos=require('./../Models/doc121bos');

const userall=require('./../Models/user');


exports.admcount= async (req,res) => {
    try{
        //const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await admission.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        programname: '$programname',
                        programcode: '$programcode',
                        sancseat: '$sancseat',
                        studadmt: '$studadmt'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var sancseat=0;
        var studadmt=0;
        var percentage=0;
        lcat1233.forEach(async function(data){
            sancseat=sancseat+parseInt(data._id.sancseat);
            studadmt=studadmt+parseInt(data._id.studadmt);
   
        })

        percentage=Math.floor(studadmt/sancseat*100);

        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
               
                percentage:percentage
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

exports.expcount= async (req,res) => {
    try{
        //const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await nuexplearning.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        programname: '$programname',
                        programcode: '$programcode'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var totalcourse=0;
        lcat1233.forEach(async function(data){
            totalcourse=totalcourse+data.total_attendance;
   
        })

        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
               
                totalcourse:totalcourse
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

exports.vaccount= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await addonc.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        coursetitle: '$coursetitle',
                        coursecode: '$coursecode'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var totalcourse=0;
        lcat1233.forEach(async function(data){
            totalcourse=totalcourse+data.total_attendance;
   
        })

        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
               
                totalcourse:totalcourse
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };


  exports.doc132populate= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await addonc.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        coursetitle: '$coursetitle',
                        coursecode:'$coursecode',
                        year:'$year'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var totalcourse=0;
        lcat1233.forEach(async function(data){
            
            const pub1= await doc132att.create({
                name: req.query.name,
                colid: req.query.colid,
                user: req.query.user,
                year:data._id.year,
    course:data._id.coursetitle,
    coursecode:data._id.coursecode,
    status1: 'Submitted',
                comments: 'NA'
            });
   
        })

        const pub2= await doc132brochure.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:data._id.year,
course:data._id.coursetitle,
coursecode:data._id.coursecode,
type:'Circular',
status1: 'Submitted',
            comments: 'NA'
        });

        const pub3= await doc132cert.create({
            name: req.query.name,
            colid: req.query.colid,
            user: req.query.user,
            year:data._id.year,
course:data._id.coursetitle,
coursecode:data._id.coursecode,
status1: 'Submitted',
            comments: 'NA'
        });
        
       
      
        //console.log(lcat1233);
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

exports.newcoursecount= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await nallcourses.aggregate([
            { 
                $match: {colid: colid1 }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        coursecode: '$coursecode'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var totalcourse=0;
        lcat1233.forEach(async function(data){
            totalcourse=totalcourse+data.total_attendance;
   
        })
        const lcat1234= await nallcourses.aggregate([
            { 
                $match: {colid: colid1, discontinueyear: 'Yes' }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        coursecode: '$coursecode'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var newcourse=0;
        lcat1234.forEach(async function(data){
            newcourse=newcourse+data.total_attendance;
   
        })

        var percentage=Math.floor(newcourse/totalcourse*100);

      
        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
                newcourse: newcourse,
                totalcourse:totalcourse,
                percentage:percentage
            }   
        });               
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });
  
    }  
  };

  exports.doc121bospopulate= async (req,res) => {
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await nallcourses.aggregate([
            { 
                $match: {colid: colid1, discontinueyear: 'Yes' }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        department: '$department',
                        program:'$program',
                        introductionyear:'$introductionyear'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        var totalcourse=0;
        lcat1233.forEach(async function(data){
            totalcourse=totalcourse+data.total_attendance;
            const pub1= await doc121bos.create({
                name: req.query.name,
                colid: req.query.colid,
                user: req.query.user,
                department:data._id.department,
    program:data._id.program,
    year:data._id.introductionyear,
    mdate:'01/01/2018',
    regulation:'NA',
    status1: 'Submitted',
                comments: 'NA'
            });
   
        })
        
       
      
        //console.log(lcat1233);
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




  

exports.getuserpassword= async (req,res) => {
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
       
        const lcat1233= await userall.find()
        .where('email')
        .equals(user1);
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