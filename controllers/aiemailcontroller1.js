
const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const nodemailer=require('nodemailer');
const htmltotext=require('html-to-text');
const pstatusnew=require('./../Models/pstatusnew');

var fs = require("fs");
const readXlsxFile = require("read-excel-file/node");
var file_system = require('fs');
var archiver = require('archiver');
//const nodemailer=require('nodemailer');
//const htmltotext=require('html-to-text');
//var fs = require("fs");
const path = require('path');
const process = require('process');



var dir = './naac/feedback';
var outputdir = './naac/output';
var colid=1;



var to="suman@epaathsala.com";
var subject="Sample feedback report for five years";
var htmltemplate="emailtf.html";
var texttemplate="emailtf.txt";
var contentr='';

//var year="2022-23";
//var year=process.argv[3];
//var feedback='';
// var students=parseInt(req.query.students);
// var faculties=parseInt(req.query.faculties);
// var alumni=parseInt(req.query.alumni);
// var parents=parseInt(req.query.parents);
//var reporttitle=process.argv[6];

var students=1200;
var faculties=206;
var alumni=60;
var parents=40;

var htmlfile="chart13.html";



exports.createfeedbackreports1= async (req,res) => {
    //res.cookie("user","Akshata");
    to=req.query.to;
    students=req.query.students;
    faculties=req.query.faculties;
    alumni=req.query.alumni;
    parents=req.query.parents;
    contentr=req.query.contentr;

    colid=req.query.colid;

    dir = './naac/' + colid.toString() + '/feedback';
    outputdir = './naac/' + colid.toString() + '/output';

  
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
        // try {
        //     const verified = jwt.verify(
        //         token,
        //         process.env.JWT_SECRET,
        //         (err123, verified) => {
        //           if (err123) {
        //             return res.status(401).json({
        //                 status: 'Unauthorized',
        //                 error: err123
        //             });
        //           }
        //           jwtuser=verified.user;
        //           jwtcolid=verified.colid;
        //           return verified;
        //         }
        //       );
        // } catch(err1234) {
        //     //console.log(err1234);
        // }
        const user1=req.query.user;
        const colid=req.query.colid;
        // const lcat1233= await ndepmeetings.find()
        // .where('user')
        // .equals(user1);


        createandsend();
        var dt1=new Date();

        const pat1= await pstatusnew.findOneAndUpdate({colid: colid, client: 'feedbackreports'},{
            remarks:'Mail sent on ' + dt1.toString(),
            colid:colid,
            name:"AI",
            user:"ai@campus.technology",
            client:'feedbackreports'
        }, {
            new: true,
            upsert: true 
        });
        //console.log(pat1);


     res.status(200).json({
        status:'Success',
        data: {
            message : 'Feedback report sent for five years.'
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

const processfile=async(totalr,year,feedback,reporttitle)=> {

    var backend='';
var frontend='';

var alldivs='';
var allcharts='';
var alldata=''
var alloptions='';
var averagedata='';
var averagetable='';

var trow='';

    //let path1="linkfile.xlsx";
    let path1='mccfeedback.xlsx';
//console.log(path1);
const response=await readXlsxFile(path1).then((rows) => {
    // skip header
    rows.shift();

    let tutorials = [];

    
    var link="https://sxccal.edu/qa.html?link=";
    
var level=0;

    rows.forEach((row) => {
        //console.log(row);
        level=level + 1;
        var slno=row[0];
        var question=row[1];
        //var amount=row[2];
        //var schdate=row[2];
        
        //backend=backend + '<tr><td width="300px">' + item + '</td><td width="20px"></td><td><a href="' + newlink + '" target="_blank">' + newlink + "</a></td></tr>";
        //backend=backend + '<tr>\n<td width="300">' + item + '</td>\n<td><a href="' + newlink + '" target="_blank">' + newlink + "</a></td>\n</tr>\n\n";

        

        


        var three=Math.floor(Math.random() * (Math.floor(0.2 * totalr) - Math.floor(0.1 * totalr) + 1) ) + Math.floor(0.1 * totalr);
        var five=Math.floor(Math.random() * (Math.floor(0.6 * totalr) - Math.floor(0.5 * totalr) + 1) ) + Math.floor(0.5 * totalr);
        var four=totalr - three - five;

        var averageq=(five * 5 + four * 4 + three * 3)/(totalr);
        averagedata=averagedata + '["' + question + '", ' + averageq + '],\n';
        averagetable=averagetable + '<tr><td>' + question + '</td><td>' + averageq.toFixed(2) + '</td></tr>';


        var table1='<table style="width:100%;  border: 1px solid black; border-collapse: collapse;">';
        table1=table1 + '<tr><td>Rating</td><td>No. of responses</td></tr>';
        table1=table1 + '<tr><td>Five</td><td>' + five + '</td></tr>';
        table1=table1 + '<tr><td>Four</td><td>' + four + '</td></tr>';
        table1=table1 + '<tr><td>Three</td><td>' + three + '</td></tr>';
        table1=table1 + '</table><br /><br />';
        
        //alldivs=alldivs + '<h5>Question: ' + question + '</h5>' + '<br /><br />\n' + '<div id="' + slno + '"></div><br /><br />\n\n';
        alldivs=alldivs + '<h3>Question: ' + question + '</h3>' + '<br /><br />\n' + table1 + '<div id="' + slno + '"></div><br /><br />\n\n';


        alldata=alldata + 'var data' + level + ' = new google.visualization.DataTable();\n';
        alldata=alldata + 'data' + level + '.addColumn("string", "Selection");\n';
        alldata=alldata + 'data' + level + '.addColumn("number", "No of responses");\n';
        alldata=alldata + 'data' + level + '.addRows([\n';
        alldata=alldata + '["Five", ' + five + '],\n';
        alldata=alldata + '["Four", ' + four + '],\n';
        alldata=alldata + '["Three", ' + three + ']\n';
        //   ['Onions', 1],
        //   ['Olives', 1],
        //   ['Zucchini', 1],
        //   ['Pepperoni', 2]
        alldata= alldata + ']);\n\n';

        alloptions=alloptions + 'var options' + level + ' = {"title":"' + 'Response analysis' + '",\n';
        alloptions=alloptions + '"width":700,\n';
        alloptions=alloptions + '"height":450};\n\n';

        allcharts = allcharts + 'var chart_div' + level + ' = document.getElementById("' + slno + '");\n';
        allcharts = allcharts + 'var chart' + level + ' = new google.visualization.PieChart(document.getElementById("' + slno + '"));\n';


        allcharts = allcharts + 'google.visualization.events.addListener(chart' + level + ', "ready", function () {\n';
        //allcharts = allcharts + 'chart_div' + level + '.innerHTML = "<img src=\'" + chart' + level + '.getImageURI() + \'>";\n';
        allcharts = allcharts + 'chart_div' + level + '.innerHTML = \'<img src="\' + chart' + level + '.getImageURI() + \'">\';\n';
        allcharts = allcharts + '});\n';


        allcharts = allcharts + 'chart' + level + '.draw(data' + level + ', options' + level + ');\n\n';

        //var refno="PHDG/" + year + "/" + "EXP" + "/000" + level;  

       



    });

    var table12='<table style="width:100%;  border: 1px solid black; border-collapse: collapse;">';
        table12=table12 + '<tr><td>Question</td><td>Average score</td></tr>';
        table12=table12 + averagetable;
        table12=table12 + '</table><br /><br />';
        
        //alldivs=alldivs + '<h5>Question: ' + question + '</h5>' + '<br /><br />\n' + '<div id="' + slno + '"></div><br /><br />\n\n';
        alldivs=alldivs + '<h3>Average score: </h3>' + '<br /><br />\n' + table12 + '<div id="averagechart"></div><br /><br />\n\n';

        alldata=alldata + 'var dataavgchart = new google.visualization.DataTable();\n';
        alldata=alldata + 'dataavgchart.addColumn("string", "Question");\n';
        alldata=alldata + 'dataavgchart.addColumn("number", "Avergae score");\n';
        alldata=alldata + 'dataavgchart.addRows([\n';
        alldata=alldata + averagedata;
        alldata= alldata + ']);\n\n';

        alloptions=alloptions + 'var optionsavgchart = {"title":"' + 'Average score analysis' + '",\n';
        alloptions=alloptions + '"width":700,\n';
        alloptions=alloptions + '"height":450};\n\n';

        allcharts = allcharts + 'var chartavgchart = new google.visualization.BarChart(document.getElementById("averagechart"));\n';
        allcharts = allcharts + 'chartavgchart.draw(dataavgchart, optionsavgchart);\n\n';





    var find13 = 'allcharts';
    var re13 = new RegExp(find13, 'g');

    var find14 = 'alldata';
    var re14 = new RegExp(find14, 'g');
   
    var find15 = 'alloptions';
    var re15 = new RegExp(find15, 'g');

    var find16 = 'alldivs';
    var re16 = new RegExp(find16, 'g');

    var find17 = 'reporttitle';
    var re17 = new RegExp(find17, 'g');

    //var linkcontent = fs.readFileSync('linksample.html');
    //var linkcontent = fs.readFileSync('chart12.html');
    var linkcontent = fs.readFileSync(htmlfile);
    linkcontent=linkcontent.toString().replace(re13,allcharts);
    linkcontent=linkcontent.toString().replace(re14,alldata);
    linkcontent=linkcontent.toString().replace(re15,alloptions);
    linkcontent=linkcontent.toString().replace(re16,alldivs);
    linkcontent=linkcontent.toString().replace(re17,reporttitle);
  

    fs.writeFile(dir + '/' + year + '_' + feedback + '.html', linkcontent, function (err) {
        if (err) throw err;
        console.log('Feedback report Saved!');
      });

   
  
});

frontend=frontend + "^Supporting documents";

console.log('------------ backend -----------------');
console.log(backend);


}



const createform=async()=> {

    var facnew=Math.floor(Math.random() * (Math.floor(0.9 * faculties) - Math.floor(0.6 * faculties) + 1) ) + Math.floor(0.6 * faculties);
    var studnew=Math.floor(Math.random() * (Math.floor(0.9 * students) - Math.floor(0.6 * students) + 1) ) + Math.floor(0.6 * students);
    var alumnew=Math.floor(Math.random() * (Math.floor(0.9 * alumni) - Math.floor(0.6 * alumni) + 1) ) + Math.floor(0.6 * alumni);
    var parnew=Math.floor(Math.random() * (Math.floor(0.9 * parents) - Math.floor(0.6 * parents) + 1) ) + Math.floor(0.6 * parents);


    const a1=await processfile(facnew,"2022-23","facultycurriculum","Curriculum feedback for faculties");
    const a2=await processfile(studnew,"2022-23","studentcurriculum","Curriculum feedback for students");
    const a3=await processfile(alumnew,"2022-23","alumnicurriculum","Curriculum feedback for alumni");
    const a4=await processfile(parnew,"2022-23","parentscurriculum","Curriculum feedback for parents");

    var facnew=Math.floor(Math.random() * (Math.floor(0.9 * faculties) - Math.floor(0.6 * faculties) + 1) ) + Math.floor(0.6 * faculties);
    var studnew=Math.floor(Math.random() * (Math.floor(0.9 * students) - Math.floor(0.6 * students) + 1) ) + Math.floor(0.6 * students);
    var alumnew=Math.floor(Math.random() * (Math.floor(0.9 * alumni) - Math.floor(0.6 * alumni) + 1) ) + Math.floor(0.6 * alumni);
    var parnew=Math.floor(Math.random() * (Math.floor(0.9 * parents) - Math.floor(0.6 * parents) + 1) ) + Math.floor(0.6 * parents);


    const a5=await processfile(facnew,"2021-22","facultycurriculum","Curriculum feedback for faculties");
    const a6=await processfile(studnew,"2021-22","studentcurriculum","Curriculum feedback for students");
    const a7=await processfile(alumnew,"2021-22","alumnicurriculum","Curriculum feedback for alumni");
    const a8=await processfile(parnew,"2021-22","parentscurriculum","Curriculum feedback for parents");

    var facnew=Math.floor(Math.random() * (Math.floor(0.9 * faculties) - Math.floor(0.6 * faculties) + 1) ) + Math.floor(0.6 * faculties);
    var studnew=Math.floor(Math.random() * (Math.floor(0.9 * students) - Math.floor(0.6 * students) + 1) ) + Math.floor(0.6 * students);
    var alumnew=Math.floor(Math.random() * (Math.floor(0.9 * alumni) - Math.floor(0.6 * alumni) + 1) ) + Math.floor(0.6 * alumni);
    var parnew=Math.floor(Math.random() * (Math.floor(0.9 * parents) - Math.floor(0.6 * parents) + 1) ) + Math.floor(0.6 * parents);


    const a9=await processfile(facnew,"2020-21","facultycurriculum","Curriculum feedback for faculties");
    const a10=await processfile(studnew,"2020-21","studentcurriculum","Curriculum feedback for students");
    const a11=await processfile(alumnew,"2020-21","alumnicurriculum","Curriculum feedback for alumni");
    const a12=await processfile(parnew,"2020-21","parentscurriculum","Curriculum feedback for parents");

    var facnew=Math.floor(Math.random() * (Math.floor(0.9 * faculties) - Math.floor(0.6 * faculties) + 1) ) + Math.floor(0.6 * faculties);
    var studnew=Math.floor(Math.random() * (Math.floor(0.9 * students) - Math.floor(0.6 * students) + 1) ) + Math.floor(0.6 * students);
    var alumnew=Math.floor(Math.random() * (Math.floor(0.9 * alumni) - Math.floor(0.6 * alumni) + 1) ) + Math.floor(0.6 * alumni);
    var parnew=Math.floor(Math.random() * (Math.floor(0.9 * parents) - Math.floor(0.6 * parents) + 1) ) + Math.floor(0.6 * parents);


    const a13=await processfile(facnew,"2019-20","facultycurriculum","Curriculum feedback for faculties");
    const a14=await processfile(studnew,"2019-20","studentcurriculum","Curriculum feedback for students");
    const a15=await processfile(alumnew,"2019-20","alumnicurriculum","Curriculum feedback for alumni");
    const a16=await processfile(parnew,"2019-20","parentscurriculum","Curriculum feedback for parents");

    var facnew=Math.floor(Math.random() * (Math.floor(0.9 * faculties) - Math.floor(0.6 * faculties) + 1) ) + Math.floor(0.6 * faculties);
    var studnew=Math.floor(Math.random() * (Math.floor(0.9 * students) - Math.floor(0.6 * students) + 1) ) + Math.floor(0.6 * students);
    var alumnew=Math.floor(Math.random() * (Math.floor(0.9 * alumni) - Math.floor(0.6 * alumni) + 1) ) + Math.floor(0.6 * alumni);
    var parnew=Math.floor(Math.random() * (Math.floor(0.9 * parents) - Math.floor(0.6 * parents) + 1) ) + Math.floor(0.6 * parents);


    const a17=await processfile(facnew,"2018-19","facultycurriculum","Curriculum feedback for faculties");
    const a18=await processfile(studnew,"2018-19","studentcurriculum","Curriculum feedback for students");
    const a19=await processfile(alumnew,"2018-19","alumnicurriculum","Curriculum feedback for alumni");
    const a20=await processfile(parnew,"2018-19","parentscurriculum","Curriculum feedback for parents");

}


const ZIP_PATH = path.join(process.cwd(), 'target.zip');
//console.log(ZIP_PATH);



const createarchive=async()=> {

    var output = file_system.createWriteStream(outputdir + '/feedback.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    sendmail();
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(dir, false);

// append files from a sub-directory and naming it `new-subdir` within the archive
//archive.directory('subdir/', 'new-subdir');

archive.finalize();

}




const sendmail=async () => {
    try {
        const emailtext="This is a gentle reminder to conduct IQAC feedback.<br /><br />Thank you<br /><br />IQAC team.";
        const transporter=nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'support@campus.technology',
                pass: 'Hello@1234'
            
            }
        });
        // const transporter=nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: 'reminder@epaathsala.com',
        //         pass: 'Password@123'
            
        //     }
        // });

        // let transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         type: 'OAuth2',
        //         user: 'suman@epaathsala.com',
        //         clientId: '345956148647-l549k4ee1b6dgb7dfisim9s5qtd7b6mt.apps.googleusercontent.com',
        //         clientSecret: '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',
        //         accessUrl: 'https://accounts.google.com/o/oauth2/auth'
        //         // refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
        //         // accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
        //         // expires: 1484314697598
        //     }
        // });

        var htmlc = fs.readFileSync(htmltemplate);
        var textc = fs.readFileSync(texttemplate);

        var find13 = 'replace';
        var re13 = new RegExp(find13, 'g');

        htmlc=htmlc.toString().replace(re13,contentr);
        textc=textc.toString().replace(re13,contentr);

      

        const mailoptions= {
            from: "CT Support <support@campus.technology>",
            to: to,
            cc: "suman@campus.technology,team@epaathsala.com",
            subject: subject,
            html:htmlc,
            text: textc,
            attachments: [
                {   // filename and content type is derived from path
                    path: outputdir + '/feedback.zip'
                },
            ]

        }
        await transporter.sendMail(mailoptions);
       console.log('Mail sent successfully');

    }catch(e) {
        console.log(e);

    }
}


const createandsend=async()=> {
    const d2=await removedirectory();
    const d1=await createdirectory();
    const a1=await createform();
    const b=await createarchive();
    //const d2=await removedirectory();
   // processfile();
}

const createdirectory=async()=> {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(outputdir)){
        fs.mkdirSync(outputdir, { recursive: true });
    }
}

const removedirectory=async()=> {
    try {
        fs.rmSync(dir, { recursive: true, force: true });

    } catch(e) {

    }
    try {
        fs.rmSync(outputdir, { recursive: true, force: true });

    } catch(e) {

    }
    

}





