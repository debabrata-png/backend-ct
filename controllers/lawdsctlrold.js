const lawuserds = require('../Models/lawuserds');
const lawformds = require('../Models/lawformds');
// ======================
// USER AUTHENTICATION CONTROLLERS
// ======================

// User Registration
exports.registeruser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await lawuserds.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const newUser = await lawuserds.create(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          phone: newUser.phone,
          colid: newUser.colid
        }
      }
    });
  } catch (error) {
  }
};

// User Login
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await lawuserds.findOne({ email, password });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
          colid: user.colid
        }
      }
    });
  } catch (error) {
  }
};

// Get User Profile
exports.getuserprofile = async (req, res) => {
  try {
    const user = await lawuserds.findById(req.userId).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
  }
};

// Update User Profile
exports.updateuserprofile = async (req, res) => {
  try {
    const { fullname, phone, colid } = req.body;
    
    const updatedUser = await lawuserds.findByIdAndUpdate(
      req.userId,
      { fullname, phone, colid },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Change Password
exports.changepassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const user = await lawuserds.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (user.password !== currentPassword) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    await lawuserds.findByIdAndUpdate(req.userId, { password: newPassword }, { new: true });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
// ======================
// LEGAL CASE MANAGEMENT CONTROLLERS
// ======================

// Create New Case
exports.createcase = async (req, res) => {
  try {
    const { useremail, userid, colid } = req.body;

    if (!useremail || !userid || !colid) {
      return res.status(400).json({
        success: false,
        message: 'User email, user ID, and college ID are required'
      });
    }

    // Check if case with same case number already exists for this college
    const existingCase = await lawformds.findOne({ 
      caseno: req.body.caseno, 
      colid: colid
    });
    
    if (existingCase) {
      return res.status(400).json({
        success: false,
        message: 'Case with this case number already exists in this college'
      });
    }

    // Find the highest slno for this user and college to auto-increment
    const lastCase = await lawformds.findOne({ 
      useremail: useremail,
      colid: colid
    })
      .sort({ slno: -1 })
      .select('slno');

    const nextSlno = lastCase ? (parseInt(lastCase.slno) + 1).toString() : "1";

    // Create new case
    const newCase = await lawformds.create({
      ...req.body,
      slno: nextSlno,
      userid: userid,
      useremail: useremail,
      colid: colid
    });

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: newCase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get All Cases with Single Filter API (Default: colid filter, get userid/useremail from req.query)
exports.getallcases = async (req, res) => {
  try {
    const { 
      page, 
      limit, 
      startdate, 
      enddate, 
      rackno,
      caseregtype,
      search,
      lawclerkname,
      partyname,
      useremail,
      userid,
      colid
    } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    // Base filter - always filter by colid (default)
    const filter = { 
      colid: parseInt(colid)
    };

    // Optional user-specific filtering (if useremail provided from req.query)
    if (useremail) {
      filter.useremail = useremail;
    }

    // Optional user ID filtering (if userid provided from req.query)
    if (userid) {
      filter.userid = userid;
    }

    // Filter by date range using datefor field
    if (startdate && enddate) {
      filter.datefor = {
        $gte: new Date(startdate),
        $lte: new Date(enddate + 'T23:59:59.999Z')
      };
    } else if (startdate) {
      filter.datefor = { $gte: new Date(startdate) };
    } else if (enddate) {
      filter.datefor = { $lte: new Date(enddate + 'T23:59:59.999Z') };
    }

    // Filter by rack number
    if (rackno) {
      filter.rackno = { $regex: rackno, $options: 'i' };
    }

    // Filter by case registration type
    if (caseregtype) {
      filter.caseregtype = caseregtype;
    }

    // Filter by law clerk name
    if (lawclerkname) {
      filter.lawclerkname = { $regex: lawclerkname, $options: 'i' };
    }

    // Filter by party name
    if (partyname) {
      filter.partyname = { $regex: partyname, $options: 'i' };
    }

    // General search across multiple fields
    if (search) {
      filter.$or = [
        { caseno: { $regex: search, $options: 'i' } },
        { partyname: { $regex: search, $options: 'i' } },
        { plaintiffname: { $regex: search, $options: 'i' } },
        { defendantname: { $regex: search, $options: 'i' } },
        { lawclerkname: { $regex: search, $options: 'i' } },
        { rackno: { $regex: search, $options: 'i' } }
      ];
    }

    let query = lawformds.find(filter).sort({ createdAt: -1 });

    // Pagination if provided
    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      query = query.skip(skip).limit(parseInt(limit));
      
      const total = await lawformds.countDocuments(filter);
      const cases = await query;
      
      res.json({
        success: true,
        data: cases,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit))
        },
        appliedFilters: filter
      });
    } else {
      const cases = await query;
      res.json({
        success: true,
        data: cases,
        appliedFilters: filter
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get Single Case by ID (College-specific)
exports.getcasebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, useremail, userid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    // Build filter based on available parameters from req.query
    const filter = { 
      _id: id, 
      colid: parseInt(colid)
    };

    // Add user-specific filters if provided from req.query
    if (useremail) filter.useremail = useremail;
    if (userid) filter.userid = userid;
    
    const caseData = await lawformds.findOne(filter);
    
    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    res.json({
      success: true,
      data: caseData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update Case (College-specific)
exports.updatecase = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, useremail, userid } = req.body;
    const updateData = req.body;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    // Remove system fields that shouldn't be updated
    delete updateData._id;
    delete updateData.__v;
    delete updateData.userid;
    delete updateData.useremail;
    delete updateData.colid;
    delete updateData.slno; // Prevent slno modification

    // Build filter based on available parameters
    const filter = { 
      _id: id, 
      colid: parseInt(colid)
    };

    // Add user-specific filters if provided
    if (useremail) filter.useremail = useremail;
    if (userid) filter.userid = userid;

    const updatedCase = await lawformds.findOneAndUpdate(
      filter,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    res.json({
      success: true,
      message: 'Case updated successfully',
      data: updatedCase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete Case (College-specific)
exports.deletecase = async (req, res) => {
  try {
    const { id } = req.params;
    const { colid, useremail, userid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    // Build filter based on available parameters from req.query
    const filter = { 
      _id: id, 
      colid: parseInt(colid)
    };

    // Add user-specific filters if provided from req.query
    if (useremail) filter.useremail = useremail;
    if (userid) filter.userid = userid;
    
    const deletedCase = await lawformds.findOneAndDelete(filter);
    
    if (!deletedCase) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    res.json({
      success: true,
      message: 'Case deleted successfully',
      data: deletedCase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get Dashboard Statistics (College-specific)
exports.getdashboardstats = async (req, res) => {
  try {
    const { colid, useremail, userid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    // Base filter for college-specific data
    const userFilter = { 
      colid: parseInt(colid)
    };

    // Add user-specific filters if provided from req.query
    if (useremail) userFilter.useremail = useremail;
    if (userid) userFilter.userid = userid;

    const totalCases = await lawformds.countDocuments(userFilter);
    
    const casesByType = await lawformds.aggregate([
      { $match: userFilter },
      {
        $group: {
          _id: '$caseregtype',
          count: { $sum: 1 }
        }
      }
    ]);

    const casesByRack = await lawformds.aggregate([
      { $match: userFilter },
      {
        $group: {
          _id: '$rackno',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const upcomingHearings = await lawformds.find({
      ...userFilter,
      nextdateforhearing: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })
    .sort({ nextdateforhearing: 1 })
    .limit(10);

    res.json({
      success: true,
      data: {
        totalCases,
        casesByType,
        casesByRack,
        upcomingHearings: upcomingHearings.length,
        upcomingHearingsList: upcomingHearings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
