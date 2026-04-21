// controllers/donationreceiptsds.js
const vssdonationformds = require('../Models/vssdonationformds');

// Create new donation receipt
// Create new donation receipt
exports.createdonationreceiptds = async (req, res) => {
  try {
    const receiptData = req.body;

    // Auto-generate receipt number: Find the latest receipt number and increment
    const lastReceipt = await vssdonationformds.findOne().sort({ receiptNo: -1 });
    let nextNum = 1;
    if (lastReceipt && lastReceipt.receiptNo) {
      const match = lastReceipt.receiptNo.match(/VSS(\d+)/);
      if (match && match[1]) {
        nextNum = parseInt(match[1], 10) + 1;
      }
    }
    receiptData.receiptNo = `VSS${String(nextNum).padStart(6, '0')}`;

    const receipt = new vssdonationformds(receiptData);
    await receipt.save();
    res.status(201).json(receipt);
  } catch (error) {
    // console.error('Error creating donation receipt:', error);
    console.log(error);
    res.status(500).json({ message: 'Failed to create donation receipt' });
  }
};

// Get all donation receipts with optional date filter
exports.getdonationreceiptsds = async (req, res) => {
  try {
    const { startDate, endDate, colid } = req.query;
    let query = {};

    if (colid) {
      query.colid = colid;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const receipts = await vssdonationformds.find(query).sort({ createdAt: -1 });
    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error fetching donation receipts:', error);
    res.status(500).json({ message: 'Failed to fetch donation receipts' });
  }
};

// Get single donation receipt by ID
exports.getdonationreceiptds = async (req, res) => {
  try {
    const receipt = await vssdonationformds.findById(req.query.id);
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error fetching donation receipt:', error);
    res.status(500).json({ message: 'Failed to fetch donation receipt' });
  }
};
// Update donation receipt
exports.updatedonationreceiptds = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const receipt = await vssdonationformds.findByIdAndUpdate(_id, updateData, { new: true });
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error updating donation receipt:', error);
    res.status(500).json({ message: 'Failed to update donation receipt' });
  }
};

// Delete donation receipt
exports.deletedonationreceiptds = async (req, res) => {
  try {
    const id = req.query.id || req.params.id;
    console.log(`Attempting to delete receipt with ID: ${id}`);
    const receipt = await vssdonationformds.findByIdAndDelete(id);
    if (!receipt) {
      console.log(`Receipt not found for ID: ${id}`);
      return res.status(404).json({ message: 'Receipt not found' });
    }
    console.log(`Receipt deleted successfully: ${id}`);
    res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation receipt:', error);
    res.status(500).json({ message: 'Failed to delete donation receipt' });
  }
};
