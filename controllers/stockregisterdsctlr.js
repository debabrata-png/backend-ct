const stockregisterds = require('../Models/stockregisterds');

exports.addstockregisterds = async (req, res) => {
    try {
        const newEntry = await stockregisterds.create(req.body);
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

exports.updatestockregisterds = async (req, res) => {
    try {
        const entry = await stockregisterds.findByIdAndUpdate(req.query.id, req.body, {
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

exports.deletestockregisterds = async (req, res) => {
    try {
        await stockregisterds.findByIdAndDelete(req.query.id);
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

exports.getallstockregisterds = async (req, res) => {
    try {
        const entries = await stockregisterds.find();
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

exports.getstockregisterdsbyid = async (req, res) => {
    try {
        const entry = await stockregisterds.findById(req.query.id);
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
