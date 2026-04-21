const Store = require('./../Models/pstore');
const Category = require('./../Models/pcategory');
const Stock = require('./../Models/pstock');

exports.indCreateStore = async (req, res) => {
  const data = await Store.create(req.body);
  res.json(data);
};

exports.indGetStores = async (req, res) => {
  const data = await Store.find({ colid: req.query.colid });
  res.json(data);
};

exports.indUpdateStore = async (req, res) => {
  const data = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.indDeleteStore = async (req, res) => {
  await Store.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};



exports.indCreateCategory = async (req, res) => {
  const data = await Category.create(req.body);
  res.json(data);
};

exports.indGetCategories = async (req, res) => {
  const data = await Category.find({ colid: req.query.colid });
  res.json(data);
};

exports.indUpdateCategory = async (req, res) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.indDeleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};



exports.indCreateStock = async (req, res) => {
  const data = await Stock.create(req.body);
  res.json(data);
};

// exports.indGetStock = async (req, res) => {
//   const data = await Stock.find({ colid: req.query.colid })
//     .populate('storeid')
//     .populate('categoryid');

//   res.json(data);
// };

exports.indGetStock = async (req, res) => {
    const { colid, storeid, categoryid } = req.query;
  
    let filter = { colid };
  
    if (storeid) filter.storeid = storeid;
    if (categoryid) filter.categoryid = categoryid;
  
    const data = await Stock.find(filter)
      .populate('storeid')
      .populate('categoryid');
  
    res.json(data);
  };

exports.indUpdateStock = async (req, res) => {
  const data = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.indDeleteStock = async (req, res) => {
  await Stock.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};