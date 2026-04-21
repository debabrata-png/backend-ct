const Ledgerstud = require("../Models/ledgerstud.js");

exports.collegeStudentLedgerReportds = async (req, res) => {
  try {
    const { programcode, academicyear, semester, classdate, colid } = req.query;

    // Validation - only colid is required
    if (!colid) {
      return res.status(400).json({
        success: false,
        message: "colid is required",
      });
    }

    // Build dynamic match filter
    const matchFilter = {
      colid: Number(colid),
    };

    // Add optional filters
    if (programcode && programcode.trim()) {
      matchFilter.programcode = String(programcode);
    }

    if (academicyear && academicyear.trim()) {
      matchFilter.academicyear = String(academicyear);
    }

    if (semester && semester.trim()) {
      matchFilter.semester = String(semester);
    }

    if (classdate && classdate.trim()) {
      const filterDate = new Date(classdate);
      matchFilter.classdate = { $lte: filterDate };
    }

    // Check if records exist
    const recordCount = await Ledgerstud.countDocuments(matchFilter);

    if (recordCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No records found",
        data: {
          filters: {
            colid: colid,
            programcode: programcode || "All Programs",
            academicyear: academicyear || "All Years",
            semester: semester || "All Semesters",
            classdate: classdate || "All Dates",
          },
          transactions: [],
          studentSummary: [],
          overallSummary: {
            totalPayable: 0,
            totalPaid: 0,
            balance: 0,
            totalTransactions: 0,
            uniqueStudents: 0,
          },
        },
      });
    }

    // Aggregation Pipeline
    const ledgerData = await Ledgerstud.aggregate([
      {
        $match: matchFilter,
      },
      {
        $addFields: {
          amountType: {
            $cond: [{ $gte: ["$amount", 0] }, "payable", "paid"],
          },
          absoluteAmount: {
            $abs: "$amount",
          },
        },
      },
      {
        $sort: {
          name: 1,
          classdate: -1,
        },
      },
      {
        $facet: {
          transactions: [
            {
              $project: {
                _id: 1,
                name: 1,
                regno: 1,
                feeitem: 1,
                feecategory: 1,
                amount: 1,
                amountType: 1,
                paymode: 1,
                paydetails: 1,
                academicyear: 1,
                semester: 1,
                installment: 1,
                comments: 1,
                programcode: 1,
                classdate: 1,
                status: 1,
                createdAt: 1,
              },
            },
          ],
          overallSummary: [
            {
              $group: {
                _id: null,
                totalPayable: {
                  $sum: {
                    $cond: [{ $gt: ["$amount", 0] }, "$amount", 0],
                  },
                },
                totalPaid: {
                  $sum: {
                    $cond: [{ $lt: ["$amount", 0] }, { $abs: "$amount" }, 0],
                  },
                },
                totalTransactions: { $sum: 1 },
              },
            },
          ],
          studentSummary: [
            {
              $group: {
                _id: {
                  name: "$name",
                  regno: "$regno",
                  programcode: "$programcode",
                  semester: "$semester",
                },
                totalPayable: {
                  $sum: {
                    $cond: [{ $gt: ["$amount", 0] }, "$amount", 0],
                  },
                },
                totalPaid: {
                  $sum: {
                    $cond: [{ $lt: ["$amount", 0] }, { $abs: "$amount" }, 0],
                  },
                },
                balance: {
                  $sum: "$amount",
                },
                transactionCount: { $sum: 1 },
              },
            },
            {
              $sort: { "_id.name": 1 },
            },
          ],
        },
      },
      {
        $project: {
          transactions: 1,
          studentSummary: 1,
          overallSummary: {
            $map: {
              input: "$overallSummary",
              as: "sum",
              in: {
                totalPayable: "$$sum.totalPayable",
                totalPaid: "$$sum.totalPaid",
                balance: {
                  $subtract: ["$$sum.totalPayable", "$$sum.totalPaid"],
                },
                totalTransactions: "$$sum.totalTransactions",
                uniqueStudents: { $size: "$studentSummary" },
              },
            },
          },
        },
      },
    ]);

    if (!ledgerData || ledgerData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No transactions found",
        data: {
          filters: {
            colid: colid,
            programcode: programcode || "All Programs",
            academicyear: academicyear || "All Years",
            semester: semester || "All Semesters",
            classdate: classdate || "All Dates",
          },
          transactions: [],
          studentSummary: [],
          overallSummary: {
            totalPayable: 0,
            totalPaid: 0,
            balance: 0,
            totalTransactions: 0,
            uniqueStudents: 0,
          },
        },
      });
    }

    const result = ledgerData[0];
    const overallSummaryData = result.overallSummary[0] || {
      totalPayable: 0,
      totalPaid: 0,
      balance: 0,
      totalTransactions: 0,
      uniqueStudents: 0,
    };

    res.status(200).json({
      success: true,
      data: {
        filters: {
          colid: colid,
          programcode: programcode || "All Programs",
          academicyear: academicyear || "All Years",
          semester: semester || "All Semesters",
          classdate: classdate || "All Dates",
        },
        transactions: result.transactions || [],
        studentSummary: result.studentSummary || [],
        overallSummary: overallSummaryData,
      },
    });
  } catch (error) {
    // console.error("Error in collegeStudentLedgerReportds:", error);
    // res.status(500).json({
    //   success: false,
    //   message: "Error generating college ledger report",
    //   error: error.message,
    // });
  }
};
