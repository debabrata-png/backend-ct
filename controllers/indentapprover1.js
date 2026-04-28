const Indent = require('./../Models/pindent');
const Budget = require('./../Models/pbudget');

exports.vindentGetWithBudget = async (req, res) => {

  try {

    const indents = await Indent.find({
      colid: req.query.colid,
      status: req.query.status
    });

    const result = [];

    for (let ind of indents) {

      const budget = await Budget.findOne({
        colid: ind.colid,
        categoryid: ind.categoryid,
        itemname: ind.itemname
      });

      const quantityremaining = budget?.quantityremaining || 0;

      /* 🔥 NEW FIELD */
      const availableqty = (ind.quantity || 0) + quantityremaining;

      result.push({
        ...ind._doc,

        quantityremaining,   // optional keep
        priceremaining: budget?.priceremaining || 0,

        availableqty         // ✅ THIS IS WHAT YOU SHOW
      });
    }

    res.json(result);

  } catch (e) {
    res.status(500).json({ msg: 'Error loading indents' });
  }
};