const Invoice = require('./../Models/pinvoice');
const Payment = require('./../Models/ppayment');
const GRN = require('./../Models/pgrn');
const PO = require('./../Models/ppo');

/* ================= CREATE / UPDATE INVOICE ================= */
exports.invoiceSave = async (req, res) => {
  let inv;

  if (req.body._id) {
    inv = await Invoice.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
  } else {
    inv = await Invoice.create(req.body);
  }

  res.json(inv);
};

/* ================= GET INVOICE BY PO ================= */
exports.invoiceByPO = async (req, res) => {
  const data = await Invoice.find({ poid: req.query.poid });
  res.json(data);
};

/* ================= VERIFY AGAINST GRN ================= */
exports.verifyInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  console.log(invoice);

  const grns = await GRN.find({ poid: invoice.poid });

  console.log(grns);

  const grnMap = {};
  grns.forEach(g => {

    g.items.forEach(i => {
        console.log(i);
      if (!grnMap[i.itemname]) grnMap[i.itemname] = 0;
      grnMap[i.itemname] += i.receivedqty;
    });
  });

  let valid = true;

  invoice.items.forEach(i => {
    if ((grnMap[i.itemname] || 0) < i.qty) {
      valid = false;
    }
  });

  invoice.grnverified = valid;
  invoice.status = valid ? 'VERIFIED' : 'INVALID';

  await invoice.save();

  res.json({ valid });
};

/* ================= ADD PAYMENT ================= */
exports.addPayment = async (req, res) => {
  const payment = await Payment.create(req.body);

  const payments = await Payment.find({
    invoiceid: req.body.invoiceid
  });

  const totalPaid = payments.reduce(
    (a, b) => a + b.amount,
    0
  );

  const invoice = await Invoice.findById(req.body.invoiceid);

  if (totalPaid >= invoice.totalamount) {
    invoice.status = 'PAID';
  } else {
    invoice.status = 'PARTIAL_PAID';
  }

  await invoice.save();

  res.json(payment);
};

/* ================= GET PAYMENTS ================= */
exports.paymentByInvoice = async (req, res) => {
  const data = await Payment.find({
    invoiceid: req.query.invoiceid
  });

  res.json(data);
};

/* ================= GET PO ITEMS ================= */
exports.poItems = async (req, res) => {
    const po = await PO.findById(req.query.poid);
  
    if (!po) return res.json([]);
  
    res.json(po.items);
  };