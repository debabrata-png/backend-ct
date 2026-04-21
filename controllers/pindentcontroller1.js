const Indent = require('./../Models/pindent');
const RFP = require('./../Models/prfp');

/* ================= GET APPROVED INDENTS ================= */
exports.getApprovedIndentsByCategory = async (req, res) => {

  try {
    const { colid, categoryid } = req.query;

    const data = await Indent.find({
      colid,
      categoryid,
      status: 'APPROVED'
    })
    .populate('storeid')
    .populate('categoryid');

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading indents' });
  }
};


/* ================= CREATE RFP ================= */
exports.createRFPFromIndent = async (req, res) => {

  try {

    const { colid, storeid, categoryid, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: 'No items selected' });
    }

    const rfp = await RFP.create({
      colid,
      storeid,
      categoryid,
      items,
      status: 'OPEN'
    });

    /* OPTIONAL: update indent status */
    const indentIds = items.map(i => i.indentid);

    await Indent.updateMany(
      { _id: { $in: indentIds } },
      { status: 'RFP_CREATED' }
    );

    res.json(rfp);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating RFP' });
  }
};