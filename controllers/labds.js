const LabOrder = require('../Models/LabOrder');
const LabTest = require('../Models/LabTest');
const Patient = require('../Models/Patient');

// Create lab test
exports.createtestds = async (req, res) => {
  try {
    const testData = req.body;
    const labTest = new LabTest(testData);
    await labTest.save();

    res.status(201).json({
      success: true,
      message: 'Lab test created successfully',
      labTest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lab test',
      error: error.message
    });
  }
};

// Get all lab tests by colid
exports.getalltestsds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const labTests = await LabTest.find({ colid })
      .sort({ testName: 1 });

    res.status(200).json({
      success: true,
      count: labTests.length,
      labTests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lab tests',
      error: error.message
    });
  }
};

// Create lab order
exports.createorderds = async (req, res) => {
  try {
    const orderData = req.body;

    // Validate that either patientId or patientDetails is provided
    if (!orderData.patientId && !orderData.patientDetails) {
      return res.status(400).json({
        success: false,
        message: 'Either patient ID or patient details must be provided'
      });
    }

    const labOrder = new LabOrder(orderData);
    await labOrder.save();

    res.status(201).json({
      success: true,
      message: 'Lab order created successfully',
      labOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lab order',
      error: error.message
    });
  }
};

// Get all lab orders by colid
exports.getallordersds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const labOrders = await LabOrder.find({ colid })
      .populate('patientId', 'patient mrNumber phone age gender')
      .populate('tests.testId', 'testName price')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: labOrders.length,
      labOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lab orders',
      error: error.message
    });
  }
};
// Get lab order by ID and colid
exports.getorderbyidds = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid } = req.query;
    
    const labOrder = await LabOrder.findOne({ _id: id, colid: colid })
      .populate('patientId', 'name mrNumber phone age gender bloodGroup')
      .populate('tests.testId');

    if (!labOrder) {
      return res.status(404).json({
        success: false,
        message: 'Lab order not found'
      });
    }

    res.status(200).json({
      success: true,
      labOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lab order',
      error: error.message
    });
  }
};

// Update sample collection status
exports.collectsampleds = async (req, res) => {
  try {
    const { id } = req.params;
    const { sampleCollectedBy, colid } = req.body;

    const labOrder = await LabOrder.findOneAndUpdate(
      { _id: id, colid: colid },
      {
        overallStatus: 'Sample Collected',
        sampleCollectedAt: new Date(),
        sampleCollectedBy
      },
      { new: true }
    ).populate('patientId', 'name mrNumber phone age gender');

    if (!labOrder) {
      return res.status(404).json({
        success: false,
        message: 'Lab order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sample collected successfully',
      labOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error collecting sample',
      error: error.message
    });
  }
};

// Enter test results
exports.enterresultsds = async (req, res) => {
  try {
    const { id } = req.params;
    const { testId, results, colid } = req.body;

    const labOrder = await LabOrder.findOne({ _id: id, colid });
    
    if (!labOrder) {
      return res.status(404).json({
        success: false,
        message: 'Lab order not found'
      });
    }

    // Find and update the specific test
    const test = labOrder.tests.find(t => t.testId.toString() === testId);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found in this order'
      });
    }

    test.results = results;
    test.status = 'Completed';

    // Check if all tests are completed
    const allCompleted = labOrder.tests.every(t => t.status === 'Completed');
    if (allCompleted) {
      labOrder.status = 'Completed';
      labOrder.completedDate = new Date();
    }

    await labOrder.save();

    res.status(200).json({
      success: true,
      message: 'Results entered successfully',
      labOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error entering results',
      error: error.message
    });
  }
};
// Get pending lab orders by colid
exports.getpendingds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    const labOrders = await LabOrder.find({
      colid: colid,
      overallStatus: { $in: ['Pending', 'Sample Collected'] }
    })
    .populate('patientId', 'name mrNumber phone age gender')
    .populate('tests.testId')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: labOrders.length,
      labOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending lab orders',
      error: error.message
    });
  }
};

// Get orders by patient and colid
exports.getbypatientds = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { colid } = req.query;

    const labOrders = await LabOrder.find({ 
      patientId,
      colid: colid 
    })
    .populate('tests.testId')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: labOrders.length,
      labOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient lab orders',
      error: error.message
    });
  }
};
