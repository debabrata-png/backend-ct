const communicationlogds = require('../Models/communicationlogds.js');
const crmh1 = require('../Models/crmh1.js');
const leadactivityds = require('../Models/leadactivityds.js');

// Send email (dummy)
exports.sendemailds = async (req, res) => {
    try {
        const { lead_id, colid, subject, content, sent_by, attachment_url } = req.body;
        
        const lead = await crmh1.findById(lead_id);
        
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        
        // Dummy email send
        //console.log(`📧 [DUMMY EMAIL SENT]`);
        //console.log(`To: ${lead.email}`);
        //console.log(`Subject: ${subject}`);
        //console.log(`Content: ${content}`);
        // if (attachment_url) //console.log(`Attachment: ${attachment_url}`);
        //console.log(`---`);
        
        // Log communication
        const communication = await communicationlogds.create({
            lead_id,
            colid: Number(colid),
            channel: 'email',
            subject,
            content,
            sent_by,
            delivery_status: 'Sent'
        });
        
        // Log activity
        await leadactivityds.create({
            lead_id,
            colid: Number(colid),
            activity_type: 'email',
            performed_by: sent_by,
            notes: `Email sent: ${subject}`,
            activity_date: new Date()
        });
        
        // Update lead score if brochure sent
        if (subject.toLowerCase().includes('brochure')) {
            const currentScore = lead.lead_score || 0;
            lead.lead_score = currentScore + 10;
            lead.lead_temperature = lead.lead_score >= 40 ? 'Hot' : lead.lead_score >= 20 ? 'Warm' : 'Cold';
            lead.brochure_downloaded = 'Yes';
            await lead.save();
        }
        
        res.status(200).json({ success: true, data: communication, message: 'Email sent (dummy)' });
    } catch (err) {
        // console.error('Error in sendemailds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Send SMS (dummy)
exports.sendsmsds = async (req, res) => {
    try {
        const { lead_id, colid, content, sent_by } = req.body;
        
        const lead = await crmh1.findById(lead_id);
        
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        
        // Dummy SMS send
        //console.log(`📱 [DUMMY SMS SENT]`);
        //console.log(`To: ${lead.phone}`);
        //console.log(`Message: ${content}`);
        //console.log(`---`);
        
        // Log communication
        const communication = await communicationlogds.create({
            lead_id,
            colid: Number(colid),
            channel: 'sms',
            content,
            sent_by,
            delivery_status: 'Sent'
        });
        
        // Log activity
        await leadactivityds.create({
            lead_id,
            colid: Number(colid),
            activity_type: 'sms',
            performed_by: sent_by,
            notes: `SMS sent`,
            activity_date: new Date()
        });
        
        res.status(200).json({ success: true, data: communication, message: 'SMS sent (dummy)' });
    } catch (err) {
        // console.error('Error in sendsmsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Send WhatsApp (dummy)
exports.sendwhatsappds = async (req, res) => {
    try {
        const { lead_id, colid, content, sent_by, template_id } = req.body;
        
        const lead = await crmh1.findById(lead_id);
        
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        
        // Dummy WhatsApp send
        //console.log(`💬 [DUMMY WHATSAPP SENT]`);
        //console.log(`To: ${lead.phone}`);
        //console.log(`Template: ${template_id || 'N/A'}`);
        //console.log(`Message: ${content}`);
        //console.log(`---`);
        
        // Log communication
        const communication = await communicationlogds.create({
            lead_id,
            colid: Number(colid),
            channel: 'whatsapp',
            template_used: template_id,
            content,
            sent_by,
            delivery_status: 'Sent'
        });
        
        // Log activity
        await leadactivityds.create({
            lead_id,
            colid: Number(colid),
            activity_type: 'whatsapp',
            performed_by: sent_by,
            notes: `WhatsApp sent`,
            activity_date: new Date()
        });
        
        res.status(200).json({ success: true, data: communication, message: 'WhatsApp sent (dummy)' });
    } catch (err) {
        // console.error('Error in sendwhatsappds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get communication logs for a lead
exports.getcommunicationlogsds = async (req, res) => {
    try {
        const { lead_id } = req.params;
        
        const logs = await communicationlogds.find({ lead_id }).sort({ sent_date: -1 });
        
        res.status(200).json({ success: true, data: logs, count: logs.length });
    } catch (err) {
        // console.error('Error in getcommunicationlogsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all communications
exports.getallcommunicationsds = async (req, res) => {
    try {
        const { colid, channel, sent_by } = req.query;
        
        let query = { colid: Number(colid) };
        
        if (channel) query.channel = channel;
        if (sent_by) query.sent_by = sent_by;
        
        const logs = await communicationlogds.find(query).sort({ sent_date: -1 }).limit(100);
        
        res.status(200).json({ success: true, data: logs, count: logs.length });
    } catch (err) {
        // console.error('Error in getallcommunicationsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
