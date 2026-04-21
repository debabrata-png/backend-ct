// jobApplicationController.js
const jobapplicationformds = require("../Models/jobapplicationformds");
const jobinternalds = require("../Models/jobinternalds");

// 1. Create new application only if none exists for this user+job+college
exports.createapplication = async (req, res) => {
  try {
    const { applicantemail, jobtitle, colid } = req.body;

    // Make sure we do not create duplicates for the same email+job+college
    const existing = await jobapplicationformds.findOne({
      applicantemail,
      jobtitle,
      colid
    });

    if (existing)
      return res.status(409).json({ message: "Application already exists" });

    const application = await jobapplicationformds.create(req.body);
    return res.status(201).json(application);
  } catch (err) {
  }
};

exports.getapplicationsgrouped = async (req, res) => {
  try {
    const { colid, jobid } = req.query;

    const applications = await jobapplicationformds.find({
      colid: parseInt(colid),
      jobid: jobid
    })

    res.json(applications);
  } catch (e) {
  }
};


exports.getapplicationbyid = async (req, res) => {
  try {
    const {id, colid} = req.query;
    const application = await jobapplicationformds.findOne({
      _id: id,
      colid: parseInt(colid)
    })
    return res.json(application);
  } catch (error) {
    
  }
}

// PATCH /api/admin/applications/:id/status
exports.updatestatus = async (req, res) => {
  try {
    const { id } = req.body;
    const { status } = req.body;
    const updated = await jobapplicationformds
      .findByIdAndUpdate(id, { status }, { new: true })
      .lean();
    res.json(updated);
  } catch (e) {
  }
};

exports.createinternaljob = async (req, res) => {
  try {
    const job = await jobinternalds.create(req.body);
    res.json(job);
  } catch (e) {
  }
};

exports.getinternaljobs = async (req, res) => {
  try {
    const { colid } = req.query;
    const filter = colid ? { colid: Number(colid) } : {};
    const jobs = await jobinternalds.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (e) {
  }
};

exports.getinternaljobbyid = async (req, res) => {
  try {
    const job = await jobinternalds.findById(req.query.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (e) {
  }
};

exports.updateinternaljob = async (req, res) => {
  try {
    const job = await jobinternalds.findByIdAndUpdate(req.query.id, req.body, { new: true });
    res.json(job);
  } catch (e) {
  }
};

exports.deleteinternaljob = async (req, res) => {
  try {
    const job = await jobinternalds.findByIdAndDelete(req.query.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (e) {
  }
};
