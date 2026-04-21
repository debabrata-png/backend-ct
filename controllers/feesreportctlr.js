const Fees = require("../Models/fees");

// ─────────────────────────────────────────────────────────────────────────────
// Fees Structure Report
// GET /api/v2/feesstructurereportds
// Required : colid
// Optional : academicyear, programcode, semester
// Returns  : list of fee records (feecategory, feeeitem, amount, classdate/duedate)
//            grouped by feecategory, sorted by classdate
// ─────────────────────────────────────────────────────────────────────────────
exports.feesStructureReport = async (req, res) => {
  try {
    const { colid, academicyear, programcode, semester } = req.query;

    if (!colid) {
      return res
        .status(400)
        .json({ success: false, message: "colid is required" });
    }

    // ── Build filter ─────────────────────────────────────────────────────────
    const filter = { colid: Number(colid) };
    if (academicyear) filter.academicyear = String(academicyear);
    if (programcode)  filter.programcode  = String(programcode);
    if (semester)     filter.semester     = String(semester);

    // ── Fetch and sort ───────────────────────────────────────────────────────
    const fees = await Fees.find(filter)
      .sort({ feecategory: 1, classdate: 1, feeeitem: 1 })
      .select("feecategory feeeitem amount classdate semester feegroup programcode academicyear status -_id");

    // ── Group by feecategory for summary ─────────────────────────────────────
    const categoryMap = {};
    for (const row of fees) {
      const cat = row.feecategory || "Uncategorized";
      if (!categoryMap[cat]) categoryMap[cat] = 0;
      categoryMap[cat] += row.amount || 0;
    }

    const grandTotal = fees.reduce((sum, r) => sum + (r.amount || 0), 0);

    return res.status(200).json({
      success: true,
      filters: {
        colid,
        academicyear: academicyear || null,
        programcode:  programcode  || null,
        semester:     semester     || null,
      },
      totalRecords: fees.length,
      grandTotal,
      categoryTotals: categoryMap,
      data: fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating fees structure report",
      error: error.message,
    });
  }
};
