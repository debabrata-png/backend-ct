const easebuzzgatewayds = require('../Models/easebuzzgatewayds');
const universalpaymentgatewayds = require('../Models/universalpaymentgatewayds');
const EasebuzzPaymentHandler = require('../utils/easebuzzgatewayhandler');

// @desc    Create Easebuzz Config
// @route   POST /api/v2/easebuzzgatewayds/create
exports.createEasebuzzConfig = async (req, res) => {
  try {
    const config = await easebuzzgatewayds.create(req.body);
    res.status(201).json({
      success: true,
      data: config
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get Easebuzz Config by colid
// @route   POST /api/v2/easebuzzgatewayds/get
exports.getEasebuzzConfig = async (req, res) => {
  try {
    const { colid } = req.body;
    const config = await easebuzzgatewayds.findOne({ colid, isactive: true });
    if (!config) {
      return res.status(404).json({ success: false, message: 'Configuration not found' });
    }
    res.status(200).json({
      success: true,
      data: config
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update Easebuzz Config
// @route   POST /api/v2/easebuzzgatewayds/update
exports.updateEasebuzzConfig = async (req, res) => {
  try {
    const { id } = req.query;
    const config = await easebuzzgatewayds.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      data: config
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * @desc    Initiate Easebuzz Payment
 * @route   POST /api/v2/easebuzz/initiate
 */
exports.initiateEasebuzzPayment = async (req, res) => {
  try {
    const {
      colid,
      studentname,
      regno,
      amount,
      accountno,
      paymenttype,
      paymentpurpose,
      email,
      phone,
      type,
      ledgerid,
      ledgerbalance,
      feegroup,
      feeitem,
      feecategory,
      semester,
      installment,
      academicyear,
      classdate,
      ledgerdetails,
      frontendcallbackurl
    } = req.body;

    if (!colid) throw new Error('colid is required');

    // 1. Fetch Easebuzz Credentials for this specific colid
    const config = await easebuzzgatewayds.findOne({ colid, isactive: true });
    if (!config) throw new Error(`Easebuzz configuration not found for college ID: ${colid}`);

    const handler = new EasebuzzPaymentHandler({
      key: config.merchantid,
      salt: config.salt,
      env: config.environment
    });

    // 2. Generate local order ID
    const orderid = `EBZ_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const txnid = orderid;

    // 3. Prepare Easebuzz Params
    // Sanitize phone: ensure it is 10 digits
    const sanitizedPhone = (phone || '').toString().replace(/\D/g, '').slice(-10);

    const easebuzzParams = {
      key: handler.key,
      txnid: txnid,
      amount: parseFloat(amount).toFixed(2),
      productinfo: paymentpurpose || 'General Payment',
      firstname: studentname,
      email: email,
      phone: sanitizedPhone,
      surl: `https://backend-suman.onrender.com/api/v2/easebuzz/callback`,
      furl: `https://backend-suman.onrender.com/api/v2/easebuzz/callback`,
      udf1: 'Easebuzz',
      udf2: accountno,
      udf3: ''
    };

    const hash = handler.generateHash(easebuzzParams);
    easebuzzParams.hash = hash;

    // console.log('--- Easebuzz Initiation Payload ---');
    // console.log(JSON.stringify({...easebuzzParams, salt: 'HIDDEN'}, null, 2));

    // 4. Create Universal History Record
    await universalpaymentgatewayds.create({
      name: studentname,
      user: req.body.user || 'STUDENT',
      colid,
      studentname,
      regno,
      studentemail: email,
      studentphone: phone,
      orderid,
      txnid,
      amount,
      gatewayname: 'Easebuzz',
      accountno,
      paymenttype,
      paymentpurpose,
      type,
      ledgerid,
      ledgerbalance,
      feegroup,
      feeitem,
      feecategory,
      semester,
      installment,
      academicyear,
      classdate,
      ledgerdetails,
      status: 'INITIATED',
      frontendcallbackurl: frontendcallbackurl // STORED IN DB
    });

    // 5. Call Easebuzz Initiate Link API
    const response = await fetch(handler.getInitiationUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(easebuzzParams).toString()
    });

    const result = await response.json();
    // console.log('--- Easebuzz Initiation Response ---');
    // console.log(JSON.stringify(result, null, 2));

    if (result.status === 1) {

      res.status(200).json({
        success: true,
        data: {
          orderid,
          paymenturl: `${handler.baseUrl}pay/${result.data}`
        }
      });
    } else {
      throw new Error(`Easebuzz Initiation Failed: ${result.data}`);
    }

  } catch (err) {
    console.error('Easebuzz Initiation Error:', err);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * @desc    Easebuzz Callback Handler
 * @route   POST /api/v2/easebuzz/callback
 */
exports.handleEasebuzzCallback = async (req, res) => {
  try {
    const params = req.body;
    const { txnid, status, udf3 } = params;

    // 1. Find the transaction in Universal History
    const history = await universalpaymentgatewayds.findOne({ txnid });
    if (!history) throw new Error('Transaction not found');

    // 2. Fetch Credentials for hash verification based on colid in history
    const config = await easebuzzgatewayds.findOne({ colid: history.colid });
    if (!config) throw new Error('Easebuzz configuration not found for verification');

    const handler = new EasebuzzPaymentHandler({
      key: config.merchantid,
      salt: config.salt,
      env: config.environment
    });

    // 3. Verify Hash
    if (!handler.verifyResponseHash(params)) {
      throw new Error('Hash verification failed');
    }

    // 4. Update Universal History
    history.status = (status === 'success') ? 'SUCCESS' : 'FAILED';
    history.gatewayresponse = params;
    history.completedat = new Date();
    await history.save();

    // 5. Redirect back to frontend (Using stored URL from DB)
    const frontendUrl = history.frontendcallbackurl || `${process.env.FRONTEND_URL}/payment-status`;
    const redirectUrl = `${frontendUrl}?txnid=${txnid}&status=${history.status}`;

    res.redirect(redirectUrl);

  } catch (err) {
    console.error('Easebuzz Callback Error:', err);
    res.redirect(`${process.env.FRONTEND_URL}/payment-error?message=${encodeURIComponent(err.message)}`);
  }
};
