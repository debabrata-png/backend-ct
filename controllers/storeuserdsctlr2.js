const storeuserds2 = require('../Models/storeuserds2');

exports.addstoreuserds2 = async (req, res) => {
    try {
        const newStoreUser = await storeuserds2.create(req.body);
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

exports.updatestoreuserds2 = async (req, res) => {
    try {
        const storeUser = await storeuserds2.findByIdAndUpdate(req.query.id, req.body, {
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

exports.deletestoreuserds2 = async (req, res) => {
    try {
        await storeuserds2.findByIdAndDelete(req.query.id);
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

exports.getallstoreuserds2 = async (req, res) => {
    try {
        const query = req.query.colid ? { colid: req.query.colid } : {};
        const storeUsers = await storeuserds2.find(query);
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

exports.getstoreuserdsbyid2 = async (req, res) => {
    try {
        const storeUser = await storeuserds2.findById(req.query.id);
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
