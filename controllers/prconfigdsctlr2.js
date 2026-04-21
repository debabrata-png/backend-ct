const prconfigds2 = require('../Models/prconfigds2');

exports.addprconfigds2 = async (req, res) => {
    try {
        const newConfig = await prconfigds2.create(req.body);
        res.status(201).json({
            success: true,
            data: newConfig
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getprconfigds2 = async (req, res) => {
    try {
        const { colid } = req.query;
        // Assuming one config per colid, or get the latest/active one
        const config = await prconfigds2.findOne({ colid }).sort({ _id: -1 });
        res.status(200).json({
            success: true,
            data: config
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateprconfigds2 = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedConfig = await prconfigds2.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            data: updatedConfig
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
