const SubjectComponentConfig9ds = require('../Models/subjectcomponentconfig9ds');

// Create or update subject component config
exports.createorupdatesubjectconfig9ds = async (req, res) => {
  try {
    const { colid, user } = req.query;
    const configData = req.body;

    const filter = {
      colid: Number(colid),
      subjectcode: configData.subjectcode,
      semester: configData.semester,
      academicyear: configData.academicyear
    };

    const updateData = {
      ...configData,
      name: configData.name || 'system',
      user,
      colid: Number(colid),
      updatedat: new Date()
    };

    const result = await SubjectComponentConfig9ds.findOneAndUpdate(
      filter,
      { $set: updateData },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: result.isNew ? 'Subject configuration created successfully' : 'Subject configuration updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in createorupdatesubjectconfig9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save subject configuration',
      error: error.message
    });
  }
};

// List all subject configs
exports.listsubjectconfig9ds = async (req, res) => {
  try {
    const { colid, semester, academicyear } = req.query;

    const filter = {
      colid: Number(colid),
      isactive: true
    };

    if (semester) filter.semester = semester;
    if (academicyear) filter.academicyear = academicyear;

    const configs = await SubjectComponentConfig9ds.find(filter)
      .select('-__v')
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      count: configs.length,
      data: configs
    });
  } catch (error) {
    console.error('Error in listsubjectconfig9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list subject configurations',
      error: error.message
    });
  }
};

// Get single subject config
exports.getsubjectconfig9ds = async (req, res) => {
  try {
    const { colid, subjectcode, semester, academicyear } = req.query;

    const config = await SubjectComponentConfig9ds.findOne({
      colid: Number(colid),
      subjectcode,
      semester,
      academicyear
    }).lean();

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'Subject configuration not found'
      });
    }

    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error in getsubjectconfig9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get subject configuration',
      error: error.message
    });
  }
};

// Delete subject config
exports.deletesubjectconfig9ds = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedConfig = await SubjectComponentConfig9ds.findByIdAndDelete(id);

    if (!deletedConfig) {
      return res.status(404).json({
        success: false,
        message: 'Subject configuration not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject configuration deleted successfully'
    });
  } catch (error) {
    console.error('Error in deletesubjectconfig9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subject configuration',
      error: error.message
    });
  }
};

// Get active components using aggregation pipeline
exports.getactivecomponents9ds = async (req, res) => {
  try {
    const { colid, subjectcode, semester, academicyear, term } = req.query;

    // Define component metadata (used by frontend)
    const componentMetadata = {
      term1: [
        { name: 'term1periodictest', label: 'Term I Periodic Test', maxfield: 'term1periodictestmax', activefield: 'term1periodictestactive', obtainedfield: 'term1periodictestobtained' },
        { name: 'term1notebook', label: 'Term I Notebook', maxfield: 'term1notebookmax', activefield: 'term1notebookactive', obtainedfield: 'term1notebookobtained' },
        { name: 'term1enrichment', label: 'Term I Enrichment', maxfield: 'term1enrichmentmax', activefield: 'term1enrichmentactive', obtainedfield: 'term1enrichmentobtained' },
        { name: 'term1midexam', label: 'Term I Mid Exam', maxfield: 'term1midexammax', activefield: 'term1midexamactive', obtainedfield: 'term1midexamobtained' }
      ],
      term2: [
        { name: 'term2periodictest', label: 'Term II Periodic Test', maxfield: 'term2periodictestmax', activefield: 'term2periodictestactive', obtainedfield: 'term2periodictestobtained' },
        { name: 'term2notebook', label: 'Term II Notebook', maxfield: 'term2notebookmax', activefield: 'term2notebookactive', obtainedfield: 'term2notebookobtained' },
        { name: 'term2enrichment', label: 'Term II Enrichment', maxfield: 'term2enrichmentmax', activefield: 'term2enrichmentactive', obtainedfield: 'term2enrichmentobtained' },
        { name: 'term2annualexam', label: 'Term II Annual Exam', maxfield: 'term2annualexammax', activefield: 'term2annualexamactive', obtainedfield: 'term2annualexamobtained' }
      ]
    };

    // Use aggregation to get config and transform in one query
    const result = await SubjectComponentConfig9ds.aggregate([
      {
        $match: {
          colid: Number(colid),
          subjectcode: subjectcode,
          semester: semester,
          academicyear: academicyear,
          isactive: true
        }
      },
      {
        $project: {
          subjectcode: 1,
          subjectname: 1,
          // Project all component fields
          term1periodictestmax: 1,
          term1periodictestactive: 1,
          term1notebookmax: 1,
          term1notebookactive: 1,
          term1enrichmentmax: 1,
          term1enrichmentactive: 1,
          term1midexammax: 1,
          term1midexamactive: 1,
          term2periodictestmax: 1,
          term2periodictestactive: 1,
          term2notebookmax: 1,
          term2notebookactive: 1,
          term2enrichmentmax: 1,
          term2enrichmentactive: 1,
          term2annualexammax: 1,
          term2annualexamactive: 1
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subject configuration not found'
      });
    }

    const config = result[0];

    // Send raw config + metadata (frontend will filter active components)
    res.json({
      success: true,
      subjectcode: config.subjectcode,
      subjectname: config.subjectname,
      config: config,
      metadata: componentMetadata[term] || []
    });
  } catch (error) {
    console.error('Error in getactivecomponents9ds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get active components',
      error: error.message
    });
  }
};
