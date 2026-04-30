const RegulationMaster = require("../Models/regulationmasterds");

function toNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function cleanPayload(input = {}) {
  return {
    regulation: String(input.regulation || "").trim(),
    description: String(input.description || "").trim(),
    isactive: input.isactive === "No" ? "No" : "Yes",
    colid: toNumber(input.colid)
  };
}

function buildQuery(req) {
  const query = {};
  const colid = toNumber(req.query.colid || req.body.colid);

  if (colid !== undefined) {
    query.colid = colid;
  }

  if (req.query.isactive) {
    query.isactive = req.query.isactive;
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    query.$or = [
      { regulation: searchRegex },
      { description: searchRegex },
      { isactive: searchRegex }
    ];
  }

  return query;
}

exports.createRegulationMaster = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    if (!payload.regulation) {
      return res.status(400).json({ success: false, message: "Regulation is required" });
    }
    if (payload.colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const data = await RegulationMaster.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRegulationMasters = async (req, res) => {
  try {
    const query = buildQuery(req);
    if (query.colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const data = await RegulationMaster.find(query).sort({ regulation: 1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRegulationMasterById = async (req, res) => {
  try {
    const data = await RegulationMaster.findById(req.query.id || req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Regulation not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRegulationMaster = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const payload = cleanPayload(req.body);
    delete payload.id;

    if (!payload.regulation) {
      return res.status(400).json({ success: false, message: "Regulation is required" });
    }

    const data = await RegulationMaster.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!data) {
      return res.status(404).json({ success: false, message: "Regulation not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRegulationMaster = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const data = await RegulationMaster.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ success: false, message: "Regulation not found" });
    }

    res.status(200).json({ success: true, message: "Regulation deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
