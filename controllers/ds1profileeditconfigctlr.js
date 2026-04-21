const ProfileEditConfig = require("../Models/profileeditconfigds");

// Get profile edit configuration
exports.ds1getprofileeditconfig = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    let config = await ProfileEditConfig.findOne({ colid: parseInt(colid) });

    // If no config exists, create default
    if (!config) {
      config = await ProfileEditConfig.create({
        colid: parseInt(colid),
        isEditingEnabled: true,
        lastEditDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        editableFields: {} // All fields default to true
      });
    }

    res.status(200).json({ data: config });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching configuration", 
      error: error.message 
    });
  }
};

// Update profile edit configuration
exports.ds1updateprofileeditconfig = async (req, res) => {
  try {
    const { colid, isEditingEnabled, lastEditDate, editableFields, updatedBy, notes } = req.body;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const updateData = {
      colid: parseInt(colid),
      isEditingEnabled,
      lastEditDate,
      editableFields,
      updatedBy,
      notes
    };

    const config = await ProfileEditConfig.findOneAndUpdate(
      { colid: parseInt(colid) },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ 
      message: "Configuration updated successfully", 
      data: config 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating configuration", 
      error: error.message 
    });
  }
};

// Check if student can edit profile
exports.ds1checkeditstatus = async (req, res) => {
  try {
    const { colid, email } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const config = await ProfileEditConfig.findOne({ colid: parseInt(colid) });

    if (!config) {
      return res.status(200).json({ 
        canEdit: true,
        reason: "No configuration found, editing allowed by default"
      });
    }

    // Check global toggle
    if (!config.isEditingEnabled) {
      return res.status(200).json({ 
        canEdit: false,
        reason: "Profile editing is disabled by administrator"
      });
    }

    // Check deadline
    const currentDate = new Date();
    const deadline = new Date(config.lastEditDate);

    if (currentDate > deadline) {
      return res.status(200).json({ 
        canEdit: false,
        reason: "Profile editing period has ended",
        deadline: config.lastEditDate
      });
    }

    // Calculate time remaining
    const timeRemaining = deadline - currentDate;
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    res.status(200).json({ 
      canEdit: true,
      reason: "Profile editing is allowed",
      deadline: config.lastEditDate,
      daysRemaining,
      hoursRemaining,
      editableFields: config.editableFields
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error checking edit status", 
      error: error.message 
    });
  }
};

// Get field-level permissions
exports.ds1getfieldpermissions = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const config = await ProfileEditConfig.findOne({ colid: parseInt(colid) });

    if (!config) {
      // Return all fields as editable if no config
      return res.status(200).json({ 
        canEdit: true,
        allFieldsEditable: true
      });
    }

    // Check deadline
    const currentDate = new Date();
    const deadline = new Date(config.lastEditDate);
    const isPastDeadline = currentDate > deadline;

    if (!config.isEditingEnabled || isPastDeadline) {
      // All fields non-editable
      return res.status(200).json({ 
        canEdit: false,
        editableFields: {},
        reason: isPastDeadline ? "Deadline passed" : "Editing disabled"
      });
    }

    res.status(200).json({ 
      canEdit: true,
      editableFields: config.editableFields,
      deadline: config.lastEditDate
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error getting field permissions", 
      error: error.message 
    });
  }
};

// Delete configuration (reset to default)
exports.ds1deleteprofileeditconfig = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    await ProfileEditConfig.findOneAndDelete({ colid: parseInt(colid) });

    res.status(200).json({ 
      message: "Configuration reset to default" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting configuration", 
      error: error.message 
    });
  }
};
