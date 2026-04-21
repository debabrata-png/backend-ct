const purchesds = require("../Models/purchesds");

exports.searchpurchasedsbyproductname = async (req, res) => {
  try {
    const { productname, colid } = req.query;
    if (!productname) {
      return res.status(400).json({
        success: false,
        message: "Product name is required"
      });
    }
    const filter = { productname: { $regex: productname, $options: "i" } };
    if (colid) filter.colid = colid;
    const purchases = await purchesds.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching purchases",
      error: error.message
    });
  }
};
