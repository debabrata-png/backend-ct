const FacBankDs = require('../Models/facbankds');

// Get all bank details by college
exports.getfacbankdsbycolid = async (req, res) => {
  try {
    const { colid } = req.query;
    const bankdetails = await FacBankDs.find({ colid: parseInt(colid) });

    res.status(200).json({
      success: true,
      bankdetails
    });
  } catch (error) {
    // console.error('Error fetching bank details:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};
