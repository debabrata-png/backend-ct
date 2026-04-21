 

 
const { Mentor, MentorDomainConfig } = require("../Models/mentorag");

const registerMentor = async (req, res) => {
  try {
    const { colid } = req.query;
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const mentor = await Mentor.create({ ...req.body, colid: Number(colid) });
    res.status(201).json({ success: true, message: "Mentor registered successfully", data: mentor });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const { colid, role, status } = req.query;
    if (!colid) {
      return res
        .status(400)
        .json({ success: false, message: "colid is required" });
    }

    let filter = { isDeleted: { $ne: true } };

    if (role === "Admin") {
      // Admin sees all mentors across colleges
    } else if (
      role === "Alumni" ||
       
      role === "Student"
    ) {
      filter.colid = Number(colid);
    }

    if (req.query.userid) {
      filter.userid = String(req.query.userid).trim();
    }

    // Filter by department if provided
    if (req.query.department) {
      filter.department = String(req.query.department).trim();
    }

    // Filter by semester if provided
    if (req.query.semester) {
      filter.semester = String(req.query.semester).trim();
    }

    // If status is provided, filter by it (case-insensitive handling)
    if (status) {
      filter.status = status.trim().toLowerCase();
    }

    const mentors = await Mentor.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


const getMentorById = async (req, res) => {
  try {
    const { colid } = req.query;
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const mentor = await Mentor.findOne({ _id: req.params.id, colid: Number(colid), isDeleted: false });
    if (!mentor) return res.status(404).json({ success: false, message: "Mentor not found" });

    res.status(200).json({ success: true, data: mentor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ─── Update Mentor ────────────────────────────────────────────────────────────
// POST /api/mentors/update/:id?colid=xxx
// Body: any fields to update — most commonly { status: "approved" | "rejected" | "active" | "pending" }

const updateMentor = async (req, res) => {
  try {
    const { colid, role } = req.query;
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    // Admins can update any mentor; others are scoped to their college
    const filter =
      role === "Admin"
        ? { _id: req.params.id, isDeleted: { $ne: true } }
        : { _id: req.params.id, colid: Number(colid), isDeleted: { $ne: true } };

    const mentor = await Mentor.findOne(filter);
    if (!mentor) return res.status(404).json({ success: false, message: "Mentor not found" });

    // Fields that must never be overwritten via this endpoint
    const PROTECTED = ["colid", "isDeleted", "deletedAt", "_id", "__v"];
    const updates   = { ...req.body };
    PROTECTED.forEach((f) => delete updates[f]);

    // Validate status value if it is being changed
    const VALID_STATUSES = ["pending", "approved", "rejected", "active"];
    if (updates.status && !VALID_STATUSES.includes(String(updates.status).toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${VALID_STATUSES.join(", ")}`,
      });
    }
    if (updates.status) updates.status = String(updates.status).toLowerCase();

    // Track when status changes
    if (updates.status && updates.status !== mentor.status) {
      updates.statusUpdatedAt = new Date();
    }

    const updated = await Mentor.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Mentor updated successfully", data: updated });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ─── Delete Mentor (soft) ─────────────────────────────────────────────────────
const deleteMentor = async (req, res) => {
  try {
    const { colid, userid } = req.query;
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const filter = { _id: req.params.id, colid: Number(colid), isDeleted: false };
    if (userid) filter.userid = userid;

    const mentor = await Mentor.findOne(filter);
    if (!mentor) return res.status(404).json({ success: false, message: "Mentor not found" });

    mentor.isDeleted = true;
    mentor.deletedAt = new Date();
    await mentor.save();

    res.status(200).json({ success: true, message: "Mentor deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

 const saveDomainConfig = async (req, res) => {
  try {
    const { colid, role } = req.query;
    if (!colid)           return res.status(400).json({ success: false, message: "colid is required" });
    if (role !== "Admin") return res.status(403).json({ success: false, message: "Only admins can configure domains" });

    const { domains = [], updatedBy = "" } = req.body;
    if (!Array.isArray(domains)) return res.status(400).json({ success: false, message: "domains must be an array" });
    if (domains.some((d) => !d.name?.trim())) return res.status(400).json({ success: false, message: "Every domain must have a name" });

    const lower = domains.map((d) => d.name.trim().toLowerCase());
    if (new Set(lower).size !== lower.length)
      return res.status(400).json({ success: false, message: "Duplicate domain names not allowed" });

    const sanitized = domains.map((d) => ({
      name:        d.name.trim(),
      description: d.description?.trim() || "",
      enabled:     d.enabled !== undefined ? Boolean(d.enabled) : true,
    }));

    const config = await MentorDomainConfig.findOneAndUpdate(
      { colid: Number(colid) },
      { $set: { domains: sanitized, updatedBy } },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: `${sanitized.length} domain(s) saved`, data: config.domains });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

const getDomains = async (req, res) => {
  try {
    const { colid, role } = req.query;
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    if (role !== "Admin" && role !== "Alumni")
      return res.status(403).json({ success: false, message: "Access denied" });

    const config = await MentorDomainConfig.findOne({ colid: Number(colid) });
    if (!config) return res.status(200).json({ success: true, data: [] });

    const data = role === "Admin"
      ? config.domains
      : config.domains.filter((d) => d.enabled);

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { registerMentor, getAllMentors, getMentorById, updateMentor, deleteMentor,saveDomainConfig,getDomains };