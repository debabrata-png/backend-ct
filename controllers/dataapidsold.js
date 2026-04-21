const dataapids = require('../Models/dataapids');

// Create new data API configuration
exports.createdataapi = async (req, res) => {
    try {
        const {
            user, colid, name, apiname, api, domain, method, example,
            status1, comments, isInternalApi, authType, authToken,
            authHeader, username, password, useColid, useUser, useToken,
            collectionName, headers, timeout, responseType, retryAttempts,
            retryDelay, errorHandling, requiredFields, optionalFields,
            fieldTypes, fieldValidations, supportsBulkUpload, supportsManualEntry,
            bulkUploadEndpoint, singleEntryEndpoint, updateEndpoint,
            deleteEndpoint, exampleData
        } = req.query;

        const newApi = new dataapids({
            user,
            colid: Number(colid),
            name,
            apiname,
            api,
            domain,
            method,
            example,
            status1,
            comments,
            isInternalApi: isInternalApi === 'true',
            authType,
            authToken,
            authHeader,
            username,
            password,
            useColid: useColid === 'true',
            useUser: useUser === 'true',
            useToken: useToken === 'true',
            collectionName,
            headers,
            timeout: Number(timeout),
            responseType,
            retryAttempts: Number(retryAttempts),
            retryDelay: Number(retryDelay),
            errorHandling,
            requiredFields,
            optionalFields,
            fieldTypes,
            fieldValidations,
            supportsBulkUpload: supportsBulkUpload === 'true',
            supportsManualEntry: supportsManualEntry === 'true',
            bulkUploadEndpoint,
            singleEntryEndpoint,
            updateEndpoint,
            deleteEndpoint,
            exampleData
        });

        await newApi.save();
        res.status(201).json({ status: 'success', message: 'Data API created successfully', data: newApi });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get all data APIs for a user
exports.getdataapis = async (req, res) => {
    try {
        const { user, colid } = req.query;
        
        const apis = await dataapids.find({
            colid: Number(colid),
            user: user
        }).sort({ createdAt: -1 });

        res.status(200).json({ status: 'success', data: apis });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Search data APIs by name or collection
exports.searchdataapis = async (req, res) => {
    try {
        const { searchstring, user, colid } = req.query;

        const apis = await dataapids.find({
            colid: Number(colid),
            user: user,
            $or: [
                { name: { $regex: searchstring, $options: 'i' } },
                { apiname: { $regex: searchstring, $options: 'i' } },
                { collectionName: { $regex: searchstring, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({ status: 'success', data: apis });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get single data API by ID
exports.getdataapibyid = async (req, res) => {
    try {
        const { id } = req.query;
        
        const api = await dataapids.findById(id);
        
        if (!api) {
            return res.status(404).json({ status: 'error', message: 'API not found' });
        }

        res.status(200).json({ status: 'success', data: api });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Update data API
exports.updatedataapi = async (req, res) => {
    try {
        const {
            id, name, apiname, api, domain, method, example,
            status1, comments, isInternalApi, authType, authToken,
            authHeader, username, password, useColid, useUser, useToken,
            collectionName, headers, timeout, responseType, retryAttempts,
            retryDelay, errorHandling, requiredFields, optionalFields,
            fieldTypes, fieldValidations, supportsBulkUpload, supportsManualEntry,
            bulkUploadEndpoint, singleEntryEndpoint, updateEndpoint,
            deleteEndpoint, exampleData
        } = req.query;

        const updatedApi = await dataapids.findByIdAndUpdate(
            id,
            {
                name,
                apiname,
                api,
                domain,
                method,
                example,
                status1,
                comments,
                isInternalApi: isInternalApi === 'true',
                authType,
                authToken,
                authHeader,
                username,
                password,
                useColid: useColid === 'true',
                useUser: useUser === 'true',
                useToken: useToken === 'true',
                collectionName,
                headers,
                timeout: Number(timeout),
                responseType,
                retryAttempts: Number(retryAttempts),
                retryDelay: Number(retryDelay),
                errorHandling,
                requiredFields,
                optionalFields,
                fieldTypes,
                fieldValidations,
                supportsBulkUpload: supportsBulkUpload === 'true',
                supportsManualEntry: supportsManualEntry === 'true',
                bulkUploadEndpoint,
                singleEntryEndpoint,
                updateEndpoint,
                deleteEndpoint,
                exampleData
            },
            { new: true }
        );

        if (!updatedApi) {
            return res.status(404).json({ status: 'error', message: 'API not found' });
        }

        res.status(200).json({ status: 'success', message: 'API updated successfully', data: updatedApi });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Delete data API
exports.deletedataapi = async (req, res) => {
    try {
        const { id } = req.query;
        
        const deletedApi = await dataapids.findByIdAndDelete(id);
        
        if (!deletedApi) {
            return res.status(404).json({ status: 'error', message: 'API not found' });
        }

        res.status(200).json({ status: 'success', message: 'API deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Duplicate data API
exports.duplicatedataapi = async (req, res) => {
    try {
        const { id } = req.query;
        
        const originalApi = await dataapids.findById(id);
        
        if (!originalApi) {
            return res.status(404).json({ status: 'error', message: 'API not found' });
        }

        const duplicatedApi = new dataapids({
            ...originalApi.toObject(),
            _id: undefined,
            name: originalApi.name + ' (Copy)',
            createdAt: undefined,
            updatedAt: undefined
        });

        await duplicatedApi.save();
        
        res.status(201).json({ status: 'success', message: 'API duplicated successfully', data: duplicatedApi });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
