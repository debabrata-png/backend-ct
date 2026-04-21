const Invoice = require('./../Models/pinvoice');
const Payment = require('./../Models/ppayment');

exports.financeAging = async (req, res) => {

    const invoices = await Invoice.find({ colid: req.query.colid })
      .populate({
        path: 'poid',
        populate: { path: 'vendorid' }
      });
  
    const payments = await Payment.find({ colid: req.query.colid });
  
    const paymentMap = {};
    payments.forEach(p => {
      if (!paymentMap[p.invoiceid]) paymentMap[p.invoiceid] = 0;
      paymentMap[p.invoiceid] += p.amount;
    });
  
    const today = new Date();
  
    const buckets = {
      '0-30': 0,
      '31-60': 0,
      '61-90': 0,
      '90+': 0
    };
  
    const rows = invoices.map(inv => {
  
      const paid = paymentMap[inv._id] || 0;
      const outstanding = inv.totalamount - paid;
  
      const ageDays =
        (today - new Date(inv.invoicedate)) / (1000 * 60 * 60 * 24);
  
      let bucket = '0-30';
  
      if (ageDays > 90) bucket = '90+';
      else if (ageDays > 60) bucket = '61-90';
      else if (ageDays > 30) bucket = '31-60';
  
      if (outstanding > 0) {
        buckets[bucket] += outstanding;
      }
  
      return {
        vendor: inv.poid?.vendorid?.vendorname,
        invoice: inv.invoiceno,
        outstanding,
        ageDays: Math.floor(ageDays),
        bucket
      };
    });
  
    res.json({ buckets, rows });
  };

  exports.vendorLedger = async (req, res) => {

    const { vendor } = req.query;
  
    const invoices = await Invoice.find()
      .populate({
        path: 'poid',
        populate: { path: 'vendorid' }
      });
  
    const payments = await Payment.find();
  
    let ledger = [];
  
    invoices.forEach(inv => {
      if (inv.poid?.vendorid?.vendorname === vendor) {
        ledger.push({
          date: inv.invoicedate,
          type: 'INVOICE',
          ref: inv.invoiceno,
          debit: inv.totalamount,
          credit: 0
        });
      }
    });
  
    payments.forEach(p => {
      ledger.push({
        date: p.paymentdate,
        type: 'PAYMENT',
        ref: p.invoiceid,
        debit: 0,
        credit: p.amount
      });
    });
  
    ledger.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    /* RUNNING BALANCE */
    let balance = 0;
  
    ledger = ledger.map(l => {
      balance += l.debit - l.credit;
      return { ...l, balance };
    });
  
    res.json(ledger);
  };

  exports.overdueInvoices = async (req, res) => {

    const invoices = await Invoice.find({ colid: req.query.colid })
      .populate({
        path: 'poid',
        populate: { path: 'vendorid' }
      });
  
    const payments = await Payment.find({ colid: req.query.colid });
  
    const paymentMap = {};
    payments.forEach(p => {
      if (!paymentMap[p.invoiceid]) paymentMap[p.invoiceid] = 0;
      paymentMap[p.invoiceid] += p.amount;
    });
  
    const today = new Date();
  
    const overdue = invoices
      .map(inv => {
  
        const paid = paymentMap[inv._id] || 0;
        const outstanding = inv.totalamount - paid;
  
        const ageDays =
          (today - new Date(inv.invoicedate)) / (1000 * 60 * 60 * 24);
  
        return {
          vendor: inv.poid?.vendorid?.vendorname,
          invoice: inv.invoiceno,
          outstanding,
          ageDays: Math.floor(ageDays)
        };
  
      })
      .filter(i => i.outstanding > 0 && i.ageDays > 30);
  
    res.json(overdue);
  };

  /* ================= GET VENDORS ================= */
exports.getVendors = async (req, res) => {

    const invoices = await Invoice.find({ colid: req.query.colid })
      .populate({
        path: 'poid',
        populate: { path: 'vendorid' }
      });
  
    const vendorSet = new Set();
  
    invoices.forEach(inv => {
      if (inv.poid?.vendorid?.vendorname) {
        vendorSet.add(inv.poid.vendorid.vendorname);
      }
    });
  
    res.json(Array.from(vendorSet));
  };

  exports.vendorFinanceSummary = async (req, res) => {

    const { vendor, colid } = req.query;
  
    const invoices = await Invoice.find({ colid })
      .populate({
        path: 'poid',
        populate: { path: 'vendorid' }
      });
  
    const payments = await Payment.find({ colid });
  
    /* ===== FILTER INVOICES ===== */
    const vendorInvoices = invoices.filter(
      inv => inv.poid?.vendorid?.vendorname === vendor
    );
  
    /* ===== PAYMENT MAP ===== */
    const paymentMap = {};
    payments.forEach(p => {
      if (!paymentMap[p.invoiceid]) paymentMap[p.invoiceid] = 0;
      paymentMap[p.invoiceid] += p.amount;
    });
  
    const today = new Date();
  
    /* ===== AGING ===== */
    const buckets = {
      '0-30': 0,
      '31-60': 0,
      '61-90': 0,
      '90+': 0
    };
  
    let ledger = [];
    let overdue = [];
  
    vendorInvoices.forEach(inv => {
  
      const paid = paymentMap[inv._id] || 0;
      const outstanding = inv.totalamount - paid;
  
      const ageDays =
        (today - new Date(inv.invoicedate)) / (1000 * 60 * 60 * 24);
  
      let bucket = '0-30';
      if (ageDays > 90) bucket = '90+';
      else if (ageDays > 60) bucket = '61-90';
      else if (ageDays > 30) bucket = '31-60';
  
      if (outstanding > 0) {
        buckets[bucket] += outstanding;
      }
  
      /* ===== LEDGER ENTRY ===== */
      ledger.push({
        date: inv.invoicedate,
        type: 'INVOICE',
        ref: inv.invoiceno,
        debit: inv.totalamount,
        credit: 0
      });
  
      /* ===== OVERDUE ===== */
      if (outstanding > 0 && ageDays > 30) {
        overdue.push({
          invoice: inv.invoiceno,
          outstanding,
          ageDays: Math.floor(ageDays)
        });
      }
    });
  
    /* ===== PAYMENTS ===== */
    payments.forEach(p => {
      ledger.push({
        date: p.paymentdate,
        type: 'PAYMENT',
        ref: p.invoiceid,
        debit: 0,
        credit: p.amount
      });
    });
  
    /* ===== SORT + BALANCE ===== */
    ledger.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    let balance = 0;
    ledger = ledger.map(l => {
      balance += l.debit - l.credit;
      return { ...l, balance };
    });
  
    res.json({
      buckets,
      ledger,
      overdue
    });
  };