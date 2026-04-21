const User = require("../Models/user");

// Get missing fields report (OPTIMIZED with Aggregation)
exports.ds1getmissingfieldsreport = async (req, res) => {
  try {
    const { colid } = req.query;
    
    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const result = await User.aggregate([
      // Match only students in this college
      {
        $match: {
          colid: parseInt(colid),
          role: "Student"
        }
      },
      
      // Add fields to check if each field is empty
      {
        $addFields: {
          photoEmpty: {
            $or: [
              { $eq: ["$photo", null] },
              { $eq: ["$photo", ""] },
              { $not: "$photo" }
            ]
          },
          phoneEmpty: {
            $or: [
              { $eq: ["$phone", null] },
              { $eq: ["$phone", ""] },
              { $not: "$phone" }
            ]
          },
          genderEmpty: {
            $or: [
              { $eq: ["$gender", null] },
              { $eq: ["$gender", ""] },
              { $not: "$gender" }
            ]
          },
          dobEmpty: {
            $or: [
              { $eq: ["$dob", null] },
              { $eq: ["$dob", ""] },
              { $not: "$dob" }
            ]
          },
          categoryEmpty: {
            $or: [
              { $eq: ["$category", null] },
              { $eq: ["$category", ""] },
              { $not: "$category" }
            ]
          },
          addressEmpty: {
            $or: [
              { $eq: ["$address", null] },
              { $eq: ["$address", ""] },
              { $not: "$address" }
            ]
          },
          quotaEmpty: {
            $or: [
              { $eq: ["$quota", null] },
              { $eq: ["$quota", ""] },
              { $not: "$quota" }
            ]
          },
          fathernameEmpty: {
            $or: [
              { $eq: ["$fathername", null] },
              { $eq: ["$fathername", ""] },
              { $not: "$fathername" }
            ]
          },
          mothernameEmpty: {
            $or: [
              { $eq: ["$mothername", null] },
              { $eq: ["$mothername", ""] },
              { $not: "$mothername" }
            ]
          },
          degreeEmpty: {
            $or: [
              { $eq: ["$degree", null] },
              { $eq: ["$degree", ""] },
              { $not: "$degree" }
            ]
          },
          eligibilitynameEmpty: {
            $or: [
              { $eq: ["$eligibilityname", null] },
              { $eq: ["$eligibilityname", ""] },
              { $not: "$eligibilityname" }
            ]
          },
          minorsubEmpty: {
            $or: [
              { $eq: ["$minorsub", null] },
              { $eq: ["$minorsub", ""] },
              { $not: "$minorsub" }
            ]
          },
          scholarshipEmpty: {
            $or: [
              { $eq: ["$scholarship", null] },
              { $eq: ["$scholarship", ""] },
              { $not: "$scholarship" }
            ]
          }
        }
      },
      
      // Facet for multiple aggregations in one query
      {
        $facet: {
          // Summary statistics
          summary: [
            {
              $group: {
                _id: null,
                totalStudents: { $sum: 1 },
                photoFilled: {
                  $sum: { $cond: ["$photoEmpty", 0, 1] }
                },
                phoneFilled: {
                  $sum: { $cond: ["$phoneEmpty", 0, 1] }
                },
                genderFilled: {
                  $sum: { $cond: ["$genderEmpty", 0, 1] }
                },
                dobFilled: {
                  $sum: { $cond: ["$dobEmpty", 0, 1] }
                },
                categoryFilled: {
                  $sum: { $cond: ["$categoryEmpty", 0, 1] }
                },
                addressFilled: {
                  $sum: { $cond: ["$addressEmpty", 0, 1] }
                },
                quotaFilled: {
                  $sum: { $cond: ["$quotaEmpty", 0, 1] }
                },
                fathernameFilled: {
                  $sum: { $cond: ["$fathernameEmpty", 0, 1] }
                },
                mothernameFilled: {
                  $sum: { $cond: ["$mothernameEmpty", 0, 1] }
                },
                degreeFilled: {
                  $sum: { $cond: ["$degreeEmpty", 0, 1] }
                },
                eligibilitynameFilled: {
                  $sum: { $cond: ["$eligibilitynameEmpty", 0, 1] }
                },
                minorsubFilled: {
                  $sum: { $cond: ["$minorsubEmpty", 0, 1] }
                },
                scholarshipFilled: {
                  $sum: { $cond: ["$scholarshipEmpty", 0, 1] }
                }
              }
            }
          ],
          
          // Students with missing fields
          studentsWithMissingFields: [
            {
              $addFields: {
                missingFields: {
                  $filter: {
                    input: [
                      { $cond: ["$photoEmpty", { field: "photo", label: "Photo" }, null] },
                      { $cond: ["$phoneEmpty", { field: "phone", label: "Phone Number" }, null] },
                      { $cond: ["$genderEmpty", { field: "gender", label: "Gender" }, null] },
                      { $cond: ["$dobEmpty", { field: "dob", label: "Date of Birth" }, null] },
                      { $cond: ["$categoryEmpty", { field: "category", label: "Category" }, null] },
                      { $cond: ["$addressEmpty", { field: "address", label: "Address" }, null] },
                      { $cond: ["$quotaEmpty", { field: "quota", label: "Quota" }, null] },
                      { $cond: ["$fathernameEmpty", { field: "fathername", label: "Father's Name" }, null] },
                      { $cond: ["$mothernameEmpty", { field: "mothername", label: "Mother's Name" }, null] },
                      { $cond: ["$degreeEmpty", { field: "degree", label: "Degree" }, null] },
                      { $cond: ["$eligibilitynameEmpty", { field: "eligibilityname", label: "Eligibility" }, null] },
                      { $cond: ["$minorsubEmpty", { field: "minorsub", label: "Minor Subject" }, null] },
                      { $cond: ["$scholarshipEmpty", { field: "scholarship", label: "Scholarship" }, null] }
                    ],
                    as: "item",
                    cond: { $ne: ["$$item", null] }
                  }
                }
              }
            },
            {
              $addFields: {
                missingCount: { $size: "$missingFields" }
              }
            },
            {
              $match: {
                missingCount: { $gt: 0 }
              }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                regno: 1,
                email: 1,
                department: 1,
                semester: 1,
                missingFields: 1,
                missingCount: 1
              }
            },
            {
              $sort: { missingCount: -1 }
            }
          ]
        }
      }
    ]);

    const summaryData = result[0].summary[0] || {};
    const totalStudents = summaryData.totalStudents || 0;
    const studentsWithMissingFields = result[0].studentsWithMissingFields || [];

    // Calculate field stats
    const fieldStats = [
      {
        field: "photo",
        label: "Photo",
        total: totalStudents,
        filled: summaryData.photoFilled || 0,
        empty: totalStudents - (summaryData.photoFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.photoFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "phone",
        label: "Phone Number",
        total: totalStudents,
        filled: summaryData.phoneFilled || 0,
        empty: totalStudents - (summaryData.phoneFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.phoneFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "gender",
        label: "Gender",
        total: totalStudents,
        filled: summaryData.genderFilled || 0,
        empty: totalStudents - (summaryData.genderFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.genderFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "dob",
        label: "Date of Birth",
        total: totalStudents,
        filled: summaryData.dobFilled || 0,
        empty: totalStudents - (summaryData.dobFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.dobFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "category",
        label: "Category",
        total: totalStudents,
        filled: summaryData.categoryFilled || 0,
        empty: totalStudents - (summaryData.categoryFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.categoryFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "address",
        label: "Address",
        total: totalStudents,
        filled: summaryData.addressFilled || 0,
        empty: totalStudents - (summaryData.addressFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.addressFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "fathername",
        label: "Father's Name",
        total: totalStudents,
        filled: summaryData.fathernameFilled || 0,
        empty: totalStudents - (summaryData.fathernameFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.fathernameFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      },
      {
        field: "mothername",
        label: "Mother's Name",
        total: totalStudents,
        filled: summaryData.mothernameFilled || 0,
        empty: totalStudents - (summaryData.mothernameFilled || 0),
        percentage: totalStudents > 0 
          ? parseFloat((((summaryData.mothernameFilled || 0) / totalStudents) * 100).toFixed(2))
          : 0
      }
    ].sort((a, b) => b.empty - a.empty); // Sort by most empty first

    const studentsWithCompleteData = totalStudents - studentsWithMissingFields.length;
    const completionPercentage = totalStudents > 0 
      ? parseFloat(((studentsWithCompleteData / totalStudents) * 100).toFixed(2))
      : 0;

    res.status(200).json({
      summary: {
        totalStudents,
        studentsWithCompleteData,
        studentsWithMissingData: studentsWithMissingFields.length,
        completionPercentage
      },
      fieldStats,
      studentsWithMissingFields
    });

  } catch (error) {
    console.error("Error fetching missing fields report:", error);
    res.status(500).json({
      message: "Error fetching report",
      error: error.message
    });
  }
};

// Get students without photos (OPTIMIZED)
exports.ds1getstudentswithoutphotos = async (req, res) => {
  try {
    const { colid } = req.query;
    
    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const students = await User.find({
      colid: parseInt(colid),
      role: "Student",
      $or: [
        { photo: { $exists: false } },
        { photo: null },
        { photo: "" }
      ]
    })
    .select("regno name email department semester")
    .lean(); // Use lean() for faster query

    res.status(200).json({
      total: students.length,
      students
    });

  } catch (error) {
    console.error("Error fetching students without photos:", error);
    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
};

// Bulk update photos from URL (OPTIMIZED - Using bulkWrite)
exports.ds1bulkupdatephotosfromurl = async (req, res) => {
  try {
    const { students, colid } = req.body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "students array is required" });
    }

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    // Prepare bulk operations
    const bulkOps = students.map(({ regno, photoUrl }) => ({
      updateOne: {
        filter: { 
          regno, 
          colid: parseInt(colid),
          role: "Student"
        },
        update: { $set: { photo: photoUrl } }
      }
    }));

    // Execute bulk write
    const result = await User.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} photos updated successfully`,
      updated: result.modifiedCount,
      matched: result.matchedCount,
      total: students.length
    });

  } catch (error) {
    console.error("Error in bulk photo update:", error);
    res.status(500).json({
      success: false,
      message: "Error updating photos",
      error: error.message
    });
  }
};