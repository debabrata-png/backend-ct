const User = require("../Models/usermeritds");

// Login function
exports.loginds = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { colid, name, email: userEmail, regno, role, user: username } = user;

        return res.status(200).json({
            colid,
            name,
            email: userEmail,
            regno,
            role,
            user: username
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login error',
            error: error.message
        });
    }
};