const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const CBCS=require('./../Models/cbcs');
const BOS=require('./../Models/bos');
const Event=require('./../Models/event');
const Admission=require('./../Models/admission');
const Reservecat=require('./../Models/reservecat');
const Teacherdata=require('./../Models/teacherdata');
const Passexam=require('./../Models/passexam');
const Awards=require('./../Models/awards');
const Extact=require('./../Models/extact');
const Collab=require('./../Models/collab');
const Mou=require('./../Models/mou');
const Ict=require('./../Models/ict');
const Expenditure=require('./../Models/expenditure');
const Scholarship=require('./../Models/studschsp');
const Library=require('./../Models/library');
const Funds=require('./../Models/funds');
const Quality=require('./../Models/quality');
const Skilldev=require('./../Models/skilldev');
const Careercounsel=require('./../Models/careercounsel');
const Placement=require('./../Models/placement');
const Higheredu=require('./../Models/higheredu');
const Higherexam=require('./../Models/higherexam');
const Teacherfs=require('./../Models/teacherfs');
const Egovern=require('./../Models/egovern');
const Addonc=require('./../Models/addonc');
const Instawards=require('./../Models/extawards');
const Kpi=require('./../Models/kpi');
const Syllabusrev=require('./../Models/syllabusrev');
const Employability=require('./../Models/employability');
const Explearning=require('./../Models/explearning');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Project = require('../Models/projects');
const Seminar=require('./../Models/seminar');
const Department=require('./../Models/department');

const Publication=require('./../Models/publications');
const Patents=require('./../Models/patents');
const Book=require('./../Models/book');
const Patent = require('./../Models/patents');

exports.getmoualert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Mou.aggregate([
            { 
                $match: {colid: colid1, year: req.query.year }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        question: '$colid'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        lcat1233.forEach(async function(data){
            //console.log(data.link);
            moucount=data.total_attendance;
            
        })
        const lcat1=await Kpi.findOneAndUpdate( {metric: '3.7.2', colid: colid1},{
            currentvalue: moucount
        });
        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
                moucount: moucount,
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

exports.getcollabalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Collab.aggregate([
            { 
                $match: {colid: colid1, year: req.query.year }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        question: '$colid'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        lcat1233.forEach(async function(data){
            //console.log(data.link);
            moucount=data.total_attendance;
            
        })
        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
                count: moucount,
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

exports.getaddoncalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Addonc.aggregate([
            { 
                $match: {colid: colid1, year: req.query.year }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        question: '$colid'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        lcat1233.forEach(async function(data){
            //console.log(data.link);
            moucount=data.total_attendance;
            
        })
        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
                count: moucount,
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

exports.getexplearningyear= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        
        const colid1=parseInt(req.query.colid);
        

        const lcat1233= await Explearning.aggregate([
            { 
                $match: {colid: colid1, year: req.query.year, type: { $in: ['Field Work/Visits', 'Research Projects' ] } }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        department: '$department',
                        year: '$year',
                        program: '$programname',
                        type: '$type'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        
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

exports.getqualityalert= async (req,res) => {
    try{
        
        const colid1=parseInt(req.query.colid);
        var moucount=0;
        const lcat1233= await Quality.aggregate([
            { 
                $match: {colid: colid1, year: req.query.year }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        question: '$colid'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        lcat1233.forEach(async function(data){
            //console.log(data.link);
            moucount=data.total_attendance;
            
        })
        //console.log(lcat1233);
        res.status(200).json({
            status:'Success',
            data: {
                count: moucount,
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

exports.depnotexplist= async (req,res) => {
    try{
        
        const lcat1233= await Department
            .aggregate([
                {
                    $lookup: {
                      from: 'experentiallearnings', 
                      localField: 'department', 
                      foreignField: 'department', 
                      as: 'explist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'explist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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


exports.nopublist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'pubs', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'nopublist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'nopublist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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

exports.nobooklist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'books', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'nopublist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'nopublist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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


exports.nosemlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'seminars', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'nopublist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'nopublist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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


exports.noprojectlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'projects', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'nopublist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'nopublist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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

exports.nopatentlist= async (req,res) => {
    try{
        
        const lcat1233= await User
            .aggregate([
                {
                    $lookup: {
                      from: 'patents', 
                      localField: 'email', 
                      foreignField: 'user', 
                      as: 'nopublist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'nopublist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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



exports.getiprbyyear= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await Event.aggregate([
            { 
                $match: {colid: colid1, academicyear: req.query.academicyear, type: { $in: ['Research/IPR', 'Extension Lecture', 'Conference/Seminar' ] } }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        department: '$department',
                        academicyear: '$academicyear',
                        type: '$type'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        
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

exports.geteventtypebyyear= async (req,res) => {
    //res.cookie("user","Akshata");
  
    try{
        
        const colid1=parseInt(req.query.colid);
        const lcat1233= await Event.aggregate([
            { 
                $match: {colid: colid1, academicyear: req.query.academicyear, type: req.query.type }
            },
            { 
                $group: {
                    // _id:['$regno','$name'],
                    // _id:['$regno','$name'], 
                    _id: {
                        department: '$department',
                        academicyear: '$academicyear',
                        type: '$type'
                    },
                    total_attendance: {$sum: 1}
                }
            }
        ]);
        
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


exports.nosyllabusrevprogs= async (req,res) => {
    try{
        
        const lcat1233= await Syllabusrev
            .aggregate([
                {
                    $lookup: {
                      from: 'depprograms', 
                      localField: 'programcode', 
                      foreignField: 'programcode', 
                      as: 'nopublist'
                    }
                  }, {
                    $match: {
                      'colid': parseInt(req.query.colid)
                    }
                  }
                  ,
                  {
                    $match: {
                        'nopublist': []
                      }
                  }
                  ]);
            
            //console.log(lcat1233);
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