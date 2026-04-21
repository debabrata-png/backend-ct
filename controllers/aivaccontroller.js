
const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const User=require('./../Models/user');
const nodemailer=require('nodemailer');
const htmltotext=require('html-to-text');
const pstatusnew=require('./../Models/pstatusnew');
const vacnew2=require('./../Models/vacnew2');
const vacstudents1=require('./../Models/vacstudents1');


var fs = require("fs");
const readXlsxFile = require("read-excel-file/node");
var file_system = require('fs');
var archiver = require('archiver');
//const nodemailer=require('nodemailer');
//const htmltotext=require('html-to-text');
//var fs = require("fs");
const path = require('path');
const process = require('process');

const phddeclare=require('./../Models/phddeclare');



var dir = './naac/feedback';
var formdir = './naac/feedbackforms';
var outputdir = './naac/output';
var colid=1;
var vacdir='';

var refseries='';


var to="suman@epaathsala.com";
var subject="Sample feedback report for five years";
var htmltemplate="emailtf.html";
var texttemplate="emailtf.txt";
var contentr='';

var fromemail='';
var password='';



var students=1200;
var faculties=206;
var alumni=60;
var parents=40;

var htmlfile="chart13.html";

var coursehours=30;




exports.createvacall= async (req,res) => {
    //res.cookie("user","Akshata");
    to=req.query.to;
    contentr=req.query.contentr;
    fromemail=req.query.fromemail;
    password=req.query.password;
    subject='Value added courses sample circular and attendance sheet';
    coursehours=req.query.coursehours;
    refseries=req.query.refseries;

    colid=req.query.colid;

    vacdir = './naac/' + colid.toString() + '/vacdir';
    outputdir = './naac/' + colid.toString() + '/output';

    try{
        
       
        const user1=req.query.user;
        const colid=req.query.colid;

        
  

        createvacdocuments();
        var dt1=new Date();

        const pat1= await pstatusnew.findOneAndUpdate({colid: colid, client: 'vac'},{
            remarks:'Documents created on ' + dt1.toString(),
            colid:colid,
            name:"AI",
            user:user1,
            client:'vac'
        }, {
            new: true,
            upsert: true 
        });
        //console.log(pat1);


     res.status(200).json({
        status:'Success',
        data: {
            message : 'PhD declaration sent for five years.'
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


exports.sendvacmail= async (req,res) => {
    //res.cookie("user","Akshata");
    to=req.query.to;
    contentr=req.query.contentr;
    fromemail=req.query.fromemail;
    password=req.query.password;
    subject='Value added courses documentation with circular and attendance sheet';
    coursehours=req.query.coursehours;
    refseries=req.query.refseries;

    colid=req.query.colid;

    vacdir = './naac/' + colid.toString() + '/vacdir';
    outputdir = './naac/' + colid.toString() + '/output';

    try{
        
       
        const user1=req.query.user;
        const colid=req.query.colid;

        
  
        createarchiveall(vacdir,"vac_docs")
        //createvacdocuments();
        var dt1=new Date();

        const pat1= await pstatusnew.findOneAndUpdate({colid: colid, client: 'vac'},{
            remarks:'Mail sent to ' + to + ' on ' + dt1.toString(),
            colid:colid,
            name:"AI",
            user:user1,
            client:'vac'
        }, {
            new: true,
            upsert: true 
        });
        //console.log(pat1);


     res.status(200).json({
        status:'Success',
        data: {
            message : 'PhD declaration sent for five years.'
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};



const processvac=async()=> {

 
var frontend='';



var trow='';

    //let path1="linkfile.xlsx";

//console.log(path1);

const lcat1233= await vacnew2.find()
.where('colid')
.equals(colid);

console.log(lcat1233);

var backend='';
console.log('course hours ' + coursehours);

var circularcount=1;

lcat1233.forEach(async function(data){
    //console.log(data.link);
    //moucount=data.total_attendance;
    var field=data.course;
    var hours=parseInt(data.coursehours);
    var stud=parseInt(data.completed);
    var startdate=data.startdate;
    var startdate1=new Date(data.startdate);
    var q=1;

    //q = Math.floor(hours/coursehours);
    coursehours=hours;

    



    // start for

    for(var v=0;v<q;v++){
        var level=v+1;
        var course='';
        var coursecode='';
        if(q==1) {
            course=field;
            coursecode=field.substring(0,4);
        } else {
            course=field + ' level ' + level;
            coursecode=field.substring(0,4) + 'l' + level;
        }

        console.log('q ' + q + ' v ' + v + ' course ' + course);
       

        var numberOfDaysToAdd = 6;
        var duration=v * 40;


        var startdate2=new Date(startdate);
        startdate2.setDate(startdate2.getDate() + duration);
        //var startdate2 = new Date(startdate1.getDate() + duration);
        var startdateprint = startdate2.toString().substring(4,15);
        //var circulardate = new Date(startdate2.getDate() - numberOfDaysToAdd);
        startdate2.setDate(startdate2.getDate() - numberOfDaysToAdd);
        var circulardate1 = startdate2.toString().substring(4,15);

        //var newlink=link + coursecode + ".pdf";
        //var refno="VAC/" + year + "/" + "CAL" + "/0" + level;  
        var refno= refseries + "/" + + circularcount;  
        circularcount=circularcount + 1;

        //backend=backend + course + "," + coursecode + "," + "Offered by HEI" + "," + year + ",30," + stud + "," + stud + "," + newlink + "\n" ;


        var qs=1;
        if(coursehours<31) {
            console.log(course + ' ' + coursehours);
            const a1=await createattendance(course,field,1,coursehours,1);
        } else {
            qs = Math.floor(coursehours/30) + 1;
            var daysremaining=0;
            //console.log(course + ' ' + coursehours);
            for(l=0;l<qs;l++) {
                var slno=l+1;
                var shour=l*30 + 1;
                var chour=shour + 29;
                daysremaining=coursehours-l*30;
                if(daysremaining>30) {
                    console.log('Days remaining ' + daysremaining);
                    const a2=await createattendance(course,field,shour,chour,slno);
                } else {
                    var chour1=shour + daysremaining - 1;
                    console.log('Days remaining ' + daysremaining);
                    const a21=await createattendance(course,field,shour,chour1,slno);

                }
                //daysremaining=daysremaining + chour;
                //createattendance(course,field,shour,chour,slno);
                //daysremaining=daysremaining + 30;


            }

        }
        

        //createattendance(course,field,coursehours);

        var find13 = 'vaccourse';
        var re13 = new RegExp(find13, 'g');

        var find14 = 'startdate';
        var re14 = new RegExp(find14, 'g');

        var find15 = 'duration';
        var re15 = new RegExp(find15, 'g');

        var find16 = 'circulardate';
        var re16 = new RegExp(find16, 'g');

        var find17 = 'refno';
        var re17 = new RegExp(find17, 'g');

        

        var circular = fs.readFileSync('circularsample2.html');
        circular=circular.toString().replace(re13,course);
        circular=circular.toString().replace(re14,startdateprint);
        circular=circular.toString().replace(re15,coursehours);
        circular=circular.toString().replace(re16,circulardate1);
        circular=circular.toString().replace(re17,refno);

        fs.writeFile( vacdir + '/circular ' + course + '.html', circular, function (err) {
            if (err) throw err;
            console.log('Circular Saved!');
          });


    }



    // end for
   

})

//const b=await createarchiveall(vacdir,"vac_docs");


}







const createvacdocuments=async()=> {
    console.log('initiating');
    const b2=await removedirectoryall(vacdir);
    const b1=await createdirectoryall(vacdir);
    const a1=await processvac();
    //const b=await createarchiveall(vacdir,"vac_docs");
   // processfile();
}


const createattendance=async(coursename,mastercourse,shour,chours,slno)=> {
    console.log(coursename + '-' + mastercourse + ' shour ' + shour + ' chours ' + chours + ' slno ' + slno);
    var dateheader='';
    var trow='';
    var chours1=chours + 1;
    
    for(var k=shour;k<chours1;k++) {
        dateheader=dateheader + '<td>' + k.toString() + '</td>';

    }

    const lcat1233= await vacstudents1.find()
            .where('course')
            .equals(mastercourse)
            .where('colid')
            .equals(colid);


    lcat1233.forEach(async function(data){
    //console.log(data.link);

    var random1=getrandom(shour,chours1);
    var random2=getrandom(shour,chours1);

    // if(shour>20) {
    //     console.log (random1 + ' ' + random2);
    // }
     
    
    trow=trow + '<tr>';
    trow=trow + '<td>' + data.student +'</td>';
    for(var k=shour;k<chours1;k++) {
        if(k==random1 || k== random2) {
            trow=trow + '<td>A</td>';
        } else {
            trow=trow + '<td>P</td>';
        }
        

    }
    trow=trow + '</tr>';
    trow=trow+'\n';


    });


    var find13 = 'coursename';
    var re13 = new RegExp(find13, 'g');

    var find14 = 'dateheader';
    var re14 = new RegExp(find14, 'g');

    var find15 = 'trow';
    var re15 = new RegExp(find15, 'g');

    var attendance = fs.readFileSync('attendancesample.html');
attendance=attendance.toString().replace(re13,coursename);
attendance=attendance.toString().replace(re14,dateheader);
attendance=attendance.toString().replace(re15,trow);


fs.writeFile(vacdir + '/attendance ' + coursename + '_' + slno + '.html', attendance, function (err) {
    if (err) throw err;
    console.log('Attendance Saved!');
  });
   

    // fs.writeFile(vacdir + '/attendance ' + coursename + '_' + slno + '_' + year + '.html', attendance, function (err) {
    //     if (err) throw err;
    //     console.log('Attendance Saved!');
    //   });


}

function getrandom(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const createphd=async()=> {


    const lcat1233= await phddeclare.find()
    .where('colid')
    .equals(colid);

    var backend='';

    lcat1233.forEach(async function(data){
        //console.log(data.link);
        //moucount=data.total_attendance;
        var faculty=data.faculty;
        var subject=data.subject;
        var university=data.university;
        var phdyear=data.phdyear;

        backend=backend + '<tr>\n<td width="300">' + faculty + '</td>\n<td>' + subject +  '</td>\n<td>' + university +  '</td>\n<td>' + phdyear +  '</td>\n</tr>\n\n';
        
    })


   

    var refno="PhD/ADM/" + getrandom(10,9999);  

    var find13 = 'linkcontent';
    var re13 = new RegExp(find13, 'g');

    var find14 = 'refno';
    var re14 = new RegExp(find14, 'g');

    var find16 = 'circulardate';
    var re16 = new RegExp(find16, 'g');

    var find17 = 'acyear';
    var re17 = new RegExp(find17, 'g');
           
   

    //var linkcontent = fs.readFileSync('linksample.html');
    var linkcontent = fs.readFileSync('phdsample.html');
    linkcontent=linkcontent.toString().replace(re13,backend);
    // linkcontent=linkcontent.toString().replace(re14,refno);
    // linkcontent=linkcontent.toString().replace(re17,year);
    // linkcontent=linkcontent.toString().replace(re16,process.argv[4]);
  

    fs.writeFile(phddir + '/phddeclaration.html', linkcontent, function (err) {
        if (err) throw err;
        console.log('PhD declaration saved!');
      });


//console.log(path1);



console.log('------------ backend -----------------');
console.log(backend);


}






exports.createsamplefeedback= async (req,res) => {
    //res.cookie("user","Akshata");
    to=req.query.to;
    contentr=req.query.contentr;
    fromemail=req.query.fromemail;
    password=req.query.password;
    subject='Sample filled in feedback forms';

    colid=req.query.colid;

    formdir = './naac/' + colid.toString() + '/feedbackforms';
    outputdir = './naac/' + colid.toString() + '/output';

    try{
        
       
        const user1=req.query.user;
        const colid=req.query.colid;
  

        createandsendforms();
        var dt1=new Date();

        const pat1= await pstatusnew.findOneAndUpdate({colid: colid, client: 'feedbackforms'},{
            remarks:'Mail sent on ' + dt1.toString(),
            colid:colid,
            name:"AI",
            user:"ai@campus.technology",
            client:'feedbackforms'
        }, {
            new: true,
            upsert: true 
        });
        //console.log(pat1);


     res.status(200).json({
        status:'Success',
        data: {
            message : 'Feedback forms sent for five years.'
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};


const createfeedbackforms=async(counter,reporttitle,feedback)=> {
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
    
        var max=5;
        var min=3;

        var r1=Math.floor(Math.random() * (max - min + 1) ) + min;
        if(r1==5) {
            trow=trow + '<tr><td>' + level + '</td><td>' + question  + '</td><td>y</td><td></td><td></td><td></td><td></td></tr>';

        } else if (r1 ==4) {
            trow=trow + '<tr><td>' + level + '</td><td>' + question  + '</td><td></td><td>y</td><td></td><td></td><td></td></tr>';
        } else {
            trow=trow + '<tr><td>' + level + '</td><td>' + question  + '</td><td></td><td></td><td>y</td><td></td><td></td></tr>';
        }

    });




    var find13 = 'trow';
    var re13 = new RegExp(find13, 'g');

    var find14 = 'feedbacktitle';
    var re14 = new RegExp(find14, 'g');
   

    var linkcontent = fs.readFileSync('feedbackform.html');
    linkcontent=linkcontent.toString().replace(re13,trow);
    linkcontent=linkcontent.toString().replace(re14,reporttitle);
   
  

    fs.writeFile(formdir + '/sample_' + feedback + '_' + counter + '.html', linkcontent, function (err) {
        if (err) throw err;
        console.log('Feedback report Saved!');
      });

   
  
});

//frontend=frontend + "^Supporting documents";

console.log('------------ backend -----------------');
//console.log(backend);


}

const createsampleform=async()=> {
    for(i=0; i<4; i++) {
        var a= await createfeedbackforms(i,"Alumni feedback form","alumnifeedback");   
    }
    for(i=0; i<4; i++) {
        var a= await createfeedbackforms(i,"Faculty feedback form","facultyfeedback");   
    }
    for(i=0; i<4; i++) {
        var a= await createfeedbackforms(i,"Student feedback form","studentfeedback");   
    }
    for(i=0; i<4; i++) {
        var a= await createfeedbackforms(i,"Parents feedback form","parentfeedback");   
    }
    for(i=0; i<4; i++) {
        var a= await createfeedbackforms(i,"Employer feedback form","employerfeedback");   
    }

}

const createandsendforms=async()=> {
    const b2=await removedirectoryall(formdir);
    const b1=await createdirectoryall(formdir);
    const a1=await createsampleform();
    const b=await createarchiveall(formdir,"sample_feedback_forms");
   // processfile();
}



const createarchiveall=async(archivedir,filename)=> {

    var output = file_system.createWriteStream(outputdir + '/' + filename + '.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    sendmailall(filename);
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(archivedir, false);

// append files from a sub-directory and naming it `new-subdir` within the archive
//archive.directory('subdir/', 'new-subdir');

archive.finalize();

}




const sendmailall=async (filename) => {
    try {
        
        const transporter=nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: fromemail,
                pass: password
            
            }
        });
       

        var htmlc = fs.readFileSync(htmltemplate);
        var textc = fs.readFileSync(texttemplate);

        var find13 = 'replace';
        var re13 = new RegExp(find13, 'g');

        htmlc=htmlc.toString().replace(re13,contentr);
        textc=textc.toString().replace(re13,contentr);

      

        const mailoptions= {
            from: fromemail,
            to: to,
            cc: "suman@campus.technology,team@epaathsala.com",
            subject: subject,
            html:htmlc,
            text: textc,
            attachments: [
                {   // filename and content type is derived from path
                    path: outputdir + '/' + filename + '.zip'
                },
            ]

        }
        await transporter.sendMail(mailoptions);
       console.log('Mail sent successfully');

    }catch(e) {
        console.log(e);

    }
}









// feedback reports



exports.createfeedbackreports2= async (req,res) => {
    //res.cookie("user","Akshata");
    to=req.query.to;
    students=req.query.students;
    faculties=req.query.faculties;
    alumni=req.query.alumni;
    parents=req.query.parents;
    contentr=req.query.contentr;
    fromemail=req.query.fromemail;
    password=req.query.password;

    subject='Sample feedback reports for five years from all stakeholders';

    colid=req.query.colid;

    dir = './naac/' + colid.toString() + '/feedback';
    outputdir = './naac/' + colid.toString() + '/output';

  
  
    try{
        const token=req.query.token;
        //console.log(token);
        let jwtuser='';
        let jwtcolid='';
       
        const user1=req.query.user;
        const colid=req.query.colid;
  

        createandsend();
        var dt1=new Date();

        const pat1= await pstatusnew.findOneAndUpdate({colid: colid, client: 'feedbackreports'},{
            remarks:'Feedback reports mail sent by AI on ' + dt1.toString(),
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
                user: fromemail,
                pass: password
            
            }
        });
       

        var htmlc = fs.readFileSync(htmltemplate);
        var textc = fs.readFileSync(texttemplate);

        var find13 = 'replace';
        var re13 = new RegExp(find13, 'g');

        htmlc=htmlc.toString().replace(re13,contentr);
        textc=textc.toString().replace(re13,contentr);

      

        const mailoptions= {
            from: fromemail,
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


const createdirectoryall=async(dirname)=> {
    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname, { recursive: true });
    }
    if (!fs.existsSync(outputdir)){
        fs.mkdirSync(outputdir, { recursive: true });
    }
}

const removedirectoryall=async(dirname)=> {
    try {
        fs.rmSync(dirname, { recursive: true, force: true });

    } catch(e) {

    }
    try {
        fs.rmSync(outputdir, { recursive: true, force: true });

    } catch(e) {

    }
}







