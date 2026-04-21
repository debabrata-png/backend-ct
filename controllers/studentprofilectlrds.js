const User = require('../Models/user');
const exammarksall = require('../Models/exammarksall');
const applicationFormModel = require('../Models/application_model1');
const busseatallocationds = require('../Models/busseatallocationds');
const eventregistration = require('../Models/eventregistration');
const hostelbedallocation = require('../Models/hostelbedallocation');
const rubricds = require('../Models/rubricds');
const eventsnew1 = require("../Models/eventsnew1");

exports.getuser = async (req, res) => {
    const { colid, regno, email } = req.query;

    try {
        const user = await User.findOne({ colid:parseInt(colid), regno, email });
        res.status(200).json(user);
    } catch (error) {
    }
};

exports.getexammarks = async (req, res) => {
    const { colid, regno } = req.query;

    try {
        const examMarks = await exammarksall.find({ colid: parseInt(colid), regno });
        res.status(200).json(examMarks);
    } catch (error) {
    }
};

exports.getapplicationform = async (req, res) => {
    const { colid, email } = req.query;

    try {
        const applicationForm = await applicationFormModel.findOne({ colId: parseInt(colid), email });
        if(!applicationForm){
            //console.log("not found");
        }
        res.status(200).json(applicationForm);
    } catch (error) {
        //console.log(error);
    }
};

exports.getbusseatallocation = async (req, res) => {
    const { colid, regno } = req.query;

    try {
        const busSeatAllocation = await busseatallocationds.findOne({ colid: parseInt(colid), regno });
        res.status(200).json(busSeatAllocation);
    } catch (error) {
    }
};

exports.geteventregistration = async (req, res) => {
  const { colid, email } = req.query;

  try {
    // Retrieve the event registration data and populate the event details
    const eventRegistrations = await eventregistration.find({ colid: colid, email: email })
      .populate({
        path: 'eventid',
        select: 'name startdate description brochurelink reportlink coordinator type level collab moulink duration', // Specify the fields you want to retrieve
      });

    res.status(200).json(eventRegistrations);
  } catch (error) {
    //console.log(error);
    
    res.status(500).json({ message: "Error fetching event registrations", error: error.message });
  }
};

exports.gethostelbedallocation = async (req, res) => {
    const { colid, regno } = req.query;

    try {
        const hostelBedAllocation = await hostelbedallocation.findOne({ colid: parseInt(colid), regno });
        res.status(200).json(hostelBedAllocation);
    } catch (error) {
    }
};

exports.getrubricds = async (req, res) => {
    const { colid, regno } = req.query;
    try {
        // Find all rubric entries for the student based on colid and regno
        const rubricData = await rubricds.find({ colid: parseInt(colid), regno });
        res.status(200).json(rubricData);
    } catch (error) {
        //console.error(error);
        res.status(500).json({ message: "Error fetching rubric data", error: error.message });
    }
};

exports.createapplication = async (req, res) =>{
    try {
         const application = await applicationFormModel.create(req.body);
         return res.status(200).json({
            data: application
         })
    } catch (error) {
        //console.log(error);
        
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ colid, name, email: userEmail, regno, role });
  } catch (e) {
  }
};