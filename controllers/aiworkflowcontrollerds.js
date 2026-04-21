const aiworkflowds = require('../Models/aiworkflowds');

// Create Workflow
exports.createworkflowds = async (req, res) => {
  try {
    const workflow = new aiworkflowds({
      name: req.query.name,
      description: req.query.description,
      user: req.query.user,
      colid: parseInt(req.query.colid),
      status: req.query.status || 'Active',
      steps: req.body.steps || []
    });

    await workflow.save();
    res.status(201).json({
      success: true,
      message: 'Workflow created successfully',
      data: workflow
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Workflows
exports.getworkflowsds = async (req, res) => {
  try {
    const workflows = await aiworkflowds.find({
      user: req.query.user,
      colid: parseInt(req.query.colid)
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workflows.length,
      data: workflows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Workflow
exports.getworkflowds = async (req, res) => {
  try {
    const workflow = await aiworkflowds.findOne({
      _id: req.query.id,
      user: req.query.user,
      colid: parseInt(req.query.colid)
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found'
      });
    }

    res.status(200).json({
      success: true,
      data: workflow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Workflow
exports.updateworkflowds = async (req, res) => {
  try {
    const workflow = await aiworkflowds.findOneAndUpdate(
      {
        _id: req.query.id,
        user: req.query.user,
        colid: parseInt(req.query.colid)
      },
      {
        ...req.body,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workflow updated successfully',
      data: workflow
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Workflow
exports.deleteworkflowds = async (req, res) => {
  try {
    const workflow = await aiworkflowds.findOneAndDelete({
      _id: req.query.id,
      user: req.query.user,
      colid: parseInt(req.query.colid)
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: 'Workflow not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workflow deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
