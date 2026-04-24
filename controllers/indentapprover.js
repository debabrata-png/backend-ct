const Indent = require('./../Models/pindent');
const Budget = require('./../Models/pbudget');

exports.vindentGetWithBudget = async (req, res) => {

  try {

    const indents = await Indent.find({
      colid: req.query.colid,
      status: req.query.status
    });

    /* 🔥 attach budget info */
    const result = [];

    for (let ind of indents) {

      const budget = await Budget.findOne({
        colid: ind.colid,
        categoryid: ind.categoryid,
        itemname: ind.itemname
      });

      result.push({
        ...ind._doc,

        quantityremaining: budget?.quantityremaining || 0,
        priceremaining: budget?.priceremaining || 0
      });
    }

    res.json(result);

  } catch (e) {
    res.status(500).json({ msg: 'Error loading indents' });
  }
};