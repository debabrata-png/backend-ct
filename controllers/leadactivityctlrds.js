const leadactivityds = require('../Models/leadactivityds.js');
const crmh1 = require('../Models/crmh1.js');

// Create activity
exports.createactivityds = async (req, res) => {
    try {
        req.body.colid = Number(req.body.colid);
        
        const activity = await leadactivityds.create(req.body);
        
        // Update lead's last_contact_date
        if (req.body.lead_id) {
            await crmh1.findByIdAndUpdate(req.body.lead_id, {
                last_contact_date: new Date(),
                next_followup_date: req.body.next_followup_date || null
            });
        }
        
        //console.log(`✅ Activity logged: ${activity.activity_type} for lead ${req.body.lead_id}`);
        
        res.status(201).json({ success: true, data: activity });
    } catch (err) {
        // console.error('Error in createactivityds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all activities for a lead
exports.getleadactivitiesds = async (req, res) => {
    try {
        const { lead_id } = req.params;
        
        const activities = await leadactivityds.find({ lead_id }).sort({ activity_date: -1 });
        
        res.status(200).json({ success: true, data: activities, count: activities.length });
    } catch (err) {
        // console.error('Error in getleadactivitiesds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all activities for counsellor (their assigned leads)
exports.getcounselloractivitiesds = async (req, res) => {
    try {
        const { colid, performed_by } = req.query;
        
        const activities = await leadactivityds.find({
            colid: Number(colid),
            performed_by
        }).sort({ activity_date: -1 }).limit(50);
        
        res.status(200).json({ success: true, data: activities, count: activities.length });
    } catch (err) {
        // console.error('Error in getcounselloractivitiesds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Update activity
exports.updateactivityds = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        
        const activity = await leadactivityds.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!activity) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }
        
        res.status(200).json({ success: true, data: activity });
    } catch (err) {
        // console.error('Error in updateactivityds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Delete activity
exports.deleteactivityds = async (req, res) => {
    try {
        const { id } = req.params;
        
        const activity = await leadactivityds.findByIdAndDelete(id);
        
        if (!activity) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }
        
        res.status(200).json({ success: true, message: 'Activity deleted successfully' });
    } catch (err) {
        // console.error('Error in deleteactivityds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Log call activity
exports.logcallactivityds = async (req, res) => {
    try {
        const { lead_id, colid, performed_by, duration, outcome, notes, next_followup_date } = req.body;
        
        const activity = await leadactivityds.create({
            lead_id,
            colid: Number(colid),
            activity_type: 'call',
            performed_by,
            duration,
            outcome,
            notes,
            next_followup_date,
            activity_date: new Date()
        });
        
        // Update lead
        const updateData = {
            last_contact_date: new Date()
        };
        
        if (next_followup_date) {
            updateData.next_followup_date = next_followup_date;
        }
        
        // Update pipeline stage based on outcome
        if (outcome === 'Interested') {
            const lead = await crmh1.findById(lead_id);
            if (lead && lead.pipeline_stage === 'New Lead') {
                updateData.pipeline_stage = 'Contacted';
            }
        }
        
        await crmh1.findByIdAndUpdate(lead_id, updateData);
        
        //console.log(`✅ Call logged: ${outcome} - Next follow-up: ${next_followup_date || 'Not set'}`);
        
        res.status(201).json({ success: true, data: activity });
    } catch (err) {
        // console.error('Error in logcallactivityds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Log meeting activity
exports.logmeetingactivityds = async (req, res) => {
    try {
        const { lead_id, colid, performed_by, duration, outcome, notes, next_followup_date } = req.body;
        
        const activity = await leadactivityds.create({
            lead_id,
            colid: Number(colid),
            activity_type: 'meeting',
            performed_by,
            duration,
            outcome,
            notes,
            next_followup_date,
            activity_date: new Date()
        });
        
        // Update lead
        const updateData = {
            last_contact_date: new Date(),
            campus_visit_completed: 'Yes'
        };
        
        if (next_followup_date) {
            updateData.next_followup_date = next_followup_date;
        }
        
        // Update pipeline stage
        const lead = await crmh1.findById(lead_id);
        if (lead && lead.pipeline_stage === 'Counselling Scheduled') {
            updateData.pipeline_stage = 'Campus Visited';
        }
        
        // Update lead score for campus visit
        const currentScore = lead.lead_score || 0;
        updateData.lead_score = currentScore + 15;
        updateData.lead_temperature = updateData.lead_score >= 40 ? 'Hot' : updateData.lead_score >= 20 ? 'Warm' : 'Cold';
        
        await crmh1.findByIdAndUpdate(lead_id, updateData);
        
        //console.log(`✅ Meeting logged: Campus visit completed`);
        
        res.status(201).json({ success: true, data: activity });
    } catch (err) {
        // console.error('Error in logmeetingactivityds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
