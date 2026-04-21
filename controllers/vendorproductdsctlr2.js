const vendorproductds = require("../Models/vendorsproductds");

// Add single vendor product
exports.addvendorproductds2 = async (req, res) => {
  try {
    const { name, user, colid, vendorname, productname, price, stock, image, gst, discount } = req.body;

    // Calculate final price
    const totalprice = price;
    const discountAmount = totalprice * (discount / 100);
    const priceAfterDiscount = totalprice - discountAmount;
    const gstAmount = priceAfterDiscount * (gst / 100);
    const finalprice = priceAfterDiscount + gstAmount;

    const newVendorProduct = new vendorproductds({
      name,
      user,
      colid,
      vendorname,
      productname,
      price,
      stock,
      image,
      gst,
      discount,
      finalprice: parseFloat(finalprice.toFixed(2))
    });

    await newVendorProduct.save();

    return res.status(201).json({
      success: true,
      message: "Vendor product added successfully",
      data: newVendorProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding vendor product",
      error: error.message
    });
  }
};

// Get all vendor products
exports.getallvendorproductds2 = async (req, res) => {
  try {
    const { colid } = req.query;

    const vendorProducts = await vendorproductds.find({ colid }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vendorProducts.length,
      data: vendorProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching vendor products",
      error: error.message
    });
  }
};

// Get vendor product by ID
exports.getvendorproductdsbyid2 = async (req, res) => {
  try {
    const { id } = req.query;

    const vendorProduct = await vendorproductds.findById(id);

    if (!vendorProduct) {
      return res.status(404).json({
        success: false,
        message: "Vendor product not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: vendorProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching vendor product",
      error: error.message
    });
  }
};

// Get vendor products by vendor name
exports.getvendorproductdsbyvendor2 = async (req, res) => {
  try {
    const { vendorname, colid } = req.query;

    const vendorProducts = await vendorproductds.find({
      vendorname,
      colid
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vendorProducts.length,
      data: vendorProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching vendor products",
      error: error.message
    });
  }
};

// Update vendor product
exports.updatevendorproductds2 = async (req, res) => {
  try {
    const { id } = req.query;
    const updateData = req.body;

    // Recalculate final price if price, gst, or discount is updated
    if (updateData.price || updateData.gst || updateData.discount) {
      const vendorProduct = await vendorproductds.findById(id);

      const price = updateData.price || vendorProduct.price;
      const gst = updateData.gst !== undefined ? updateData.gst : vendorProduct.gst;
      const discount = updateData.discount !== undefined ? updateData.discount : vendorProduct.discount;

      const totalprice = price;
      const discountAmount = totalprice * (discount / 100);
      const priceAfterDiscount = totalprice - discountAmount;
      const gstAmount = priceAfterDiscount * (gst / 100);
      const finalprice = priceAfterDiscount + gstAmount;

      updateData.finalprice = parseFloat(finalprice.toFixed(2));
    }

    const vendorProduct = await vendorproductds.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!vendorProduct) {
      return res.status(404).json({
        success: false,
        message: "Vendor product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vendor product updated successfully",
      data: vendorProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating vendor product",
      error: error.message
    });
  }
};

// Delete vendor product
exports.deletevendorproductds2 = async (req, res) => {
  try {
    const { id } = req.query;

    const vendorProduct = await vendorproductds.findByIdAndDelete(id);

    if (!vendorProduct) {
      return res.status(404).json({
        success: false,
        message: "Vendor product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vendor product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting vendor product",
      error: error.message
    });
  }
};

// Bulk add vendor products
exports.bulkaddvendorproductds2 = async (req, res) => {
  try {
    const { vendorproducts } = req.body; // Array of vendor product objects

    if (!Array.isArray(vendorproducts) || vendorproducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of vendor products"
      });
    }

    // Calculate final price for each product
    const productsWithFinalPrice = vendorproducts.map(product => {
      const totalprice = product.price;
      const discountAmount = totalprice * (product.discount / 100);
      const priceAfterDiscount = totalprice - discountAmount;
      const gstAmount = priceAfterDiscount * (product.gst / 100);
      const finalprice = priceAfterDiscount + gstAmount;

      return {
        ...product,
        finalprice: parseFloat(finalprice.toFixed(2))
      };
    });

    const result = await vendorproductds.insertMany(productsWithFinalPrice, { ordered: false });

    return res.status(201).json({
      success: true,
      message: `${result.length} vendor products added successfully`,
      count: result.length,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in bulk upload",
      error: error.message
    });
  }
};
