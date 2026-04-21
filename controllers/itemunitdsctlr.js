const itemunitds = require('../Models/itemunitds');

exports.additemunitds = async (req, res) => {
    try {
        const newItem = await itemunitds.create(req.body);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updateitemunitds = async (req, res) => {
    try {
        const item = await itemunitds.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deleteitemunitds = async (req, res) => {
    try {
        await itemunitds.findByIdAndDelete(req.query.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallitemunitds = async (req, res) => {
    try {
        const { colid, search } = req.query;
        let query = { colid };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { unitcode: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const items = await itemunitds.find(query);
        res.status(200).json({ status: 'success', results: items.length, count: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getitemunitdsbyid = async (req, res) => {
    try {
        const item = await itemunitds.findById(req.query.id);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
