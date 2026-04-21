const Gptapikeyds = require('../Models/gptapikeyds');

// Get API key by user and colid
exports.getapikeydsbycoldids = async (req, res) => {
  try {
    const { colid, user } = req.query;

    if (!colid || !user) {
      return res.status(400).json({
        success: false,
        message: 'colid and user are required',
      });
    }

    const apiKey = await Gptapikeyds.findOne({
      colid: parseInt(colid),
      user,
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        message: 'API key not found',
      });
    }

    res.status(200).json({
      success: true,
      data: apiKey,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add or update API key
exports.addorupdateapikeyds = async (req, res) => {
  try {
    const { name, user, colid, facultyid, defaultapikey, personalapikey, usepersonalkey, apikeyname, personalapikeyname, monthlylimit } = req.body;

    if (!colid || !user || !name) {
      return res.status(400).json({
        success: false,
        message: 'name, user, and colid are required',
      });
    }

    let apiKey = await Gptapikeyds.findOne({
      colid: parseInt(colid),
      user,
    });

    if (apiKey) {
      // Update existing
      apiKey.name = name;
      apiKey.facultyid = facultyid || apiKey.facultyid;
      apiKey.defaultapikey = defaultapikey || apiKey.defaultapikey;
      if (personalapikey) apiKey.personalapikey = personalapikey;
      if (usepersonalkey !== undefined) apiKey.usepersonalkey = usepersonalkey;
      if (apikeyname) apiKey.apikeyname = apikeyname;
      if (personalapikeyname) apiKey.personalapikeyname = personalapikeyname;
      if (monthlylimit) apiKey.monthlylimit = monthlylimit;
      apiKey.updatedat = new Date();

      const updatedApiKey = await apiKey.save();
      return res.status(200).json({
        success: true,
        message: 'API key updated successfully',
        data: updatedApiKey,
      });
    } else {
      // Create new
      const newApiKey = new Gptapikeyds({
        name,
        user,
        colid: parseInt(colid),
        facultyid,
        defaultapikey,
        personalapikey,
        usepersonalkey,
        apikeyname,
        personalapikeyname,
        monthlylimit,
      });

      const savedApiKey = await newApiKey.save();
      return res.status(201).json({
        success: true,
        message: 'API key created successfully',
        data: savedApiKey,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get API key (sensitive - only for authorized use)
exports.getactiveapikeyds = async (req, res) => {
  try {
    const { colid, user } = req.query;

    if (!colid || !user) {
      return res.status(400).json({
        success: false,
        message: 'colid and user are required',
      });
    }

    const apiKey = await Gptapikeyds.findOne({
      colid: parseInt(colid),
      user,
      isactive: true,
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        message: 'No active API key found',
      });
    }

    // Return the key to use (personal or default)
    const keyToUse = apiKey.usepersonalkey && apiKey.personalapikey ? apiKey.personalapikey : apiKey.defaultapikey;
    const keyName = apiKey.usepersonalkey && apiKey.personalapikey ? apiKey.personalapikeyname : apiKey.apikeyname;

    res.status(200).json({
      success: true,
      data: {
        geminiApiKey: keyToUse,
        keyName: keyName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
