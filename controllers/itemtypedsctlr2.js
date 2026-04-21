const itemtypeds2 = require('../Models/itemtypeds2');

exports.additemtypeds2 = async (req, res) => {
    try {
        const newItemType = await itemtypeds2.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                itemType: newItemType
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateitemtypeds2 = async (req, res) => {
    try {
        const itemType = await itemtypeds2.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                itemType
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteitemtypeds2 = async (req, res) => {
    try {
        await itemtypeds2.findByIdAndDelete(req.query.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getallitemtypeds2 = async (req, res) => {
    try {
        const { colid, search } = req.query;
        let query = { colid };
        if (search) {
            query.$or = [
                { itemtype: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const itemTypes = await itemtypeds2.find(query);
        res.status(200).json({
            status: 'success',
            results: itemTypes.length,
            count: itemTypes.length, // Added count for frontend compatibility
            data: {
                itemTypes
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getitemtypedsbyid2 = async (req, res) => {
    try {
        const itemType = await itemtypeds2.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            data: {
                itemType
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
