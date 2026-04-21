const User = require('../Models/user');
const jobapplicationds = require("../Models/jobapplicationds");
const jobds = require("../Models/jobds");
const studentcvds = require("../Models/studentcvds");

exports.createjob = async (req, res) => {
  try {
    const job = await jobds.create(req.body);
    res.json(job);
  } catch (e) {
  }
};

exports.getjobs = async (req, res) => {
  try {
    const { colid } = req.query;
    const filter = colid ? { colid: Number(colid) } : {};
    const jobs = await jobds.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (e) {
  }
};

exports.getjobbyid = async (req, res) => {
  try {
    const job = await jobds.findById(req.query.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (e) {
  }
};

exports.updatejob = async (req, res) => {
  try {
    const job = await jobds.findByIdAndUpdate(req.query.id, req.body, { new: true });
    res.json(job);
  } catch (e) {
  }
};

exports.deletejob = async (req, res) => {
  try {
    const job = await jobds.findByIdAndDelete(req.query.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (e) {
  }
};

exports.apply = async (req, res) => {
  try {
    const application = await jobapplicationds.create(req.body);
    res.json(application);
  } catch (e) {
  }
};

exports.getapplications = async (req, res) => {
  try {
    const { colid, companyemail, studentregno, jobid } = req.query;
    let filter = {};
    if (colid) filter.colid = Number(colid);
    if (companyemail) filter.companyemail = companyemail;
    if (studentregno) filter.studentregno = studentregno;
    if (jobid) filter.jobid = jobid;

    const apps = await jobapplicationds.find(filter)
      .populate("jobid")
      .populate("studentcv")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (e) {
  }
};

exports.updatejobappstatus = async (req, res) => {
  try {
    const app = await jobapplicationds.findByIdAndUpdate(
      req.query.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(app);
  } catch (e) {
  }
};

// 1. Create new CV only if none exists
exports.createcv = async (req, res) => {
  try {
    const { studentemail } = req.body;
    const existing = await studentcvds.findOne({ studentemail });
    if (existing) return res.status(409).json({ message: "CV already exists" });

    const cv = await studentcvds.create(req.body);
    res.status(201).json(cv);
  } catch (e) {
  }
};

// 2. Update existing CV only
exports.updatecv = async (req, res) => {
  try {
    const { studentemail } = req.body;
    const cv = await studentcvds.findOneAndUpdate({ studentemail }, req.body, {
      new: true,
    });
    res.json(cv);
  } catch (e) {
  }
};

exports.getcv = async (req, res) => {
  try {
    const { studentemail, colid } = req.query;
    const cv = await studentcvds.findOne({ 
      studentemail: studentemail,
      colid: parseInt(colid)
     });
    res.json(cv);
  } catch (e) {
  }
};

exports.getcvbyid = async (req, res) => {
  try {
    const cv = await studentcvds.findById(req.query.id);
    if (!cv) return res.status(404).json({ message: "CV not found" });
    res.json(cv);
  } catch (e) {
  }
};


// list all CVs for a college
exports.getcvsbycolid = async (req, res) => {
  try {
    const { colid } = req.query;
    const cvs = await studentcvds.find({ colid: Number(colid) });
    res.json(cvs);
  } catch (e) {
  }
};

// filter by program-code
// exports.searchcv = async (req, res) => {
//   try {
//     const { colid, programcode } = req.query;
//     const q = { colid: Number(colid) };
//     if (programcode && programcode.trim()) {
//       q.programcode = { $regex: programcode.trim(), $options: "i" };
//     }
//     const cvs = await studentcvds.find(q);
//     res.json(cvs);
//   } catch (e) {
//   }
// };

// live search with case-insensitive skills
exports.searchcv = async (req, res) => {
  try {
    const { colid, programcode, tenthmin, twelthmin, cgpamin, skills } =
      req.query;

    const q = { colid: Number(colid) };

    if (programcode?.trim()) {
      q.programcode = { $regex: programcode.trim(), $options: "i" };
    }
    if (tenthmin !== undefined) q.tenthmarks = { $gte: Number(tenthmin) };
    if (twelthmin !== undefined) q.twelthmarks = { $gte: Number(twelthmin) };
    if (cgpamin !== undefined) q.totalcgpa = { $gte: Number(cgpamin) };

    // skills: comma-separated list, case-insensitive substring match
    if (skills?.trim()) {
      const skillArr = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
      q.skills = { $in: skillArr };
    }

    const cvs = await studentcvds.find(q);
    res.json(cvs);
  } catch (e) {
  }
};


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