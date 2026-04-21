const Ledgerstud = require('./../Models/ledgerstud')

exports.getAcademicYears = async (req,res)=>{
    try{

        const colid=req.query.colid

        const years = await Ledgerstud.distinct("academicyear",{colid})

        res.json(years)

    }catch(err){
        res.status(500).json(err)
    }
}


exports.getPrograms = async (req,res)=>{
    try{

        const colid=req.query.colid
        const academicyear=req.query.academicyear

        const programs = await Ledgerstud.distinct("programcode",
        {colid,academicyear})

        res.json(programs)

    }catch(err){
        res.status(500).json(err)
    }
}


exports.studentLedgerSummary = async (req,res)=>{

try{

const {academicyear,regno,colid}=req.query

const data = await Ledgerstud.aggregate([

{
$match:{
colid:Number(colid),
academicyear,
regno
}
},

{
$group:{
_id:"$feeitem",
total:{$sum:"$amount"}
}
},

{
$sort:{_id:1}
}

])

res.json(data)

}catch(err){
res.status(500).json(err)
}

}



exports.studentLedgerDetails = async (req,res)=>{

try{

const {academicyear,regno,colid}=req.query

const data = await Ledgerstud.find({
colid:Number(colid),
academicyear,
regno
}).sort({classdate:1})

res.json(data)

}catch(err){
res.status(500).json(err)
}

}



exports.programFeeSummary = async (req,res)=>{

try{

const {fromdate,todate,programcode,academicyear,colid}=req.query

const data = await Ledgerstud.aggregate([

{
$match:{
colid:Number(colid),
academicyear,
programcode,
classdate:{
$gte:new Date(fromdate),
$lte:new Date(todate)
}
}
},

{
$group:{
_id:"$feeitem",
total:{$sum:"$amount"}
}
},

{$sort:{_id:1}}

])

res.json(data)

}catch(err){
res.status(500).json(err)
}

}



exports.programFeeDetails = async (req,res)=>{

try{

const {fromdate,todate,programcode,academicyear,colid}=req.query

const data = await Ledgerstud.find({

colid:Number(colid),
academicyear,
programcode,
classdate:{
$gte:new Date(fromdate),
$lte:new Date(todate)
}

}).sort({classdate:1})

res.json(data)

}catch(err){
res.status(500).json(err)
}

}