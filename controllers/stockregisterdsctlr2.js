const stockregisterds2 = require('../Models/stockregisterds2');

exports.addstockregisterds2 = async (req, res) => {
    try {
        const newEntry = await stockregisterds2.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                stockEntry: newEntry
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updatestockregisterds2 = async (req, res) => {
    try {
        const entry = await stockregisterds2.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                stockEntry: entry
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deletestockregisterds2 = async (req, res) => {
    try {
        await stockregisterds2.findByIdAndDelete(req.query.id);
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

exports.getallstockregisterds2 = async (req, res) => {
    try {
        const entries = await stockregisterds2.find();
        res.status(200).json({
            status: 'success',
            results: entries.length,
            data: {
                stockEntries: entries
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getstockregisterdsbyid2 = async (req, res) => {
    try {
        const entry = await stockregisterds2.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            data: {
                stockEntry: entry
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
