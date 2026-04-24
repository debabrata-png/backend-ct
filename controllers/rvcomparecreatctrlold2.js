const PO = require('./../Models/ppo');
const VendorSubmission = require('./../Models/prfpvendor');
const RFP = require('./../Models/prfp');

const Budget = require('./../Models/pbudget');


function calculatePOTotal({ items, transport, loadingfees, pandffees, gst }) {

  //console.log(items);


  const itemTotal = items.reduce(
    (sum, i) => sum + (i.price * i.quantity),
    0
  );

  const gst1=gst/100;

  const gstAmount = (itemTotal * (gst || 0)) / 100;
  // const gstAmount = itemTotal * gst1;

const finalTotal =
  itemTotal +
  gstAmount +
  (transport || 0) +
  (loadingfees || 0) +
  (pandffees || 0);

  //console.log(itemTotal + ',' + gstAmount + ',' + finalTotal);

  // const finalTotal =
  //   itemTotal +
  //   (transport || 0) +
  //   (loadingfees || 0) +
  //   (pandffees || 0) +
  //   (gst || 0);

  return finalTotal;
}

/* 🔥 UPDATE PRICE REMAINING */
async function updateBudgetPrice({ colid, categoryid, item, amount }) {

  const budget = await Budget.findOne({
    colid,
    categoryid,
    item
  });

  console.log(budget);

  if (!budget) {
    throw new Error('Budget not found for category');
  }

  const remaining = budget.priceremaining || 0;

  var balance=0;

  /* ❌ prevent overspend */
  if (remaining < amount) {
    // throw new Error(
    //   `Insufficient budget. Remaining: ${remaining}, Required: ${amount}`
    // );
    balance=0;
  } else {
    balance=remaining-amount;
  }

  /* ✅ deduct */
  // budget.priceremaining = remaining - amount;
  budget.priceremaining = balance;

  await budget.save();
}

exports.vcomparisonCreatePO = async (req, res) => {

  try {

    const { rfpid, vendor, colid } = req.body;

    const rfp = await RFP.findById(rfpid);

    const po = await PO.create({
      colid: colid,
      rfpid,
      categoryid: rfp.categoryid,
      vendorid: vendor.vendorid,
      vendorname: vendor.vendorname,

      items: vendor.items,
      total: vendor.total,
      status: 'REGISTRAR_PENDING'
    });

    //console.log(po);

//     await updateBudgetPrice({
//   colid: colid,
//   categoryid: rfp.categoryid,
//   amount: po.total
// });

    res.json(po);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating PO' });
  }
};


exports.vcomparisonGetFull = async (req, res) => {

  try {

    const { rfpid } = req.query;

    const submissions = await VendorSubmission.find({ rfpid });

    const rfp = await RFP.findById(rfpid);

    res.json({
      submissions,
      rfp
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading comparison' });
  }
};

exports.vcomparisonCreatePOPerItem = async (req, res) => {

  try {

    const { rfpid, item, vendor, colid } = req.body;

    if (!rfpid || !item || !vendor) {
      return res.status(400).json({ msg: 'Missing data' });
    }

     const rfp = await RFP.findById(rfpid);

     var total1=item.quantity + item.price + vendor.transport + vendor.loadingfees + vendor.pandffees;
     var gst=(100 + vendor.gst)/100;
     var total2=total1 * gst;



    /* 🔥 CREATE ONE PO PER ITEM */
    const po = await PO.create({

      colid: colid,

      rfpid,

      categoryid: rfp.categoryid,

      

      vendorid: vendor.vendorid,
      vendorname: vendor.vendorname,

      items: [
        {
          itemname: item.itemname,
          quantity: item.quantity,
          price: item.price,
          description: item.description
        }
      ],

      transport: vendor.transport,
      loadingfees: vendor.loadingfees,
      pandffees: vendor.pandffees,
      gst: vendor.gst,
      // total: vendor.total,
      total: total2,
      remark: vendor.remark,

      status: 'REGISTRAR_PENDING'
    });

    await updateBudgetPrice({
  colid: colid,
  categoryid: rfp.categoryid,
  item:item.itemname,
  amount: po.total
});

    //console.log(po);

    res.json(po);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating PO' });
  }
};

/* ================= GET CREATED PO ================= */
exports.vpoGet = async (req, res) => {

  const data = await PO.find({ rfpid: req.query.rfpid });

  res.json(data);
};


/* ================= RFP LIST ================= */
exports.vrfpGet = async (req, res) => {

  const data = await RFP.find({ colid: req.query.colid });

  res.json(data);
};


exports.vcomparisonCreateAllL1PO = async (req, res) => {

  try {

    const { rfpid, items, colid } = req.body;

    let created = [];

    const rfp = await RFP.findById(rfpid);

    for (let row of items) {

      const vendor = row.vendorPrices[row.selectedVendor];

      const items = [{
  itemname: row.itemname,
  quantity: row.quantity,
  price: vendor.price,
  description: row.description
}];

const total = calculatePOTotal({
  items,
  transport: vendor.transport,
  loadingfees: vendor.loadingfees,
  pandffees: vendor.pandffees,
  gst: vendor.gst
});

      const po = await PO.create({

        colid: colid,

        rfpid,

         categoryid: rfp.categoryid,

        vendorid: vendor.vendorid,
        vendorname: vendor.vendorname,

        items,

        // items: [
        //   {
        //     itemname: row.itemname,
        //     quantity: row.quantity,
        //     price: vendor.price,
        //     description: row.description
        //   }
        // ],

        transport: vendor.transport,
        loadingfees: vendor.loadingfees,
        pandffees: vendor.pandffees,
        gst: vendor.gst,
        // total: vendor.total,
        total,
        remark: vendor.remark,

        status: 'REGISTRAR_PENDING'
      });

      const itemTotal = po.items.reduce(
  (sum, i) => sum + (i.price * i.quantity),
  0
);

const finalTotal =
  itemTotal +
  (po.transport || 0) +
  (po.loadingfees || 0) +
  (po.pandffees || 0) +
  (po.gst || 0);

//       await updateBudgetPrice({
//   colid: colid,
//   categoryid: rfp.categoryid,
//   amount: total
// });

      //console.log(po);

      created.push(po);
    }

    res.json({ msg: 'All L1 POs created', created });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating L1 POs' });
  }
};

exports.vcomparisonCreateVendorGroupedPO = async (req, res) => {

  try {

    const { rfpid, items, colid } = req.body;

    const rfp = await RFP.findById(rfpid);

    let vendorMap = {};

    /* GROUP ITEMS BY SELECTED VENDOR */
    items.forEach(row => {

      const v = row.vendorPrices[row.selectedVendor];

      if (!vendorMap[v.vendorid]) {

        vendorMap[v.vendorid] = {
          vendorid: v.vendorid,
          vendorname: v.vendorname,
          transport: v.transport,
          loadingfees: v.loadingfees,
          pandffees: v.pandffees,
          gst: v.gst,
          total: v.total,
          remark: v.remark,
          items: []
        };
      }

      vendorMap[v.vendorid].items.push({
        itemname: row.itemname,
        quantity: row.quantity,
        price: v.price,
        description: row.description
      });

    });

    let created = [];

    /* CREATE ONE PO PER VENDOR */
    for (let key in vendorMap) {

      const v = vendorMap[key];

      const total = calculatePOTotal({
  items: v.items,
  transport: v.transport,
  loadingfees: v.loadingfees,
  pandffees: v.pandffees,
  gst: v.gst
});

      const po = await PO.create({
        colid: colid,
        rfpid,
        categoryid: rfp.categoryid,
        vendorid: v.vendorid,
        vendorname: v.vendorname,
        items: v.items,
        transport: v.transport,
        loadingfees: v.loadingfees,
        pandffees: v.pandffees,
        gst: v.gst,
        // total: v.total,
        total,
        remark: v.remark,
        status: 'REGISTRAR_PENDING'
      });

       const itemTotal = po.items.reduce(
  (sum, i) => sum + (i.price * i.quantity),
  0
);

const finalTotal =
  itemTotal +
  (po.transport || 0) +
  (po.loadingfees || 0) +
  (po.pandffees || 0) +
  (po.gst || 0);

//       await updateBudgetPrice({
//   colid: colid,
//   categoryid: rfp.categoryid,
//   amount: finalTotal
// });

      created.push(po);
    }

    res.json({ msg: 'Vendor grouped PO created', created });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating grouped PO' });
  }
};