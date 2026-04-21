const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../Models/user");
const Kpi = require("./../Models/kpi");

const AWS = require('aws-sdk');

const projects = require("./../Models/projects");
const publications = require("./../Models/publications");
const patents = require("./../Models/patents");
const teacherfellow = require("./../Models/teacherfellow");
const consultancy = require("./../Models/consultancy");
const phdguide = require("./../Models/phdguide");
const seminar = require("./../Models/seminar");
const book = require("./../Models/book");

const examschedule = require("./../Models/examschedule");
const examroom = require("./../Models/examroom");

const mprograms = require("./../Models/mprograms");
const mcourses = require("./../Models/mcourses");
const mstudents = require("./../Models/mstudents");
const examtimetable = require("./../Models/examtimetable");

const mfaccourses = require("./../Models/mfaccourses");
const mfaccoursesatt = require("./../Models/mfaccoursesatt");

const mattcalc = require("./../Models/mattcalc");

const mcolevels = require("./../Models/mcolevels");

const mcourseslist = require("./../Models/mcourseslist");

const mstudents1 = require("./../Models/mstudents1");

const madmapplys = require("./../Models/madmapplys");
const madmapplya = require("./../Models/madmapplya");

const classenr1 = require("./../Models/classenr1");

const msyllabus = require("./../Models/msyllabus");

const massignments = require("./../Models/massignments");
const manouncements = require("./../Models/manouncements");
const mcourseco = require("./../Models/mcourseco");
const mcalendar = require("./../Models/mcalendar");
const mcoursematerial = require("./../Models/mcoursematerial");

const massignsubmit = require("./../Models/massignsubmit");
const mdiscussion = require("./../Models/mdiscussion");

const quotanew = require("./../Models/quotanew");

const classnew = require("./../Models/classnew");
const attendancenew = require("./../Models/attendancenew");

const scholnew = require("./../Models/scholnew");
const studawardsnew = require("./../Models/studawardsnew");

const slideshow = require("./../Models/slideshow");

const eventsnew1 = require("./../Models/eventsnew1");

const testnew = require("./../Models/testnew");
const testq = require("./../Models/testq");
const testo = require("./../Models/testo");

const testscores = require("./../Models/testscores");

const lmsvideos = require("./../Models/lmsvideos");
const lmsvideosc = require("./../Models/lmsvideosc");

const mvac = require("./../Models/mvac");

const lpublications = require("./../Models/lpublications");
const lpubeditions = require("./../Models/lpubeditions");
const lpubarticles = require("./../Models/lpubarticles");
const lpubreviews = require("./../Models/lpubreviews");

const mplacement=require('./../Models/mplacement');


const massets=require('./../Models/massets');
const massetassign=require('./../Models/massetassign');
const mvendors=require('./../Models/mvendors');
const mvendorbanks=require('./../Models/mvendorbanks');
const mpurchase=require('./../Models/mpurchase');
const mpurchaseitems=require('./../Models/mpurchaseitems');
const mpopayments=require('./../Models/mpopayments');

const mtestnewm=require('./../Models/mtestnewm');
const mtestsessions=require('./../Models/mtestsessions');
const mtestseenrol=require('./../Models/mtestseenrol');
const mtestsections=require('./../Models/mtestsections');
const mtestqnew=require('./../Models/mtestqnew');

const mtestseenrol1=require('./../Models/mtestseenrol1');

const mtestsections1=require('./../Models/mtestsections1');

const mtestscoresnew=require('./../Models/mtestscoresnew');

const mtestscoresnew1=require('./../Models/mtestscoresnew1');

const mguides=require('./../Models/mguides');
const mctalentreg=require('./../Models/mctalentreg');
const mtestqnewcs=require('./../Models/mtestqnewcs');

const onlinepay=require('./../Models/onlinepay');


const mindmaplist=require('./../Models/mindmaplist');
const mindmapnodes=require('./../Models/mindmapnodes');
const mindmapedges=require('./../Models/mindmapedges');


const minewm=require('./../Models/minewm');
const misessions=require('./../Models/misessions');
const miseenrol1=require('./../Models/miseenrol1');
const misections1=require('./../Models/misections1');
const miqnew=require('./../Models/miqnew');
const miscores=require('./../Models/miscores');

const bmou=require('./../Models/bmou');

const btrialb=require('./../Models/btrialb');
const bfacyear=require('./../Models/bfacyear');
const studlist=require('./../Models/studlist');


const nn11=require('./../Models/nn11');
const nn12=require('./../Models/nn12');
const nn14=require('./../Models/nn14');
const nn15=require('./../Models/nn15');
const nn16=require('./../Models/nn16');
const nn17=require('./../Models/nn17');

const nn211a=require('./../Models/nn211a');
const nn211b=require('./../Models/nn211b');
const nn22=require('./../Models/nn22');
const nn23=require('./../Models/nn23');
const nn244=require('./../Models/nn244');
const nn25=require('./../Models/nn25');
const nn26=require('./../Models/nn26');
const nn31=require('./../Models/nn31');
const nn32=require('./../Models/nn32');

const nn33a=require('./../Models/nn33a');
const nn33b=require('./../Models/nn33b');
const nn35=require('./../Models/nn35');
const nn36=require('./../Models/nn36');
const nn46=require('./../Models/nn46');


const nn51=require('./../Models/nn51');
const nn52=require('./../Models/nn52');
const nn53examdays=require('./../Models/nn53examdays');
const nn53passp=require('./../Models/nn53passp');
const nn53obe=require('./../Models/nn53obe');
const nn54=require('./../Models/nn54');
const nn55=require('./../Models/nn55');
const nn56=require('./../Models/nn56');

const nallaccr=require('./../Models/nallaccr');

const nallaccrans=require('./../Models/nallaccrans');

const nn61=require('./../Models/nn61');
const nn62=require('./../Models/nn62');
const nn6clubs=require('./../Models/nn6clubs');


const nn76=require('./../Models/nn76');
const nn781=require('./../Models/nn781');
const nn82=require('./../Models/nn82');
const nn83=require('./../Models/nn83');
const nn84=require('./../Models/nn84');
const nn86=require('./../Models/nn86');
const nn87=require('./../Models/nn87');
const nn96=require('./../Models/nn96');
const nn97=require('./../Models/nn97');
const nn98=require('./../Models/nn98');


const attyear=require('./../Models/attyear');

const ngroup=require('./../Models/ngroup');
const ngrouppages=require('./../Models/ngrouppages');
const ngroupaccr=require('./../Models/ngroupaccr');

const timeslotsn1=require('./../Models/timeslotsn1');
const workloadn1=require('./../Models/workloadn1');


const facwcal=require('./../Models/facwcal');

const examadmit=require('./../Models/examadmit');
const fees=require('./../Models/fees');
const ledgerstud=require('./../Models/ledgerstud');


const exammarksall=require('./../Models/exammarksall');

const jobds=require('./../Models/jobds');
const jobapplicationds=require('./../Models/jobapplicationds');

const lessonplannew=require('./../Models/lessonplannew');

const serbplan=require('./../Models/serbplan');


const macadcal=require('./../Models/macadcal');
const mfeescol=require('./../Models/mfeescol');

const mjournal1=require('./../Models/mjournal1');
const mtrialbalance1=require('./../Models/mtrialbalance1');

const mjournal2=require('./../Models/mjournal2');
const mtrialbalance2=require('./../Models/mtrialbalance2');

const mtradingaccount=require('./../Models/mtradingaccount');
const mplaccount=require('./../Models/mplaccount');
const mbalancesheet=require('./../Models/mbalancesheet');

const studalloc1=require('./../Models/studalloc1');


const Patient=require('./../Models/Patient');
const icu=require('./../Models/icu');
const micu=require('./../Models/micu');
const nicu=require('./../Models/nicu');
const hdu=require('./../Models/hdu');
const ward=require('./../Models/ward');
const emergency=require('./../Models/emergency');
const nemergency=require('./../Models/nemergency');
const padmission=require('./../Models/padmission');
const icubed=require('./../Models/icubed');
const micubed=require('./../Models/micubed');
const nicubed=require('./../Models/nicubed');
const hdubed=require('./../Models/hdubed');
const wardbed=require('./../Models/wardbed');
const erbed=require('./../Models/erbed');
const nerbed=require('./../Models/nerbed');
const padmhistory=require('./../Models/padmhistory');
const pbilling=require('./../Models/pbilling');


const pillness=require('./../Models/pillness');
const psurgery=require('./../Models/psurgery');
const pfamily=require('./../Models/pfamily');
const pallergies=require('./../Models/pallergies');


const pconsent=require('./../Models/pconsent');
const ptreatment=require('./../Models/ptreatment');
const plab=require('./../Models/plab');
const pimaging=require('./../Models/pimaging');
const pdischarge=require('./../Models/pdischarge');


const wcollection=require('./../Models/wcollection');
const wcolschedule=require('./../Models/wcolschedule');
const wdisposal=require('./../Models/wdisposal');
const wspill=require('./../Models/wspill');


const wbin=require('./../Models/wbin');
const wcolschedule1=require('./../Models/wcolschedule1');
const wdisposal1=require('./../Models/wdisposal1');
const wspill1=require('./../Models/wspill1');


const pcounselnew=require('./../Models/pcounselnew');
const pcounselc=require('./../Models/pcounselc');
const pmealplan=require('./../Models/pmealplan');
const pfood=require('./../Models/pfood');

const crmh1=require('./../Models/crmh1');

const tall=require('./../Models/tall');
const tfields=require('./../Models/tfields');

const tbcolumnsall=require('./../Models/tbcolumnsall');

const tblapi=require('./../Models/tblapi');


// GET filtered report
exports.getwreport1=async (req, res) => {
  try {
    const { program, coursename, semester, user, year, fname  } = req.query;

    let query = {};
    if (coursename) query.coursename = coursename;
    if (year) query.year = year;
    if (program) query.program = program;
    if (user) query.user = user;
    if (semester) query.semester = semester;
    if (fname) query.name = fname;

    const data = await mfaccourses.find(query);
    // res.json({ success: true, data });
      return res.status(200).json({
              status:'Success',
              data: {
                  classes : data
              }   
          }); 
  } catch (err) {
    //res.status(500).json({ success: false, error: err.message });
  }
  
};