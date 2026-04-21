const mealpollsds = require("../Models/mealpollsds");
const hostelbedallocation = require("../Models/hostelbedallocation");

// Create Meal Poll
exports.createmealpollsds = async (req, res) => {
  try {
    const poll = await mealpollsds.create(req.body);
    return res.status(201).json({ success: true, data: poll });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Meal Polls by Building
exports.getmealpollsds = async (req, res) => {
  try {
    const { buildingname, colid, pollstatus } = req.query;
    
    const filter = {
      buildingname,
      colid: parseInt(colid)
    };
    
    if (pollstatus) {
      filter.pollstatus = pollstatus;
    }
    
    const polls = await mealpollsds.find(filter).sort({ polldate: -1 });
    return res.status(200).json({ success: true, data: polls });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Active Polls for Student
exports.getactivepollsforstudent = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    
    // Get student's building
    const allocation = await hostelbedallocation.findOne({ regno, colid: parseInt(colid) });
    
    if (!allocation) {
      return res.status(404).json({ 
        success: false, 
        message: "Student not allocated to any building" 
      });
    }
    
    // Get active polls for this building
    const polls = await mealpollsds.find({
      buildingname: allocation.buildingname,
      colid: parseInt(colid),
      pollstatus: 'Active',
      polldate: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } // Today onwards
    }).sort({ polldate: 1 });
    
    return res.status(200).json({ success: true, data: polls });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Vote on Meal Poll
exports.votemealpollsds = async (req, res) => {
  try {
    const { pollid, optionindex, regno } = req.body;
    
    const poll = await mealpollsds.findById(pollid);
    
    if (!poll) {
      return res.status(404).json({ success: false, message: "Poll not found" });
    }
    
    if (poll.pollstatus === 'Closed') {
      return res.status(400).json({ success: false, message: "Poll is closed" });
    }
    
    // Check if student already voted
    const alreadyVoted = poll.options.some(opt => 
      opt.votedstudents.includes(regno)
    );
    
    if (alreadyVoted) {
      // Remove previous vote
      poll.options.forEach(opt => {
        const index = opt.votedstudents.indexOf(regno);
        if (index > -1) {
          opt.votedstudents.splice(index, 1);
          opt.votes -= 1;
        }
      });
    }
    
    // Add new vote
    poll.options[optionindex].votes += 1;
    poll.options[optionindex].votedstudents.push(regno);
    
    await poll.save();
    
    return res.status(200).json({ 
      success: true, 
      message: "Vote recorded successfully",
      data: poll 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Close Poll
exports.closemealpollsds = async (req, res) => {
  try {
    const { pollid } = req.body;
    
    const poll = await mealpollsds.findByIdAndUpdate(
      pollid,
      { pollstatus: 'Closed' },
      { new: true }
    );
    
    return res.status(200).json({ 
      success: true, 
      message: "Poll closed successfully",
      data: poll 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update Poll
exports.updatemealpollsds = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await mealpollsds.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Poll
exports.deletemealpollsds = async (req, res) => {
  try {
    const { id } = req.params;
    await mealpollsds.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
