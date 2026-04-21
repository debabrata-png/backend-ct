// controllers/ledgerinstallmentdsctlr.js

const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");

exports.getallledgerentriesds = async (req, res) => {
  try {
    const { colid, regno, semester } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "College ID is required" });
    }

    let matchFilter = {
      colid: parseInt(colid),
    };

    if (regno) matchFilter.regno = regno;
    if (semester) matchFilter.semester = semester;

    const entries = await Ledgerstud.find(matchFilter)
      .sort({ classdate: -1 })
      .lean();

    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    console.error("Error in getallledgerentriesds:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createinstallmentsfromentriesds = async (req, res) => {
  try {
    const { colid, name, user, selectedEntries, installments } = req.body;

    if (!colid || !name || !user) {
      return res.status(400).json({
        message: "College ID, name, and user are required from global1",
      });
    }

    if (!selectedEntries || selectedEntries.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one entry" });
    }

    if (!installments || installments.length === 0) {
      return res
        .status(400)
        .json({ message: "Please add at least one installment" });
    }

    const entries = await Ledgerstud.find({
      _id: { $in: selectedEntries },
      colid: parseInt(colid),
    });

    if (entries.length === 0) {
      return res.status(404).json({ message: "Selected entries not found" });
    }

    const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalInstallmentAmount = installments.reduce(
      (sum, inst) => sum + inst.amount,
      0
    );

    if (Math.abs(totalInstallmentAmount - totalAmount) > 0.01) {
      return res.status(400).json({
        message: `Total installment amount doesn't match total selected amount`,
      });
    }

    const firstEntry = entries[0];
    const student = await User.findOne({
      regno: firstEntry.regno,
      colid: parseInt(colid),
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let newEntries = [];

    for (const inst of installments) {
      const installmentEntry = new Ledgerstud({
        name,
        user,
        feegroup: student.programcode,
        regno: student.regno,
        student: student.name,
        feeitem: `Installment ${inst.installmentNumber} - Multiple Fees`,
        feecategory: "Installment Payment",
        amount: inst.amount,
        type: "positive",
        semester: firstEntry.semester,
        installment: inst.installmentNumber.toString(),
        classdate: new Date(inst.classdate),
        comments: `Installment created from ${entries.length} selected entries`,
        academicyear: firstEntry.academicyear,
        status: "due",
        colid: parseInt(colid),
        programcode: student.programcode,
        admissionyear: student.admissionyear,
      });

      newEntries.push(installmentEntry);
    }

    const negativeEntry = new Ledgerstud({
      name,
      user,
      feegroup: student.programcode,
      regno: student.regno,
      student: student.name,
      feeitem: "Payment Received - Installment Created",
      feecategory: "Payment",
      amount: -totalAmount,
      paymode: "installment",
      paydetails: `Payment converted to ${installments.length} installments`,
      type: "negative",
      semester: firstEntry.semester,
      comments: `Negative entry for installments created from ${entries.length} entries`,
      academicyear: firstEntry.academicyear,
      classdate: new Date(),
      status: "paid",
      colid: parseInt(colid),
      programcode: student.programcode,
      admissionyear: student.admissionyear,
    });

    newEntries.push(negativeEntry);

    await Ledgerstud.updateMany(
      { _id: { $in: selectedEntries } },
      { $set: { status: "paid" } }
    );

    await Ledgerstud.insertMany(newEntries);

    res.status(201).json({
      success: true,
      message: "Installments created successfully",
      data: {
        installments: newEntries.filter((e) => e.type === "positive"),
        negativeEntry: negativeEntry,
        totalAmount: totalAmount,
        installmentCount: installments.length,
      },
    });
  } catch (error) {
    console.error("Error in createinstallmentsfromentriesds:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getdistinctsemestersds = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "College ID is required" });
    }

    const semesters = await Ledgerstud.distinct("semester", {
      colid: parseInt(colid),
    });

    res.status(200).json({ success: true, data: semesters });
  } catch (error) {
    console.error("Error in getdistinctsemestersds:", error);
    res.status(500).json({ message: error.message });
  }
};
