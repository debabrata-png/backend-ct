const budgetapproverds = require('../Models/budgetapproverds');

exports.addbudgetapproverds = async (req, res) => {
    try {
        const newItem = await budgetapproverds.create(req.body);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updatebudgetapproverds = async (req, res) => {
    try {
        const item = await budgetapproverds.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deletebudgetapproverds = async (req, res) => {
    try {
        await budgetapproverds.findByIdAndDelete(req.query.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallbudgetapproverds = async (req, res) => {
    try {
        const { colid } = req.query;
        const items = await budgetapproverds.find({ colid });
        res.status(200).json({ status: 'success', results: items.length, count: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getbudgetapproverdsbyid = async (req, res) => {
    try {
        const item = await budgetapproverds.findById(req.query.id);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
