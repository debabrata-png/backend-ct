const itemcategoryds = require('../Models/itemcategoryds');

exports.additemcategoryds = async (req, res) => {
    try {
        const newItem = await itemcategoryds.create(req.body);
        res.status(201).json({ status: 'success', data: { item: newItem } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.updateitemcategoryds = async (req, res) => {
    try {
        const item = await itemcategoryds.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.deleteitemcategoryds = async (req, res) => {
    try {
        await itemcategoryds.findByIdAndDelete(req.query.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getallitemcategoryds = async (req, res) => {
    try {
        const { colid, search } = req.query;
        let query = { colid };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const items = await itemcategoryds.find(query);
        res.status(200).json({ status: 'success', results: items.length, count: items.length, data: { items } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};

exports.getitemcategorydsbyid = async (req, res) => {
    try {
        const item = await itemcategoryds.findById(req.query.id);
        res.status(200).json({ status: 'success', data: { item } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err });
    }
};
