const returnproductds = require("../Models/returnproductds");
const purchesds = require("../Models/purchesds");

// Add product return
exports.addreturnds = async (req, res) => {
  try {
    const { name, user, colid, purchesid, vendorname, productname, purchasedquantity, returnquantity, reason, returndate } = req.body;

    // Validate return quantity
    if (returnquantity > purchasedquantity) {
      return res.status(400).json({
        success: false,
        message: "Return quantity cannot exceed purchased quantity"
      });
    }

    const newReturn = new returnproductds({
      name,
      user,
      colid,
      purchesid,
      vendorname,
      productname,
      purchasedquantity,
      returnquantity,
      reason,
      returndate,
      status: "pending"
    });

    await newReturn.save();

    return res.status(201).json({
      success: true,
      message: "Product return request submitted successfully",
      data: newReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting return request",
      error: error.message
    });
  }
};

// Get all returns
exports.getallreturnds = async (req, res) => {
  try {
    const { colid } = req.query;
    const returns = await returnproductds.find({ colid }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: returns.length,
      data: returns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching returns",
      error: error.message
    });
  }
};

// Get returns by status
exports.getreturndsbyStatus = async (req, res) => {
  try {
    const { status, colid } = req.query;
    const returns = await returnproductds.find({ status, colid }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: returns.length,
      data: returns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching returns by status",
      error: error.message
    });
  }
};

// Update return status - Changed from PUT to POST, using req.query
exports.updatereturndsStatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;

    const updatedReturn = await returnproductds.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReturn) {
      return res.status(404).json({
        success: false,
        message: "Return not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Return status updated successfully",
      data: updatedReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating return status",
      error: error.message
    });
  }
};

// Delete return - Changed from DELETE to GET, using req.query
exports.deletereturnds = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedReturn = await returnproductds.findByIdAndDelete(id);

    if (!deletedReturn) {
      return res.status(404).json({
        success: false,
        message: "Return not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Return deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting return",
      error: error.message
    });
  }
};
