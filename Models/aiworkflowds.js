const mongoose = require('mongoose');

const aiworkflowSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    required: true
  },
  colid: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Draft'],
    default: 'Active'
  },

  // Workflow Steps (Multiple APIs)
  steps: [{
    serialNo: {
      type: Number,
      required: true
    },
    stepName: {
      type: String,
      required: true
    },
    
    // API Configuration
    isInternalApi: {
      type: Boolean,
      default: true
    },
    domain: {
      type: String,
      default: ''
    },
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      enum: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'POST'
    },
    paramLocation: {
      type: String,
      enum: ['query', 'body', 'both'],
      default: 'body'
    },

    // Required Fields for Form Generation
    requiredFields: [{
      fieldName: {
        type: String,
        required: true
      },
      fieldLabel: {
        type: String,
        required: true
      },
      fieldType: {
        type: String,
        enum: ['text', 'number', 'email', 'date', 'select', 'boolean'],
        default: 'text'
      },
      defaultValue: {
        type: String,
        default: ''
      },
      // For select type
      options: [{
        type: String
      }],
      // Use data from previous step
      useFromPreviousStep: {
        type: Boolean,
        default: false
      },
      previousStepSerialNo: {
        type: Number
      },
      previousStepFieldPath: {
        type: String
      }
    }],

    // Optional: Authentication
    authType: {
      type: String,
      enum: ['none', 'bearer', 'apikey', 'basic'],
      default: 'none'
    },
    authToken: {
      type: String,
      default: ''
    }
  }],

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

const aiworkflowds = mongoose.model('aiworkflowds', aiworkflowSchema);
module.exports = aiworkflowds;
