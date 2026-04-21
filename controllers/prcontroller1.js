const PrList = require('./../Models/prlist');
const PrTemplate = require('./../Models/prtemplate');
const PrTemplateApprover = require('./../Models/prtemplateapprovers');
const PrItems = require('./../Models/pritems');

// Get PR list filtered by colid
exports.getPrList = async (req, res) => {
    try {
        const { colid } = req.body;

        const prs = await PrList.find({ colid });
        res.json(prs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Move to next approver
exports.nextApprover = async (req, res) => {
    try {
        const { prid } = req.body;

        const pr = await PrList.findById(prid);
        if (!pr) return res.status(404).json({ msg: 'PR not found' });

        // current level
        let currentLevel = pr.level || 0;

        // find next approver from template
        const nextApprover = await PrTemplateApprover.findOne({
            templateid: pr.templateid,
            level: currentLevel + 1
        });

        if (!nextApprover) {
            return res.json({ msg: 'No further approvers. PR completed.' });
        }
        console.log(nextApprover);

        // update PR
        pr.level = currentLevel + 1;
        pr.approveremail = nextApprover.facultyid;

        console.log(pr);

        await pr.save();

        res.json({
            msg: 'Moved to next approver',
            pr
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get PR items by PR ID
exports.getPrItems = async (req, res) => {
    try {
        const { prid } = req.body;
        console.log(req.body);

        const items = await PrItems.find({ prid });

        console.log(items);

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};