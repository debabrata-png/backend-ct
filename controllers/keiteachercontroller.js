const keiquestion = require("./../Models/keiquestionModel2");
const keiresponse = require("./../Models/keiresponseModel2");


// GET QUESTIONS

exports.getQuestions = async(req,res)=>{

try{

const { colid } = req.query;
const colid1=parseInt(colid);

const data = await keiquestion.find({
colid:colid1,
active:true
});

res.json(data);

}
catch(err){

res.status(500).json(err);

}

};


exports.getQuestions1 = async(req,res)=>{

try{

const { colid, role, year } = req.query;
const colid1=parseInt(colid);

const data = await keiquestion.find({
colid:colid1,
active:true,
role: role,
year: year
});

res.json(data);

}
catch(err){

res.status(500).json(err);

}

};



// ADD QUESTION

exports.addQuestion = async(req,res)=>{

try{

const q = new keiquestion(req.body);

await q.save();

res.json({message:"Question Added"});

}
catch(err){

res.status(500).json(err);

}

};



// SAVE RESPONSES

exports.saveResponses1 = async(req,res)=>{

try{

const responses = req.body;

await keiresponse.insertMany(responses);

res.json({
message:"Saved Successfully"
});

}
catch(err){

res.status(500).json(err);

}

};



exports.saveResponses = async (req,res)=>{

try{

const responses = req.body;

for(const r of responses){

    //console.log(r.year);

await keiresponse.updateOne(


{
questionId:r.questionId,
user:r.user,
colid:r.colid
},

{
$set:{
question:r.question,
response:r.response,
score:r.score,
category:r.category,
name:r.name,
year:r.year
}
},

{
upsert:true
}

);

}

res.json({
message:"Responses Saved"
});

}
catch(err){

res.status(500).json(err);

}

};



// GET RESPONSES

exports.getResponses = async(req,res)=>{

try{

const {user,colid} = req.query;

const data = await keiresponse.find({
user,
colid
});

res.json(data);

}
catch(err){

res.status(500).json(err);

}

};


exports.principalDashboard = async (req,res)=>{

try{

const { colid } = req.query;

const colid1=parseInt(colid);

const teacherRanking = await keiresponse.aggregate([

{
$match:{colid: colid1}
},

{
$group:{
_id:"$user",
teacherName:{$first:"$name"},
totalScore:{$sum:"$score"},
totalQuestions:{$sum:1}
}
},

{
$addFields:{
averageScore:{
$multiply:[
{$divide:["$totalScore","$totalQuestions"]},
100
]
}
}
},

{
$sort:{averageScore:-1}
}

]);



const categoryPerformance = await keiresponse.aggregate([

{
$match:{colid: colid1}
},

{
$group:{
_id:"$category",
totalScore:{$sum:"$score"},
count:{$sum:1}
}
},

{
$addFields:{
average:{
$multiply:[
{$divide:["$totalScore","$count"]},
100
]
}
}

}

]);


res.json({

teacherRanking,
categoryPerformance

});


}
catch(err){

res.status(500).json(err);

}

};