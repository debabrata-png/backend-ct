const Donation = require('../Models/alumnidonationsds');
const User = require('../Models/user');

// Create Donation
exports.createalumnidonationsds = async (req, res) => {
    try {
        const { colid, email, ...donationData } = req.body;

        //console.log('Creating donation:', { colid, email, donationData });

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) {
            return res.status(404).json({ message: 'Alumni user not found or account not active' });
        }

        const newDonation = new Donation({
            ...donationData,
            colid: Number(colid),
            alumniId: user._id,
            adminStatus: 0, // Pending approval
            paymentStatus: 0, // Pending
            deliveryStatus: donationData.donationType === 'Kind' ? 0 : undefined
        });

        await newDonation.save();

        res.status(201).json({ 
            message: 'Donation submitted successfully! Please wait for admin approval.', 
            donation: newDonation 
        });
    } catch (error) {
        //console.error('Create donation error:', error);
        res.status(500).json({ message: 'Error submitting donation', error: error.message });
    }
};

// Get All Donations (Admin)
exports.getallalumnidonationsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const donations = await Donation.find({ colid: Number(colid) })
            .populate('alumniId', 'name email phone regno')
            .sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        //console.error('Get all donations error:', error);
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
};

// Get My Donations
exports.getmydonationsds = async (req, res) => {
    try {
        const { colid, email } = req.body;

        //console.log('Fetching donations for:', { colid, email });

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni' });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const donations = await Donation.find({ 
            alumniId: user._id, 
            colid: Number(colid) 
        }).sort({ createdAt: -1 });

        res.status(200).json(donations);
    } catch (error) {
        //console.error('Get my donations error:', error);
        res.status(500).json({ message: 'Error fetching your donations', error: error.message });
    }
};

// Get Pending Donations (Admin)
exports.getpendingdonationsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const donations = await Donation.find({ 
            adminStatus: 0, 
            colid: Number(colid) 
        })
        .populate('alumniId', 'name email phone')
        .sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        //console.error('Get pending donations error:', error);
        res.status(500).json({ message: 'Error fetching pending donations', error: error.message });
    }
};

// Approve Donation
exports.approvedonationds = async (req, res) => {
    try {
        const { id } = req.body;
        const donation = await Donation.findByIdAndUpdate(id, {
            adminStatus: 1,
            approvalDate: new Date()
        }, { new: true });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Donation approved successfully', donation });
    } catch (error) {
        //console.error('Approve donation error:', error);
        res.status(500).json({ message: 'Error approving donation', error: error.message });
    }
};

// Reject Donation
exports.rejectdonationds = async (req, res) => {
    try {
        const { id, reason } = req.body;
        const donation = await Donation.findByIdAndUpdate(id, { 
            adminStatus: 2,
            rejectionReason: reason || 'No reason provided'
        }, { new: true });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Donation rejected', donation });
    } catch (error) {
        //console.error('Reject donation error:', error);
        res.status(500).json({ message: 'Error rejecting donation', error: error.message });
    }
};

// Update Payment Status (Admin - Cash)
exports.updatepaymentstatusds = async (req, res) => {
    try {
        const { id, status } = req.body;
        const donation = await Donation.findByIdAndUpdate(id, { 
            paymentStatus: status 
        }, { new: true });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Payment status updated', donation });
    } catch (error) {
        //console.error('Update payment status error:', error);
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
};

// Update Delivery Status (Admin - Kind)
exports.updatedeliverystatusds = async (req, res) => {
    try {
        const { id, status } = req.body;
        const donation = await Donation.findByIdAndUpdate(id, { 
            deliveryStatus: status 
        }, { new: true });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Delivery status updated', donation });
    } catch (error) {
        //console.error('Update delivery status error:', error);
        res.status(500).json({ message: 'Error updating delivery status', error: error.message });
    }
};

// Get Stats
exports.getdonationstatsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const stats = await Donation.aggregate([
            { $match: { adminStatus: 1, colid: Number(colid) } },
            {
                $group: {
                    _id: "$donationType",
                    totalAmount: { $sum: "$amount" },
                    totalEstimatedValue: { $sum: "$estimatedValue" },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        //console.error('Get donation stats error:', error);
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

// Generate Receipt (Placeholder)
exports.generatereceiptds = async (req, res) => {
    try {
        const { id } = req.query;
        const donation = await Donation.findById(id).populate('alumniId', 'name email phone');
        
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // TODO: Implement PDF generation
        res.status(200).json({ 
            message: 'Receipt generation endpoint', 
            donation 
        });
    } catch (error) {
        //console.error('Generate receipt error:', error);
        res.status(500).json({ message: 'Error generating receipt', error: error.message });
    }
};

// MUST EXPORT ALL FUNCTIONS
module.exports = {
    createalumnidonationsds: exports.createalumnidonationsds,
    getallalumnidonationsds: exports.getallalumnidonationsds,
    getmydonationsds: exports.getmydonationsds,
    getpendingdonationsds: exports.getpendingdonationsds,
    approvedonationds: exports.approvedonationds,
    rejectdonationds: exports.rejectdonationds,
    updatepaymentstatusds: exports.updatepaymentstatusds,
    updatedeliverystatusds: exports.updatedeliverystatusds,
    getdonationstatsds: exports.getdonationstatsds,
    generatereceiptds: exports.generatereceiptds
};
