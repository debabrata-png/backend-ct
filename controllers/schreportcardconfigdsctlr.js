const SchReportCardConfigds = require('../Models/schreportcardconfigds');
const User = require('../Models/user');

// Save or Update School Report Card Configuration
exports.saveschreportconfds = async (req, res) => {
    try {
        const { colid, schoolname, addressline1, addressline2, affiliationno, schoolcode, udisecode, email, phone, telephone, logolink, activetemplate, user } = req.body;

        const filter = { colid: Number(colid) };
        const update = {
            user,
            schoolname,
            addressline1,
            addressline2,
            affiliationno,
            schoolcode,
            udisecode,
            email,
            phone,
            telephone,
            logolink,
            activetemplate,
            updatedat: new Date()
        };

        // Add name if creating new
        if (req.body.name) update.name = req.body.name; // Keep name if provided, usually "schreportconf"

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SchReportCardConfigds.findOneAndUpdate(filter, update, options);

        res.json({
            success: true,
            message: 'Configuration saved successfully',
            data: result
        });
    } catch (error) {
        console.error('Error in saveschreportconfds:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save configuration',
            error: error.message
        });
    }
};

// Get School Report Card Configuration
exports.getschreportconfds = async (req, res) => {
    try {
        const { colid } = req.query;

        const result = await SchReportCardConfigds.findOne({ colid: Number(colid) });

        if (!result) {
            return res.json({
                success: false, // Not an error, just no config yet
                message: 'Configuration not found'
            });
        }

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error in getschreportconfds:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get configuration',
            error: error.message
        });
    }
};
