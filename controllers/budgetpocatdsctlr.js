const budgetpocatds = require('../Models/budgetpocatds');
const budgetpods = require('../Models/budgetpods');

// Helper: recalculate parent budget amount
async function recalcBudgetAmount(budgetId) {
    const cats = await budgetpocatds.find({ budgetid: budgetId });
    const total = cats.reduce((sum, c) => sum + (c.amount || 0), 0);
    await budgetpods.findByIdAndUpdate(budgetId, { amount: total });
    return total;
}

exports.addbudgetpocatds = async (req, res) => {
    try {
        const newItem = await budgetpocatds.create(req.body);
        // Recalculate parent budget amount
        if (newItem.budgetid) await recalcBudgetAmount(newItem.budgetid);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updatebudgetpocatds = async (req, res) => {
    try {
        const item = await budgetpocatds.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        // Recalculate parent budget amount
        if (item && item.budgetid) await recalcBudgetAmount(item.budgetid);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deletebudgetpocatds = async (req, res) => {
    try {
        const item = await budgetpocatds.findById(req.query.id);
        const budgetId = item ? item.budgetid : null;
        await budgetpocatds.findByIdAndDelete(req.query.id);
        // Recalculate parent budget amount
        if (budgetId) await recalcBudgetAmount(budgetId);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallbudgetpocatds = async (req, res) => {
    try {
        const { colid } = req.query;
        const items = await budgetpocatds.find({ colid });
        res.status(200).json({ status: 'success', results: items.length, count: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getbudgetpocatdsbybudgetid = async (req, res) => {
    try {
        const { budgetid, colid } = req.query;
        const items = await budgetpocatds.find({ budgetid, colid });
        res.status(200).json({ status: 'success', results: items.length, count: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

// Update only amount — used by approvers with edit access
exports.updatebudgetpocatdsamount = async (req, res) => {
    try {
        const { id } = req.query;
        const { amount } = req.body;
        const item = await budgetpocatds.findByIdAndUpdate(id, { amount }, { new: true });
        if (item && item.budgetid) await recalcBudgetAmount(item.budgetid);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getavailbudgetbycategoryds = async (req, res) => {
    try {
        const { colid, category, year } = req.query;
        let query = { colid };
        if (category) query.category = category;
        if (year) query.year = year;
        
        const items = await budgetpocatds.find(query);
        const totalAmount = items.reduce((sum, c) => sum + (c.amount || 0), 0);
        
        res.status(200).json({ status: 'success', data: { availableAmount: totalAmount } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getgroupwisecategorybudget = async (req, res) => {
    try {
        const { colid, year } = req.query;
        let query = { colid: Number(colid) };
        if (year) query.year = year;

        const results = await budgetpocatds.aggregate([
            { $match: query },
            {
                $group: {
                    _id: { groupname: "$groupname", category: "$category" },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $group: {
                    _id: "$_id.groupname",
                    categories: {
                        $push: {
                            category: "$_id.category",
                            amount: "$totalAmount"
                        }
                    },
                    groupTotal: { $sum: "$totalAmount" }
                }
            },
            {
                $project: {
                    groupname: "$_id",
                    categories: 1,
                    groupTotal: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({ status: 'success', results: results.length, data: { items: results } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
