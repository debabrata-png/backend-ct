const Invoice = require('./../Models/pinvoice');
const Payment = require('./../Models/ppayment');
const PO = require('./../Models/ppo');

/* ================= FINANCE DASHBOARD ================= */
exports.financeDashboard = async (req, res) => {

  const invoices = await Invoice.find({ colid: req.query.colid })
    .populate({
      path: 'poid',
      populate: { path: 'vendorid' }
    });

  const payments = await Payment.find({ colid: req.query.colid });

  /* ===== PAYMENT MAP ===== */
  const paymentMap = {};
  payments.forEach(p => {
    if (!paymentMap[p.invoiceid]) paymentMap[p.invoiceid] = 0;
    paymentMap[p.invoiceid] += p.amount;
  });

  let totalInvoice = 0;
  let totalPaid = 0;

  const rows = invoices.map(inv => {
    const paid = paymentMap[inv._id] || 0;
    const outstanding = inv.totalamount - paid;

    totalInvoice += inv.totalamount;
    totalPaid += paid;

    return {
      invoiceid: inv._id,
      vendor: inv.poid?.vendorid?.vendorname,
      poid: inv.poid?._id,
      total: inv.totalamount,
      paid,
      outstanding,
      status: inv.status
    };
  });

  /* ===== VENDOR SUMMARY ===== */
  const vendorMap = {};
  rows.forEach(r => {
    if (!vendorMap[r.vendor]) {
      vendorMap[r.vendor] = 0;
    }
    vendorMap[r.vendor] += r.outstanding;
  });

  const vendorSummary = Object.keys(vendorMap).map(v => ({
    vendor: v,
    outstanding: vendorMap[v]
  }));

  res.json({
    totalInvoice,
    totalPaid,
    totalOutstanding: totalInvoice - totalPaid,
    rows,
    vendorSummary
  });
};