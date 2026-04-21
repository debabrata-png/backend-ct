const Mjournal2 = require('../Models/mjournal2');
const AccountGroup = require('../Models/accountgroupds');

// Fetch all entries by transaction reference
exports.dstransactionrefds = async (req, res) => {
    try {
        const { colid, transactionref } = req.query;
        if (!colid || !transactionref) {
            return res.status(400).json({ success: false, message: 'colid and transactionref are required.' });
        }
        const filter = { colid: parseInt(colid), transactionref };
        const entries = await Mjournal2.find(filter);
        return res.status(200).json({ success: true, data: entries });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching entries by transactionref', error: error.message });
    }
};

// Fetch journal entries by account group
exports.dsjournalsbygroupds = async (req, res) => {
    try {
        const { colid, accgroup } = req.query;
        if (!colid || !accgroup) {
            return res.status(400).json({ success: false, message: 'colid and accgroup are required.' });
        }
        const filter = { colid: parseInt(colid), accgroup };
        const entries = await Mjournal2.find(filter);
        return res.status(200).json({ success: true, data: entries });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching journal entries by group', error: error.message });
    }
};

// Re-use this for account group dropdown if needed
exports.dsgetaccountgroupsds = async (req, res) => {
    try {
        const { colid } = req.query;
        if (!colid) {
            return res.status(400).json({ success: false, message: 'colid is required.' });
        }
        const groups = await AccountGroup.find({ colid: parseInt(colid) });
        return res.status(200).json({ success: true, data: groups });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching account groups', error: error.message });
    }
};