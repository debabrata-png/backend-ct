const Grievancecategoryds = require('../Models/grievancecategoryds1');

// Add new category
exports.addgrievancecategoryds1 = async (req, res) => {
  try {
    const { categoryname, description, colid, user, name } = req.body;

    // Check if category already exists for this college
    const existingCategory = await Grievancecategoryds.findOne({
      categoryname: categoryname.trim(),
      colid,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'This category already exists',
      });
    }

    const newCategory = new Grievancecategoryds({
      categoryname: categoryname.trim(),
      description,
      name,
      user,
      colid,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all categories for a college
exports.getallgrievancecategoryds1 = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'colid is required',
      });
    }

    const categories = await Grievancecategoryds.find({
      colid: parseInt(colid),
    }).sort({ createdDate: -1 });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete category
exports.deletegrievancecategoryds1 = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'categoryId is required',
      });
    }

    const deletedCategory = await Grievancecategoryds.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
