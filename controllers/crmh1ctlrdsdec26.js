const crmh1 = require('../Models/crmh1.js');
const categoryds = require('../Models/categoryds.js');
const leadactivityds = require('../Models/leadactivityds.js');
const dripcampaignds = require('../Models/dripcampaignds.js');
const user = require('../Models/user.js');

// Enhanced Lead Scoring with Pipeline Stage
const calculateLeadScore = (lead) => {
  let score = 0;
  
  // Basic contact information
  if (lead.phone) score += 5;
  if (lead.email) score += 5;
  if (lead.course_interested) score += 10;
  
  // Engagement tracking
  if (lead.brochure_downloaded === 'Yes') score += 10;
  if (lead.fee_details_requested === 'Yes') score += 5;
  if (lead.counselling_session_booked === 'Yes') score += 20;
  if (lead.scholarship_interest === 'Yes') score += 10;
  if (lead.campus_visit_completed === 'Yes') score += 15;
  
  // **NEW: Pipeline Stage Scoring (Most Important Factor)**
  const pipelineScores = {
    'New Lead': 0,
    'Contacted': 10,
    'Qualified': 20,
    'Counselling Scheduled': 30,
    'Campus Visited': 40,
    'Application Sent': 50,
    'Application Submitted': 60,
    'Fee Paid': 80,
    'Admitted': 100,
    'Lost': -50  // Negative score for lost leads
  };
  
  if (lead.pipeline_stage && pipelineScores[lead.pipeline_stage] !== undefined) {
    score += pipelineScores[lead.pipeline_stage];
  }
  
  return Math.max(0, score); // Ensure score doesn't go below 0
};

// Enhanced Temperature Calculation based on Score and Stage
const getLeadTemperature = (score, pipeline_stage) => {
  // Override temperature based on critical stages
  const hotStages = ['Application Submitted', 'Fee Paid', 'Admitted'];
  const warmStages = ['Counselling Scheduled', 'Campus Visited', 'Application Sent'];
  const coldStages = ['Lost'];
  
  // Stage-based temperature (takes priority)
  if (hotStages.includes(pipeline_stage)) {
    return 'Hot';
  }
  if (coldStages.includes(pipeline_stage)) {
    return 'Cold';
  }
  if (warmStages.includes(pipeline_stage)) {
    return 'Warm';
  }
  
  // Score-based temperature (for other stages)
  if (score >= 60) return 'Hot';
  if (score >= 30) return 'Warm';
  return 'Cold';
};

const autoAssignCounsellor = async (category, colid) => {
  try {
    const categoryDoc = await categoryds.findOne({
      category_name: category,
      colid: Number(colid),
      is_active: 'Yes'
    });

    if (!categoryDoc) {
      throw new Error('Category not found or inactive');
    }

    const activeCounsellors = categoryDoc.counsellors.filter(c => c.is_active === 'Yes');
    
    if (activeCounsellors.length === 0) {
      throw new Error('No active counsellors available for this category');
    }

    const randomIndex = Math.floor(Math.random() * activeCounsellors.length);
    return activeCounsellors[randomIndex].counsellor_email;
  } catch (err) {
    console.error('Error in autoAssignCounsellor:', err);
    throw err;
  }
};

const enrollInDripCampaign = async (lead) => {
  try {
    const campaign = await dripcampaignds.findOne({
      colid: Number(lead.colid),
      campaign_type: 'welcome',
      is_active: 'Yes',
      $or: [
        { target_category: lead.category },
        { target_category: 'All' }
      ]
    });

    if (campaign) {
      lead.enrolled_drip_campaign = campaign._id.toString();
      lead.drip_campaign_status = 'Active';
    }
  } catch (err) {
    console.error('Error enrolling in drip campaign:', err);
  }
};

// Create lead
exports.createleadds = async (req, res) => {
  try {
    req.body.colid = Number(req.body.colid);
    
    if (req.body.category && !req.body.assignedto) {
      req.body.assignedto = await autoAssignCounsellor(req.body.category, req.body.colid);
      req.body.assigned_date = new Date();
    }

    const initialScore = calculateLeadScore(req.body);
    req.body.lead_score = initialScore;
    req.body.lead_temperature = getLeadTemperature(initialScore, req.body.pipeline_stage || 'New Lead');

    const lead = await crmh1.create(req.body);
    await enrollInDripCampaign(lead);
    await lead.save();

    await leadactivityds.create({
      lead_id: lead._id,
      colid: lead.colid,
      activity_type: 'note',
      performed_by: lead.user,
      notes: `Lead created from ${req.body.source}. Auto-assigned to ${lead.assignedto}`,
      activity_date: new Date()
    });

    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    console.error('Error in createleadds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all leads (USER-BASED ACCESS)
exports.getallleadsds = async (req, res) => {
  try {
    const { colid, user, pipeline_stage, lead_temperature, source, search } = req.query;

    let query = {
      colid: Number(colid),
      $or: [
        { user: user },
        { assignedto: user }
      ]
    };

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
      query.$and = [
        {
          $or: [
            { user: user },
            { assignedto: user }
          ]
        },
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
          ]
        }
      ];
      delete query.$or;
    }

    const leads = await crmh1.find(query).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: leads, count: leads.length });
  } catch (err) {
    console.error('Error in getallleadsds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get lead by ID
exports.getleadbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await crmh1.findById(id);
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    const activities = await leadactivityds.find({ lead_id: id }).sort({ activity_date: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        lead,
        activities
      }
    });
  } catch (err) {
    console.error('Error in getleadbyidds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// **UPDATED: Update lead with automatic score/temperature recalculation**
exports.updateleadds = async (req, res) => {
  try {
    const { id } = req.query;
    
    if (req.body.colid) {
      req.body.colid = Number(req.body.colid);
    }

    const lead = await crmh1.findById(id);
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    // Merge existing lead data with updates
    const updatedLead = { ...lead.toObject(), ...req.body };
    
    // **ALWAYS recalculate score and temperature based on new data**
    const newScore = calculateLeadScore(updatedLead);
    const newTemperature = getLeadTemperature(newScore, updatedLead.pipeline_stage);
    
    req.body.lead_score = newScore;
    req.body.lead_temperature = newTemperature;

    // Update the lead
    const updated = await crmh1.findByIdAndUpdate(id, req.body, { new: true });

    // Log pipeline stage change
    if (req.body.pipeline_stage && req.body.pipeline_stage !== lead.pipeline_stage) {
      await leadactivityds.create({
        lead_id: id,
        colid: lead.colid,
        activity_type: 'note',
        performed_by: req.body.updated_by || lead.user,
        notes: `Pipeline stage changed from ${lead.pipeline_stage} to ${req.body.pipeline_stage}. Score: ${newScore}, Temperature: ${newTemperature}`,
        activity_date: new Date()
      });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Error in updateleadds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update pipeline stage
exports.updatepipelinestage = async (req, res) => {
  try {
    const { id } = req.query;
    const { pipeline_stage, performed_by, notes } = req.body;

    const lead = await crmh1.findById(id);
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    // Recalculate score and temperature
    const updatedLeadData = { ...lead.toObject(), pipeline_stage };
    const newScore = calculateLeadScore(updatedLeadData);
    const newTemperature = getLeadTemperature(newScore, pipeline_stage);

    // Update lead with new stage, score, and temperature
    const updatedLead = await crmh1.findByIdAndUpdate(
      id,
      { 
        pipeline_stage,
        lead_score: newScore,
        lead_temperature: newTemperature
      },
      { new: true }
    );

    await leadactivityds.create({
      lead_id: id,
      colid: lead.colid,
      activity_type: 'note',
      performed_by: performed_by || lead.user,
      notes: notes || `Moved to ${pipeline_stage}. Score: ${newScore}, Temperature: ${newTemperature}`,
      activity_date: new Date()
    });

    res.status(200).json({ success: true, data: updatedLead });
  } catch (err) {
    console.error('Error in updatepipelinestage:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete lead (Admin only)
exports.deleteleadds = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.query;

    const lead = await crmh1.findById(id);
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    // Check if the requesting user is the admin/owner
    if (lead.user !== user) {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized. Only the admin who created this lead can delete it.' 
      });
    }

    await crmh1.findByIdAndDelete(id);
    
    res.status(200).json({ 
      success: true, 
      message: 'Lead deleted successfully' 
    });
  } catch (err) {
    console.error('Error in deleteleadds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reassign lead
exports.reassignleadds = async (req, res) => {
  try {
    const { id } = req.query;
    const { new_counsellor_email, performed_by, reason } = req.body;

    const lead = await crmh1.findById(id);
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    const oldCounsellor = lead.assignedto;
    lead.assignedto = new_counsellor_email;
    lead.assigned_date = new Date();
    lead.reassignment_count += 1;
    await lead.save();

    await leadactivityds.create({
      lead_id: id,
      colid: lead.colid,
      activity_type: 'note',
      performed_by: performed_by || lead.user,
      notes: `Lead reassigned from ${oldCounsellor} to ${new_counsellor_email}. Reason: ${reason || 'Not specified'}`,
      activity_date: new Date()
    });

    res.status(200).json({ success: true, data: lead });
  } catch (err) {
    console.error('Error in reassignleadds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Bulk assign leads
exports.bulkassignleadsds = async (req, res) => {
  try {
    const { lead_ids, counsellor_email, performed_by } = req.body;
    const results = [];

    for (const id of lead_ids) {
      try {
        const lead = await crmh1.findById(id);
        if (lead) {
          lead.assignedto = counsellor_email;
          lead.assigned_date = new Date();
          lead.reassignment_count += 1;
          await lead.save();

          await leadactivityds.create({
            lead_id: id,
            colid: lead.colid,
            activity_type: 'note',
            performed_by: performed_by,
            notes: `Bulk assigned to ${counsellor_email}`,
            activity_date: new Date()
          });

          results.push({ id, success: true });
        }
      } catch (err) {
        results.push({ id, success: false, error: err.message });
      }
    }

    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error('Error in bulkassignleadsds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get hot leads (USER-BASED ACCESS)
exports.gethotleadsds = async (req, res) => {
  try {
    const { colid, user } = req.query;
    
    let query = {
      colid: Number(colid),
      lead_temperature: 'Hot',
      $or: [
        { user: user },
        { assignedto: user }
      ]
    };

    const leads = await crmh1.find(query).sort({ lead_score: -1 });
    res.status(200).json({ success: true, data: leads, count: leads.length });
  } catch (err) {
    console.error('Error in gethotleadsds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get today's follow-ups (USER-BASED ACCESS)
exports.gettodayfollowupsds = async (req, res) => {
  try {
    const { colid, user } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let query = {
      colid: Number(colid),
      next_followup_date: {
        $gte: today,
        $lt: tomorrow
      },
      $or: [
        { user: user },
        { assignedto: user }
      ]
    };

    const leads = await crmh1.find(query).sort({ next_followup_date: 1 });
    res.status(200).json({ success: true, data: leads, count: leads.length });
  } catch (err) {
    console.error('Error in gettodayfollowupsds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get overdue follow-ups (USER-BASED ACCESS)
exports.getoverduefollowupsds = async (req, res) => {
  try {
    const { colid, user } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let query = {
      colid: Number(colid),
      next_followup_date: { $lt: today },
      leadstatus: 'Active',
      $or: [
        { user: user },
        { assignedto: user }
      ]
    };

    const leads = await crmh1.find(query).sort({ next_followup_date: 1 });
    res.status(200).json({ success: true, data: leads, count: leads.length });
  } catch (err) {
    console.error('Error in getoverduefollowupsds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get lead analytics (USER-BASED ACCESS)
exports.getleadanalyticsds = async (req, res) => {
  try {
    const { colid, user } = req.query;

    let matchQuery = {
      colid: Number(colid),
      $or: [
        { user: user },
        { assignedto: user }
      ]
    };

    const totalLeads = await crmh1.countDocuments(matchQuery);
    const hotLeads = await crmh1.countDocuments({ ...matchQuery, lead_temperature: 'Hot' });
    const warmLeads = await crmh1.countDocuments({ ...matchQuery, lead_temperature: 'Warm' });
    const coldLeads = await crmh1.countDocuments({ ...matchQuery, lead_temperature: 'Cold' });

    const byStage = await crmh1.aggregate([
      { $match: matchQuery },
      { $group: { _id: '$pipeline_stage', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const bySource = await crmh1.aggregate([
      { $match: matchQuery },
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const byCategory = await crmh1.aggregate([
      { $match: matchQuery },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const byLocation = await crmh1.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            city: '$city',
            state: '$state'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          city: '$_id.city',
          state: '$_id.state',
          count: 1
        }
      }
    ]);

    const convertedLeads = await crmh1.countDocuments({ ...matchQuery, leadstatus: 'Converted' });
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        hotLeads,
        warmLeads,
        coldLeads,
        convertedLeads,
        conversionRate: `${conversionRate}%`,
        byStage,
        bySource,
        byCategory,
        byLocation
      }
    });
  } catch (err) {
    console.error('Error in getleadanalyticsds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search users by name or email
exports.searchusersds = async (req, res) => {
  try {
    const { query, colid } = req.query;
    
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter is required' });
    }

    const searchRegex = new RegExp(query, 'i');
    const users = await user.find({
      colid: Number(colid),
      $or: [
        { name: searchRegex },
        { email: searchRegex }
      ]
    }).select('name email _id').limit(10);

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Error in searchusersds:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
