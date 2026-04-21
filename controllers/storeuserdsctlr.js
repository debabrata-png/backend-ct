const storeuserds = require('../Models/storeuserds');

exports.addstoreuserds = async (req, res) => {
    try {
        const newStoreUser = await storeuserds.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                storeUser: newStoreUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updatestoreuserds = async (req, res) => {
    try {
        const storeUser = await storeuserds.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                storeUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deletestoreuserds = async (req, res) => {
    try {
        await storeuserds.findByIdAndDelete(req.query.id);
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

exports.getallstoreuserds = async (req, res) => {
    try {
        const storeUsers = await storeuserds.find();
        res.status(200).json({
            status: 'success',
            results: storeUsers.length,
            data: {
                storeUsers
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getstoreuserdsbyid = async (req, res) => {
    try {
        const storeUser = await storeuserds.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            data: {
                storeUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
