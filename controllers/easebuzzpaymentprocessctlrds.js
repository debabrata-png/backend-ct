const EasebuzzGateway = require("../Models/easebuzzgatewayds");
const EasebuzzPayment = require("../Models/easebuzzpaymentds");
const AdmissionApplication = require("../Models/admissionapplicationdynamic");
const EasebuzzPaymentHandler = require("../utils/easebuzzgatewayhandler");

function text(value) {
  return String(value || "").trim();
}

function amount(value) {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function regex(value) {
  return { $regex: text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
}

function fallbackCallbackUrl(req) {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${protocol}://${host}/api/v2/easebuzzpayment/callback`;
}

function callbackRedirectUrl(config) {
  const configured = text(config?.returnurl);
  if (configured && !configured.includes("/api/v2/easebuzzpayment/callback")) return configured;
  return process.env.FRONTEND_URL || "/";
}

function queryFrom(source = {}) {
  const query = { colid: Number(source.colid) };
  ["type", "status", "regno", "refno"].forEach((field) => {
    if (text(source[field])) query[field] = text(source[field]);
  });
  ["student", "feeitem"].forEach((field) => {
    if (text(source[field])) query[field] = regex(source[field]);
  });
  return query;
}

function isProvisionalAdmissionPayment(source = {}) {
  const paymentFor = text(source.paymentfor).toLowerCase();
  const feeItem = text(source.feeitem).toLowerCase();
  return paymentFor.includes("provisional") || feeItem.includes("provisional");
}

exports.initiateEasebuzzPayment = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const paidAmount = amount(req.body.amount);
    const requestedType = text(req.body.type);
    const paymentType = requestedType === "Event" ? "Event" : requestedType === "Admission" ? "Admission" : "Student";
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!text(req.body.student) || !text(req.body.regno) || !text(req.body.feeitem) || paidAmount <= 0) {
      return res.status(400).json({ success: false, message: "Student, regno, fee item and amount are required" });
    }

    const config = await EasebuzzGateway.findOne({ colid, isactive: true }).sort({ updatedAt: -1 }).lean();
    if (!config) return res.status(404).json({ success: false, message: "Active Easebuzz configuration not found" });

    const handler = new EasebuzzPaymentHandler({
      key: config.merchantid,
      salt: config.salt,
      env: config.environment
    });
    const refno = `EBZ_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const email = text(req.body.email) || "payment@example.com";
    const phone = text(req.body.phone).replace(/\D/g, "").slice(-10) || "9999999999";
    const callbackUrl = text(config.returnurl) || fallbackCallbackUrl(req);

    const payment = await EasebuzzPayment.create({
      name: text(req.body.name),
      user: text(req.body.user),
      colid,
      student: text(req.body.student),
      regno: text(req.body.regno),
      feeitem: text(req.body.feeitem),
      amount: paidAmount,
      type: paymentType,
      paymentfor: text(req.body.paymentfor),
      applicationid: text(req.body.applicationid),
      refno,
      description: text(req.body.description),
      email,
      phone,
      status: "INITIATED"
    });

    const easebuzzParams = {
      key: handler.key,
      txnid: refno,
      amount: paidAmount.toFixed(2),
      productinfo: text(req.body.feeitem),
      firstname: text(req.body.student),
      email,
      phone,
      surl: callbackUrl,
      furl: callbackUrl,
      udf1: paymentType,
      udf2: text(req.body.regno),
      udf3: String(payment._id),
      udf4: text(req.body.description),
      udf5: text(req.body.applicationid)
    };
    easebuzzParams.hash = handler.generateHash(easebuzzParams);

    const response = await fetch(handler.getInitiationUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(easebuzzParams).toString()
    });
    const result = await response.json();

    if (result.status !== 1) {
      payment.status = "INITIATION_FAILED";
      payment.gatewayresponse = result;
      await payment.save();
      return res.status(400).json({ success: false, message: `Easebuzz initiation failed: ${result.data || "Unknown error"}` });
    }

    payment.gatewayresponse = { initiation: result };
    await payment.save();

    if (paymentType === "Admission" && text(req.body.applicationid)) {
      const provisionalPayment = isProvisionalAdmissionPayment(req.body);
      const updatePayload = provisionalPayment
        ? {
            provisionalfeeamount: paidAmount,
            provisionalpaymentstatus: "INITIATED",
            provisionalpaymentrefno: refno,
            provisionalpaymentdetails: { initiation: result }
          }
        : {
            applicationfeeamount: paidAmount,
            paymentstatus: "INITIATED",
            paymentrefno: refno,
            paymentdetails: { initiation: result }
          };
      await AdmissionApplication.findOneAndUpdate(
        { _id: text(req.body.applicationid), colid },
        updatePayload,
        { new: true }
      );
    }

    res.json({
      success: true,
      data: {
        payment,
        refno,
        paymenturl: `${handler.baseUrl}pay/${result.data}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.handleEasebuzzPaymentCallback = async (req, res) => {
  try {
    const params = { ...req.body, ...req.query };
    const refno = text(params.txnid);
    const payment = await EasebuzzPayment.findOne({ refno });
    if (!payment) throw new Error("Payment record not found");

    const config = await EasebuzzGateway.findOne({ colid: payment.colid }).sort({ isactive: -1, updatedAt: -1 }).lean();
    if (!config) throw new Error("Easebuzz configuration not found");

    const handler = new EasebuzzPaymentHandler({
      key: config.merchantid,
      salt: config.salt,
      env: config.environment
    });
    if (!handler.verifyResponseHash(params)) {
      throw new Error("Hash verification failed");
    }

    const isSuccess = text(params.status).toLowerCase() === "success";
    payment.status = isSuccess ? "SUCCESS" : "FAILED";
    payment.paiddate = isSuccess ? new Date() : payment.paiddate;
    payment.paidamount = isSuccess ? amount(params.amount) : 0;
    payment.gatewayresponse = params;
    await payment.save();

    if (payment.type === "Admission" && payment.applicationid) {
      const provisionalPayment = isProvisionalAdmissionPayment(payment);
      const updatePayload = provisionalPayment
        ? {
            provisionalpaymentstatus: payment.status,
            provisionalpaymentrefno: payment.refno,
            provisionalpaiddate: payment.paiddate,
            provisionalpaidamount: payment.paidamount,
            provisionalpaymentdetails: params,
            applicationstatus: isSuccess ? "Applied" : "Payment Failed"
          }
        : {
            paymentstatus: payment.status,
            paymentrefno: payment.refno,
            paiddate: payment.paiddate,
            paidamount: payment.paidamount,
            paymentdetails: params,
            applicationstatus: isSuccess ? "Applied" : "Payment Failed"
          };
      await AdmissionApplication.findOneAndUpdate(
        { _id: payment.applicationid, colid: payment.colid },
        updatePayload,
        { new: true }
      );
    }

    const redirectBase = callbackRedirectUrl(config);
    const joiner = redirectBase.includes("?") ? "&" : "?";
    res.redirect(`${redirectBase}${joiner}refno=${encodeURIComponent(refno)}&status=${encodeURIComponent(payment.status)}`);
  } catch (error) {
    const fallback = process.env.FRONTEND_URL || "/";
    const joiner = fallback.includes("?") ? "&" : "?";
    res.redirect(`${fallback}${joiner}paymentError=${encodeURIComponent(error.message)}`);
  }
};

exports.getEasebuzzPayments = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await EasebuzzPayment.find(queryFrom(req.query)).sort({ initiationdate: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
