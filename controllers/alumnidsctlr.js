const User = require('../Models/user');
const AlumniProfile = require('../Models/alumniprofileds');

// Create Alumni Account (Admin/Public)
exports.createalumnids = async (req, res) => {
    try {
        const {
            email, password, name, phone, regno, department, programcode, admissionyear,
            // Alumni profile fields
            graduationYear, company, designation, workExperience, linkedInProfile, location
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Calculate lastlogin (1 month from now)
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        // Create User with role='Alumni' (plain password, matching existing architecture)
        const newUser = new User({
            name,
            email,
            password, // Plain text password (matching existing CRM pattern)
            phone: phone || 'N/A',
            regno: regno || 'N/A',
            role: 'Alumni',
            programcode: programcode || 'N/A',
            admissionyear: admissionyear || 'N/A',
            semester: 'N/A',
            section: 'N/A',
            department: department || 'N/A',
            colid: Number(req.body.colid) || 1,
            status: 1, // Already approved
            lastlogin: oneMonthLater // 1 month validity
        });

        const savedUser = await newUser.save();

        // Create Alumni Profile with colid
        const newProfile = new AlumniProfile({
            userId: savedUser._id,
            colid: Number(req.body.colid) || 1,
            graduationYear,
            company,
            designation,
            workExperience,
            linkedInProfile,
            location
        });

        await newProfile.save();

        res.status(201).json({
            message: 'Alumni account created successfully',
            user: { ...savedUser.toObject(), password: undefined },
            profile: newProfile
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating alumni', error: error.message });
    }
};

// Alumni Login
exports.loginalumnids = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with Alumni role
        const user = await User.findOne({ email, role: 'Alumni' });
        if (!user) {
            return res.status(404).json({ message: 'Alumni account not found' });
        }

        if (user.status === 0) {
            return res.status(403).json({ message: 'Account is inactive. Contact admin.' });
        }

        // Plain password comparison (matching existing architecture)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Fetch alumni profile
        const profile = await AlumniProfile.findOne({ userId: user._id });

        // Return data in format expected by global1.js (matching authctlr.js pattern)
        const { colid, name, email: userEmail, regno, role } = user;
        return res.status(200).json({
            colid,
            name,
            email: userEmail,
            regno,
            role,
            profile
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

// Get All Alumni (Admin)
exports.getalumnids = async (req, res) => {
    try {
        const { colid } = req.body;
        const alumni = await User.find({ colid: Number(colid), role: 'Alumni', status: 1 }).select('-password');
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching alumni', error: error.message });
    }
};

// Get Alumni Profile (Logged-in Alumni)
exports.getalumniprofilds = async (req, res) => {
    try {
        const { colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const profile = await AlumniProfile.findOne({ userId: user._id, colid: Number(colid) });

        // Combine user and profile data
        res.status(200).json({
            ...user.toObject(),
            ...profile?.toObject()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

// Update Alumni Profile
exports.updatealumniprofilds = async (req, res) => {
    try {
        const { colid, email, name, phone, ...profileData } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update User fields (name, phone)
        const userUpdates = {};
        if (name) userUpdates.name = name;
        if (phone) userUpdates.phone = phone;

        if (Object.keys(userUpdates).length > 0) {
            await User.findByIdAndUpdate(user._id, userUpdates);
        }

        // Update or create Alumni Profile with colid
        const profile = await AlumniProfile.findOneAndUpdate(
            { userId: user._id },
            { ...profileData, colid: Number(colid) },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// Search Alumni
exports.searchalumnids = async (req, res) => {
    try {
        const { query, colid } = req.query;
        const searchRegex = new RegExp(query, 'i');

        // Search in User model with colid filter
        const users = await User.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
                { department: searchRegex }
            ],
            colid: Number(colid),
            role: 'Alumni',
            status: 1
        }).select('-password');

        // Get user IDs
        const userIds = users.map(u => u._id);

        // Search in Alumni Profile for company/designation with colid filter
        const profiles = await AlumniProfile.find({
            $or: [
                { userId: { $in: userIds } },
                { company: searchRegex },
                { designation: searchRegex }
            ],
            colid: Number(colid)
        }).populate('userId', 'name email phone department');

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
};

// Delete Alumni Account (Soft Delete)
exports.deletealumnids = async (req, res) => {
    try {
        const { id } = req.query;
        await User.findByIdAndUpdate(id, { status: 0 });
        await AlumniProfile.findOneAndUpdate({ userId: id }, { status: 0 });
        res.status(200).json({ message: 'Alumni account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting alumni', error: error.message });
    }
};

// Bulk Create Alumni (Frontend will send array of alumni data)
exports.bulkcreatealumnids = async (req, res) => {
    try {
        const { colid, alumniData } = req.body; // alumniData is an array of alumni objects

        if (!Array.isArray(alumniData) || alumniData.length === 0) {
            return res.status(400).json({ message: 'Invalid alumni data. Expected an array.' });
        }

        const results = { success: 0, failed: 0, errors: [] };

        // Calculate lastlogin (1 month from now)
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        for (let i = 0; i < alumniData.length; i++) {
            const alumni = alumniData[i];
            const { name, email, password, phone, regno, department, programcode, admissionyear, graduationYear, company, designation } = alumni;

            if (!email || !password || !name) {
                results.failed++;
                results.errors.push({ 
                    index: i + 1, 
                    email: email || 'N/A', 
                    error: 'Missing required fields (name, email, password)' 
                });
                continue;
            }

            try {
                // Check if user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    results.failed++;
                    results.errors.push({ 
                        index: i + 1, 
                        email, 
                        error: 'User with this email already exists' 
                    });
                    continue;
                }

                // Create User
                const newUser = await User.create({
                    name,
                    email,
                    password: String(password),
                    phone: phone || 'N/A',
                    regno: regno || 'N/A',
                    role: 'Alumni',
                    department: department || 'N/A',
                    programcode: programcode || 'N/A',
                    admissionyear: admissionyear || 'N/A',
                    semester: 'N/A',
                    section: 'N/A',
                    colid: Number(colid),
                    status: 1,
                    lastlogin: oneMonthLater
                });

                // Create Alumni Profile
                await AlumniProfile.create({
                    userId: newUser._id,
                    colid: Number(colid),
                    graduationYear: graduationYear || null,
                    company: company || null,
                    designation: designation || null
                });

                results.success++;
            } catch (err) {
                results.failed++;
                results.errors.push({ 
                    index: i + 1, 
                    email, 
                    error: err.message 
                });
            }
        }

        res.status(201).json({
            message: 'Bulk creation completed',
            results
        });
    } catch (error) {
        res.status(500).json({ message: 'Bulk creation failed', error: error.message });
    }
};
