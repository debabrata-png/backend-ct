const filemasterds = require('../Models/filemasterds');

// Create
exports.createfilemasterds = async (req, res) => {
    try {
        const { name, user, colid, file, description, link, department, filetype } = req.body;

        if (!name || !user || !colid) {
            return res.status(400).json({ status: 'error', message: 'Name, User, and College ID are required' });
        }

        const newFile = new filemasterds({
            name,
            user,
            colid,
            file,
            description,
            link,
            department,
            filetype
        });

        await newFile.save();
        res.status(201).json({ status: 'success', data: newFile });

    } catch (error) {
        console.error('Error in createfilemasterds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get All (by colid)
exports.getfilemasterds = async (req, res) => {
    try {
        const { colid } = req.body;

        if (!colid) {
            return res.status(400).json({ status: 'error', message: 'College ID is required' });
        }

        const files = await filemasterds.find({ colid }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: files });

    } catch (error) {
        console.error('Error in getfilemasterds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Update
exports.updatefilemasterds = async (req, res) => {
    try {
        const { id, updates } = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Record ID is required' });
        }

        const updatedFile = await filemasterds.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedFile) {
            return res.status(404).json({ status: 'error', message: 'Record not found' });
        }

        res.status(200).json({ status: 'success', data: updatedFile });

    } catch (error) {
        console.error('Error in updatefilemasterds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Delete
exports.deletefilemasterds = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Record ID is required' });
        }

        const deletedFile = await filemasterds.findByIdAndDelete(id);

        if (!deletedFile) {
            return res.status(404).json({ status: 'error', message: 'Record not found' });
        }

        res.status(200).json({ status: 'success', message: 'Record deleted successfully' });

    } catch (error) {
        console.error('Error in deletefilemasterds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
