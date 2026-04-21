const User = require('../Models/user');
const AlumniProfile = require('../Models/alumniprofileds');
const AlumniDocument = require('../Models/alumnidocumentsds');

// Submit Alumni Application (Public - No Auth Required)
exports.submitAlumniApplication = async (req, res) => {
    try {
        const {
            colid,
            name,
            email,
            password,
            phone,
            regno,
            department,
            programcode,
            admissionyear,
            graduationYear,
            company,
            designation,
            workExperience,
            location,
            linkedInProfile,
            bio,
            // Document URLs
            idCardUrl,
            marksheetUrl,
            aadhaarUrl
        } = req.body;

        // Validation
        if (!idCardUrl || !marksheetUrl || !aadhaarUrl) {
            return res.status(400).json({ message: 'All document URLs are required (ID Card, Marksheet, Aadhaar)' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create User with status=0 (pending), lastlogin=null
        const newUser = new User({
            name,
            email,
            password, // Plain text password
            phone: phone || 'N/A',
            regno: regno || 'N/A',
            role: 'Alumni',
            programcode: programcode || 'N/A',
            admissionyear: admissionyear || 'N/A',
            semester: 'N/A',
            section: 'N/A',
            department: department || 'N/A',
            colid: Number(colid),
            status: 0, // Pending approval
            lastlogin: null // Will be set upon approval
        });

        const savedUser = await newUser.save();

        // Create Alumni Profile
        const newProfile = new AlumniProfile({
            userId: savedUser._id,
            colid: Number(colid),
            graduationYear,
            company: company || null,
            designation: designation || null,
            workExperience: workExperience || null,
            location: location || null,
            linkedInProfile: linkedInProfile || null,
            bio: bio || null
        });

        await newProfile.save();

        // Create 3 Document Records
        const documents = [
            {
                colid: Number(colid),
                alumniId: savedUser._id,
                documentName: 'ID Card',
                documentType: 'ID Card',
                fileUrl: idCardUrl,
                status: 1
            },
            {
                colid: Number(colid),
                alumniId: savedUser._id,
                documentName: 'Marksheet',
                documentType: 'Marksheet',
                fileUrl: marksheetUrl,
                status: 1
            },
            {
                colid: Number(colid),
                alumniId: savedUser._id,
                documentName: 'Aadhaar Card',
                documentType: 'Aadhaar Card',
                fileUrl: aadhaarUrl,
                status: 1
            }
        ];

        await AlumniDocument.insertMany(documents);

        res.status(201).json({
            message: 'Application submitted successfully! Please wait for admin approval.',
            applicationId: savedUser._id
        });
    } catch (error) {
        //console.error('Application submission error:', error);
        res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
};

// Get All Applications (Admin) - Returns ALL applications (Pending, Approved, Rejected)
exports.getAllApplications = async (req, res) => {
    try {
        const { colid } = req.body;

        if (!colid) {
            return res.status(400).json({ message: 'colid is required' });
        }

        // Find all alumni users
        const applications = await User.find({
            colid: Number(colid),
            role: 'Alumni'
        }).select('-password').sort({ createdAt: -1 });

        // Populate with profile and documents
        const applicationsWithDetails = await Promise.all(
            applications.map(async (user) => {
                try {
                    const profile = await AlumniProfile.findOne({ userId: user._id });
                    const documents = await AlumniDocument.find({ alumniId: user._id });
                    
                    // Map status to string
                    let statusText = 'Pending';
                    if (user.status === 1) statusText = 'Approved';
                    else if (user.status === 2) statusText = 'Rejected';

                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        regno: user.regno,
                        department: user.department,
                        programcode: user.programcode,
                        admissionyear: user.admissionyear,
                        colid: user.colid,
                        status: statusText,
                        adminStatus: user.status,
                        createdAt: user.createdAt,
                        graduationYear: profile?.graduationYear || null,
                        company: profile?.company || null,
                        designation: profile?.designation || null,
                        workExperience: profile?.workExperience || null,
                        location: profile?.location || null,
                        linkedInProfile: profile?.linkedInProfile || null,
                        bio: profile?.bio || null,
                        documents: documents || [],
                        rejectionReason: user.rejectionReason || null
                    };
                } catch (err) {
                    //console.error('Error processing application:', err);
                    return null;
                }
            })
        );

        // Filter out null entries
        const validApplications = applicationsWithDetails.filter(app => app !== null);

        res.status(200).json(validApplications);
    } catch (error) {
        //console.error('Fetch applications error:', error);
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};

// Approve Application (Admin)
exports.approveApplication = async (req, res) => {
    try {
        const { id, colid } = req.body;

        if (!id || !colid) {
            return res.status(400).json({ message: 'id and colid are required' });
        }

        // Find user
        const user = await User.findOne({ _id: id, colid: Number(colid), status: 0 });
        if (!user) {
            return res.status(404).json({ message: 'Pending application not found' });
        }

        // Calculate lastlogin (1 month from now)
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        // Update user status and lastlogin
        user.status = 1;
        user.lastlogin = oneMonthLater;
        await user.save();

        res.status(200).json({
            message: 'Application approved successfully! Alumni account is now active.',
            user: { ...user.toObject(), password: undefined }
        });
    } catch (error) {
        //console.error('Approve application error:', error);
        res.status(500).json({ message: 'Error approving application', error: error.message });
    }
};

// Reject Application (Admin)
exports.rejectApplication = async (req, res) => {
    try {
        const { id, reason, colid } = req.body;

        if (!id || !colid) {
            return res.status(400).json({ message: 'id and colid are required' });
        }

        // Find user
        const user = await User.findOne({ _id: id, colid: Number(colid), status: 0 });
        if (!user) {
            return res.status(404).json({ message: 'Pending application not found' });
        }

        // Update status to rejected (2) and store reason
        user.status = 2;
        user.rejectionReason = reason || 'No reason provided';
        await user.save();

        res.status(200).json({ message: 'Application rejected successfully' });
    } catch (error) {
        //console.error('Reject application error:', error);
        res.status(500).json({ message: 'Error rejecting application', error: error.message });
    }
};

// Export all functions properly
module.exports = {
    submitAlumniApplication: exports.submitAlumniApplication,
    getAllApplications: exports.getAllApplications,
    approveApplication: exports.approveApplication,
    rejectApplication: exports.rejectApplication
};
