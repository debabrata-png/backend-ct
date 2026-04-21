const FacRegistrationDs = require('../Models/facregistrationds');
const FacBankDs = require('../Models/facbankds');
const User = require('../Models/user');

// Create new faculty registration
exports.createfacregistrationds = async (req, res) => {
  try {
    const { name, user, colid, password, ...registrationData } = req.body;

    const newfacregistrationds = new FacRegistrationDs({
      ...registrationData,
      name,
      user,
      colid,
      password,
      status: 'Pending',
      createdby: user,
      createddate: new Date()
    });

    await newfacregistrationds.save();

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      registration: newfacregistrationds
    });
  } catch (error) {
    // console.error('Error creating registration:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Get all registrations by college
exports.getfacregistrationdsbycolid = async (req, res) => {
  try {
    const { colid } = req.query;
    const registrations = await FacRegistrationDs.find({ colid: parseInt(colid) });

    res.status(200).json({
      success: true,
      registrations
    });
  } catch (error) {
    // console.error('Error fetching registrations:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Get single registration by ID
exports.getfacregistrationds = async (req, res) => {
  try {
    const { id } = req.query;
    const registration = await FacRegistrationDs.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      registration
    });
  } catch (error) {
    // console.error('Error fetching registration:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Update registration status
exports.updatefacregistrationdsstatus = async (req, res) => {
  try {
    const { id, status, comments, updatedby } = req.query;

    const registration = await FacRegistrationDs.findByIdAndUpdate(
      id,
      {
        status,
        comments,
        updatedby,
        updateddate: new Date()
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      registration
    });
  } catch (error) {
    // console.error('Error updating status:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Approve registration - Create user and bank details
exports.approvefacregistrationds = async (req, res) => {
  try {
    const { id, updatedby } = req.query;

    const registration = await FacRegistrationDs.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    if (registration.status === 'Approve') {
      return res.status(400).json({
        success: false,
        message: 'Registration already approved'
      });
    }

    // Create User
    const newuser = new User({
      email: registration.email,
      name: registration.fullname,
      phone: registration.mobilenumber,
      password: registration.password,
      role: 'Faculty',
      regno: registration.medicaldentalcouncilid,
      programcode: 'NA',
      admissionyear: new Date().getFullYear().toString(),
      semester: 'N/A',
      section: 'N/A',
      gender: registration.gender,
      department: registration.designation,
      photo: registration.photograph,
      category: registration.facultytype,
      address: '',
      quota: '',
      user: registration.user,
      addedby: updatedby,
      status1: 'Active',
      colid: registration.colid,
      status: 1
    });

    await newuser.save();

    // Create Bank Details
    const newfacbankds = new FacBankDs({
      name: registration.name,
      user: registration.user,
      colid: registration.colid,
      accountnumber: registration.accountnumber,
      confirmbankaccountnumber: registration.confirmbankaccountnumber,
      accountholdername: registration.accountholdername,
      bankname: registration.bankname,
      ifsccode: registration.ifsccode,
      confirmifsccode: registration.confirmifsccode,
      branchname: registration.branchname,
      pannumber: registration.pannumber,
      pancard: registration.pancard,
      createddate: new Date()
    });

    await newfacbankds.save();

    // Update registration status to Approve
    await FacRegistrationDs.findByIdAndUpdate(
      id,
      {
        status: 'Approve',
        updatedby,
        updateddate: new Date()
      }
    );

    res.status(200).json({
      success: true,
      message: 'Registration approved successfully',
      user: newuser,
      bankdetails: newfacbankds
    });
  } catch (error) {
  
    // console.error('Error approving registration:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Reject registration
exports.rejectfacregistrationds = async (req, res) => {
  try {
    const { id, comments, updatedby } = req.query;

    const registration = await FacRegistrationDs.findByIdAndUpdate(
      id,
      {
        status: 'Reject',
        comments,
        updatedby,
        updateddate: new Date()
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Registration rejected',
      registration
    });
  } catch (error) {
    // console.error('Error rejecting registration:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Hold registration
exports.holdfacregistrationds = async (req, res) => {
  try {
    const { id, comments, updatedby } = req.query;

    const registration = await FacRegistrationDs.findByIdAndUpdate(
      id,
      {
        status: 'Hold',
        comments,
        updatedby,
        updateddate: new Date()
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Registration held',
      registration
    });
  } catch (error) {
    // console.error('Error holding registration:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Delete registration (only if not approved)
exports.deletefacregistrationds = async (req, res) => {
  try {
    const { id } = req.query;

    const registration = await FacRegistrationDs.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    if (registration.status === 'Approve') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete approved registration'
      });
    }

    await FacRegistrationDs.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    // console.error('Error deleting registration:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};

// Get registrations by status
exports.getfacregistrationdsbystatus = async (req, res) => {
  try {
    const { status } = req.query;
    const registrations = await FacRegistrationDs.find({ status });

    res.status(200).json({
      success: true,
      registrations
    });
  } catch (error) {
    // console.error('Error fetching registrations:', error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message
    // });
  }
};
