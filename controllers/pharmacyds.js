const Drug = require('../Models/Drug');
const PharmacyOrder = require('../Models/PharmacyOrder');
const Patient = require('../Models/Patient');

// Add new drug
exports.adddrugds = async (req, res) => {
  try {
    const drugData = req.body;
    
    const drug = new Drug(drugData);
    await drug.save();
    
    res.status(201).json({
      success: true,
      message: 'Drug added successfully',
      drug
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding drug',
      error: error.message
    });
  }
};

// Get all drugs by colid
exports.getalldrugsds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const drugs = await Drug.find({ colid })
      .sort({ drugName: 1 });
    
    res.status(200).json({
      success: true,
      count: drugs.length,
      drugs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching drugs',
      error: error.message
    });
  }
};

// Get drug by ID and colid
exports.getdrugbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const drug = await Drug.findOne({ _id: id, colid: colid });

    if (!drug) {
      return res.status(404).json({
        success: false,
        message: 'Drug not found'
      });
    }

    res.status(200).json({
      success: true,
      drug
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching drug',
      error: error.message
    });
  }
};

// Update drug quantity
exports.updatestockds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, stockQuantity } = req.body;
    
    const drug = await Drug.findOneAndUpdate(
      { _id: id, colid },
      { stockQuantity },
      { new: true }
    );
    
    if (!drug) {
      return res.status(404).json({
        success: false,
        message: 'Drug not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      drug
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating stock',
      error: error.message
    });
  }
};

// Get low stock drugs by colid
exports.getlowstockds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const lowStockDrugs = await Drug.find({
      colid: colid,
      $expr: { $lte: ['$quantity', '$reorderLevel'] },
      isActive: true
    }).sort({ quantity: 1 });

    res.status(200).json({
      success: true,
      count: lowStockDrugs.length,
      drugs: lowStockDrugs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock drugs',
      error: error.message
    });
  }
};

// Get expired drugs by colid
exports.getexpiredds = async (req, res) => {
  try {
    const { colid } = req.query;
    const today = new Date();
    
    const expiredDrugs = await Drug.find({
      colid: colid,
      expiryDate: { $lt: today },
      isActive: true
    }).sort({ expiryDate: 1 });

    res.status(200).json({
      success: true,
      count: expiredDrugs.length,
      drugs: expiredDrugs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expired drugs',
      error: error.message
    });
  }
};

// Dispense medicine
exports.dispenseds = async (req, res) => {
  try {
    const orderData = req.body;
    
    // Check stock availability
    for (const item of orderData.items) {
      const drug = await Drug.findById(item.drugId);
      if (!drug) {
        return res.status(404).json({
          success: false,
          message: `Drug ${item.drugName} not found`
        });
      }
      
      if (drug.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.drugName}. Available: ${drug.stockQuantity}`
        });
      }
    }
    
    // Create order
    const order = new PharmacyOrder(orderData);
    order.status = 'Dispensed';
    order.dispensedDate = new Date();
    await order.save();
    
    // Update stock
    for (const item of orderData.items) {
      await Drug.findByIdAndUpdate(
        item.drugId,
        { $inc: { stockQuantity: -item.quantity } }
      );
    }
    
    res.status(201).json({
      success: true,
      message: 'Medicine dispensed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error dispensing medicine',
      error: error.message
    });
  }
};
// Get all pharmacy orders by colid
exports.getallordersds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const orders = await PharmacyOrder.find({ colid })
      .populate('patientId', 'patient mrNumber phone age gender')
      .populate('items.drugId', 'drugName category')
      .sort({ orderDate: -1 })
      .limit(100);
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};
// Get pharmacy order by ID and colid
exports.getorderbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const pharmacyOrder = await PharmacyOrder.findOne({ _id: id, colid: colid })
      .populate('patientId', 'name mrNumber phone age gender')
      .populate('drugs.drugId');

    if (!pharmacyOrder) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy order not found'
      });
    }

    res.status(200).json({
      success: true,
      pharmacyOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pharmacy order',
      error: error.message
    });
  }
};

// Get orders by patient and colid
exports.getbypatientds = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { colid } = req.query;

    const pharmacyOrders = await PharmacyOrder.find({ 
      patientId,
      colid: colid 
    })
    .populate('drugs.drugId')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pharmacyOrders.length,
      pharmacyOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient pharmacy orders',
      error: error.message
    });
  }
};

// Search drugs by colid
exports.searchdrugsds = async (req, res) => {
  try {
    const { query, colid } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const drugs = await Drug.find({
      colid: parseInt(colid),
      drugName: { $regex: query, $options: 'i' },
      stockQuantity: { $gt: 0 }
    })
    .select('drugName genericName category unitPrice stockQuantity')
    .limit(10)
    .sort({ drugName: 1 });
    
    res.status(200).json({
      success: true,
      count: drugs.length,
      drugs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching drugs',
      error: error.message
    });
  }
};