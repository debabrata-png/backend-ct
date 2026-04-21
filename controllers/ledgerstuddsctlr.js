// controllers/ledgerstuddsctlr.js

const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");

// Add ledger entry
exports.addledgerds = async (req, res) => {
  try {
    const {
      colid,
      name,
      user,
      regno,
      studentname,
      feeitem,
      feecategory,
      amount,
      type,
      paymode,
      paydetails,
      installments,
      comments,
      academicyear,
      semester,
    } = req.body;

    // Validate required fields
    if (!colid || !name || !user || !regno || !studentname) {
      return res.status(400).json({ 
        message: "College ID, name, user, registration number, and student name are required" 
      });
    }

    // Get student details by regno
    const student = await User.findOne({ regno, colid });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let ledgerEntries = [];

    // If installments provided
    if (installments && installments.length > 0) {
      let totalInstallmentAmount = 0;

      // Validate installment amounts
      installments.forEach((inst) => {
        totalInstallmentAmount += inst.amount;
      });

      // Check if total matches
      if (Math.abs(totalInstallmentAmount - Math.abs(amount)) > 0.01) {
        return res.status(400).json({
          message: `Total installment amount (${totalInstallmentAmount}) does not match amount (${Math.abs(amount)})`,
        });
      }

      // Create ledger entry for each installment
      for (const inst of installments) {
        const entry = new Ledgerstud({
          name, // Person adding the entry (from global1)
          user, // Email of person adding entry (from global1)
          feegroup: student.programcode,
          regno: student.regno,
          student: studentname, // Student's name being added
          feeitem,
          feecategory,
          amount: type === "positive" ? inst.amount : -inst.amount,
          paymode: type === "negative" ? paymode : "",
          paydetails: type === "negative" ? paydetails : "",
          type,
          semester,
          installment: inst.installmentNumber.toString(),
          duedate: inst.duedate,
          comments,
          academicyear,
          classdate: new Date(),
          status: type === "negative" ? "paid" : "due",
          colid,
          programcode: student.programcode,
          admissionyear: student.admissionyear,
        });
        ledgerEntries.push(entry);
      }
    } else {
      // Single entry without installments
      const entry = new Ledgerstud({
        name, // Person adding the entry (from global1)
        user, // Email of person adding entry (from global1)
        feegroup: student.programcode,
        regno: student.regno,
        student: studentname, // Student's name being added
        feeitem,
        feecategory,
        amount: type === "positive" ? amount : -amount,
        paymode: type === "negative" ? paymode : "",
        paydetails: type === "negative" ? paydetails : "",
        type,
        semester,
        comments,
        academicyear,
        classdate: new Date(),
        status: type === "negative" ? "paid" : "due",
        colid,
        programcode: student.programcode,
        admissionyear: student.admissionyear,
      });
      ledgerEntries.push(entry);
    }

    // Insert all entries
    await Ledgerstud.insertMany(ledgerEntries);

    res.status(201).json({
      message: "Ledger entries created successfully",
      data: ledgerEntries,
    });
  } catch (error) {
    // //res.status(500).json({ message: error.message });
  }
};

// Get ledger entries with aggregation pipeline
exports.getledgersds = async (req, res) => {
  try {
    const {
      colid,
      regno,
      feeitem,
      feecategory,
      type,
      status,
      academicyear,
      semester,
    } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "College ID is required" });
    }

    let matchStage = { colid: parseInt(colid) };

    if (regno) matchStage.regno = regno;
    if (feeitem) matchStage.feeitem = feeitem;
    if (feecategory) matchStage.feecategory = feecategory;
    if (type) matchStage.type = type;
    if (status) matchStage.status = status;
    if (academicyear) matchStage.academicyear = academicyear;
    if (semester) matchStage.semester = semester;

    // Aggregation pipeline for summary statistics
    const ledgersSummary = await Ledgerstud.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalPositive: {
            $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] },
          },
          totalNegative: {
            $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] },
          },
          totalDue: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$type", "positive"] }, { $eq: ["$status", "due"] }] },
                "$amount",
                0,
              ],
            },
          },
          totalPaid: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, { $abs: "$amount" }, 0],
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Fetch actual entries sorted by date
    const entries = await Ledgerstud.find(matchStage)
      .sort({ classdate: -1 })
      .lean();

    res.status(200).json({
      summary: ledgersSummary[0] || {
        totalAmount: 0,
        totalPositive: 0,
        totalNegative: 0,
        totalDue: 0,
        totalPaid: 0,
        count: 0,
      },
      data: entries,
    });
  } catch (error) {
    //res.status(500).json({ message: error.message });
  }
};

// Mark payment as paid (add negative entry)
exports.markaspaidds = async (req, res) => {
  try {
    const { ledgerId, paymode, paydetails, colid, name, user } = req.body;

    if (!ledgerId || !colid) {
      return res.status(400).json({ message: "Ledger ID and College ID required" });
    }

    // Find the original ledger entry
    const originalEntry = await Ledgerstud.findById(ledgerId);
    if (!originalEntry) {
      return res.status(404).json({ message: "Ledger entry not found" });
    }

    if (originalEntry.colid !== parseInt(colid)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (originalEntry.status === "paid") {
      return res.status(400).json({ message: "Already marked as paid" });
    }

    // Create negative entry (payment)
    const paymentEntry = new Ledgerstud({
      name, // Person marking as paid (from global1)
      user, // Email of person marking as paid (from global1)
      feegroup: originalEntry.feegroup,
      regno: originalEntry.regno,
      student: originalEntry.student, // Student name
      feeitem: originalEntry.feeitem,
      feecategory: originalEntry.feecategory,
      amount: -originalEntry.amount, // Negative of original
      paymode,
      paydetails,
      type: "negative",
      semester: originalEntry.semester,
      installment: originalEntry.installment,
      comments: `Payment for ledger entry ${ledgerId}`,
      academicyear: originalEntry.academicyear,
      classdate: new Date(),
      status: "paid",
      colid,
      programcode: originalEntry.programcode,
      admissionyear: originalEntry.admissionyear,
      duedate: new Date(),
    });

    await paymentEntry.save();

    // Update original entry to mark as paid
    originalEntry.status = "paid";
    await originalEntry.save();

    res.status(200).json({
      message: "Payment recorded successfully",
      data: paymentEntry,
    });
  } catch (error) {
    //res.status(500).json({ message: error.message });
  }
};

// Search students
exports.searchstudentsds = async (req, res) => {
  try {
    const { search, colid, limit = 10 } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "College ID is required" });
    }

    const students = await User.find(
      {
        colid,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { regno: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      },
      { name: 1, regno: 1, email: 1, programcode: 1, admissionyear: 1 }
    ).limit(parseInt(limit));

    res.status(200).json({ data: students });
  } catch (error) {
    //res.status(500).json({ message: error.message });
  }
};

// Get distinct filter options
exports.getfilteroptionsds = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "College ID is required" });
    }

    const feeItems = await Ledgerstud.distinct("feeitem", {
      colid: parseInt(colid),
    });
    const feeCategories = await Ledgerstud.distinct("feecategory", {
      colid: parseInt(colid),
    });
    const academicYears = await Ledgerstud.distinct("academicyear", {
      colid: parseInt(colid),
    });
    const semesters = await Ledgerstud.distinct("semester", {
      colid: parseInt(colid),
    });

    res.status(200).json({
      feeItems,
      feeCategories,
      academicYears,
      semesters,
    });
  } catch (error) {
    //res.status(500).json({ message: error.message });
  }
};

// Get ledger by student registration number
exports.getledgerbystudentds = async (req, res) => {
  try {
    const { regno, colid } = req.query;

    if (!colid || !regno) {
      return res.status(400).json({ message: "College ID and Registration Number required" });
    }

    const ledgers = await Ledgerstud.find({
      regno,
      colid: parseInt(colid),
    }).sort({ classdate: -1 });

    res.status(200).json({ data: ledgers });
  } catch (error) {
    //res.status(500).json({ message: error.message });
  }
};
