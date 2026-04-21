const PipelineStageag = require('../Models/PipelineStageag');

// Create Pipeline Stage
exports.createpipelinestageag = async (req, res) => {
    try {
        const { stagename, description, user, colid, isactive, name } = req.body;
        const newStage = new PipelineStageag({ stagename, description, user, colid, isactive, name });
        await newStage.save();
        res.status(201).json({ status: "Success", data: newStage });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
};

// Get All Pipeline Stages (Filtered by colid)
exports.getallpipelinestageag = async (req, res) => {
    try {
        const { colid } = req.query;
        const stages = await PipelineStageag.find({ colid });
        res.status(200).json({ status: "Success", data: stages });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
};

// Update Pipeline Stage
exports.updatepipelinestageag = async (req, res) => {
    try {
        const { id } = req.query; // Assuming id is passed as query param based on user pattern
        if (!id) return res.status(400).json({ status: 'Error', message: 'ID is required' });

        const updatedStage = await PipelineStageag.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStage) return res.status(404).json({ status: 'Error', message: 'Pipeline Stage not found' });

        res.status(200).json({ status: 'Success', message: 'Pipeline Stage Updated Successfully', data: updatedStage });
    } catch (err) {
        console.error('Update Pipeline Stage Error:', err);
        res.status(500).json({ status: 'Error', message: err.message });
    }
};

// Delete Pipeline Stage (Optional, but good to have)
exports.deletepipelinestageag = async (req, res) => {
    try {
        const { id } = req.params;
        await PipelineStageag.findByIdAndDelete(id);
        res.status(200).json({ status: 'Success', message: 'Pipeline Stage Deleted Successfully' });
    } catch (err) {
        console.error('Delete Pipeline Stage Error:', err);
        res.status(500).json({ status: 'Error', message: err.message });
    }
};
