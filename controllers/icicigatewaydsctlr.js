const icicigatewayds = require('../Models/icicigatewayds');
const universalpaymentgatewayds = require('../Models/universalpaymentgatewayds');
const ICICIPaymentHandler = require('../utils/icicigatewayhandler');
const { updateLedgerAfterPayment } = require('../utils/paymentledgerupdater');

const buildHandler = (config) => new ICICIPaymentHandler({
  merchantId: config.merchantid,
  aggregatorId: config.aggregatorid,
  secretKey: config.secretkey,
  env: config.environment,
  saleUrl: config.saleurl,
  commandUrl: config.commandurl,
  settlementUrl: config.settlementurl
});

const normalizeStatus = (params) => {
  const responseCode = (params.responseCode || params.txnResponseCode || '').toString();
  const txnStatus = (params.txnStatus || '').toString().toUpperCase();

  if (responseCode === '000' || responseCode === '0000' || responseCode === '0000/000' || txnStatus === 'SUC') {
    return 'SUCCESS';
  }

  if (responseCode || txnStatus) {
    return 'FAILED';
  }

  return 'PENDING';
};

exports.createICICIConfig = async (req, res) => {
  try {
    const config = await icicigatewayds.create(req.body);
    res.status(201).json({ success: true, data: config });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getICICIConfig = async (req, res) => {
  try {
    const { colid } = req.body;
    const config = await icicigatewayds.findOne({ colid, isactive: true });
    if (!config) {
      return res.status(404).json({ success: false, message: 'Configuration not found' });
    }
    res.status(200).json({ success: true, data: config });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateICICIConfig = async (req, res) => {
  try {
    const { id } = req.query;
    const config = await icicigatewayds.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: config });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.initiateICICIPayment = async (req, res) => {
  try {
    const {
      colid,
      studentname: _studentname,
      studentName: _studentName,
      regno,
      amount,
      accountno,
      paymenttype: _paymenttype,
      paymentType: _paymentType,
      paymentpurpose: _paymentpurpose,
      paymentPurpose: _paymentPurpose,
      email: _email,
      studentemail: _studentemail,
      phone: _phone,
      studentphone: _studentphone,
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

    const resolvedStudentName = _studentname || _studentName || 'Student';
    const resolvedEmail = _email || _studentemail || 'no-email@provided.com';
    const resolvedPhone = _phone || _studentphone || '9999999999';
    const resolvedPaymentType = _paymenttype || _paymentType || 'Fee';
    const resolvedPaymentPurpose = _paymentpurpose || _paymentPurpose || 'Fee Payment';

    if (!colid) throw new Error('colid is required');
    if (!amount) throw new Error('amount is required');

    const config = await icicigatewayds.findOne({ colid, isactive: true });
    if (!config) throw new Error(`ICICI configuration not found for college ID: ${colid}`);

    const handler = buildHandler(config);
    const merchantTxnNo = `ICI${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(0, 20);
    const returnURL = `${process.env.BACKEND_URL || 'https://backend-suman.onrender.com'}/api/v2/icicigatewayds/callback`;

    const result = await handler.initiateSale({
      merchantTxnNo,
      amount,
      returnURL,
      customerEmailID: _email,
      customerMobileNo: _phone,
      customerName: resolvedStudentName,
      addlParam1: accountno || '',
      addlParam2: regno || ''
    });

    const paymenturl = handler.getAuthRedirectUrl(result.response);

    await universalpaymentgatewayds.create({
      name: resolvedStudentName || 'ICICI Payment',
      user: req.body.user || 'STUDENT',
      colid,
      studentname: resolvedStudentName,
      regno: regno || merchantTxnNo,
      studentemail: resolvedEmail,
      studentphone: resolvedPhone,
      orderid: merchantTxnNo,
      txnid: merchantTxnNo,
      amount,
      gatewayname: 'ICICI',
      accountno,
      paymenttype: resolvedPaymentType,
      paymentpurpose: resolvedPaymentPurpose,
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
      gatewayresponse: {
        initiateRequest: result.request,
        initiateResponse: result.response
      },
      frontendcallbackurl
    });

    res.status(200).json({
      success: true,
      data: {
        orderid: merchantTxnNo,
        merchantTxnNo,
        paymenturl,
        redirectURI: result.response.redirectURI,
        tranCtx: result.response.tranCtx,
        response: result.response
      }
    });
  } catch (err) {
    console.error('ICICI Initiation Error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.handleICICICallback = async (req, res) => {
  try {
    const params = { ...req.body };
    const merchantTxnNo = params.merchantTxnNo;
    if (!merchantTxnNo) throw new Error('merchantTxnNo missing in ICICI callback');

    const history = await universalpaymentgatewayds.findOne({ orderid: merchantTxnNo });
    if (!history) throw new Error('Transaction not found');

    const config = await icicigatewayds.findOne({ colid: history.colid });
    if (!config) throw new Error('ICICI configuration not found for verification');

    const handler = buildHandler(config);
    if (!handler.verifySecureHash(params)) {
      throw new Error('ICICI secure hash verification failed');
    }

    history.status = normalizeStatus(params);
    history.txnid = params.txnID || params.paymentID || merchantTxnNo;
    history.gatewayresponse = {
      ...(history.gatewayresponse || {}),
      callbackResponse: params
    };
    history.completedat = new Date();
    await history.save();

    // Update student ledger if payment was successful and type is Student
    if (history.status === 'SUCCESS' && history.type === 'Student' && history.ledgerid) {
      await updateLedgerAfterPayment({
        ledgerid: history.ledgerid,
        amount: history.amount,
        gatewayname: 'ICICI'
      });
    }

    const frontendUrl = history.frontendcallbackurl || `${process.env.FRONTEND_URL}/universalpaymentcallbackds`;
    const redirectUrl = `${frontendUrl}?orderid=${merchantTxnNo}&txnid=${history.txnid}&status=${history.status}&msg=${encodeURIComponent(params.respDescription || params.respdescription || '')}`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.error('ICICI Callback Error:', err);
    const fallbackUrl = `${process.env.FRONTEND_URL}/payment-error?message=${encodeURIComponent(err.message)}`;
    res.redirect(fallbackUrl);
  }
};

exports.checkICICIStatus = async (req, res) => {
  try {
    const { merchantTxnNo, originalTxnNo, colid } = req.body;
    if (!merchantTxnNo) throw new Error('merchantTxnNo is required');

    const config = await icicigatewayds.findOne({ colid, isactive: true });
    if (!config) throw new Error('ICICI configuration not found');

    const handler = buildHandler(config);
    const result = await handler.checkStatus(merchantTxnNo, originalTxnNo);

    const history = await universalpaymentgatewayds.findOne({ orderid: merchantTxnNo });
    if (history) {
      history.status = normalizeStatus(result.response);
      history.txnid = result.response.txnID || history.txnid;
      history.gatewayresponse = {
        ...(history.gatewayresponse || {}),
        statusRequest: result.request,
        statusResponse: result.response
      };
      await history.save();
    }

    res.status(200).json({ success: true, data: result.response });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.refundICICIPayment = async (req, res) => {
  try {
    const { colid, merchantTxnNo, originalTxnNo, amount, addlParam1 } = req.body;
    if (!merchantTxnNo || !originalTxnNo || !amount) {
      throw new Error('merchantTxnNo, originalTxnNo and amount are required');
    }

    const config = await icicigatewayds.findOne({ colid, isactive: true });
    if (!config) throw new Error('ICICI configuration not found');

    const handler = buildHandler(config);
    const result = await handler.refund({ merchantTxnNo, originalTxnNo, amount, addlParam1 });
    res.status(200).json({ success: true, data: result.response });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
