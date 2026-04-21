const mongoose = require('mongoose');

const aiworkflowSchema1 = new mongoose.Schema({
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
      default: 'POST'
    },
    paramLocation: {
      type: String,
      enum: ['query', 'body', 'both'],
      default: 'body'
    },

    // Response Data Path for Excel Export
    dataPath: {
      type: String,
      default: 'data'
    },
    excludeFields: {
      type: String,
      default: ''
    },

    // NEW: Step Execution Behavior
    executionType: {
      type: String,
      enum: ['auto', 'manual'], // auto = executes immediately, manual = waits for user input
      default: 'manual'
    },
    isSelectionOnly: { type: Boolean, default: false }, // New field: Data Collection Only

    // NEW: Conditional Execution
    isConditional: {
      type: Boolean,
      default: false
    },
    dependsOnStep: {
      type: Number, // Which step must complete before this can show
      default: null
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
        enum: ['text', 'number', 'email', 'date', 'select', 'boolean', 'dynamicDropdown'],
        default: 'text'
      },
      defaultValue: {
        type: String,
        default: ''
      },

      // For static select type
      options: [{
        type: String
      }],

      // For dynamicDropdown type - NEW!
      isDynamicDropdown: {
        type: Boolean,
        default: false
      },
      dropdownSourceStep: {
        type: Number, // Which step's response to use
        default: null
      },
      dropdownDataPath: {
        type: String, // Path to array in response (e.g., "data", "data.programs")
        default: 'data'
      },
      dropdownLabelField: {
        type: String, // Field to display in dropdown (e.g., "programName")
        default: ''
      },
      dropdownValueField: {
        type: String, // Field to use as value (e.g., "programCode")
        default: ''
      },

      // Use data from previous step (for hidden auto-fill)
      useFromPreviousStep: {
        type: Boolean,
        default: false
      },
      previousStepSerialNo: {
        type: Number
      },
      previousStepFieldPath: {
        type: String
      },

      // NEW: Multiple dependencies
      multipleSourceSteps: [{
        stepSerialNo: Number,
        fieldPath: String
      }]
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

const aiworkflowds1 = mongoose.model('aiworkflowds1', aiworkflowSchema1);
module.exports = aiworkflowds1;