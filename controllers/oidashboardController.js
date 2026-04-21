const Ledgerstud = require("./../Models/ledgerstud");

exports.revenueDashboard = async (req,res)=>{

try{

const colid = parseInt(req.query.colid);

const totalRevenue = await Ledgerstud.aggregate([
{
$match:{
colid:colid,
// status:"Active",
type:"Debit"
}
},
{
$group:{
_id:null,
total:{$sum:"$amount"}
}
}
]);

const todayRevenue = await Ledgerstud.aggregate([
{
$match:{
colid:colid,
// status:"Active",
type:"Debit",
classdate:{
$gte:new Date(new Date().setHours(0,0,0,0))
}
}
},
{
$group:{
_id:null,
total:{$sum:"$amount"}
}
}
]);

const programRevenue = await Ledgerstud.aggregate([
{
$match:{
colid:colid,
// status:"Active",
type:"Debit"
}
},
{
$group:{
_id:"$programcode",
total:{$sum:"$amount"}
}
},
{$sort:{total:-1}}
]);

const cashbookRevenue = await Ledgerstud.aggregate([
{
$match:{
colid:colid,
// status:"Active",
type:"Debit"
}
},
{
$group:{
_id:"$cashbook",
total:{$sum:"$amount"}
}
}
]);

const monthlyRevenue = await Ledgerstud.aggregate([
{
$match:{
colid:colid,
// status:"Active",
type:"Debit"
}
},
{
$group:{
_id:{
month:{$month:"$classdate"},
year:{$year:"$classdate"}
},
total:{$sum:"$amount"}
}
},
{$sort:{"_id.year":1,"_id.month":1}}
]);

const recentTransactions = await Ledgerstud.find({
colid:colid,
// status:"Active"
})
.sort({classdate:-1})
.limit(10);

res.json({
totalRevenue,
todayRevenue,
programRevenue,
cashbookRevenue,
monthlyRevenue,
recentTransactions
});

}
catch(err){
res.status(500).json({error:err.message})
}

}