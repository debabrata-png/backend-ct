const User = require('./../Models/user');

const getFutureDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 365);
    return d;
};

// ✅ Create single user
exports.mbCreateUser = async (req, res) => {
    try {
        const data = req.body;

        //console.log(req.body);

        if (data.role === 'student') {
            return res.status(400).json({ message: 'Not allowed' });
        }

        const finalData = {
            ...data,

            // // 🔒 enforced fields
            // user: req.headers['x-user'], // from global1.user
            // colid: req.headers['x-colid'], // from global1.colid

             // 🔑 required from frontend
            user: data.user,
            colid: data.colid,

            institution: data.institution,
            department: data.department,
            role: data.role,
            admissionyear: data.admissionyear,

            // 🎯 defaults
            status: 1,
            lastlogin: getFutureDate(),

            regno: "NA",
            programcode: "NA",
            semester: "NA",
            section: "NA",

        };
        //console.log(finalData);

        const user = await User.create(finalData);
        res.json(user);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// ✅ Bulk create
exports.mbBulkCreateUsers = async (req, res) => {
    try {
        const users = req.body;

        const mapped = users.map(u => ({
            ...u,
            // user: req.headers['x-user'],
            // colid: req.headers['x-colid'],

            user: u.user,
            colid: u.colid,

            status: 1,
            lastlogin: getFutureDate(),

            regno: "NA",
            programcode: "NA",
            semester: "NA",
            section: "NA",

            admissionyear: u.joiningyear
        }));

        const result = await User.insertMany(mapped);
        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Get users by colid
exports.mbGetUsers = async (req, res) => {
    try {
        const { colid } = req.query;
        console.log(req.query);

        const users = await User.find({
            colid,
            role: { $ne: 'Student' }
        }).lean();

        console.log(users);

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Update
exports.mbUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Delete
exports.mbDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};