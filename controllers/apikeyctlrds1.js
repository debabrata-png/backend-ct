const apikeyds1 = require('../Models/apikeyds1.js');
const crypto = require('crypto');

// Create API key
exports.createapikeyds1 = async (req, res) => {
    try {
        req.body.colid = Number(req.body.colid);
        
        if (!req.body.api_key) {
            req.body.api_key = 'crm_' + crypto.randomBytes(32).toString('hex');
        }
        
        const apiKey = await apikeyds1.create(req.body);
        
        //console.log(`✅ API key created: ${apiKey.key_name}`);
        //console.log(`API Key: ${apiKey.api_key}`);
        //console.log(`Permissions: ${apiKey.permissions.join(', ')}`);
        
        res.status(201).json({ success: true, data: apiKey });
    } catch (err) {
        // console.error('Error in createapikeyds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all API keys
exports.getallapikeysds1 = async (req, res) => {
    try {
        const { colid, is_active } = req.query;
        
        let query = { colid: Number(colid) };
        
        if (is_active) query.is_active = is_active;
        
        const apiKeys = await apikeyds1.find(query).sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, data: apiKeys, count: apiKeys.length });
    } catch (err) {
        // console.error('Error in getallapikeysds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get API key by ID
exports.getapikeybyidds1 = async (req, res) => {
    try {
        const { id } = req.params;
        
        const apiKey = await apikeyds1.findById(id);
        
        if (!apiKey) {
            return res.status(404).json({ success: false, message: 'API key not found' });
        }
        
        res.status(200).json({ success: true, data: apiKey });
    } catch (err) {
        // console.error('Error in getapikeybyidds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Update API key
exports.updateapikeyds1 = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }
        
        delete req.body.api_key;
        
        const apiKey = await apikeyds1.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!apiKey) {
            return res.status(404).json({ success: false, message: 'API key not found' });
        }
        
        res.status(200).json({ success: true, data: apiKey });
    } catch (err) {
        // console.error('Error in updateapikeyds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Delete API key
exports.deleteapikeyds1 = async (req, res) => {
    try {
        const { id } = req.params;
        
        const apiKey = await apikeyds1.findByIdAndDelete(id);
        
        if (!apiKey) {
            return res.status(404).json({ success: false, message: 'API key not found' });
        }
        
        res.status(200).json({ success: true, message: 'API key deleted successfully' });
    } catch (err) {
        // console.error('Error in deleteapikeyds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Regenerate API key
exports.regenerateapikeyds1 = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        
        const apiKey = await apikeyds1.findById(id);
        
        if (!apiKey) {
            return res.status(404).json({ success: false, message: 'API key not found' });
        }
        
        const newKey = 'crm_' + crypto.randomBytes(32).toString('hex');
        apiKey.api_key = newKey;
        apiKey.usage_count = 0;
        apiKey.last_used = null;
        
        await apiKey.save();
        
        //console.log(`✅ API key regenerated: ${apiKey.key_name}`);
        //console.log(`New API Key: ${newKey}`);
        
        res.status(200).json({ success: true, data: apiKey });
    } catch (err) {
        // console.error('Error in regenerateapikeyds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Revoke API key
exports.revokeapikeyds1 = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        
        const apiKey = await apikeyds1.findByIdAndUpdate(
            id,
            { is_active: 'No' },
            { new: true }
        );
        
        if (!apiKey) {
            return res.status(404).json({ success: false, message: 'API key not found' });
        }
        
        //console.log(`✅ API key revoked: ${apiKey.key_name}`);
        
        res.status(200).json({ success: true, data: apiKey, message: 'API key revoked' });
    } catch (err) {
        // console.error('Error in revokeapikeyds1:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get API key usage statistics
exports.getapikeyusagestatistics = async (req, res) => {
    try {
        const { id } = req.params;
        
        const apiKey = await apikeyds1.findById(id);
        
        if (!apiKey) {
            return res.status(404).json({ success: false, message: 'API key not found' });
        }
        
        res.status(200).json({
            success: true,
            data: {
                key_name: apiKey.key_name,
                usage_count: apiKey.usage_count,
                last_used: apiKey.last_used,
                is_active: apiKey.is_active,
                valid_until: apiKey.valid_until,
                created_at: apiKey.createdAt
            }
        });
    } catch (err) {
        // console.error('Error in getapikeyusagestatistics:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
