const User = require('../Models/user');
const Leave = require('../Models/leaveapplication');
const LeaveBalance = require('../Models/leavebalance');
const LeaveApprover = require('../Models/leaveapprover');
const LeaveType = require('../Models/leavetype');

/* ---------- LEAVE TYPE ---------- */
exports.createleavetype = async (req, res) => {
  try {
    const lt = await LeaveType.create(req.body);
    res.status(201).json(lt);
  } catch (e) {
  }
};

exports.getleavetypes = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = isNaN(c) ? {} : { colid: c };
    const list = await LeaveType.find({ ...filter, isactive: true }).lean();
    res.json(list);
  } catch (e) {
  }
};

/* ---------- LEAVE BALANCE ---------- */
exports.createleavebalance = async (req, res) => {
  try {
    const { email, leaveType, year } = req.body;
    await LeaveBalance.findOneAndDelete({ email, leaveType, year });
    const bal = await LeaveBalance.create(req.body);
    res.status(201).json(bal);
  } catch (e) {
  }
};

exports.getleavebalances = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = {};
    if (req.query.email) filter.email = req.query.email;
    if (!isNaN(c)) filter.colid = c;
    const balances = await LeaveBalance.find(filter).lean();
    res.json(balances);
  } catch (e) {
  }
};

/* ---------- APPROVER ---------- */
exports.assignapprover = async (req, res) => {
  try {
    const { employeeemail, level } = req.body;
    await LeaveApprover.findOneAndDelete({ employeeemail, level });
    const approver = await LeaveApprover.create(req.body);
    res.status(201).json(approver);
  } catch (e) {
  }
};

exports.getapprovers = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = { employeeemail: req.query.employeeemail };
    if (!isNaN(c)) filter.colid = c;
    const chain = await LeaveApprover.find(filter).sort({ level: 1 }).lean();
    res.json(chain);
  } catch (e) {
  }
};

exports.getallapprovers = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    if (isNaN(c)) return res.status(400).json({ error: 'colid (number) required' });
    const approvers = await LeaveApprover.find({ colid: c }).lean().exec();
    res.json(approvers);
  } catch (e) {
  }
};

/* ---------- LEAVE APPLICATION ---------- */
exports.createleave = async (req, res) => {
  try {
    const { email, leavetype, from, to } = req.body;
    const days = Math.ceil((new Date(to) - new Date(from)) / 86400000) + 1;
    
    const bal = await LeaveBalance.findOne({ email, leaveType: leavetype });
    
    if (!bal) return res.status(400).json({ error: 'Balance not found' });
    if (bal.remaining < days) return res.status(400).json({ error: 'Insufficient balance' });

    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (e) {
  }
};

exports.getleaves = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = {};
    if (req.query.email) filter.email = req.query.email;
    if (!isNaN(c)) filter.colid = c;
    const leaves = await Leave.find(filter).sort({ createdAt: -1 }).lean();
    res.json(leaves);
  } catch (e) {
  }
};

exports.approverejectleave = async (req, res) => {
  try {
    const { approveremail, action, comment } = req.body;
    const leaveId = req.query.id;

    // Step 1: Fetch the leave
    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ error: 'Leave not found' });

    // Step 2: Validate current approver
    const chain = await LeaveApprover.find({ employeeemail: leave.email }).sort({ level: 1 });
    const approver = chain.find(c => c.level === leave.currentLevel);
    if (!approver || approver.approveremail !== approveremail) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Step 3: Build the approval record
    const approvalEntry = {
      level: leave.currentLevel,
      approvername: approver.approvername,
      approveremail,
      action,
      comment
    };

    // Step 4: Push approval and update status
    const update = {
      $push: { approvals: approvalEntry }
    };

    if (action === 'Rejected') {
      update.leavestatus = 'Rejected';
    } else {
      if (leave.currentLevel === 2) {
        update.leavestatus = 'Approved';

        // Update leave balance (not atomic with above)
        const days = Math.ceil((new Date(leave.to) - new Date(leave.from)) / 86400000) + 1;
        await LeaveBalance.updateOne(
          { email: leave.email, leaveType: leave.leavetype },
          [
            {
              $set: {
                used: { $add: ["$used", days] },
                remaining: { $subtract: ["$total", { $add: ["$used", days] }] }
              }
            }
          ]
        );

      } else {
        update.currentLevel = 2;
      }
    }

    await Leave.updateOne({ _id: leaveId }, update);
    const updatedLeave = await Leave.findById(leaveId);

    res.json(updatedLeave);
  } catch (e) {
  }
};

/* ---------- AUTH ---------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ colid, name, email: userEmail, regno, role });
  } catch (e) {
  }
};

exports.searchuserbyemailorname = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const regex = new RegExp(q, 'i');
    const c = Number(req.query.colid);
    const filter = { $or: [{ name: regex }, { email: regex }] };
    if (!isNaN(c)) filter.colid = c;
    const users = await User.find(filter).limit(10).select('name email');
    res.json(users);
  } catch (e) {
  }
};