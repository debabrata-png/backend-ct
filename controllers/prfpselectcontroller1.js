const RFP = require('./../Models/prfp');
const Indent = require('./../Models/pindent');

exports.vrfpGetApprovedIndentsByCategory = async (req, res) => {
  try {
    const data = await Indent.find({
      colid: req.query.colid,
      categoryid: req.query.categoryid,
      status: 'APPROVED'
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'Error loading indents' });
  }
};

exports.vrfpCreate = async (req, res) => {
  try {
    const data = await RFP.create({
      colid: req.body.colid,
      storeid: req.body.storeid,
      categoryid: req.body.categoryid,

      title: req.body.title,
      expirydate: req.body.expirydate,
      prequalification: req.body.prequalification,

      creatorname: req.body.creatorname,
      creatoremail: req.body.creatoremail,

      terms: req.body.terms,
      costterms: req.body.costterms,
      deliveryterms: req.body.deliveryterms,
      paymentterms: req.body.paymentterms,

      items: req.body.items.map(i => ({
        indentid: i.indentid,
        itemname: i.itemname,
        quantity: i.quantity,
        description: i.description
      })),

      status: 'OPEN'
    });

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating RFP' });
  }
};