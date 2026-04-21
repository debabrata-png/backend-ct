const mongoose = require('mongoose');

const PipelineStageagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    stagename: { type: String },
    description: {
        type: String,
    },
    isactive: {
        type: Boolean,
        default: true
    },
    is_final_stage: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PipelineStageag', PipelineStageagSchema);
