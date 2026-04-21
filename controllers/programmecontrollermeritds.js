const Programme = require('../Models/programmemeritds');

// Create new programme
exports.createds = async (req, res) => {
    try {
        const { programmeCode, programmeName, programmeType, description, colid } = req.body;

        // Check if programme already exists
        const existingProgramme = await Programme.findOne({ programmeCode, colid });
        if (existingProgramme) {
            return res.status(400).json({
                success: false,
                message: 'Programme with this code already exists'
            });
        }

        const programme = await Programme.create({
            programmeCode,
            programmeName,
            programmeType,
            description,
            colid
        });

        res.status(201).json({
            success: true,
            message: 'Programme created successfully',
            data: programme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating programme',
            error: error.message
        });
    }
};

// Get all programmes
exports.getAllds = async (req, res) => {
    try {
        const { isActive, colid } = req.query;

        const filter = {};
        if (colid) filter.colid = parseInt(colid);

        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        const programmes = await Programme.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: programmes.length,
            data: programmes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching programmes',
            error: error.message
        });
    }
};

// Get single programme
exports.getOneds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const programme = await Programme.findOne({ programmeCode, colid });

        if (!programme) {
            return res.status(404).json({
                success: false,
                message: 'Programme not found'
            });
        }

        res.status(200).json({
            success: true,
            data: programme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching programme',
            error: error.message
        });
    }
};

// Update programme
exports.updateds = async (req, res) => {
    try {
        const { programmeCode, updates, colid } = req.body;

        const programme = await Programme.findOneAndUpdate(
            { programmeCode, colid },
            updates,
            { new: true, runValidators: true }
        );

        if (!programme) {
            return res.status(404).json({
                success: false,
                message: 'Programme not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Programme updated successfully',
            data: programme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating programme',
            error: error.message
        });
    }
};

// Delete programme
exports.deleteOneds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.query;

        const programme = await Programme.findOneAndDelete({ programmeCode, colid });

        if (!programme) {
            return res.status(404).json({
                success: false,
                message: 'Programme not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Programme deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting programme',
            error: error.message
        });
    }
};
