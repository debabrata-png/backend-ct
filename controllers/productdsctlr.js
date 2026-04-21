const productds = require("../Models/productds");

// Add single product
exports.addproductds = async (req, res) => {
  try {
    const { name, user, colid, productname, description, price, image } = req.body;

    const newProduct = new productds({
      name,
      user,
      colid,
      productname,
      description,
      price,
      image
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message
    });
  }
};

// Get all products
exports.getallproductds = async (req, res) => {
  try {
    const { colid } = req.query;

    const products = await productds.find({ colid }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
};

// Get product by ID
exports.getproductdsbyid = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await productds.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message
    });
  }
};

// Update product
exports.updateproductds = async (req, res) => {
  try {
    const { id } = req.query;
    const updateData = req.body;

    const product = await productds.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message
    });
  }
};

// Delete product
exports.deleteproductds = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await productds.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message
    });
  }
};

// Bulk add products
exports.bulkaddproductds = async (req, res) => {
  try {
    const { products } = req.body; // Array of product objects

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of products"
      });
    }

    const result = await productds.insertMany(products, { ordered: false });

    return res.status(201).json({
      success: true,
      message: `${result.length} products added successfully`,
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
