const paymentds = require("../Models/paymentds");
const purchesds = require("../Models/purchesds");

// Add payment and update purchase status
exports.addpaymentds = async (req, res) => {
  try {
    const { name, user, colid, purchesid, vendorname, productname, quantity, paymenttype, paymentstatus, paymentamount, paymentrefno, paymentdate } = req.body;

    // Create payment record
    const newPayment = new paymentds({
      name,
      user,
      colid,
      purchesid,
      vendorname,
      productname,
      quantity,
      paymenttype,
      paymentstatus,
      paymentamount,
      paymentrefno,
      paymentdate
    });

    await newPayment.save();

    // Update purchase status to completed when payment is added
    await purchesds.findByIdAndUpdate(
      purchesid,
      { status: "completed" },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Payment added successfully and purchase marked as completed",
      data: newPayment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding payment",
      error: error.message
    });
  }
};

// Get all payments
exports.getallpaymentds = async (req, res) => {
  try {
    const { colid } = req.query;

    const payments = await paymentds.find({ colid })
      .populate('purchesid')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message
    });
  }
};

// Get payments by purchase ID
exports.getpaymentdsbypurchase = async (req, res) => {
  try {
    const { purchesid } = req.query;

    const payments = await paymentds.find({ purchesid })
      .populate('purchesid')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments by purchase",
      error: error.message
    });
  }
};

// Get payments by vendor
exports.getpaymentdsbyvendor = async (req, res) => {
  try {
    const { vendorname, colid } = req.query;

    const payments = await paymentds.find({ 
      vendorname, 
      colid 
    }).populate('purchesid').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments by vendor",
      error: error.message
    });
  }
};

// Update payment
exports.updatepaymentds = async (req, res) => {
  try {
    const { id } = req.query;
    const updateData = req.body;

    const payment = await paymentds.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('purchesid');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating payment",
      error: error.message
    });
  }
};

// Delete payment
exports.deletepaymentds = async (req, res) => {
  try {
    const { id } = req.query;

    const payment = await paymentds.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    // Optionally revert purchase status back to pending
    await purchesds.findByIdAndUpdate(
      payment.purchesid,
      { status: "pending" }
    );

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully and purchase reverted to pending"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting payment",
      error: error.message
    });
  }
};
