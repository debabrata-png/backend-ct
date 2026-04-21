const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");
const Fees = require("../Models/fees");
const applicationFormModel = require("../Models/appmodel2");


exports.createapplication = async (req, res) => {
    try {
        const application = await applicationFormModel.insertMany(req.body);
        return res.status(200).json({
            data: application
        })
    } catch (error) {
        // console.error("Error creating application:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

// get all applications by colid
exports.getallapplicationbycolid = async (req, res) => {
    try {
        const { colId } = req.query;
        const applications = await applicationFormModel.find({
            colId: colId
        });
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applications found" });
        }
        return res.status(200).json({
            success: "true",
            data: applications
        })
    } catch (error) {
        // console.error("Error fetching applications:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

// update application
exports.updateapplicationstatus = async (req, res) => {
    try {
        const { status } = req.body
        const { id } = req.query
        const updatedapllication = await applicationFormModel.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        )
        return res.status(200).json({
            success: "true",
            data: updatedapllication
        })
    } catch (error) {
        // console.error("Error updating application status:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

exports.getapplicationbyid = async (req, res) => {
    try {
        const { id } = req.query;
        const application = await applicationFormModel.findOne({
            _id: id
        })
        return res.status(200).json({
            success: "true",
            data: application
        })
    } catch (error) {
        // console.error("Error fetching application by id:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

// ledgerstud
exports.createledgerstud = async (req, res) => {
    try {
        const ledgerstud = await Ledgerstud.create(req.body);
        return res.status(200).json({
            success: "true",
            message: "ledgerstud created successfully",
            data: ledgerstud
        })
    } catch (error) {
        // console.error("Error creating ledgerstud:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

// create user
exports.createuser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            success: "true",
            data: user
        })
    } catch (error) {
        // console.error("Error creating user:", error);
        // if (error.code === 11000) {
        //     return res.status(400).json({ success: false, message: "User already exists (Email/Reg No conflict)" });
        // }
        // return res.status(500).json({ success: false, message: error.message });
    }
}

// login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        if (user.password !== password)
            return res.status(401).json({ message: "Incorrect password" });

        const { colid, name, email: userEmail, regno, role } = user;

        return res.status(200).json({ colid, name, email: userEmail, regno, role });
    } catch (err) {
        // console.error("Error in login:", err);
        // return res.status(500).json({ success: false, message: err.message });
    }
}

// create fees
exports.createfees = async (req, res) => {
    try {
        const fees = await Fees.insertMany(req.body);
        return res.status(200).json({
            success: "true",
            data: fees
        })
    } catch (error) {
        // console.error("Error creating fees:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

// get fees
exports.filterfees = async (req, res) => {
    try {
        const { programcode, academicyear, colid, semester, feecategory } = req.query;
        const fees = await Fees.findOne({
            colid: colid,
            programcode: programcode,
            semester: semester,
            academicyear: academicyear,
            feecategory: feecategory
        })
        return res.status(200).json({
            success: "true",
            data: fees
        })
    } catch (error) {
        // console.error("Error filtering fees:", error);
        // return res.status(500).json({ success: false, message: error.message });
    }
}

exports.checkregno = async (req, res) => {
    try {
        const { regno } = req.query;

        // Case-insensitive exact match (strip spaces if needed)
        const found = await User.findOne({ regno: regno.trim() });

        return res.json({ exists: !!found });
    } catch (err) {
        // console.error("Error checking regno:", err);
        // return res.status(500).json({ success: false, message: err.message });
    }
}
