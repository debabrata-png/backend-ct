const settingsds = require('../Models/settingsds.js');

exports.getsettingsds = async (req, res) => {
    try {
        const { colid } = req.query;

        let settings = await settingsds.findOne({ colid: Number(colid) });

        if (!settings) {
            // Return default empty structure if not found
            settings = {
                colid: Number(colid),
                email_templates: [],
                sms_templates: [],
                whatsapp_templates: [],
                campaign_types: [], // ✅ ADDED THIS LINE
                call_provider_config: {}
            };
        }

        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        // console.error('Error in getsettingsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

exports.updatesettingsds = async (req, res) => {
    try {
        const {
            colid,
            email_templates,
            sms_templates,
            whatsapp_templates,
            campaign_types, // ✅ ADDED THIS LINE
            call_provider_config,
            updated_by
        } = req.body;

        const settings = await settingsds.findOneAndUpdate(
            { colid: Number(colid) },
            {
                email_templates,
                sms_templates,
                whatsapp_templates,
                campaign_types, // ✅ ADDED THIS LINE
                call_provider_config,
                updated_by
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        // console.error('Error in updatesettingsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
