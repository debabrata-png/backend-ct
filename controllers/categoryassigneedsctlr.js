const Categoryassigneeds = require('../Models/categoryassigneeds');

// Add or update category assignees
exports.addorupdatecategoryassigneeds = async (req, res) => {
  try {
    const { name, user, colid, categoryname, assignees } = req.body;

    if (!colid || !user || !name) {
      return res.status(400).json({
        success: false,
        message: 'name, user, and colid are required',
      });
    }

    let categoryAssignee = await Categoryassigneeds.findOne({
      colid: parseInt(colid),
      categoryname,
    });

    if (categoryAssignee) {
      // Update existing
      categoryAssignee.name = name;
      categoryAssignee.user = user;
      categoryAssignee.assignees = assignees;

      const updatedAssignee = await categoryAssignee.save();
      return res.status(200).json({
        success: true,
        message: 'Category assignees updated successfully',
        data: updatedAssignee,
      });
    } else {
      // Create new
      const newAssignee = new Categoryassigneeds({
        name,
        user,
        colid: parseInt(colid),
        categoryname,
        assignees,
      });

      const savedAssignee = await newAssignee.save();
      return res.status(201).json({
        success: true,
        message: 'Category assignees created successfully',
        data: savedAssignee,
      });
    }
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Get all category assignees
exports.getallcategoryassigneeds = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'colid is required',
      });
    }

    const assignees = await Categoryassigneeds.find({
      colid: parseInt(colid),
    }).sort({ createdDate: -1 });

    res.status(200).json({
      success: true,
      data: assignees,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Get assignees by category
exports.getassigneesbycategoryds = async (req, res) => {
  try {
    const { colid, categoryname } = req.query;

    if (!colid || !categoryname) {
      return res.status(400).json({
        success: false,
        message: 'colid and categoryname are required',
      });
    }

    const assignee = await Categoryassigneeds.findOne({
      colid: parseInt(colid),
      categoryname,
    });

    if (!assignee) {
      return res.status(404).json({
        success: false,
        message: 'No assignees found for this category',
      });
    }

    res.status(200).json({
      success: true,
      data: assignee,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Delete category assignees
exports.deletecategoryassigneeds = async (req, res) => {
  try {
    const { assigneeId } = req.query;

    if (!assigneeId) {
      return res.status(400).json({
        success: false,
        message: 'assigneeId is required',
      });
    }

    const deletedAssignee = await Categoryassigneeds.findByIdAndDelete(assigneeId);

    if (!deletedAssignee) {
      return res.status(404).json({
        success: false,
        message: 'Category assignee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category assignee deleted successfully',
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};
