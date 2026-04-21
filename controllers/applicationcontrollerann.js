const UnifiedAdmissionForm = require('../Models/appmodel1');
const MPrograms = require('../Models/mprograms');
const SubjectConfig = require('../Models/subjectann');
exports.createApplication = async (req, res) => {
    try {
        const formData = { ...req.body };
        const templateType = formData.templateType || "template1";

        // Define start ranges
        const ranges = {
            "template1": 1000,
            "template2": 2000,
            "template3": 3000
        };

        const start = ranges[templateType];
        const end = start + 999;

        // Find the latest number in that specific range
        const lastApp = await UnifiedAdmissionForm.findOne({
            applicationNo: { $gte: start, $lte: end }
        }).sort({ applicationNo: -1 });

        // Increment or start from base
        formData.applicationNo = lastApp ? lastApp.applicationNo + 1 : start;

        // Default mandatory fields if missing
        if (!formData.email) formData.email = `pending_${Date.now()}@example.com`;
        if (!formData.password) formData.password = "TemporaryPass123!";
        if (!formData.phone) formData.phone = "0000000000";

        const newApplication = new UnifiedAdmissionForm(formData);
        const savedApplication = await newApplication.save();

        return res.status(201).json({
            success: true,
            data: savedApplication // Contains the new applicationNo
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.getFormMetadata = async (req, res) => {
    try {
        const { colid } = req.query;

        // Fetch active programs for this college
        const programs = await MPrograms.find({ colid, status1: "Active" });

        // Fetch all subjects
        const subjects = await SubjectConfig.find({});

        res.status(200).json({
            success: true,
            programs,
            subjects
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};