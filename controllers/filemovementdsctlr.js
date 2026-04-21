const filemovementds = require('../Models/filemovementds');
const User = require('../Models/user');

// Create
exports.createfilemovementds = async (req, res) => {
    try {
        const { name, user, colid, fileid, file, department, activity, faculty, facultyid, activitydate } = req.body;

        if (!name || !user || !colid) {
            return res.status(400).json({ status: 'error', message: 'Name, User, and College ID are required' });
        }

        const newMovement = new filemovementds({
            name,
            user,
            colid,
            fileid,
            file,
            department,
            activity,
            faculty,
            facultyid,
            activitydate
        });

        await newMovement.save();
        res.status(201).json({ status: 'success', data: newMovement });

    } catch (error) {
        console.error('Error in createfilemovementds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get All
exports.getfilemovementds = async (req, res) => {
    try {
        const { colid } = req.body;

        if (!colid) {
            return res.status(400).json({ status: 'error', message: 'College ID is required' });
        }

        const movements = await filemovementds.find({ colid }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: movements });

    } catch (error) {
        console.error('Error in getfilemovementds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Update
exports.updatefilemovementds = async (req, res) => {
    try {
        const { id, updates } = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Record ID is required' });
        }

        const updatedMovement = await filemovementds.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedMovement) {
            return res.status(404).json({ status: 'error', message: 'Record not found' });
        }

        res.status(200).json({ status: 'success', data: updatedMovement });

    } catch (error) {
        console.error('Error in updatefilemovementds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Delete
exports.deletefilemovementds = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Record ID is required' });
        }

        const deletedMovement = await filemovementds.findByIdAndDelete(id);

        if (!deletedMovement) {
            return res.status(404).json({ status: 'error', message: 'Record not found' });
        }

        res.status(200).json({ status: 'success', message: 'Record deleted successfully' });

    } catch (error) {
        console.error('Error in deletefilemovementds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Search Faculty/User
// Search Faculty/User
exports.searchfaculty = async (req, res) => {
    try {
        const { colid, search, department } = req.body; // Added department

        if (!colid || !search) {
            return res.status(400).json({ status: 'error', message: 'College ID and Search term are required' });
        }

        let query = {
            colid: colid,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        };

        if (department) {
            query.department = department;
        }

        // Search in User table
        const users = await User.find(query).select('name email department role');

        res.status(200).json({ status: 'success', data: users });

    } catch (error) {
        console.error('Error in searchfaculty:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get Distinct Departments
exports.getDistinctDepartments = async (req, res) => {
    try {
        const { colid } = req.body;
        if (!colid) return res.status(400).json({ status: 'error', message: 'College ID required' });

        const departments = await User.find({ colid }).distinct('department');
        res.status(200).json({ status: 'success', data: departments });
    } catch (error) {
        console.error('Error in getDistinctDepartments:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
