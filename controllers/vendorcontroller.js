const Vendor = require('./../Models//prfpvendor');
const RFP = require('./../Models/prfp');

/* ================= VENDOR COMPARISON ================= */
exports.vendorComparison = async (req, res) => {
  const { rfpid } = req.query;

  const vendors = await Vendor.find({ rfpid });

  if (!vendors.length) return res.json([]);

  // Get all items from RFP
  const rfp = await RFP.findById(rfpid);

  const items = rfp.items.map(i => i.itemname);

  // Build comparison structure
  const comparison = items.map(item => {
    const row = {
      itemname: item,
      vendors: []
    };

    vendors.forEach(v => {
      const found = v.items.find(x => x.itemname === item);

      row.vendors.push({
        vendorname: v.vendorname,
        price: found ? found.price : null,
        technicaldetails: v.technicaldetails
      });
    });

    // 🔥 find lowest price (L1)
    const prices = row.vendors
      .filter(v => v.price !== null)
      .map(v => v.price);

    row.lowest = Math.min(...prices);

    return row;
  });

  res.json({
    vendors,
    comparison
  });
};