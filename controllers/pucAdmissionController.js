const Admission = require("./../Models/pucAdmissionModel");

exports.createAdmission = async(req,res)=>{

try{

const data = new Admission(req.body);

await data.save();

res.json({
success:true,
message:"Admission saved"
});

}catch(err){
res.status(500).json({error:err.message});
}

};

exports.getAdmissions = async(req,res)=>{

try{

const {colid} = req.query;

const data = await Admission.find({colid}).sort({createdAt:-1});

res.json(data);

}catch(err){
res.status(500).json({error:err.message});
}

};