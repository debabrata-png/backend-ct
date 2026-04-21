const purchesds = require("../Models/purchesds");

// Add purchase with smart update logic
exports.addpurchaseds = async (req, res) => {
  try {
    const { name, user, colid, vendorid, vendorname, productname, quantity, price, discount, gst } = req.body;

    // Check if pending purchase exists for same vendor and product
    const existingPurchase = await purchesds.findOne({
      colid,
      vendorid,
      productname,
      status: "pending"
    });

    if (existingPurchase) {
      // Update existing purchase
      const newQuantity = existingPurchase.quantity + quantity;
      const totalprice = price * newQuantity;
      const discountAmount = totalprice * (discount / 100);
      const priceAfterDiscount = totalprice - discountAmount;
      const gstAmount = priceAfterDiscount * (gst / 100);
      const finalprice = priceAfterDiscount + gstAmount;

      existingPurchase.quantity = newQuantity;
      existingPurchase.totalprice = parseFloat(totalprice.toFixed(2));
      existingPurchase.finalprice = parseFloat(finalprice.toFixed(2));

      await existingPurchase.save();

      return res.status(200).json({
        success: true,
        message: "Existing purchase updated with new quantity",
        data: existingPurchase
      });
    } else {
      // Create new purchase
      const totalprice = price * quantity;
      const discountAmount = totalprice * (discount / 100);
      const priceAfterDiscount = totalprice - discountAmount;
      const gstAmount = priceAfterDiscount * (gst / 100);
      const finalprice = priceAfterDiscount + gstAmount;

      const newPurchase = new purchesds({
        name,
        user,
        colid,
        vendorid,
        vendorname,
        productname,
        quantity,
        price,
        totalprice: parseFloat(totalprice.toFixed(2)),
        discount,
        gst,
        finalprice: parseFloat(finalprice.toFixed(2)),
        status: "pending"
      });

      await newPurchase.save();

      return res.status(201).json({
        success: true,
        message: "Purchase created successfully",
        data: newPurchase
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating/updating purchase",
      error: error.message
    });
  }
};

// Get all purchases
exports.getallpurchaseds = async (req, res) => {
  try {
    const { colid } = req.query;

    const purchases = await purchesds.find({ colid })
      .populate('vendorid')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchases",
      error: error.message
    });
  }
};

// Get purchase by ID
exports.getpurchasedsbyid = async (req, res) => {
  try {
    const { id } = req.query;

    const purchase = await purchesds.findById(id).populate('vendorid');

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: purchase
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchase",
      error: error.message
    });
  }
};

// Get purchases by vendor
exports.getpurchasedsbyvendor = async (req, res) => {
  try {
    const { vendorname, colid } = req.query;

    const purchases = await purchesds.find({ 
      vendorname, 
      colid 
    }).populate('vendorid').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchases by vendor",
      error: error.message
    });
  }
};

// Get purchases by status
exports.getpurchasedsbystatus = async (req, res) => {
  try {
    const { status, colid } = req.query;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'pending', 'completed', or 'cancelled'"
      });
    }

    const purchases = await purchesds.find({ 
      status, 
      colid 
    }).populate('vendorid').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchases by status",
      error: error.message
    });
  }
};

// Update purchase
exports.updatepurchaseds = async (req, res) => {
  try {
    const { id } = req.query;
    const updateData = req.body;

    // Recalculate prices if relevant fields are updated
    if (updateData.quantity || updateData.price || updateData.discount || updateData.gst) {
      const purchase = await purchesds.findById(id);
      
      const quantity = updateData.quantity || purchase.quantity;
      const price = updateData.price || purchase.price;
      const discount = updateData.discount !== undefined ? updateData.discount : purchase.discount;
      const gst = updateData.gst !== undefined ? updateData.gst : purchase.gst;

      const totalprice = price * quantity;
      const discountAmount = totalprice * (discount / 100);
      const priceAfterDiscount = totalprice - discountAmount;
      const gstAmount = priceAfterDiscount * (gst / 100);
      const finalprice = priceAfterDiscount + gstAmount;

      updateData.totalprice = parseFloat(totalprice.toFixed(2));
      updateData.finalprice = parseFloat(finalprice.toFixed(2));
    }

    const purchase = await purchesds.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('vendorid');

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Purchase updated successfully",
      data: purchase
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating purchase",
      error: error.message
    });
  }
};

// Delete purchase
exports.deletepurchaseds = async (req, res) => {
  try {
    const { id } = req.query;

    const purchase = await purchesds.findByIdAndDelete(id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Purchase deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting purchase",
      error: error.message
    });
  }
};
