const budgetpods = require('../Models/budgetpods');
const budgetpocatds = require('../Models/budgetpocatds');
const budgetapproverds = require('../Models/budgetapproverds');

// Helper: recalculate budget amount from its categories
async function recalcBudgetAmount(budgetId) {
    const cats = await budgetpocatds.find({ budgetid: budgetId });
    const total = cats.reduce((sum, c) => sum + (c.amount || 0), 0);
    await budgetpods.findByIdAndUpdate(budgetId, { amount: total });
    return total;
}

exports.addbudgetpods = async (req, res) => {
    try {
        const data = { ...req.body, amount: 0, status: 'Draft' };
        const newItem = await budgetpods.create(data);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updatebudgetpods = async (req, res) => {
    try {
        // Do not allow amount update from here — amount is always auto-calculated
        const { amount, ...updateData } = req.body;
        const item = await budgetpods.findByIdAndUpdate(req.query.id, updateData, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deletebudgetpods = async (req, res) => {
    try {
        // Delete all budget categories belonging to this budget
        await budgetpocatds.deleteMany({ budgetid: req.query.id });
        await budgetpods.findByIdAndDelete(req.query.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallbudgetpods = async (req, res) => {
    try {
        const { colid } = req.query;
        const items = await budgetpods.find({ colid });
        // For each budget, recalculate the amount from categories
        const result = [];
        for (const budget of items) {
            const cats = await budgetpocatds.find({ budgetid: budget._id });
            const total = cats.reduce((sum, c) => sum + (c.amount || 0), 0);
            const b = budget.toObject();
            b.amount = total;
            b.categoryCount = cats.length;
            result.push(b);
        }
        res.status(200).json({ status: 'success', results: result.length, count: result.length, data: { items: result } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getbudgetpodsbyid = async (req, res) => {
    try {
        const item = await budgetpods.findById(req.query.id);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

// Submit budget for approval — sets status to Pending and populates approvedby from configured approvers
exports.submitbudgetforapproval = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const budget = await budgetpods.findById(id);
        if (!budget) return res.status(404).json({ status: 'fail', message: 'Budget not found' });

        // Get all configured approvers for this colid, sorted by levelofapproval
        const approvers = await budgetapproverds.find({ colid }).sort({ levelofapproval: 1 });
        if (approvers.length === 0) return res.status(400).json({ status: 'fail', message: 'No approvers configured' });

        const approvedby = approvers.map(a => ({
            approvername: a.approvername,
            levelofapproval: a.levelofapproval,
            status: 'Pending',
            date: null
        }));

        // Final level is the highest level
        const finallevel = approvers[approvers.length - 1].levelofapproval;

        budget.approvedby = approvedby;
        budget.finallevel = finallevel;
        budget.status = 'Pending';
        await budget.save();

        res.status(200).json({ status: 'success', data: { item: budget } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

// Get budgets that the current user needs to approve
exports.getbudgetsforapproval = async (req, res) => {
    try {
        const { colid, useremail } = req.query;
        if (!useremail) return res.status(400).json({ status: 'fail', message: 'useremail is required' });

        // Find which approval level this user is at
        const approverConfig = await budgetapproverds.findOne({ colid, approveremail: useremail });
        if (!approverConfig) return res.status(200).json({ status: 'success', results: 0, count: 0, data: { items: [] } });

        const userLevel = approverConfig.levelofapproval;

        // Get all pending budgets for this colid
        const pendingBudgets = await budgetpods.find({ colid, status: 'Pending' });

        // Filter: only show budgets where this user's level is the next to approve
        // Sequential: all lower levels must be Approved, and this level must be Pending
        const filtered = pendingBudgets.filter(b => {
            const myApproval = b.approvedby.find(a => a.levelofapproval === userLevel);
            if (!myApproval || myApproval.status !== 'Pending') return false;

            // Check that all levels below are Approved
            const lowerLevels = b.approvedby.filter(a => a.levelofapproval < userLevel);
            return lowerLevels.every(a => a.status === 'Approved');
        });

        // Attach category info
        const result = [];
        for (const budget of filtered) {
            const cats = await budgetpocatds.find({ budgetid: budget._id });
            const total = cats.reduce((sum, c) => sum + (c.amount || 0), 0);
            const b = budget.toObject();
            b.amount = total;
            b.categories = cats;
            b.approverConfig = approverConfig.toObject();
            result.push(b);
        }

        res.status(200).json({ status: 'success', results: result.length, count: result.length, data: { items: result } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

// Approve or reject a budget at a specific level
exports.approvebudgetpods = async (req, res) => {
    try {
        const { id } = req.query;
        const { levelofapproval, status, remarks } = req.body; // status = 'Approved' or 'Rejected'

        const budget = await budgetpods.findById(id);
        if (!budget) return res.status(404).json({ status: 'fail', message: 'Budget not found' });

        const approvalEntry = budget.approvedby.find(a => a.levelofapproval === levelofapproval);
        if (!approvalEntry) return res.status(400).json({ status: 'fail', message: 'Approval level not found' });

        approvalEntry.status = status;
        approvalEntry.date = new Date();

        if (status === 'Rejected') {
            budget.status = 'Rejected';
            budget.remarks = remarks || '';
        } else if (status === 'Approved') {
            // Check if this is the final level
            if (levelofapproval === budget.finallevel) {
                budget.status = 'Approved';
            }
            // Otherwise budget stays Pending for next level
        }

        await budget.save();
        res.status(200).json({ status: 'success', data: { item: budget } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
