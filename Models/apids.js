const mongoose = require('mongoose');

const apidsschema = new mongoose.Schema({
  // Basic fields
  name: {
    type: String,
    required: [true, 'Please enter name']
  },
  user: {
    type: String,
    required: [true, 'Please enter user']
  },
  colid: {
    type: Number,
    required: [true, 'Please enter colid']
  },
  apiname: {
    type: String
  },
  api: {
    type: String,
    required: [true, 'API endpoint required']
  },
  domain: {
    type: String
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    default: 'GET'
  },
  example: {
    type: String
  },
  status1: {
    type: String,
    default: 'Active'
  },
  comments: {
    type: String
  },

  // NEW: Internal API flag
  isInternalApi: {
    type: Boolean,
    default: false
  },

  // Authentication fields
  authType: {
    type: String,
    enum: ['none', 'bearer', 'apikey', 'basic', 'oauth'],
    default: 'none'
  },
  authToken: {
    type: String
  },
  authHeader: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },

  // Internal params
  internalParams: {
    type: String,
    default: '{}'
  },
  useColid: {
    type: Boolean,
    default: true
  },
  useUser: {
    type: Boolean,
    default: true
  },
  useToken: {
    type: Boolean,
    default: false
  },
  filterTemplate: {
    type: String,
    default: '{}'
  },
  projectionTemplate: {
    type: String,
    default: '{}'
  },
  sortTemplate: {
    type: String,
    default: '{}'
  },
  dataLimit: {
    type: Number,
    default: 1000
  },
  collectionName: {
    type: String
  },
  paramMapping: {
    type: String,
    default: '[]'
  },

  // Request config
  headers: {
    type: String,
    default: '{}'
  },
  queryParams: {
    type: String,
    default: '{}'
  },
  bodyTemplate: {
    type: String
  },
  timeout: {
    type: Number,
    default: 30000
  },

  // Response handling
  responseType: {
    type: String,
    enum: ['json', 'xml', 'csv', 'text'],
    default: 'json'
  },
  dataPath: {
    type: String,
    default: ''
  },
  pagination: {
    type: String,
    default: '{"enabled":false}'
  },

  // Field mapping
  fieldMappings: {
    type: String,
    default: '[]'
  },
  includeFields: {
    type: [String],
    default: []
  },
  excludeFields: {
    type: [String],
    default: ['password', '__v', 'token']
  },

  // Excel config
  excelSheetName: {
    type: String,
    default: 'Data'
  },
  excelFileName: {
    type: String
  },
  autoFormatColumns: {
    type: Boolean,
    default: true
  },

  // Error handling
  retryAttempts: {
    type: Number,
    default: 3
  },
  retryDelay: {
    type: Number,
    default: 1000
  },
  errorHandling: {
    type: String,
    enum: ['skip', 'stop', 'continue'],
    default: 'stop'
  },

  // Dynamic Parameter Configuration
  dynamicParams: {
    type: String,
    default: '[]'
  },
  requiresUserInput: {
    type: Boolean,
    default: false
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const apids = mongoose.model('apids', apidsschema);
module.exports = apids;
