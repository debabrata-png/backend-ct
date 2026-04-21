const crmh1 = require('../Models/crmh1');

// Get all leads (USER-BASED ACCESS)
exports.getallleadsdsadmin = async (req, res) => {
  try {
    const { colid, user, pipeline_stage, lead_temperature, source, search } = req.query;

    // Base query: Match leads where:
    // 1. Lead belongs to this organization (colid matches)
    // 2. Either lead.user === user (admin/owner) OR lead.assignedto === user (counsellor)
    let query = {
      colid: Number(colid),
    };

    // Apply filters
    if (pipeline_stage && pipeline_stage !== 'All') {
      query.pipeline_stage = pipeline_stage;
    }

    if (lead_temperature && lead_temperature !== 'All') {
      query.lead_temperature = lead_temperature;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      // For search, we need to combine with $or for user access
      query.$and = [
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
          ]
        }
      ];
      // Remove the $or key since we're using $and now
      delete query.$or;
    }

    // Sort by updatedAt descending so recently modified leads appear first
    const leads = await crmh1.find(query).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: leads, count: leads.length });
  } catch (err) {
    // res.status(500).json({ success: false, message: err.message });
  }
};

// Get leads by date range
exports.getLeadsByDateRange = async (req, res) => {
  try {
    const { colid, startDate, endDate } = req.query;

    // Validate inputs
    if (!colid || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the whole end day

    const query = {
      colid: Number(colid),
      createdAt: {
        $gte: start,
        $lte: end
      }
    };

    const leads = await crmh1.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, data: leads });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Bulk Assign Counselor
exports.bulkAssignCounselor = async (req, res) => {
  try {
    const { leadIds, counselorEmail } = req.body;

    if (!leadIds || !Array.isArray(leadIds) || !counselorEmail) {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const result = await crmh1.updateMany(
      { _id: { $in: leadIds } },
      { $set: { assignedto: counselorEmail } }
    );

    res.status(200).json({ success: true, message: 'Leads assigned successfully', result });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Bulk Change Lead Stage
exports.bulkChangeLeadStage = async (req, res) => {
  try {
    const { leadIds, newStage } = req.body;

    if (!leadIds || !Array.isArray(leadIds) || !newStage) {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const result = await crmh1.updateMany(
      { _id: { $in: leadIds } },
      { $set: { pipeline_stage: newStage } }
    );

    res.status(200).json({ success: true, message: 'Lead stages updated successfully', result });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};