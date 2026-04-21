const Grievanceds = require('../Models/grievanceds');
const Categoryassigneeds = require('../Models/categoryassigneeds');

// Add new grievance with auto-assignment
exports.addgrievanceds = async (req, res) => {
  try {
    const { name, user, colid, regno, title, description, category, priority } = req.body;

    // Find assignees for this category
    let assignedTo = [];
    try {
      const categoryAssignee = await Categoryassigneeds.findOne({
        colid: parseInt(colid),
        categoryname: category,
      });

      if (categoryAssignee && categoryAssignee.assignees && categoryAssignee.assignees.length > 0) {
        // Assign to ALL assignees
        assignedTo = categoryAssignee.assignees;
      }
    } catch (err) {
      console.log('No assignees found for category:', category);
    }

    const newGrievance = new Grievanceds({
      name,
      user,
      colid,
      regno,
      title,
      description,
      category,
      priority,
      status: assignedTo.length > 0 ? 1 : 0, // 1 if auto-assigned, 0 if not
      assignedTo: assignedTo, // Array of all assignees
    });

    const savedGrievance = await newGrievance.save();
    res.status(201).json({
      success: true,
      message: 'Grievance submitted successfully and assigned to all category members',
      data: savedGrievance,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Get grievances by user (regno, colid, user)
exports.getgrievancesbyuserds = async (req, res) => {
  try {
    const { colid, user, regno } = req.query;

    if (!colid || !user || !regno) {
      return res.status(400).json({
        success: false,
        message: 'colid, user, and regno are required',
      });
    }

    const query = {
      colid: parseInt(colid),
      user,
      regno,
    };

    const grievances = await Grievanceds.find(query).sort({ createdDate: -1 });

    res.status(200).json({
      success: true,
      data: grievances,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Get all grievances (for admin) with optional category filter
exports.getallgrievanceds = async (req, res) => {
  try {
    const { colid, category } = req.query;

    let query = {};
    if (colid) {
      query.colid = parseInt(colid);
    }
    if (category && category !== 'all') {
      query.category = category;
    }

    const grievances = await Grievanceds.find(query).sort({ createdDate: -1 });
    res.status(200).json({
      success: true,
      data: grievances,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Update grievance status and assign to user
exports.updategrievancestatusds = async (req, res) => {
  try {
    const { grievanceId, status, assignedTo } = req.body;

    const updateData = {
      status,
      assignedTo,
    };

    if (status === 2) {
      updateData.resolvedDate = new Date();
    }

    const updatedGrievance = await Grievanceds.findByIdAndUpdate(
      grievanceId,
      updateData,
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Grievance updated successfully',
      data: updatedGrievance,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Get grievances assigned to specific user
exports.getassignedgrievanceds = async (req, res) => {
  try {
    const { assignedTo, colid } = req.query;

    let query = { status: { $in: [1, 2] } };

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    if (colid) {
      query.colid = parseInt(colid);
    }

    const grievances = await Grievanceds.find(query).sort({ createdDate: -1 });
    res.status(200).json({
      success: true,
      data: grievances,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

// Update grievance progress (by assignee)
exports.updategrievanceprogressds = async (req, res) => {
  try {
    const { grievanceId, progress, status } = req.body;

    const updateData = {
      progress,
    };

    if (status) {
      updateData.status = status;
    }

    if (status === 2) {
      updateData.resolvedDate = new Date();
    }

    const updatedGrievance = await Grievanceds.findByIdAndUpdate(
      grievanceId,
      updateData,
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Grievance progress updated',
      data: updatedGrievance,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};
