const comunicationds = require('../Models/comunicationds');

// Create new communication record
exports.createCommunication = async (req, res) => {
    try {
        const { name, user, colid, refno, comtype, comdate, department, purpose, link, vendor, year } = req.body;

        if (!name || !user || !colid) {
            return res.status(400).json({ status: 'error', message: 'Name, User, and College ID are required' });
        }

        const newCommunication = new comunicationds({
            name,
            user,
            colid,
            refno,
            comtype,
            comdate,
            department,
            purpose,
            link,
            vendor,
            year
        });

        await newCommunication.save();
        res.status(201).json({ status: 'success', data: newCommunication });

    } catch (error) {
        console.error('Error in createCommunication:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get all communication records (filtered by colid)
exports.getCommunications = async (req, res) => {
    try {
        const { colid } = req.body;

        if (!colid) {
            return res.status(400).json({ status: 'error', message: 'College ID is required' });
        }

        const communications = await comunicationds.find({ colid }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: communications });

    } catch (error) {
        console.error('Error in getCommunications:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Update communication record
exports.updateCommunication = async (req, res) => {
    try {
        const { id, updates } = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Record ID is required' });
        }

        const updatedCommunication = await comunicationds.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCommunication) {
            return res.status(404).json({ status: 'error', message: 'Record not found' });
        }

        res.status(200).json({ status: 'success', data: updatedCommunication });

    } catch (error) {
        console.error('Error in updateCommunication:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Delete communication record
exports.deleteCommunication = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Record ID is required' });
        }

        const deletedCommunication = await comunicationds.findByIdAndDelete(id);

        if (!deletedCommunication) {
            return res.status(404).json({ status: 'error', message: 'Record not found' });
        }

        res.status(200).json({ status: 'success', message: 'Record deleted successfully' });

    } catch (error) {
        console.error('Error in deleteCommunication:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
