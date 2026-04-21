const User = require('../Models/user');
const Lead = require('../Models/crmh1');

exports.confirmadmissionds = async (req, res) => {
    try {
        const { lead_id, colid, ...studentData } = req.body;

        // 1. Check if Lead exists
        const lead = await Lead.findById(lead_id);
        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead not found" });
        }

        // 2. Check if User already exists (by email)
        const existingUser = await User.findOne({ email: studentData.email, colid });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Student account already exists with this email" });
        }

        const hashedPassword = "Password@123";

        // 4. Create new User
        const newUser = new User({
            name: studentData.name,
            email: studentData.email,
            phone: studentData.phone,
            password: hashedPassword,
            role: 'Student', // Fixed Role
            colid: colid,
            status: 1, // Active
            // valid_upto removed as it's not in schema
            regno: studentData.regno,
            programcode: studentData.programcode,
            department: studentData.department,
            admissionyear: studentData.admissionyear,
            semester: studentData.semester,
            section: studentData.section,

            address: studentData.address || lead.address || "",
            city: studentData.city || lead.city || "",
            state: studentData.state || lead.state || "",

            designation: "Student"
        });

        await newUser.save();

        // 6. Update Lead Status (Optional but recommended)
        // You might want to update the lead's stage or outcome here as well
        lead.leadstatus = "Converted"; // Example
        await lead.save();

        res.status(201).json({
            success: true,
            message: "Student admission confirmed and account created successfully.",
            data: newUser
        });

    } catch (error) {
        console.error("Error confirming admission:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
