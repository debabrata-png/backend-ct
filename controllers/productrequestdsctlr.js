const productrequestds = require("../Models/productrequestds");

// Add product request (Faculty)
exports.addproductrequestds = async (req, res) => {
  try {
    const { name, user, colid, productname, quantity } = req.body;

    const newRequest = new productrequestds({
      name,
      user,
      colid,
      productname,
      quantity,
      status: "pending"
    });

    await newRequest.save();

    return res.status(201).json({
      success: true,
      message: "Product request submitted successfully",
      data: newRequest
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting product request",
      error: error.message
    });
  }
};

// Get all product requests (Admin)
exports.getallproductrequestds = async (req, res) => {
  try {
    const { colid } = req.query;

    const requests = await productrequestds.find({ colid }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product requests",
      error: error.message
    });
  }
};

// Get product requests by user (Faculty)
exports.getproductrequestdsbyuser = async (req, res) => {
  try {
    const { user, colid } = req.query;

    const requests = await productrequestds.find({ 
      user, 
      colid 
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product requests",
      error: error.message
    });
  }
};

// Update product request status (Admin - Approve/Reject)
exports.updateproductrequestdsstatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'pending', 'approved', or 'rejected'"
      });
    }

    const request = await productrequestds.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Product request not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product request ${status} successfully`,
      data: request
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product request status",
      error: error.message
    });
  }
};

// Delete product request
exports.deleteproductrequestds = async (req, res) => {
  try {
    const { id } = req.query;

    const request = await productrequestds.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Product request not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product request deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product request",
      error: error.message
    });
  }
};
