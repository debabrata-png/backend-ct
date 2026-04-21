const Crm = require('./../Models/crmh1')
const ExcelJS = require('exceljs')


exports.oicrmfGetReports = async (req,res)=>{

try{

const {colid,source,counsellor} = req.query

let filter = { colid:Number(colid) }

if(source) filter.source = source
if(counsellor) filter.assignedto = counsellor


const pipelineSummary = await Crm.aggregate([

{ $match: filter },

{
$group:{
_id:"$pipeline_stage",
total:{ $sum:1 }
}
},

{ $sort:{ total:-1 } }

])


const temperatureSummary = await Crm.aggregate([

{ $match: filter },

{
$group:{
_id:"$lead_temperature",
total:{ $sum:1 }
}
}

])


const details = await Crm.find(filter)


res.json({
pipelineSummary,
temperatureSummary,
details
})

}
catch(err){

res.status(500).json({error:err.message})

}

}




exports.oicrmfExportExcel = async (req,res)=>{

const {colid,source,counsellor} = req.query

let filter = { colid:Number(colid) }

if(source) filter.source = source
if(counsellor) filter.assignedto = counsellor

const leads = await Crm.find(filter)

const workbook = new ExcelJS.Workbook()
const sheet = workbook.addWorksheet("OICRMF Report")

sheet.columns = [

{header:'Name',key:'name',width:20},
{header:'Phone',key:'phone',width:15},
{header:'Source',key:'source',width:15},
{header:'Counsellor',key:'assignedto',width:20},
{header:'Pipeline Stage',key:'pipeline_stage',width:20},
{header:'Temperature',key:'lead_temperature',width:15}

]

leads.forEach(l=>{
sheet.addRow(l)
})

res.setHeader(
'Content-Type',
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
)

res.setHeader(
'Content-Disposition',
'attachment; filename=oicrmf_report.xlsx'
)

await workbook.xlsx.write(res)

res.end()

}