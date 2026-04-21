const categoryds = require('../Models/categoryds.js');

// Create category
exports.createcategoryds = async (req, res) => {
    try {
        req.body.colid = Number(req.body.colid);
        const category = await categoryds.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        // console.error('Error in createcategoryds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all categories
exports.getallcategoriesds = async (req, res) => {
    try {
        const { colid } = req.query;
        const query = { colid: Number(colid) };

        const categories = await categoryds.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        // console.error('Error in getallcategoriesds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get category by ID
exports.getcategorybyidds = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryds.findById(id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (err) {
        // console.error('Error in getcategorybyidds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Update category
exports.updatecategoryds = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }

        const category = await categoryds.findByIdAndUpdate(id, req.body, { new: true });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (err) {
        // console.error('Error in updatecategoryds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Delete category
exports.deletecategoryds = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryds.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
        // console.error('Error in deletecategoryds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Add counsellor to category
exports.addcounsellortocategoryds = async (req, res) => {
    try {
        //const { id } = req.query;  // Changed from req.params
        const { counsellor_email, counsellor_name, id } = req.body;

        const category = await categoryds.findById(id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Check if counsellor already exists
        const exists = category.counsellors.find(c => c.counsellor_email === counsellor_email);
        if (exists) {
            return res.status(400).json({ success: false, message: 'Counsellor already exists in this category' });
        }

        category.counsellors.push({
            counsellor_email,
            counsellor_name,
            is_active: 'Yes'
        });

        await category.save();
        res.status(200).json({ success: true, data: category });
    } catch (err) {
        // console.error('Error in addcounsellortocategoryds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Remove counsellor from category
exports.removecounsellorfromcategoryds = async (req, res) => {
    try {
        const { id } = req.params; // Category ID still in params
        const { counsellor_email } = req.body; // Email in body for safety

        const category = await categoryds.findById(id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        category.counsellors = category.counsellors.filter(c => c.counsellor_email !== counsellor_email);

        await category.save();
        res.status(200).json({ success: true, data: category });
    } catch (err) {
        // console.error('Error in removecounsellorfromcategoryds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get active categories with active counsellors (for lead assignment)
exports.getactivecategorieswithcounsellorsds = async (req, res) => {
    try {
        const { colid } = req.query;
        const categories = await categoryds.find({
            colid: Number(colid),
            is_active: 'Yes'
        });

        // Filter to only show active counsellors
        const activeCategoriesWithCounsellors = categories.map(cat => ({
            ...cat.toObject(),
            counsellors: cat.counsellors.filter(c => c.is_active === 'Yes')
        })).filter(cat => cat.counsellors.length > 0);

        res.status(200).json({ success: true, data: activeCategoriesWithCounsellors });
    } catch (err) {
        // console.error('Error in getactivecategorieswithcounsellorsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
