const Vendor = require('./../Models/pvendor');
const Category = require('./../Models/pcategory');

/* ================= GET CATEGORIES ================= */
exports.getCategories = async (req, res) => {
  const data = await Category.find({ colid: req.query.colid });
  res.json(data);
};

/* ================= CREATE VENDOR (ADMIN) ================= */
exports.vendorCreate = async (req, res) => {

  const existing = await Vendor.findOne({
    username: req.body.username
  });

  if (existing) {
    return res.status(400).json({ msg: 'Username already exists' });
  }

  const data = await Vendor.create(req.body);
  res.json(data);
};

/* ================= LOGIN ================= */
exports.vendorLogin = async (req, res) => {

  const vendor = await Vendor.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (!vendor) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  res.json(vendor);
};

/* ================= UPDATE PROFILE ================= */
exports.vendorUpdate = async (req, res) => {

  const data = await Vendor.findByIdAndUpdate(
    req.body._id,
    {
      ...req.body,
      profileCompleted: true
    },
    { new: true }
  );

  res.json(data);
};

/* ================= GET VENDORS ================= */
exports.vendorList = async (req, res) => {

    const data = await Vendor.find({ colid: req.query.colid })
      .populate('categoryid');
  
    res.json(data);
  };
  
  /* ================= DELETE ================= */
  exports.vendorDelete = async (req, res) => {
  
    await Vendor.findByIdAndDelete(req.params.id);
  
    res.json({ msg: 'Deleted' });
  };