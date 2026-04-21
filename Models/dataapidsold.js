const mongoose = require('mongoose');

const dataapiSchema = new mongoose.Schema({
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    name: { type: String, required: true },
    apiname: { type: String },
    api: { type: String },
    domain: { type: String },
    method: { type: String, default: 'POST' },
    example: { type: String },
    status1: { type: String, default: 'Active' },
    comments: { type: String },
    
    // API Configuration
    isInternalApi: { type: Boolean, default: true },
    authType: { type: String, default: 'none' },
    authToken: { type: String },
    authHeader: { type: String },
    username: { type: String },
    password: { type: String },
    
    // Internal Parameters
    useColid: { type: Boolean, default: true },
    useUser: { type: Boolean, default: true },
    useToken: { type: Boolean, default: false },
    
    // Collection/Table
    collectionName: { type: String, required: true },
    
    // Request Configuration
    headers: { type: String, default: '{}' },
    timeout: { type: Number, default: 30000 },
    responseType: { type: String, default: 'json' },
    retryAttempts: { type: Number, default: 3 },
    retryDelay: { type: Number, default: 1000 },
    errorHandling: { type: String, default: 'stop' },
    
    // Field Configuration (NEW - This is what you needed!)
    requiredFields: { type: String, required: true },  // e.g., "name,email,phone"
    optionalFields: { type: String },                   // e.g., "address,notes"
    fieldTypes: { type: String, default: '{}' },        // JSON: {"name": "text", "age": "number"}
    fieldValidations: { type: String, default: '{}' },  // JSON: {"email": "email", "phone": "^[0-9]{10}$"}
    
    // Upload Configuration (NEW)
    supportsBulkUpload: { type: Boolean, default: true },
    supportsManualEntry: { type: Boolean, default: true },
    bulkUploadEndpoint: { type: String },               // e.g., "/api/v2/bulkuploadstudents"
    singleEntryEndpoint: { type: String },              // e.g., "/api/v2/createstudent"
    updateEndpoint: { type: String },                   // e.g., "/api/v2/updatestudent"
    deleteEndpoint: { type: String },                   // e.g., "/api/v2/deletestudent"
    exampleData: { type: String, default: '{}' }        // JSON example for reference
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt
});

// Indexes for faster queries
dataapiSchema.index({ user: 1, colid: 1 });
dataapiSchema.index({ apiname: 1 });
dataapiSchema.index({ collectionName: 1 });

module.exports = mongoose.model('dataapids', dataapiSchema);
