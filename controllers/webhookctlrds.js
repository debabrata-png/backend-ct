const crmh1 = require('../Models/crmh1.js');
const landingpageds = require('../Models/landingpageds.js');
const apikeyds1 = require('../Models/apikeyds1.js');
const categoryds = require('../Models/categoryds.js');
const leadactivityds = require('../Models/leadactivityds.js');

// Helper: Auto-assign counsellor
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
        // console.error('Error in autoAssignCounsellor:', err);
        throw err;
    }
};

// Helper: Calculate lead score
const calculateLeadScore = (lead) => {
    let score = 0;
    if (lead.phone) score += 5;
    if (lead.email) score += 5;
    if (lead.course_interested) score += 10;
    return score;
};

// Helper: Get lead temperature
const getLeadTemperature = (score) => {
    if (score >= 40) return 'Hot';
    if (score >= 20) return 'Warm';
    return 'Cold';
};

// Middleware: Validate API key
exports.validateapikey = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.api_key;

        if (!apiKey) {
            return res.status(401).json({ success: false, message: 'API key required' });
        }

        const keyDoc = await apikeyds1.findOne({ api_key: apiKey, is_active: 'Yes' });

        if (!keyDoc) {
            return res.status(401).json({ success: false, message: 'Invalid or inactive API key' });
        }

        // Check validity
        if (keyDoc.valid_until && new Date() > keyDoc.valid_until) {
            return res.status(401).json({ success: false, message: 'API key expired' });
        }

        // Update usage
        keyDoc.last_used = new Date();
        keyDoc.usage_count += 1;
        await keyDoc.save();

        req.apiKeyDoc = keyDoc;
        next();
    } catch (err) {
        // console.error('Error validating API key:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Webhook: Lead capture from form submission
exports.webhookleadcaptureds = async (req, res) => {
    try {
        const {
            name, phone, email, address, city, state, country, pin,
            category, course_interested, qualification, expected_admission_year,
            budget, scholarship_interest, preferred_mode,
            source, form_url, landing_page_slug,
            utm_source, utm_medium, utm_campaign,
            colid, user
        } = req.body;

        // Validate required fields
        if (!name || !category || !colid || !user) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, category, colid, user'
            });
        }

        // Auto-assign counsellor
        const assignedCounsellor = await autoAssignCounsellor(category, colid);

        // Calculate initial lead score
        const leadData = {
            name, phone, email, address, city, state, country, pin,
            category, course_interested, qualification, expected_admission_year,
            budget, scholarship_interest, preferred_mode,
            source: source || 'Website Form',
            form_url, landing_page_url: form_url,
            utm_source, utm_medium, utm_campaign,
            colid: Number(colid),
            user,
            assignedto: assignedCounsellor,
            assigned_date: new Date(),
            pipeline_stage: 'New Lead',
            leadstatus: 'Active'
        };

        const initialScore = calculateLeadScore(leadData);
        leadData.lead_score = initialScore;
        leadData.lead_temperature = getLeadTemperature(initialScore);

        // Create lead
        const lead = await crmh1.create(leadData);

        // Update landing page conversion count
        if (landing_page_slug) {
            await landingpageds.findOneAndUpdate(
                { page_slug: landing_page_slug },
                { $inc: { conversion_count: 1 } }
            );
        }

        // Create initial activity log
        await leadactivityds.create({
            lead_id: lead._id,
            colid: lead.colid,
            activity_type: 'note',
            performed_by: 'System',
            notes: `Lead captured via webhook from ${source || 'Website Form'}. Auto-assigned to ${assignedCounsellor}`,
            activity_date: new Date()
        });

        //console.log(`✅ [WEBHOOK] Lead created: ${lead.name}`);
        //console.log(`Source: ${source}, Category: ${category}, Assigned to: ${assignedCounsellor}`);

        res.status(201).json({
            success: true,
            data: lead,
            message: 'Lead captured successfully'
        });
    } catch (err) {
        // console.error('Error in webhookleadcaptureds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Webhook: Call tracking integration
exports.calltrackingwebhookds = async (req, res) => {
    try {
        const {
            phone_number,
            call_duration,
            call_status,
            call_recording_url,
            caller_name,
            category,
            colid,
            user
        } = req.body;

        if (!phone_number || !colid) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: phone_number, colid'
            });
        }

        // Check if lead exists with this phone number
        let lead = await crmh1.findOne({
            phone: phone_number,
            colid: Number(colid)
        });

        if (!lead) {
            // Create new lead from call
            const assignedCounsellor = category
                ? await autoAssignCounsellor(category, colid)
                : null;

            lead = await crmh1.create({
                name: caller_name || 'Unknown Caller',
                phone: phone_number,
                category: category || 'General Enquiry',
                source: 'Phone Call',
                colid: Number(colid),
                user: user || 'system',
                assignedto: assignedCounsellor,
                assigned_date: new Date(),
                pipeline_stage: 'New Lead',
                leadstatus: 'Active',
                lead_score: 5,
                lead_temperature: 'Cold'
            });

            //console.log(`✅ [CALL TRACKING] New lead created from call: ${lead.name}`);
        } else {
            //console.log(`✅ [CALL TRACKING] Existing lead found: ${lead.name}`);
        }

        // Log call activity
        await leadactivityds.create({
            lead_id: lead._id,
            colid: lead.colid,
            activity_type: 'call',
            performed_by: 'System',
            duration: call_duration || 0,
            outcome: call_status === 'answered' ? 'Call Answered' : 'Missed Call',
            notes: `Call tracking: Duration ${call_duration}s. ${call_recording_url ? 'Recording: ' + call_recording_url : ''}`,
            activity_date: new Date()
        });

        // Update lead
        lead.last_contact_date = new Date();
        if (lead.pipeline_stage === 'New Lead') {
            lead.pipeline_stage = 'Contacted';
        }
        await lead.save();

        res.status(200).json({
            success: true,
            data: lead,
            message: 'Call logged successfully'
        });
    } catch (err) {
        // console.error('Error in calltrackingwebhookds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Webhook: Google Ads lead capture
exports.googleadswebhookds = async (req, res) => {
    try {
        const {
            name, phone, email,
            category, course_interested,
            ad_campaign_id, ad_campaign_name,
            colid, user
        } = req.body;

        if (!name || !category || !colid || !user) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Auto-assign counsellor
        const assignedCounsellor = await autoAssignCounsellor(category, colid);

        const leadData = {
            name, phone, email,
            category, course_interested,
            source: 'Google Ads',
            source_campaign_id: ad_campaign_id,
            utm_source: 'google',
            utm_medium: 'cpc',
            utm_campaign: ad_campaign_name,
            colid: Number(colid),
            user,
            assignedto: assignedCounsellor,
            assigned_date: new Date(),
            pipeline_stage: 'New Lead',
            leadstatus: 'Active'
        };

        const initialScore = calculateLeadScore(leadData);
        leadData.lead_score = initialScore;
        leadData.lead_temperature = getLeadTemperature(initialScore);

        const lead = await crmh1.create(leadData);

        await leadactivityds.create({
            lead_id: lead._id,
            colid: lead.colid,
            activity_type: 'note',
            performed_by: 'System',
            notes: `Lead from Google Ads campaign: ${ad_campaign_name}`,
            activity_date: new Date()
        });

        //console.log(`✅ [GOOGLE ADS] Lead created: ${lead.name}, Campaign: ${ad_campaign_name}`);

        res.status(201).json({
            success: true,
            data: lead,
            message: 'Google Ads lead captured successfully'
        });
    } catch (err) {
        // console.error('Error in googleadswebhookds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Webhook: Facebook lead form
exports.facebookleadwebhookds = async (req, res) => {
    try {
        const {
            name, phone, email,
            category, course_interested,
            fb_ad_id, fb_ad_name,
            colid, user
        } = req.body;

        if (!name || !category || !colid || !user) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const assignedCounsellor = await autoAssignCounsellor(category, colid);

        const leadData = {
            name, phone, email,
            category, course_interested,
            source: 'Facebook',
            source_campaign_id: fb_ad_id,
            utm_source: 'facebook',
            utm_medium: 'cpc',
            utm_campaign: fb_ad_name,
            colid: Number(colid),
            user,
            assignedto: assignedCounsellor,
            assigned_date: new Date(),
            pipeline_stage: 'New Lead',
            leadstatus: 'Active'
        };

        const initialScore = calculateLeadScore(leadData);
        leadData.lead_score = initialScore;
        leadData.lead_temperature = getLeadTemperature(initialScore);

        const lead = await crmh1.create(leadData);

        await leadactivityds.create({
            lead_id: lead._id,
            colid: lead.colid,
            activity_type: 'note',
            performed_by: 'System',
            notes: `Lead from Facebook ad: ${fb_ad_name}`,
            activity_date: new Date()
        });

        //console.log(`✅ [FACEBOOK] Lead created: ${lead.name}, Ad: ${fb_ad_name}`);

        res.status(201).json({
            success: true,
            data: lead,
            message: 'Facebook lead captured successfully'
        });
    } catch (err) {
        // console.error('Error in facebookleadwebhookds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
