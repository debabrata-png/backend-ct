const StudentLedgerApprovalRole = require("../Models/studentledgerapprovalrole");

exports.getStudentLedgerApprovalRoles = async (req, res) => {
  try {
    const filter = {};
    if (req.query.colid) filter.colid = Number(req.query.colid);

    const data = await StudentLedgerApprovalRole.find(filter).sort({ level: 1, role: 1 });
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.createStudentLedgerApprovalRole = async (req, res) => {
  try {
    const data = await StudentLedgerApprovalRole.create(req.body);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateStudentLedgerApprovalRole = async (req, res) => {
  try {
    const data = await StudentLedgerApprovalRole.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!data) return res.status(404).json({ status: "fail", message: "Role not found" });
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteStudentLedgerApprovalRole = async (req, res) => {
  try {
    await StudentLedgerApprovalRole.findByIdAndDelete(req.body.id);
    res.json({ status: "success", message: "Deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
