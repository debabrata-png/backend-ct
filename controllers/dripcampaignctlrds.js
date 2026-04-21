const dripcampaignds = require('../Models/dripcampaignds.js');
const crmh1 = require('../Models/crmh1.js');
const communicationlogds = require('../Models/communicationlogds.js');

// Create drip campaign
exports.createdripcampaignds = async (req, res) => {
    try {
        req.body.colid = Number(req.body.colid);
        
        if (!req.body.campaign_code) {
            const timestamp = Date.now();
            req.body.campaign_code = `CAMP_${timestamp}`;
        }
        
        const campaign = await dripcampaignds.create(req.body);
        
        //console.log(`✅ Drip campaign created: ${campaign.campaign_name}`);
        
        res.status(201).json({ success: true, data: campaign });
    } catch (err) {
        // console.error('Error in createdripcampaignds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all campaigns
exports.getallcampaignsds = async (req, res) => {
    try {
        const { colid, campaign_type, is_active } = req.query;
        
        let query = { colid: Number(colid) };
        
        if (campaign_type) query.campaign_type = campaign_type;
        if (is_active) query.is_active = is_active;
        
        const campaigns = await dripcampaignds.find(query).sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, data: campaigns, count: campaigns.length });
    } catch (err) {
        // console.error('Error in getallcampaignsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get campaign by ID
exports.getcampaignbyidds = async (req, res) => {
    try {
        const { id } = req.params;
        
        const campaign = await dripcampaignds.findById(id);
        
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }
        
        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        // console.error('Error in getcampaignbyidds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Update campaign
exports.updatedripcampaignds = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }
        
        const campaign = await dripcampaignds.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }
        
        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        // console.error('Error in updatedripcampaignds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Delete campaign
exports.deletedripcampaignds = async (req, res) => {
    try {
        const { id } = req.params;
        
        const campaign = await dripcampaignds.findByIdAndDelete(id);
        
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }
        
        res.status(200).json({ success: true, message: 'Campaign deleted successfully' });
    } catch (err) {
        // console.error('Error in deletedripcampaignds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Enroll lead in drip campaign
exports.enrollleadincampaignds = async (req, res) => {
    try {
        const { lead_id, campaign_id } = req.body;
        
        const lead = await crmh1.findByIdAndUpdate(
            lead_id,
            {
                enrolled_drip_campaign: campaign_id,
                drip_campaign_status: 'Active'
            },
            { new: true }
        );
        
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        
        //console.log(`✅ Lead ${lead.name} enrolled in campaign ${campaign_id}`);
        
        res.status(200).json({ success: true, data: lead });
    } catch (err) {
        // console.error('Error in enrollleadincampaignds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get leads enrolled in campaign
exports.getleadsincampaignds = async (req, res) => {
    try {
        const { campaign_id } = req.params;
        const { colid } = req.query;
        
        const leads = await crmh1.find({
            colid: Number(colid),
            enrolled_drip_campaign: campaign_id,
            drip_campaign_status: 'Active'
        });
        
        res.status(200).json({ success: true, data: leads, count: leads.length });
    } catch (err) {
        // console.error('Error in getleadsincampaignds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Process drip campaign (to be called by cron job)
exports.processdripcampaignds = async (req, res) => {
    try {
        const { colid } = req.query;
        
        const campaigns = await dripcampaignds.find({
            colid: Number(colid),
            is_active: 'Yes'
        });
        
        let messagesSent = 0;
        
        for (const campaign of campaigns) {
            const leads = await crmh1.find({
                colid: Number(colid),
                enrolled_drip_campaign: campaign._id.toString(),
                drip_campaign_status: 'Active'
            });
            
            for (const lead of leads) {
                const daysSinceCreation = Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                
                const messagesToSend = campaign.messages.filter(msg => msg.day === daysSinceCreation);
                
                for (const message of messagesToSend) {
                    const alreadySent = await communicationlogds.findOne({
                        lead_id: lead._id,
                        campaign_id: campaign._id.toString(),
                        channel: message.channel,
                        subject: message.subject
                    });
                    
                    if (!alreadySent) {
                        //console.log(`📧 [DUMMY] Sending ${message.channel} to ${lead.email}: ${message.subject}`);
                        
                        await communicationlogds.create({
                            lead_id: lead._id,
                            colid: lead.colid,
                            channel: message.channel,
                            template_used: message.template_id,
                            subject: message.subject,
                            content: message.content,
                            sent_by: 'System',
                            campaign_id: campaign._id.toString(),
                            delivery_status: 'Sent'
                        });
                        
                        messagesSent++;
                    }
                }
            }
        }
        
        //console.log(`✅ Drip campaign processed: ${messagesSent} messages sent`);
        
        res.status(200).json({ success: true, messagesSent });
    } catch (err) {
        // console.error('Error in processdripcampaignds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
