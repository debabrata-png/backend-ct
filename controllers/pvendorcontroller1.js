const Vendor = require('./../Models/pvendor');

/* ================= LOGIN ================= */
exports.vendorLogin = async (req, res) => {

  const vendor = await Vendor.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (!vendor) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  res.json({
    _id: vendor._id,
    vendorname: vendor.vendorname
  });
};


/* ================= GET PROFILE ================= */
exports.vendorGetProfile = async (req, res) => {

    console.log(req.query);
  const data = await Vendor.findById(req.query.id);
  console.log(data);

  if (!data) {
    return res.status(404).json({ msg: 'Vendor not found' });
  }

  res.json(data);
};


/* ================= UPDATE PROFILE ================= */
exports.vendorUpdateProfile = async (req, res) => {

  const data = await Vendor.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true }
  );

  res.json(data);
};