const Job = require('../Models/alumnijobsds');
const User = require('../Models/user');

// Create Job (Alumni)
exports.createalumnijobsds = async (req, res) => {
    try {
        const { colid, email, ...jobData } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newJob = new Job({
            ...jobData,
            colid: Number(colid),
            postedBy: user._id
        });

        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ message: 'Error posting job', error: error.message });
    }
};

// Get All Active Jobs
exports.getallalumnijobsds = async (req, res) => {
    try {
        const { colid } = req.body;

        // Filter out closed jobs and expired deadlines
        const jobs = await Job.find({
            colid: Number(colid),
            status: 1,
            $or: [{ deadline: { $gte: new Date() } }, { deadline: null }]
        }).populate('postedBy', 'name email phone');

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
};

// Get My Jobs
exports.getmyjobsds = async (req, res) => {
    try {
        const { colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const jobs = await Job.find({ postedBy: user._id, colid: Number(colid) });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your jobs', error: error.message });
    }
};

// Filter Jobs
exports.filteralumnijobsds = async (req, res) => {
    try {
        const { type, location, workMode, colid } = req.query;
        const filter = { status: 1, colid: Number(colid) };

        if (type) filter.type = type;
        if (location) filter.location = new RegExp(location, 'i');
        if (workMode) filter.workMode = workMode;

        const jobs = await Job.find(filter).populate('postedBy', 'name');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering jobs', error: error.message });
    }
};

// Get Single Job
exports.getsinglejobds = async (req, res) => {
    try {
        const { id, colid } = req.query;

        // Increment view count
        const job = await Job.findOneAndUpdate(
            { _id: id, colid: Number(colid) },
            { $inc: { views: 1 } },
            { new: true }
        ).populate('postedBy', 'name email linkedInProfile');

        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job', error: error.message });
    }
};

// Update Job
exports.updatealumnijobsds = async (req, res) => {
    try {
        const { id, colid, email, ...updateData } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const job = await Job.findOne({ _id: id, postedBy: user._id, colid: Number(colid) });
        if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

        Object.assign(job, updateData);
        await job.save();

        res.status(200).json({ message: 'Job updated', job });
    } catch (error) {
        res.status(500).json({ message: 'Error updating job', error: error.message });
    }
};

// Close Job
exports.closealumnijobsds = async (req, res) => {
    try {
        const { id, colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const job = await Job.findOne({ _id: id, postedBy: user._id, colid: Number(colid) });
        if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

        job.status = 0;
        await job.save();

        res.status(200).json({ message: 'Job closed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error closing job', error: error.message });
    }
};

// Delete Job
exports.deletealumnijobsds = async (req, res) => {
    try {
        const { id, colid, email } = req.query;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const result = await Job.deleteOne({ _id: id, postedBy: user._id, colid: Number(colid) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Job not found or unauthorized' });

        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
};

// Get Job Stats (Admin)
exports.getjobstatsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const stats = await Job.aggregate([
            { $match: { status: 1, colid: Number(colid) } },
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};
