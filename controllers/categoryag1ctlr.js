const categoryag1 = require('../Models/categoryag1.js');

exports.geteducationqualificationsag1 = async (req, res) => {
    try {
        const { colid } = req.query;
        if (!colid) {
            return res.status(400).json({ success: false, message: 'colid is required' });
        }

        // Find distinct education_qualification where is_active is 'Yes'
        const qualifications = await categoryag1.distinct('education_qualification', {
            colid: Number(colid),
            is_active: 'Yes',
            education_qualification: { $ne: null, $ne: "" }
        });

        res.status(200).json({ success: true, data: qualifications });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getcategoriesbyedqag1 = async (req, res) => {
    try {
        const { colid, education_qualification } = req.query;
        if (!colid) {
            return res.status(400).json({ success: false, message: 'colid is required' });
        }
        if (!education_qualification) {
            return res.status(400).json({ success: false, message: 'education_qualification is required' });
        }

        const categories = await categoryag1.find({
            colid: Number(colid),
            is_active: 'Yes',
            education_qualification: education_qualification
        })
            .select('category_name category_code description createdAt updatedAt')
            .lean();

        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// CRUD Endpoints for Category Management Page

exports.createcategoryag1 = async (req, res) => {
    try {
        const { colid, category_name, category_code, education_qualification, description, counsellors, created_by } = req.body;

        if (!colid || !category_name || !category_code) {
            return res.status(400).json({ success: false, message: 'colid, category_name, and category_code are required' });
        }

        const existingCategory = await categoryag1.findOne({ colid: Number(colid), category_code });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category Code already exists' });
        }

        const newCategory = new categoryag1({
            colid: Number(colid),
            category_name,
            category_code,
            education_qualification,
            description,
            counsellors: counsellors || [],
            created_by
        });

        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory, message: 'Category created successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getallcategoriesag1 = async (req, res) => {
    try {
        const { colid } = req.query;
        if (!colid) {
            return res.status(400).json({ success: false, message: 'colid is required' });
        }

        const categories = await categoryag1.find({ colid: Number(colid) }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updatecategoryag1 = async (req, res) => {
    try {
        const { id, category_name, category_code, education_qualification, description, counsellors, is_active } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Category ID is required' });
        }

        const updatedCategory = await categoryag1.findByIdAndUpdate(
            id,
            { category_name, category_code, education_qualification, description, counsellors, is_active },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, data: updatedCategory, message: 'Category updated successfully' });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ success: false, message: 'Category Code already exists' });
        } else {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};

exports.deletecategoryag1 = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Category ID is required' });
        }

        const deletedCategory = await categoryag1.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
