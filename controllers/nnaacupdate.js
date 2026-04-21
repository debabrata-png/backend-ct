const Addonc=require('./../Models/addonc');
const Admission=require('./../Models/admission');
const Awards=require('./../Models/awards');
const Bos=require('./../Models/bos');
const Career=require('./../Models/careercounsel');
const Cbcs=require('./../Models/cbcs');
const Collab=require('./../Models/collab');
const Econtent=require('./../Models/econtent');
const Egovern=require('./../Models/egovern');
const Event=require('./../Models/event');
const Exp=require('./../Models/expenditure');
const Extact=require('./../Models/extact');
const Extawards=require('./../Models/extawards');
const Funds=require('./../Models/funds');
const Highedu=require('./../Models/higheredu');
const Highexam=require('./../Models/higherexam');
const Ict=require('./../Models/ict');
const Lib=require('./../Models/library');
const Mou=require('./../Models/mou');
const Pass=require('./../Models/passexam');
const Place=require('./../Models/placement');
const Quality=require('./../Models/quality');
const Reserve=require('./../Models/reservecat');
const Result=require('./../Models/result');
const Seedm=require('./../Models/seedm');
const Skilldev=require('./../Models/skilldev');
const Scholar=require('./../Models/studschsp');
const Syllabus=require('./../Models/syllabusrev');
const Tdata=require('./../Models/teacherdata');
const Tfs=require('./../Models/teacherfs');
const User=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Kpi=require('./../Models/kpi');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.updateaddonccount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    var att1;
    if(req.query.metric=='1.3.2-1.3.3') {
        const lcat1233= await Addonc.aggregate([
            { 
            $match: {colid: colid1, year: '2020-21' }
            },
            { 
            $group: {
            _id:'$year', 
            total_attendance: {$sum: 1}
            }
            }
            ]);
            lcat1233.forEach(async function(data){
                //console.log(data.link);
                att1=data.total_attendance;
                console.log(att1);
                const lcat1=await Kpi.findOneAndUpdate( {metric: '1.3.2-1.3.3', colid: colid1},{
                    currentvalue: att1
                });
            })

    } else if (req.query.metric=='1.1.2 - 1.2.2') {
        const lcat1233= await Addonc.aggregate([
            { 
            $match: {colid: colid1, year: '2020-21' }
            },
            { 
            $group: {
            _id:'$year', 
            total_attendance: {$sum: 1}
            }
            }
            ]);
            lcat1233.forEach(async function(data){
                //console.log(data.link);
                att1=data.total_attendance;
                console.log(att1);
                const lcat1=await Kpi.findOneAndUpdate( {metric: '1.3.2-1.3.3', colid: colid1},{
                    currentvalue: att1
                });
            })

    }
    
    //console.log(lcat1233);
    res.redirect('/viewkpi');
    // res.status(200).json({
    // status:'Success',
    // data: {
    // classes : lcat1233
    // }
    // }); 
    } catch(err) {
    res.status(400).json({
    status:'Failed',
    message: err
    });
    
    } 
    };

exports.getadmissioncount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Admission.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getawardscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Awards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getboscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Bos.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getcareercount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Career.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getcbcscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Cbcs.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$yearofintro', 
    total_attendance: {$sum: 1}
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

exports.getcollabcount= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await Collab.aggregate([
        { 
        $match: {colid: colid1 }
        },
        { 
        $group: {
        _id:'$year', 
        total_attendance: {$sum: 1}
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
        


exports.getecontentcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Econtent.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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
  
exports.getegoverncount= async (req,res) => {
        try{
        const user1=req.query.user;
        const colid1=parseInt(req.query.colid);
        const lcat1233= await Egovern.aggregate([
        { 
        $match: {colid: colid1 }
        },
        { 
        $group: {
        _id:'$yearofimplement', 
        total_attendance: {$sum: 1}
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

// exports.geteventcount= async (req,res) => {
//     try{
//     const user1=req.query.user;
//     const colid1=parseInt(req.query.colid);
//     const lcat1233= await Event.aggregate([
//     { 
//     $match: {colid: colid1}
//     },
//     { 
//     $group: {
//     _id:'$year', 
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     classes : lcat1233
//     }
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
                
//     } 
// };

exports.getexpcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Exp.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getextactcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Extact.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getextawardscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Extawards.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getfundscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Funds.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.gethigheducount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Highedu.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.gethighexamcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Highexam.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

// exports.getictcount= async (req,res) => {
//     try{
//     const user1=req.query.user;
//     const colid1=parseInt(req.query.colid);
//     const lcat1233= await Ict.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id:'$year', 
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     classes : lcat1233
//     }
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
                
//     } 
// };

exports.getlibcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Lib.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getmoucount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Mou.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getpasscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Pass.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getplacecount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Place.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getqualitycount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Quality.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getreservecount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Reserve.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getresultcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Result.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getseedmcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Seedm.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

// exports.getskilldevcount= async (req,res) => {
//     try{
//     const user1=req.query.user;
//     const colid1=parseInt(req.query.colid);
//     const lcat1233= await Skilldev.aggregate([
//     { 
//     $match: {colid: colid1 }
//     },
//     { 
//     $group: {
//     _id:'$year', 
//     total_attendance: {$sum: 1}
//     }
//     }
//     ]);
//     //console.log(lcat1233);
//     res.status(200).json({
//     status:'Success',
//     data: {
//     classes : lcat1233
//     }
//     }); 
//     } catch(err) {
//     res.status(400).json({
//     status:'Failed',
//     message: err
//     });
                
//     } 
// };

exports.getscholarcount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Scholar.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.getsyllabuscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Syllabus.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$yearofintro', 
    total_attendance: {$sum: 1}
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

exports.gettdatacount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Tdata.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.gettfscount= async (req,res) => {
    try{
    const user1=req.query.user;
    const colid1=parseInt(req.query.colid);
    const lcat1233= await Tfs.aggregate([
    { 
    $match: {colid: colid1 }
    },
    { 
    $group: {
    _id:'$year', 
    total_attendance: {$sum: 1}
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

exports.updatepassword= async (req,res) => {

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
      
        const lcat1= await User.findOneAndUpdate( {email: req.query.user},{
            password: req.query.password,
            department:req.query.department
           
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

