const FeeApprovalRole = require("../Models/feeapprovalrole");

exports.getFeeApprovalRoles = async (req, res) => {
  try {
    const filter = {};
    if (req.query.colid) filter.colid = Number(req.query.colid);

    const data = await FeeApprovalRole.find(filter).sort({ level: 1, role: 1 });
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.createFeeApprovalRole = async (req, res) => {
  try {
    const data = await FeeApprovalRole.create(req.body);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateFeeApprovalRole = async (req, res) => {
  try {
    const data = await FeeApprovalRole.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!data) return res.status(404).json({ status: "fail", message: "Role not found" });
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteFeeApprovalRole = async (req, res) => {
  try {
    await FeeApprovalRole.findByIdAndDelete(req.body.id);
    res.json({ status: "success", message: "Deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
