const User = require('../Models/user');
const Leave = require('../Models/leaveds1');
const LeaveBalance = require('../Models/leavebalanceds1');
const LeaveApprover = require('../Models/leaveapproverds1');
const LeaveType = require('../Models/leavetypeds1');

/* ---------- LEAVE TYPE ---------- */
exports.createleavetype1 = async (req, res) => {
  try {
    // Validate required fields
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }
    
    const lt = await LeaveType.create(req.body);
    res.status(201).json(lt);
  } catch (e) {
    console.error('Error creating leave type:', e);
    res.status(500).json({ error: e.message || 'Failed to create leave type' });
  }
};

exports.getleavetypes1 = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = isNaN(c) ? {} : { colid: c };
    const list = await LeaveType.find({ ...filter, isactive: true }).lean();
    res.json(list);
  } catch (e) {
    console.error('Error fetching leave types:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch leave types' });
  }
};

/* ---------- LEAVE BALANCE ---------- */
exports.createleavebalance1 = async (req, res) => {
  try {
    const { email, leaveType, year, name, total } = req.body;
    
    // Validate required fields
    if (!email || !leaveType || !year || !name || total === undefined) {
      return res.status(400).json({ 
        error: 'All fields are required: email, leaveType, year, name, total' 
      });
    }
    
    // Validate total is a positive number
    if (isNaN(total) || total < 0) {
      return res.status(400).json({ error: 'Total must be a positive number' });
    }
    
    await LeaveBalance.findOneAndDelete({ email, leaveType, year });
    const bal = await LeaveBalance.create(req.body);
    res.status(201).json(bal);
  } catch (e) {
    console.error('Error creating leave balance:', e);
    res.status(500).json({ error: e.message || 'Failed to create leave balance' });
  }
};

exports.getleavebalances1 = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = {};
    if (req.query.email) filter.email = req.query.email;
    if (!isNaN(c)) filter.colid = c;
    
    const balances = await LeaveBalance.find(filter).lean();
    res.json(balances);
  } catch (e) {
    console.error('Error fetching leave balances:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch leave balances' });
  }
};

/* ---------- APPROVER ---------- */
exports.assignapprover1 = async (req, res) => {
  try {
    const { employeeemail, employeename, approveremail, approvername, level } = req.body;
    
    // Validate required fields
    if (!employeeemail || !employeename || !approveremail || !approvername || !level) {
      return res.status(400).json({ 
        error: 'All approver fields are required: employeeemail, employeename, approveremail, approvername, level' 
      });
    }
    
    // Validate level is 1 or 2
    if (level !== 1 && level !== 2) {
      return res.status(400).json({ error: 'Level must be 1 or 2' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employeeemail) || !emailRegex.test(approveremail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    await LeaveApprover.findOneAndDelete({ employeeemail, level });
    const approver = await LeaveApprover.create(req.body);
    res.status(201).json(approver);
  } catch (e) {
    console.error('Error assigning approver:', e);
    res.status(500).json({ error: e.message || 'Failed to assign approver' });
  }
};

exports.getapprovers1 = async (req, res) => {
  try {
    if (!req.query.employeeemail) {
      return res.status(400).json({ error: 'employeeemail parameter is required' });
    }
    
    const c = Number(req.query.colid);
    const filter = { employeeemail: req.query.employeeemail };
    if (!isNaN(c)) filter.colid = c;
    
    const chain = await LeaveApprover.find(filter).sort({ level: 1 }).lean();
    res.json(chain);
  } catch (e) {
    console.error('Error fetching approvers:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch approvers' });
  }
};

exports.getallapprovers1 = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    if (isNaN(c)) {
      return res.status(400).json({ error: 'colid (number) parameter is required' });
    }
    
    const approvers = await LeaveApprover.find({ colid: c }).lean().exec();
    res.json(approvers);
  } catch (e) {
    console.error('Error fetching all approvers:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch approvers' });
  }
};

/* ---------- LEAVE APPLICATION WITH HALF-DAY SUPPORT ---------- */
exports.createleave1 = async (req, res) => {
  try {
    const { email, name, reason, leavetype, from, to, isHalfDay, halfDayPeriod, colid } = req.body;
    
    // Validate required fields
    if (!email || !name || !reason || !leavetype || !from || !to || !colid) {
      return res.status(400).json({ 
        error: 'All fields are required: email, name, reason, leavetype, from, to, colid' 
      });
    }
    
    // Parse dates
    const fromDate = new Date(from);
    const toDate = new Date(to);
    
    // Validate dates
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    
    if (fromDate > toDate) {
      return res.status(400).json({ error: 'From date cannot be after to date' });
    }
    
    // Calculate days with half-day support
    let days;
    if (isHalfDay && fromDate.toDateString() === toDate.toDateString()) {
      days = 0.5; // Half day
      if (!halfDayPeriod || !['morning', 'afternoon'].includes(halfDayPeriod)) {
        return res.status(400).json({ 
          error: 'Half day period must be either "morning" or "afternoon"' 
        });
      }
    } else {
      days = Math.ceil((toDate - fromDate) / 86400000) + 1;
      if (isHalfDay) {
        return res.status(400).json({ 
          error: 'Half day can only be applied for same day (from and to dates must be same)' 
        });
      }
    }
    
    // Check leave balance
    const bal = await LeaveBalance.findOne({ email, leaveType: leavetype });
    if (!bal) {
      return res.status(400).json({ 
        error: 'Leave balance not found for this leave type. Please contact HR.' 
      });
    }
    
    if (bal.remaining < days) {
      return res.status(400).json({ 
        error: `Insufficient balance. Required: ${days} days, Available: ${bal.remaining} days` 
      });
    }
    
    // Create leave application with calculated days
    const leaveData = {
      ...req.body,
      days: days,
      currentLevel: 1,
      leavestatus: 'Pending',
      approvals: []
    };
    
    const leave = await Leave.create(leaveData);
    res.status(201).json(leave);
  } catch (e) {
    console.error('Error creating leave:', e);
    res.status(500).json({ error: e.message || 'Failed to create leave application' });
  }
};

exports.getleaves1 = async (req, res) => {
  try {
    const c = Number(req.query.colid);
    const filter = {};
    
    if (req.query.email) filter.email = req.query.email;
    if (!isNaN(c)) filter.colid = c;
    if (req.query.status) filter.leavestatus = req.query.status;
    
    const leaves = await Leave.find(filter).sort({ createdAt: -1 }).lean();
    res.json(leaves);
  } catch (e) {
    console.error('Error fetching leaves:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch leave applications' });
  }
};

/* ---------- LEAVE APPROVAL WITH ATOMIC UPDATES ---------- */
exports.approverejectleave1 = async (req, res) => {
  try {
    const { approveremail, action, comment } = req.body;
    const leaveId = req.query.id;

    // Validate required fields
    if (!approveremail || !action || !leaveId) {
      return res.status(400).json({ 
        error: 'Approver email, action, and leave ID are required' 
      });
    }

    // Validate action
    if (!['Approved', 'Rejected'].includes(action)) {
      return res.status(400).json({ error: 'Action must be either "Approved" or "Rejected"' });
    }

    // Step 1: Fetch the leave application
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ error: 'Leave application not found' });
    }

    // Check if already processed
    if (leave.leavestatus !== 'Pending') {
      return res.status(400).json({ 
        error: `Leave application is already ${leave.leavestatus.toLowerCase()}` 
      });
    }

    // Step 2: Get approver chain for this employee
    const chain = await LeaveApprover.find({ employeeemail: leave.email })
                                    .sort({ level: 1 })
                                    .lean();
                                    
    if (chain.length === 0) {
      return res.status(400).json({ 
        error: 'No approver chain found for this employee' 
      });
    }

    // Step 3: Validate current approver
    const currentApprover = chain.find(c => c.level === leave.currentLevel);
    if (!currentApprover) {
      return res.status(400).json({ 
        error: `No approver found for level ${leave.currentLevel}` 
      });
    }

    if (currentApprover.approveremail !== approveremail) {
      return res.status(403).json({ 
        error: 'Unauthorized: You are not the designated approver for this level' 
      });
    }

    // Step 4: Build the approval record
    const approvalEntry = {
      level: leave.currentLevel,
      approvername: currentApprover.approvername,
      approveremail: approveremail,
      action: action,
      comment: comment || '',
      date: new Date()
    };

    // Step 5: Update leave application
    const updatedApprovals = [...leave.approvals, approvalEntry];
    let newStatus = leave.leavestatus;
    let newCurrentLevel = leave.currentLevel;

    if (action === 'Rejected') {
      newStatus = 'Rejected';
    } else {
      // Check if this is the final approval level
      if (leave.currentLevel === 2 || chain.length === 1) {
        newStatus = 'Approved';
        
        // Update leave balance atomically
        const days = leave.days || Math.ceil((new Date(leave.to) - new Date(leave.from)) / 86400000) + 1;
        
        const balanceUpdate = await LeaveBalance.findOneAndUpdate(
          { email: leave.email, leaveType: leave.leavetype },
          { 
            $inc: { 
              used: days,
              remaining: -days
            }
          },
          { new: true }
        );
        
        if (!balanceUpdate) {
          return res.status(400).json({ 
            error: 'Failed to update leave balance. Leave balance not found.' 
          });
        }
      } else {
        // Move to next approval level
        newCurrentLevel = 2;
      }
    }

    // Update the leave application
    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      {
        approvals: updatedApprovals,
        leavestatus: newStatus,
        currentLevel: newCurrentLevel
      },
      { new: true }
    );

    res.json({
      message: `Leave application ${action.toLowerCase()} successfully`,
      leave: updatedLeave
    });
    
  } catch (e) {
    console.error('Error processing leave approval:', e);
    res.status(500).json({ error: e.message || 'Failed to process leave approval' });
  }
};

exports.searchuserbyemailorname1 = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.json([]);
    }
    
    if (q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }
    
    const regex = new RegExp(q, 'i');
    const c = Number(req.query.colid);
    const filter = { $or: [{ name: regex }, { email: regex }] };
    if (!isNaN(c)) filter.colid = c;
    
    const users = await User.find(filter)
                           .limit(10)
                           .select('name email regno role')
                           .lean();
    res.json(users);
  } catch (e) {
    console.error('Error searching users:', e);
    res.status(500).json({ error: e.message || 'User search failed' });
  }
};

/* ---------- ADDITIONAL UTILITY FUNCTIONS ---------- */

// Get pending leaves for approver
exports.getpendingleaves1 = async (req, res) => {
  try {
    const { approveremail, colid } = req.query;
    
    if (!approveremail) {
      return res.status(400).json({ error: 'Approver email is required' });
    }
    
    const c = Number(colid);
    if (isNaN(c)) {
      return res.status(400).json({ error: 'Valid colid is required' });
    }
    
    // Find all employees where this user is an approver
    const approverEntries = await LeaveApprover.find({ 
      approveremail, 
      colid: c 
    }).lean();
    
    const employeeEmails = approverEntries.map(entry => entry.employeeemail);
    
    // Find pending leaves for these employees where current level matches approver level
    const pendingLeaves = [];
    
    for (const entry of approverEntries) {
      const leaves = await Leave.find({
        email: entry.employeeemail,
        leavestatus: 'Pending',
        currentLevel: entry.level,
        colid: c
      }).sort({ createdAt: -1 }).lean();
      
      pendingLeaves.push(...leaves);
    }
    
    res.json(pendingLeaves);
  } catch (e) {
    console.error('Error fetching pending leaves:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch pending leaves' });
  }
};

// Get leave statistics
exports.getleavestats1 = async (req, res) => {
  try {
    const { email, colid } = req.query;
    const c = Number(colid);
    
    if (!email || isNaN(c)) {
      return res.status(400).json({ error: 'Email and valid colid are required' });
    }
    
    // Get total leaves applied this year
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    
    const totalApplied = await Leave.countDocuments({
      email,
      colid: c,
      createdAt: { $gte: startOfYear }
    });
    
    const approved = await Leave.countDocuments({
      email,
      colid: c,
      leavestatus: 'Approved',
      createdAt: { $gte: startOfYear }
    });
    
    const pending = await Leave.countDocuments({
      email,
      colid: c,
      leavestatus: 'Pending'
    });
    
    const rejected = await Leave.countDocuments({
      email,
      colid: c,
      leavestatus: 'Rejected',
      createdAt: { $gte: startOfYear }
    });
    
    // Get leave balances
    const balances = await LeaveBalance.find({ email, colid: c }).lean();
    
    res.json({
      applications: {
        total: totalApplied,
        approved,
        pending,
        rejected
      },
      balances
    });
    
  } catch (e) {
    console.error('Error fetching leave stats:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch leave statistics' });
  }
};

/* ---------- UPDATE AND DELETE FUNCTIONS (FIXED) ---------- */

// Update Leave Type
exports.updateleavetype = async (req, res) => {
    try {
        const id = req.query.id; // CHANGED: from req.params.id to req.query.id
        const { name, code, description } = req.body;
        
        // Validate required parameters
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        if (!name || !code) {
            return res.status(400).json({ error: 'Name and code are required' });
        }
        
        const updated = await LeaveType.findByIdAndUpdate(
            id, 
            { name, code, description }, 
            { new: true, runValidators: true }
        );
        
        if (!updated) {
            return res.status(404).json({ error: 'Leave type not found' });
        }
        
        res.json(updated);
    } catch (e) {
        console.error('Error updating leave type:', e);
        res.status(500).json({ error: e.message || 'Failed to update leave type' });
    }
};

// Delete Leave Type
exports.deleteleavetype = async (req, res) => {
    try {
        const id = req.query.id; // CHANGED: from req.params.id to req.query.id
        
        // Validate required parameter
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        
        const deleted = await LeaveType.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Leave type not found' });
        }
        
        res.json({ message: 'Leave type deleted successfully' });
    } catch (e) {
        console.error('Error deleting leave type:', e);
        res.status(500).json({ error: e.message || 'Failed to delete leave type' });
    }
};

// Update Leave Balance
exports.updateleavebalance = async (req, res) => {
    try {
        const id = req.query.id; // CHANGED: from req.params.id to req.query.id
        const { email, name, leaveType, year, total } = req.body;
        
        // Validate required parameters
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        if (!email || !name || !leaveType || !year || total === undefined) {
            return res.status(400).json({ 
                error: 'All fields are required: email, name, leaveType, year, total' 
            });
        }
        
        // Validate total is a positive number
        if (isNaN(total) || total < 0) {
            return res.status(400).json({ error: 'Total must be a positive number' });
        }
        
        const updated = await LeaveBalance.findByIdAndUpdate(
            id, 
            { email, name, leaveType, year, total: parseFloat(total)}, 
            { new: true, runValidators: true }
        );
        
        if (!updated) {
            return res.status(404).json({ error: 'Leave balance not found' });
        }

        const remaining = updated.total - updated.used;
        updated.remaining = remaining;
        await updated.save();
        
        res.json(updated);
    } catch (e) {
        console.error('Error updating leave balance:', e);
        res.status(500).json({ error: e.message || 'Failed to update leave balance' });
    }
};

// Delete Leave Balance
exports.deleteleavebalance = async (req, res) => {
    try {
        const id = req.query.id; // CHANGED: from req.params.id to req.query.id
        
        // Validate required parameter
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        
        const deleted = await LeaveBalance.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Leave balance not found' });
        }
        
        res.json({ message: 'Leave balance deleted successfully' });
    } catch (e) {
        console.error('Error deleting leave balance:', e);
        res.status(500).json({ error: e.message || 'Failed to delete leave balance' });
    }
};

// Update Approver
exports.updateapprover = async (req, res) => {
    try {
        const id = req.query.id; // CHANGED: from req.params.id to req.query.id
        const { employeename, employeeemail, approvername, approveremail, level } = req.body;
        
        // Validate required parameters
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        if (!employeeemail || !employeename || !approveremail || !approvername || !level) {
            return res.status(400).json({ 
                error: 'All approver fields are required: employeeemail, employeename, approveremail, approvername, level' 
            });
        }
        
        // Validate level is 1 or 2
        if (level !== 1 && level !== 2) {
            return res.status(400).json({ error: 'Level must be 1 or 2' });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(employeeemail) || !emailRegex.test(approveremail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        const updated = await LeaveApprover.findByIdAndUpdate(
            id, 
            { employeename, employeeemail, approvername, approveremail, level }, 
            { new: true, runValidators: true }
        );
        
        if (!updated) {
            return res.status(404).json({ error: 'Approver not found' });
        }
        
        res.json(updated);
    } catch (e) {
        console.error('Error updating approver:', e);
        res.status(500).json({ error: e.message || 'Failed to update approver' });
    }
};

// Delete Approver
exports.deleteapprover = async (req, res) => {
    try {
        const id = req.query.id; // CHANGED: from req.params.id to req.query.id
        
        // Validate required parameter
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        
        const deleted = await LeaveApprover.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Approver not found' });
        }
        
        res.json({ message: 'Approver deleted successfully' });
    } catch (e) {
        console.error('Error deleting approver:', e);
        res.status(500).json({ error: e.message || 'Failed to delete approver' });
    }
};


/* ---------- AUTHENTICATION (NO BCRYPT) ---------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Plain text password comparison (as requested)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    
    // Return user data
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ 
      colid, 
      name, 
      email: userEmail, 
      regno, 
      role,
      message: 'Login successful'
    });
    
  } catch (e) {
    console.error('Error during login:', e);
    res.status(500).json({ error: e.message || 'Login failed' });
  }
};