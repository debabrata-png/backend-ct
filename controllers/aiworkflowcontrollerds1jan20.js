const aiworkflowds = require('../Models/aiworkflowds1');

// Create Workflow
exports.createworkflowds1 = async (req, res) => {
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
    // console.error('❌ Create error:', error);
    // res.status(400).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Get All Workflows
exports.getworkflowsds1 = async (req, res) => {
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
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Get Single Workflow
exports.getworkflowds1 = async (req, res) => {
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
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// FIXED: Update Workflow
exports.updateworkflowds1 = async (req, res) => {
  try {

    // FIXED: Properly construct update object
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      steps: req.body.steps || [],
      updatedAt: Date.now()
    };
    const workflow = await aiworkflowds.findOneAndUpdate(
      {
        _id: req.query.id,
        user: req.query.user,
        colid: parseInt(req.query.colid)
      },
      updateData,
      { 
        new: true,  // Return updated document
        runValidators: true  // Run schema validations
      }
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
    // console.error('❌ Update error:', error);
    // res.status(400).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Delete Workflow
exports.deleteworkflowds1 = async (req, res) => {
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
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};
