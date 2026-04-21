const Ledger=require('./../Models/ledgerstud');

exports.getDropdownData=async(req,res)=>{

const colid=req.query.colid;

try{

const academic=await Ledger.distinct("academicyear",{colid});
const feecategory=await Ledger.distinct("feecategory",{colid});
const feebook=await Ledger.distinct("feebook",{colid});
const feeitem=await Ledger.distinct("feeitem",{colid});
const programcode=await Ledger.distinct("programcode",{colid});
const feecounter=await Ledger.distinct("feecounter",{colid});
const paymode=await Ledger.distinct("paymode",{colid});

res.json({
academic,
feecategory,
feebook,
feeitem,
programcode,
feecounter,
paymode
});

}
catch(err){
res.status(500).json(err);
}

};


exports.getSummaryReport=async(req,res)=>{

    console.log(req.query);

const {
colid,
academicyear,
feecategory,
feebook,
feeitem,
programcode,
feecounter,
paymode,
fromdate,
todate
}=req.query;

try{

    const fromdate1=new Date();
    const todate1 = new Date();
todate1.setDate(todate1.getDate() - 30);

const match={
colid:parseInt(colid),
classdate:{
$gte:new Date(fromdate1),
$lte:new Date(todate1)
}
};

if(academicyear) match.academicyear=academicyear;
if(feecategory) match.feecategory=feecategory;
if(feebook) match.feebook=feebook;
if(feeitem) match.feeitem=feeitem;
if(programcode) match.programcode=programcode;
if(feecounter) match.feecounter=feecounter;
if(paymode) match.paymode=paymode;

console.log(match);

const data=await Ledger.aggregate([

{$match:match},

{
$group:{
_id:{
feeitem:"$feeitem",
paymode:"$paymode"
},
totalAmount:{$sum:"$amount"},
count:{$sum:1}
}
},

// {$sort:{"_id.feeitem":1}}

]);

console.log(data);

res.json(data);

}
catch(err){
res.status(500).json(err);
}

};

exports.getDetailedReport=async(req,res)=>{

const {
colid,
academicyear,
feecategory,
feebook,
feeitem,
programcode,
feecounter,
paymode,
fromdate,
todate
}=req.query;

try{

const match={
colid:Number(colid),
classdate:{
$gte:new Date(fromdate),
$lte:new Date(todate)
}
};

if(academicyear) match.academicyear=academicyear;
if(feecategory) match.feecategory=feecategory;
if(feebook) match.feebook=feebook;
if(feeitem) match.feeitem=feeitem;
if(programcode) match.programcode=programcode;
if(feecounter) match.feecounter=feecounter;
if(paymode) match.paymode=paymode;

const data=await Ledger.find(match).sort({classdate:-1});

res.json(data);

}
catch(err){
res.status(500).json(err);
}

};