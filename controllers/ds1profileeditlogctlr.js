const Profileeditlogds = require("../Models/profileeditlogds");
const User = require("../Models/user");

// Helper function to get field category
const getFieldCategory = (fieldName) => {
  const personalFields = ['phone', 'gender', 'photo', 'category', 'address', 'quota', 'dob'];
  const familyFields = ['fathername', 'mothername'];
  const academicFields = ['eligibilityname', 'degree', 'minorsub', 'vocationalsub', 'mdcsub', 'othersub'];
  const meritFields = ['merit', 'obtain', 'bonus', 'weightage', 'ncctype', 'isdisabled', 'scholarship'];
  
  if (personalFields.includes(fieldName)) return "Personal";
  if (familyFields.includes(fieldName)) return "Family";
  if (academicFields.includes(fieldName)) return "Academic";
  if (meritFields.includes(fieldName)) return "Merit";
  return "Personal";
};

// Helper function to get human-readable field label
const getFieldLabel = (fieldName) => {
  const labels = {
    phone: "Phone Number",
    gender: "Gender",
    photo: "Photo URL",
    category: "Category",
    address: "Address",
    quota: "Quota",
    dob: "Date of Birth",
    fathername: "Father's Name",
    mothername: "Mother's Name",
    eligibilityname: "Eligibility Name",
    degree: "Degree",
    minorsub: "Minor Subject",
    vocationalsub: "Vocational Subject",
    mdcsub: "MDC Subject",
    othersub: "Other Subject",
    merit: "Merit",
    obtain: "Marks Obtained",
    bonus: "Bonus Marks",
    weightage: "Weightage",
    ncctype: "NCC Type",
    isdisabled: "Is Disabled",
    scholarship: "Scholarship"
  };
  
  return labels[fieldName] || fieldName;
};

// Create edit log
exports.ds1createeditlog = async (req, res) => {
  try {
    const { 
      colid, 
      name, 
      regno, 
      changes, 
      changeType, 
      notes 
    } = req.body;

    if (!colid || !name || !regno || !changes || changes.length === 0) {
      return res.status(400).json({ 
        message: "colid, name, regno, and changes are required" 
      });
    }

    // Add category and label to each change
    const enrichedChanges = changes.map(change => ({
      ...change,
      category: getFieldCategory(change.fieldName),
      fieldLabel: getFieldLabel(change.fieldName)
    }));

    const log = await Profileeditlogds.create({
      colid: parseInt(colid),
      name,
      regno,
      changes: enrichedChanges,
      changeType: changeType || "Update",
      totalFieldsChanged: enrichedChanges.length,
      notes
    });

    res.status(201).json({ 
      message: "Edit log created successfully", 
      data: log 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating edit log", 
      error: error.message 
    });
  }
};

// Get all edit logs with filters
exports.ds1getalleditlogs = async (req, res) => {
  try {
    const { 
      colid, 
      name, 
      regno, 
      startDate, 
      endDate, 
      category,
      page = 1, 
      limit = 50 
    } = req.query;

    // Build query
    const query = {};
    
    if (colid) query.colid = parseInt(colid);
    if (name) query.name = { $regex: name, $options: 'i' };
    if (regno) query.regno = { $regex: regno, $options: 'i' };
    
    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    // Category filter
    if (category) {
      query['changes.category'] = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const logs = await Profileeditlogds.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Profileeditlogds.countDocuments(query);

    res.status(200).json({ 
      data: logs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching edit logs", 
      error: error.message 
    });
  }
};

// Get edit logs for a specific student
exports.ds1getstudenteditlogs = async (req, res) => {
  try {
    const { regno, colid, limit = 20 } = req.query;

    if (!regno) {
      return res.status(400).json({ message: "regno is required" });
    }

    const query = { regno };
    if (colid) query.colid = parseInt(colid);

    const logs = await Profileeditlogds.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ 
      data: logs,
      total: logs.length
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching student edit logs", 
      error: error.message 
    });
  }
};

// Get edit log statistics
exports.ds1geteditlogstats = async (req, res) => {
  try {
    const { colid, startDate, endDate } = req.query;

    const query = {};
    if (colid) query.colid = parseInt(colid);
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const stats = await Profileeditlogds.aggregate([
      { $match: query },
      {
        $facet: {
          totalEdits: [
            { $count: "count" }
          ],
          uniqueStudents: [
            { $group: { _id: "$regno" } },
            { $count: "count" }
          ],
          editsByCategory: [
            { $unwind: "$changes" },
            { 
              $group: { 
                _id: "$changes.category", 
                count: { $sum: 1 } 
              } 
            }
          ],
          editsByDate: [
            {
              $group: {
                _id: { 
                  $dateToString: { 
                    format: "%Y-%m-%d", 
                    date: "$createdAt" 
                  } 
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: -1 } },
            { $limit: 30 }
          ],
          topEditors: [
            {
              $group: {
                _id: {
                  name: "$name",
                  regno: "$regno"
                },
                editCount: { $sum: 1 },
                fieldsChanged: { $sum: "$totalFieldsChanged" }
              }
            },
            { $sort: { editCount: -1 } },
            { $limit: 10 }
          ],
          mostEditedFields: [
            { $unwind: "$changes" },
            {
              $group: {
                _id: "$changes.fieldLabel",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ]
        }
      }
    ]);

    res.status(200).json({ 
      data: {
        totalEdits: stats[0].totalEdits[0]?.count || 0,
        uniqueStudents: stats[0].uniqueStudents[0]?.count || 0,
        editsByCategory: stats[0].editsByCategory,
        editsByDate: stats[0].editsByDate,
        topEditors: stats[0].topEditors,
        mostEditedFields: stats[0].mostEditedFields
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching edit log statistics", 
      error: error.message 
    });
  }
};

// Get specific edit log by ID
exports.ds1geteditlogbyid = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const log = await Profileeditlogds.findById(id);

    if (!log) {
      return res.status(404).json({ message: "Edit log not found" });
    }

    res.status(200).json({ data: log });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching edit log", 
      error: error.message 
    });
  }
};

// Delete edit logs (admin only)
exports.ds1deleteeditlogs = async (req, res) => {
  try {
    const { ids } = req.query; // Comma-separated IDs

    if (!ids) {
      return res.status(400).json({ message: "ids are required" });
    }

    const idArray = ids.split(',').map(id => id.trim());

    const result = await Profileeditlogds.deleteMany({ _id: { $in: idArray } });

    res.status(200).json({ 
      message: `${result.deletedCount} edit logs deleted successfully`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting edit logs", 
      error: error.message 
    });
  }
};

// Export helper functions for use in other controllers
exports.getFieldCategory = getFieldCategory;
exports.getFieldLabel = getFieldLabel;
