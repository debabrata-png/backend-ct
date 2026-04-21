const VendorSubmission = require('./../Models/prfpvendor');
const RFP = require('./../Models/prfp');
const Vendor = require('./../Models/pvendor');

/* ================= GET RFP DETAILS ================= */
exports.vsubmissionGetRFP = async (req, res) => {

  const data = await RFP.findById(req.query.rfpid);

  res.json(data);
};


/* ================= SAVE SUBMISSION ================= */
exports.vsubmissionSaveold = async (req, res) => {

  const {
    colid,
    rfpid,
    vendorid,
    vendorname,
    email,
    phone,
    items,
    technicaldetails,
    transport,
    loadingfees,
    pandffees,
    gst,
    total,
    warranty,
    workschedule,
    paymentterms,
    remark
  } = req.body;

  /* REMOVE OLD */
  await VendorSubmission.deleteMany({
    rfpid,
    vendorid
  });

  const data = await VendorSubmission.create({
    colid,
    rfpid,
    vendorid,
    vendorname,
    email,
    phone,
    items,
    technicaldetails,
    transport,
    loadingfees,
    pandffees,
    gst,
    total,
    warranty,
    workschedule,
    paymentterms,
    remark
  });

  res.json(data);
};


exports.vsubmissionSave = async (req, res) => {

    try {
  
      const {
        colid,
        rfpid,
        vendorid,
        items,
        technicaldetails,
        transport,
        loadingfees,
        pandffees,
        gst,
        total,
        warranty,
        workschedule,
        paymentterms,
        remark
      } = req.body;
  
      /* 🔥 FETCH VENDOR DETAILS FROM pvendor */
      const vendor = await Vendor.findById(vendorid);
  
      if (!vendor) {
        return res.status(404).json({ msg: 'Vendor not found' });
      }
  
      /* REMOVE OLD SUBMISSION */
      await VendorSubmission.deleteMany({
        rfpid,
        vendorid
      });
  
      /* CREATE WITH REAL DATA */
      const data = await VendorSubmission.create({
        colid,
        rfpid,
  
        vendorid,
  
        /* 🔥 AUTO-FILL */
        vendorname: vendor.vendorname,
        email: vendor.email,
        phone: vendor.phone,
  
        items,
        technicaldetails,
        transport,
        loadingfees,
        pandffees,
        gst,
        total,
        warranty,
        workschedule,
        paymentterms,
        remark
      });
  
      res.json(data);
  
    } catch (e) {
      console.error(e);
      res.status(500).json({ msg: 'Error saving submission' });
    }
  };


/* ================= GET SUBMISSION ================= */
exports.vsubmissionGet = async (req, res) => {

  const data = await VendorSubmission.findOne({
    rfpid: req.query.rfpid,
    vendorid: req.query.vendorid
  });

  res.json(data || {});
};