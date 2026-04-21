const Material = require('../Models/alumnimaterialsds');
const User = require('../Models/user');

// Upload Material
exports.uploadalumnimaterialsds = async (req, res) => {
    try {
        const { colid, email, title, fileUrl, type, category, department, description } = req.body;

        // Validate required fields
        if (!fileUrl) return res.status(400).json({ message: 'File URL is required' });

        // Find user by colid and email to get user._id
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const materialData = {
            title,
            fileUrl,
            type,
            category,
            department,
            description,
            colid: Number(colid),
            uploadedBy: user._id
        };

        const newMaterial = new Material(materialData);
        await newMaterial.save();

        res.status(201).json({ message: 'Material uploaded successfully', material: newMaterial });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading material', error: error.message });
    }
};

// Get All Materials
exports.getallalumnimaterialsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const materials = await Material.find({ colid: Number(colid), status: 1 }).sort({ createdAt: -1 })
            .populate('uploadedBy', 'name');
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching materials', error: error.message });
    }
};

// Get My Materials
exports.getmymaterialsds = async (req, res) => {
    try {
        const { colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const materials = await Material.find({ uploadedBy: user._id, colid: Number(colid), status: 1 });
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your materials', error: error.message });
    }
};

// Filter Materials
exports.filteralumnimaterialsds = async (req, res) => {
    try {
        const { type, category, department, colid } = req.query;
        const filter = { status: 1, colid: Number(colid) };

        if (type) filter.type = type;
        if (category) filter.category = category;
        if (department) filter.department = department;

        const materials = await Material.find(filter).populate('uploadedBy', 'name');
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering materials', error: error.message });
    }
};

// Download Material (Increment Count)
exports.downloadmaterialds = async (req, res) => {
    try {
        const { id } = req.body;
        await Material.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });
        res.status(200).json({ message: 'Download count updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating download count', error: error.message });
    }
};

// Delete Material
exports.deletealumnimaterialsds = async (req, res) => {
    try {
        const { id, colid, email } = req.query;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const result = await Material.findOneAndUpdate(
            { _id: id, uploadedBy: user._id, colid: Number(colid) },
            { status: 0 }
        );

        if (!result) return res.status(404).json({ message: 'Material not found or unauthorized' });
        res.status(200).json({ message: 'Material deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting material', error: error.message });
    }
};
