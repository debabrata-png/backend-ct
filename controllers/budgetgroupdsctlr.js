const budgetgroupds = require('../Models/budgetgroupds');

exports.addbudgetgroupds = async (req, res) => {
    try {
        const newItem = await budgetgroupds.create(req.body);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallbudgetgroupds = async (req, res) => {
    try {
        const { colid } = req.query;
        const items = await budgetgroupds.find({ colid });
        res.status(200).json({ status: 'success', results: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updatebudgetgroupds = async (req, res) => {
    try {
        const { id } = req.query;
        const item = await budgetgroupds.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deletebudgetgroupds = async (req, res) => {
    try {
        const { id } = req.query;
        await budgetgroupds.findByIdAndDelete(id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getbudgetgroupsdistinct = async (req, res) => {
    try {
        const { colid } = req.query;
        const groups = await budgetgroupds.distinct('groupname', { colid: Number(colid) });
        res.status(200).json({ status: 'success', data: { items: groups } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getbudgetcategoriesbygroup = async (req, res) => {
    try {
        const { colid, groupname } = req.query;
        const items = await budgetgroupds.find({ colid: Number(colid), groupname });
        const categories = items.map(item => item.category);
        res.status(200).json({ status: 'success', data: { items: categories } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
