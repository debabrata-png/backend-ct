const FinalPrice = require('./../Models/pfinalprice');
const Vendor = require('./../Models/prfpvendor');
const RFP = require('./../Models/prfp');

/* ================= FINAL PRICE COMPARISON ================= */
exports.finalPriceComparison = async (req, res) => {
  const { rfpid } = req.query;

  const finalPrices = await FinalPrice.find({ rfpid });
  const vendors = await Vendor.find({ rfpid });
  const rfp = await RFP.findById(rfpid);

  if (!rfp) return res.json([]);

  const items = rfp.items.map(i => i.itemname);

  const result = items.map(item => {
    const row = {
      itemname: item
    };

    finalPrices.forEach(fp => {
      const vendor = vendors.find(v => v._id.toString() === fp.vendorid.toString());
      const found = fp.items.find(i => i.itemname === item);

      if (vendor && found) {
        row[vendor.vendorname] = found.finalprice;
      }
    });

    return row;
  });

  res.json({
    vendors: vendors.map(v => v.vendorname),
    data: result
  });
};