const Crm = require('./../Models/crmh1')
const ExcelJS = require('exceljs')
const PDFDocument = require('pdfkit')


exports.getReports = async (req,res)=>{

    const {colid, type} = req.query

    let groupField=""

    if(type==="source") groupField="$source"
    if(type==="temperature") groupField="$lead_temperature"
    if(type==="status") groupField="$leadstatus"
    if(type==="counsellor") groupField="$assignedto"

    try{

        const summary = await Crm.aggregate([
            {$match:{colid:Number(colid)}},
            {
                $group:{
                    _id: groupField,
                    totalLeads:{$sum:1}
                }
            },
            {$sort:{totalLeads:-1}}
        ])

        const details = await Crm.find({colid:Number(colid)})

        res.json({
            summary,
            details
        })

    }catch(err){

        res.status(500).json({error:err.message})

    }

}



exports.exportExcel = async(req,res)=>{

const {colid}=req.query

const leads = await Crm.find({colid:Number(colid)})

const workbook = new ExcelJS.Workbook()

const worksheet = workbook.addWorksheet('CRM Leads')

worksheet.columns=[

{header:'Name',key:'name',width:20},
{header:'Phone',key:'phone',width:15},
{header:'Source',key:'source',width:15},
{header:'Temperature',key:'lead_temperature',width:10},
{header:'Status',key:'leadstatus',width:10},
{header:'Counsellor',key:'assignedto',width:20}

]

leads.forEach(l=>{

worksheet.addRow(l)

})

res.setHeader(
'Content-Type',
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
)

res.setHeader(
'Content-Disposition',
'attachment; filename=crm_report.xlsx'
)

await workbook.xlsx.write(res)

res.end()

}



exports.exportPDF = async(req,res)=>{

const {colid}=req.query

const leads = await Crm.find({colid:Number(colid)})

const doc = new PDFDocument()

res.setHeader('Content-Type','application/pdf')

doc.pipe(res)

doc.fontSize(18).text('CRM Lead Report',{align:'center'})

doc.moveDown()

leads.forEach(l=>{

doc.fontSize(10).text(

`${l.name} | ${l.phone} | ${l.source} | ${l.lead_temperature} | ${l.leadstatus} | ${l.assignedto}`

)

})

doc.end()

}