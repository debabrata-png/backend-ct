const apids = require('../models/apids');

// Create/Configure API
exports.createapids = async (req, res) => {
  try {
    const apiConfig = new apids({
      name: req.query.name,
      user: req.query.user,
      colid: req.query.colid,
      apiname: req.query.apiname,
      api: req.query.api,
      domain: req.query.domain,
      method: req.query.method || 'GET',
      example: req.query.example,
      status1: req.query.status1 || 'Active',
      comments: req.query.comments,
      
      // NEW
      isInternalApi: req.query.isInternalApi === 'true',
      
      // Authentication
      authType: req.query.authType || 'none',
      authToken: req.query.authToken,
      authHeader: req.query.authHeader,
      username: req.query.username,
      password: req.query.password,
      
      // Internal params
      internalParams: req.query.internalParams || '{}',
      useColid: req.query.useColid !== 'false',
      useUser: req.query.useUser !== 'false',
      useToken: req.query.useToken === 'true',
      filterTemplate: req.query.filterTemplate || '{}',
      projectionTemplate: req.query.projectionTemplate || '{}',
      sortTemplate: req.query.sortTemplate || '{}',
      dataLimit: req.query.dataLimit || 1000,
      collectionName: req.query.collectionName,
      paramMapping: req.query.paramMapping || '[]',
      
      // Request config
      headers: req.query.headers || '{}',
      queryParams: req.query.queryParams || '{}',
      bodyTemplate: req.query.bodyTemplate,
      timeout: req.query.timeout || 30000,
      
      // Response handling
      responseType: req.query.responseType || 'json',
      dataPath: req.query.dataPath || '',
      pagination: req.query.pagination || '{"enabled":false}',
      
      // Field mapping
      fieldMappings: req.query.fieldMappings || '[]',
      includeFields: req.query.includeFields ? req.query.includeFields.split(',') : [],
      excludeFields: req.query.excludeFields ? req.query.excludeFields.split(',') : ['password', '__v', 'token'],
      
      // Excel config
      excelSheetName: req.query.excelSheetName || 'Data',
      excelFileName: req.query.excelFileName,
      autoFormatColumns: req.query.autoFormatColumns !== 'false',
      
      // Error handling
      retryAttempts: req.query.retryAttempts || 3,
      retryDelay: req.query.retryDelay || 1000,
      errorHandling: req.query.errorHandling || 'stop',

      // Dynamic parameters
      dynamicParams: req.query.dynamicParams || '[]',
      requiresUserInput: req.query.requiresUserInput === 'true'
    });

    await apiConfig.save();
    
    res.status(200).json({
      status: 'success',
      message: 'API configuration created successfully',
      data: apiConfig
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Get all APIs by user/colid
exports.getapidsbyuser = async (req, res) => {
  try {
    const { user, colid } = req.query;
    
    const apis = await apids.find({
      user: user,
      colid: colid,
      status1: 'Active'
    }).select('-password');
    
    res.status(200).json({
      status: 'success',
      count: apis.length,
      data: apis
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Search APIs by name ONLY
exports.searchapis = async (req, res) => {
  try {
    const { searchstring } = req.query;
    
    const query = {
      status1: 'Active'
    };
    
    if (searchstring) {
      query.$or = [
        { apiname: { $regex: searchstring, $options: 'i' } },
        { name: { $regex: searchstring, $options: 'i' } },
        { domain: { $regex: searchstring, $options: 'i' } }
      ];
    }
    
    const apis = await apids.find(query).select('-password');
    
    res.status(200).json({
      status: 'success',
      data: {
        classes: apis.map(api => ({
          id: api._id,
          apiname: api.apiname,
          title: api.name,
          domain: api.domain,
          method: api.method,
          config: api
        }))
      }
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Get single API configuration
exports.getapiconfig = async (req, res) => {
  try {
    const { id } = req.query;
    
    const apiConfig = await apids.findById(id).select('-password');
    
    if (!apiConfig) {
      return res.status(404).json({
        status: 'error',
        message: 'API configuration not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: apiConfig
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Update API configuration
exports.updateapids = async (req, res) => {
  try {
    const { id } = req.query;
    
    const updateData = { ...req.query, updatedAt: Date.now() };
    delete updateData.id;
    
    const updated = await apids.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'API configuration not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'API configuration updated successfully',
      data: updated
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Delete API configuration
exports.deleteapids = async (req, res) => {
  try {
    const { id } = req.query;
    
    const deleted = await apids.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'API configuration not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'API configuration deleted successfully'
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Duplicate API configuration
exports.duplicateapi = async (req, res) => {
  try {
    const { id } = req.query;
    
    const original = await apids.findById(id);
    
    if (!original) {
      return res.status(404).json({
        status: 'error',
        message: 'API configuration not found'
      });
    }

    const duplicate = new apids({
      ...original.toObject(),
      _id: undefined,
      name: `${original.name} (Copy)`,
      apiname: `${original.apiname}_copy`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    await duplicate.save();
    
    res.status(200).json({
      status: 'success',
      message: 'API configuration duplicated successfully',
      data: duplicate
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};

// Get all APIs (admin)
exports.getallapis = async (req, res) => {
  try {
    const apis = await apids.find().select('-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      count: apis.length,
      data: apis
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   message: error.message
    // });
  }
};
