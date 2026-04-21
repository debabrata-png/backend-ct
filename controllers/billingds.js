const Bill = require('../Models/Bill');
const Patient = require('../Models/Patient');

// Create new bill
exports.createds = async (req, res) => {
  try {
    const billData = req.body;
    
    const bill = new Bill(billData);
    await bill.save();
    
    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      bill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating bill',
      error: error.message
    });
  }
};

// Get all bills by colid
exports.getallds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const bills = await Bill.find({ colid })
      .populate('patientId', 'patient mrNumber phone')
      .sort({ billDate: -1 })
      .limit(100);
    
    res.status(200).json({
      success: true,
      count: bills.length,
      bills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bills',
      error: error.message
    });
  }
};


// Get bill by ID and colid
exports.getbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const bill = await Bill.findOne({ _id: id, colid })
      .populate('patientId', 'patient mrNumber phone age gender address');
    
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    res.status(200).json({
      success: true,
      bill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bill',
      error: error.message
    });
  }
};


// Get bills by patient and colid
exports.getbypatientds = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { colid } = req.query;

    const bills = await Bill.find({ 
      patientId,
      colid: colid 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      bills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient bills',
      error: error.message
    });
  }
};

// Update payment status
exports.updatepaymentds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, paidAmount, paymentMethod } = req.body;
    
    const bill = await Bill.findOne({ _id: id, colid });
    
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    bill.paidAmount = paidAmount;
    bill.paymentMethod = paymentMethod;
    bill.balanceAmount = bill.totalAmount - paidAmount;
    
    if (paidAmount === 0) {
      bill.paymentStatus = 'Pending';
    } else if (paidAmount < bill.totalAmount) {
      bill.paymentStatus = 'Partial';
    } else {
      bill.paymentStatus = 'Paid';
    }
    
    await bill.save();
    
    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      bill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating payment',
      error: error.message
    });
  }
};

// Get pending bills by colid
exports.getpendingds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const bills = await Bill.find({
      colid: colid,
      paymentStatus: { $in: ['Pending', 'Partial'] }
    })
    .populate('patientId', 'name mrNumber phone')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      bills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending bills',
      error: error.message
    });
  }
};
