const budgettypeds = require('../Models/budgettypeds');

exports.addbudgettypeds = async (req, res) => {
    try {
        const newItem = await budgettypeds.create(req.body);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updatebudgettypeds = async (req, res) => {
    try {
        const item = await budgettypeds.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deletebudgettypeds = async (req, res) => {
    try {
        await budgettypeds.findByIdAndDelete(req.query.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallbudgettypeds = async (req, res) => {
    try {
        const { colid } = req.query;
        const items = await budgettypeds.find({ colid });
        res.status(200).json({ status: 'success', results: items.length, count: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getbudgettypedsbyid = async (req, res) => {
    try {
        const item = await budgettypeds.findById(req.query.id);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
