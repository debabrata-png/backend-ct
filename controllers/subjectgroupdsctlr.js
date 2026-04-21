// controllers/subjectgroupdsctlr.js
const SubjectGroup = require("../Models/subjectgroupds");
const StudSubject = require("../Models/studsubjectds");
const SubLimitConf = require("../Models/sublimitconfds");

const GROUPNAMES = ["Major", "Minor", "Language", "Skill Development"];
const LANG_TYPES = ["Compulsory", "Additional"];

// ==================== SUBJECT LIMIT CONFIGURATION ====================

// Set or update subject limits for a program/semester
exports.setSubjectLimits = async (req, res) => {
  try {
    const { 
      name, user, colid, year, programcode, semester, 
      minSubjects, maxSubjects, 
      minLanguage, maxLanguage, minCompulsory, minAdditional,
      minSkillDevelopment, maxSkillDevelopment
    } = req.body;

    if (!name || !user || !colid || !year || !programcode || !semester) {
      return res.status(400).json({ message: "name, user, colid, year, programcode, semester required" });
    }

    const config = await SubLimitConf.findOneAndUpdate(
      { colid: parseInt(colid), year, programcode, semester },
      {
        name,
        user,
        minSubjects: minSubjects || 6,
        maxSubjects: maxSubjects || 6,
        minLanguage: minLanguage || 2,
        maxLanguage: maxLanguage || 2,
        minCompulsory: minCompulsory || 1,
        minAdditional: minAdditional || 1,
        minSkillDevelopment: minSkillDevelopment || 0,
        maxSkillDevelopment: maxSkillDevelopment || 2,
        updatedAt: Date.now()
      },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true, 
      message: "Subject limits configured successfully", 
      config 
    });
  } catch (error) {
    // res.status(500).json({ 
    //   success: false, 
    //   message: "Error setting subject limits", 
    //   error: error.message 
    // });
  }
};

// Get subject limits for a specific program/semester
exports.getSubjectLimits = async (req, res) => {
  try {
    const { colid, year, programcode, semester } = req.query;

    if (!colid || !year || !programcode || !semester) {
      return res.status(400).json({ message: "colid, year, programcode, semester required" });
    }

    const config = await SubLimitConf.findOne({
      colid: parseInt(colid),
      year,
      programcode,
      semester
    });

    if (!config) {
      return res.status(404).json({ message: "No limit configuration found" });
    }

    res.json({ success: true, config });
  } catch (error) {
    // res.status(500).json({ 
    //   success: false, 
    //   message: "Error fetching limits", 
    //   error: error.message 
    // });
  }
};

// List all subject limit configurations
exports.listAllSubjectLimits = async (req, res) => {
  try {
    const { colid } = req.query;
    
    if (!colid) {
      return res.status(400).json({ message: "colid required" });
    }

    const configs = await SubLimitConf.find({ colid: parseInt(colid) }).sort({ createdAt: -1 });
    res.json({ success: true, configs });
  } catch (error) {
    // res.status(500).json({ 
    //   success: false, 
    //   message: "Error listing configurations", 
    //   error: error.message 
    // });
  }
};

// Delete a subject limit configuration
exports.deleteSubjectLimit = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "Configuration id required" });
    }

    await SubLimitConf.findByIdAndDelete(id);
    res.json({ success: true, message: "Configuration deleted successfully" });
  } catch (error) {
    // res.status(500).json({ 
    //   success: false, 
    //   message: "Error deleting configuration", 
    //   error: error.message 
    // });
  }
};

// ==================== FACULTY SUBJECT CONFIGURATION ====================

// Add subjects to groups
exports.addSubjects = async (req, res) => {
  try {
    const { name, user, colid, subject, groupname, year, programcode, semester, type } = req.body;

    if (!name || !user || !colid || !subject || !groupname || !year || !programcode || !semester) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!GROUPNAMES.includes(groupname)) {
      return res.status(400).json({ message: `Invalid groupname. Must be one of: ${GROUPNAMES.join(", ")}` });
    }

    if (groupname === "Language" && !LANG_TYPES.includes(type)) {
      return res.status(400).json({ message: `Language type must be one of: ${LANG_TYPES.join(", ")}` });
    }

    // Check for duplicate
    const existing = await SubjectGroup.findOne({
      colid: parseInt(colid),
      subject,
      groupname,
      year,
      programcode,
      semester,
      type: type || ""
    });

    if (existing) {
      return res.status(400).json({ message: "This subject is already configured in this group" });
    }

    const newSubject = new SubjectGroup({
      name,
      user,
      colid: parseInt(colid),
      subject,
      groupname,
      year,
      programcode,
      semester,
      type: type || ""
    });

    await newSubject.save();
    res.json({ success: true, message: "Subject added successfully", data: newSubject });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error adding subject", error: error.message });
  }
};

// List all configured subjects
exports.listSubjects = async (req, res) => {
  try {
    const { colid, year, programcode, semester } = req.query;

    const query = { colid: parseInt(colid) };
    if (year) query.year = year;
    if (programcode) query.programcode = programcode;
    if (semester) query.semester = semester;

    const subjects = await SubjectGroup.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: subjects });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error listing subjects", error: error.message });
  }
};

// Get subjects by specific group
exports.getSubjectsByGroup = async (req, res) => {
  try {
    const { colid, groupname, year, programcode, semester } = req.query;

    if (!colid || !groupname) {
      return res.status(400).json({ message: "colid and groupname required" });
    }

    const query = { colid: parseInt(colid), groupname };
    if (year) query.year = year;
    if (programcode) query.programcode = programcode;
    if (semester) query.semester = semester;

    const subjects = await SubjectGroup.find(query).sort({ subject: 1 });
    res.json({ success: true, data: subjects });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error fetching subjects", error: error.message });
  }
};

// Remove configured subject
exports.removeConfiguredSubject = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Subject id required" });
    }

    await SubjectGroup.findByIdAndDelete(id);
    res.json({ success: true, message: "Subject removed successfully" });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error removing subject", error: error.message });
  }
};

// ==================== STUDENT SUBJECT APPLICATION ====================

// Get available subjects for student (structured by group)
exports.availableForStudent = async (req, res) => {
  try {
    const { colid, year, programcode, semester } = req.query;

    if (!colid || !year || !programcode || !semester) {
      return res.status(400).json({ message: "colid, year, programcode, semester required" });
    }

    const subjects = await SubjectGroup.find({
      colid: parseInt(colid),
      year,
      programcode,
      semester
    }).sort({ groupname: 1, subject: 1 });

    // Structure by group
    const structured = {
      Major: [],
      Minor: [],
      Language: [],
      "Skill Development": []
    };

    subjects.forEach(sub => {
      if (structured[sub.groupname]) {
        structured[sub.groupname].push(sub);
      }
    });

    res.json({ success: true, data: structured });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error fetching subjects", error: error.message });
  }
};

// Apply for subjects with validation
exports.applySubjects = async (req, res) => {
  try {
    const { 
      name, user, colid, year, programcode, semester, 
      student, regno, 
      applications 
    } = req.body;

    if (!name || !user || !colid || !year || !programcode || !semester || !student || !regno || !applications) {
      return res.status(400).json({ message: "All fields and applications array required" });
    }

    // Get configured limits
    const limits = await SubLimitConf.findOne({
      colid: parseInt(colid),
      year,
      programcode,
      semester
    });

    if (!limits) {
      return res.status(400).json({ 
        message: "No subject limits configured for this program/semester. Please contact faculty." 
      });
    }

    // Check for existing applications
    const existingApps = await StudSubject.find({
      colid: parseInt(colid),
      regno,
      year,
      programcode,
      semester
    });

    if (existingApps.length > 0) {
      return res.status(400).json({ 
        message: "You have already submitted applications for this program/semester" 
      });
    }

    // Count by group
    const counts = {
      Major: 0,
      Minor: 0,
      Language: 0,
      LanguageCompulsory: 0,
      LanguageAdditional: 0,
      SkillDevelopment: 0
    };

    applications.forEach(app => {
      if (app.groupname === "Language") {
        counts.Language++;
        if (app.type === "Compulsory") counts.LanguageCompulsory++;
        if (app.type === "Additional") counts.LanguageAdditional++;
      } else if (app.groupname === "Skill Development") {
        counts.SkillDevelopment++;
      } else {
        counts[app.groupname]++;
      }
    });

    const totalSubjects = applications.length;

    // Validate total subjects
    if (totalSubjects < limits.minSubjects || totalSubjects > limits.maxSubjects) {
      return res.status(400).json({ 
        message: `Total subjects must be between ${limits.minSubjects} and ${limits.maxSubjects}. You selected ${totalSubjects}.` 
      });
    }

    // Validate Language subjects
    if (counts.Language < limits.minLanguage || counts.Language > limits.maxLanguage) {
      return res.status(400).json({ 
        message: `Language subjects must be between ${limits.minLanguage} and ${limits.maxLanguage}. You selected ${counts.Language}.` 
      });
    }

    if (counts.LanguageCompulsory < limits.minCompulsory) {
      return res.status(400).json({ 
        message: `You must select at least ${limits.minCompulsory} Compulsory Language subject(s). You selected ${counts.LanguageCompulsory}.` 
      });
    }

    if (counts.LanguageAdditional < limits.minAdditional) {
      return res.status(400).json({ 
        message: `You must select at least ${limits.minAdditional} Additional Language subject(s). You selected ${counts.LanguageAdditional}.` 
      });
    }

    // Validate Skill Development subjects
    if (counts.SkillDevelopment < limits.minSkillDevelopment || counts.SkillDevelopment > limits.maxSkillDevelopment) {
      return res.status(400).json({ 
        message: `Skill Development subjects must be between ${limits.minSkillDevelopment} and ${limits.maxSkillDevelopment}. You selected ${counts.SkillDevelopment}.` 
      });
    }

    // Save all applications
    const savedApps = [];
    for (const app of applications) {
      const newApp = new StudSubject({
        name,
        user,
        colid: parseInt(colid),
        subject: app.subject,
        groupname: app.groupname,
        year,
        programcode,
        semester,
        type: app.type || "",
        student,
        regno,
        status: "Pending"
      });
      await newApp.save();
      savedApps.push(newApp);
    }

    res.json({ 
      success: true, 
      message: `Successfully submitted ${savedApps.length} subject applications`, 
      data: savedApps 
    });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error submitting applications", error: error.message });
  }
};

// Get student's own applications
exports.myApplications = async (req, res) => {
  try {
    const { colid, regno } = req.query;

    if (!colid || !regno) {
      return res.status(400).json({ message: "colid and regno required" });
    }

    const applications = await StudSubject.find({
      colid: parseInt(colid),
      regno
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: applications });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error fetching applications", error: error.message });
  }
};

// ==================== FACULTY APPROVAL QUEUE ====================

// Search/filter applications
exports.searchApplications = async (req, res) => {
  try {
    const { colid, searchTerm, status, year, programcode, semester, groupname } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid required" });
    }

    const query = { colid: parseInt(colid) };

    if (status) query.status = status;
    if (year) query.year = year;
    if (programcode) query.programcode = programcode;
    if (semester) query.semester = semester;
    if (groupname) query.groupname = groupname;

    if (searchTerm) {
      query.$or = [
        { regno: { $regex: searchTerm, $options: "i" } },
        { student: { $regex: searchTerm, $options: "i" } },
        { subject: { $regex: searchTerm, $options: "i" } }
      ];
    }

    const applications = await StudSubject.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {    
    // res.status(500).json({ success: false, message: "Error searching applications", error: error.message });
  }
};

// Update application status (single)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "id and status required" });
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await StudSubject.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ success: true, message: "Status updated successfully", data: updated });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error updating status", error: error.message });
  }
};

// Bulk approve/reject
exports.bulkDecision = async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0 || !status) {
      return res.status(400).json({ message: "ids array and status required" });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected" });
    }

    const result = await StudSubject.updateMany(
      { _id: { $in: ids } },
      { status }
    );

    res.json({ 
      success: true, 
      message: `${result.modifiedCount} applications ${status.toLowerCase()} successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    // res.status(500).json({ success: false, message: "Error processing bulk decision", error: error.message });
  }
};
